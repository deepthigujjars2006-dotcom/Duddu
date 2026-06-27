import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Skill, UserStats, LeaderboardUser, skillsData, initialUserStats, leaderboardData } from "../data/skills";

const DB_FILE = path.join(process.cwd(), "data", "database.json");

export interface DatabaseUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  avatar: string;
  stats: UserStats;
  skills: Skill[];
}

interface DatabaseSchema {
  users: Record<string, DatabaseUser>;
}

// Secure native PBKDF2 password hashing
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

// Check and initialize DB file with seed data
export function initDb() {
  const dirPath = path.dirname(DB_FILE);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialUsers: Record<string, DatabaseUser> = {};

    // Seed default leaderboard players in the database
    leaderboardData.forEach((player, index) => {
      const isCurrentUser = player.name.includes("You");
      if (isCurrentUser) return; // The active user will be registered dynamically

      const id = `seeded-user-${index}`;
      const salt = crypto.randomBytes(16).toString("hex");
      const passwordHash = hashPassword("password123", salt);

      // Distribute progress stats
      const playerStats: UserStats = {
        level: player.level,
        xp: player.xp,
        xpToNextLevel: player.level * 5000,
        streak: Math.max(1, 10 - index),
        rank: player.rank,
        completedLessons: player.completedSkillsCount * 4,
      };

      initialUsers[id] = {
        id,
        username: player.name,
        passwordHash,
        salt,
        avatar: player.avatar,
        stats: playerStats,
        skills: skillsData.map(s => ({
          ...s,
          // Set completions proportional to completed skills count
          progress: index < player.completedSkillsCount ? 100 : 0,
          modules: s.modules.map(m => ({
            ...m,
            completed: index < player.completedSkillsCount
          }))
        })),
      };
    });

    const schema: DatabaseSchema = { users: initialUsers };
    fs.writeFileSync(DB_FILE, JSON.stringify(schema, null, 2), "utf-8");
  }
}

// Read database
export function readDb(): DatabaseSchema {
  initDb();
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data) as DatabaseSchema;
}

// Write database
export function writeDb(data: DatabaseSchema) {
  const dirPath = path.dirname(DB_FILE);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Create new user
export function createUser(username: string, password: string, avatar: string): DatabaseUser {
  const db = readDb();
  
  // Check duplicates
  const userExists = Object.values(db.users).some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (userExists) {
    throw new Error("Username already taken.");
  }

  const id = crypto.randomUUID();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);

  const newUser: DatabaseUser = {
    id,
    username,
    passwordHash,
    salt,
    avatar,
    stats: {
      ...initialUserStats,
      rank: Object.keys(db.users).length + 1,
    },
    skills: JSON.parse(JSON.stringify(skillsData)), // Deep copy original skills data
  };

  db.users[id] = newUser;
  writeDb(db);

  return newUser;
}

// Authenticate user
export function authenticateUser(username: string, password: string): DatabaseUser {
  const db = readDb();
  const user = Object.values(db.users).find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (!user) {
    throw new Error("Invalid username or password.");
  }

  const hash = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    throw new Error("Invalid username or password.");
  }

  return user;
}

// Get user skills progress
export function getUserSkills(userId: string): Skill[] {
  const db = readDb();
  const user = db.users[userId];
  if (!user) throw new Error("User not found.");
  return user.skills;
}

// Update module progress and return updated user stats & skills
export function updateModuleProgress(
  userId: string,
  skillId: string,
  moduleId: string,
  completed: boolean
): { stats: UserStats; skills: Skill[] } {
  const db = readDb();
  const user = db.users[userId];
  if (!user) throw new Error("User not found.");

  const oldSkillIndex = user.skills.findIndex((s) => s.id === skillId);
  if (oldSkillIndex === -1) throw new Error("Skill path not found.");

  const oldSkill = user.skills[oldSkillIndex];
  const oldModuleIndex = oldSkill.modules.findIndex((m) => m.id === moduleId);
  if (oldModuleIndex === -1) throw new Error("Module not found.");

  const oldModule = oldSkill.modules[oldModuleIndex];
  const wasCompleted = oldModule.completed;

  // Toggle state
  user.skills[oldSkillIndex].modules[oldModuleIndex].completed = completed;

  // Recalculate skill progress percentage
  const modules = user.skills[oldSkillIndex].modules;
  const completedCount = modules.filter((m) => m.completed).length;
  user.skills[oldSkillIndex].progress = Math.round((completedCount / modules.length) * 100);

  // Recalculate XP
  if (wasCompleted !== completed) {
    const xpChange = completed ? 75 : -75;
    const lessonChange = completed ? 1 : -1;

    let newXp = user.stats.xp + xpChange;
    let newLevel = user.stats.level;
    let newXpToNextLevel = user.stats.xpToNextLevel;

    if (newXp >= newXpToNextLevel) {
      newLevel += 1;
      newXp = newXp - newXpToNextLevel;
      newXpToNextLevel = Math.round(newXpToNextLevel * 1.25 / 100) * 100;
    } else if (newXp < 0) {
      if (newLevel > 1) {
        newLevel -= 1;
        newXpToNextLevel = Math.round((newXpToNextLevel / 1.25) / 100) * 100;
        newXp = newXpToNextLevel + newXp;
      } else {
        newXp = 0;
      }
    }

    user.stats.xp = newXp;
    user.stats.level = newLevel;
    user.stats.xpToNextLevel = newXpToNextLevel;
    user.stats.completedLessons = Math.max(0, user.stats.completedLessons + lessonChange);
  }

  writeDb(db);
  return { stats: user.stats, skills: user.skills };
}

// Award trivia XP rewards
export function awardTriviaXp(userId: string, xpReward: number): UserStats {
  const db = readDb();
  const user = db.users[userId];
  if (!user) throw new Error("User not found.");

  let newXp = user.stats.xp + xpReward;
  let newLevel = user.stats.level;
  let newXpToNextLevel = user.stats.xpToNextLevel;

  if (newXp >= newXpToNextLevel) {
    newLevel += 1;
    newXp = newXp - newXpToNextLevel;
    newXpToNextLevel = Math.round(newXpToNextLevel * 1.25 / 100) * 100;
  }

  user.stats.xp = newXp;
  user.stats.level = newLevel;
  user.stats.xpToNextLevel = newXpToNextLevel;
  user.stats.streak += 1; // Extend streak count

  writeDb(db);
  return user.stats;
}

// Get global leaderboard rank listings
export function getGlobalLeaderboard(activeUserId?: string): LeaderboardUser[] {
  const db = readDb();
  const users = Object.values(db.users);

  // Map users to leaderboard schema
  const players = users.map((u) => {
    const completedSkillsCount = u.skills.filter((s) => s.progress === 100).length;
    const isSelf = u.id === activeUserId;
    return {
      rank: 0,
      name: isSelf ? `${u.username} (You)` : u.username,
      avatar: u.avatar,
      level: u.stats.level,
      xp: u.stats.xp + (u.stats.level - 1) * 5000, // Cumulative XP for ranking
      completedSkillsCount,
      isSelf,
    };
  });

  // Sort by cumulative XP points
  players.sort((a, b) => b.xp - a.xp);

  // Map absolute rank index
  return players.map((p, idx) => ({
    rank: idx + 1,
    name: p.name,
    avatar: p.avatar,
    level: p.level,
    xp: p.isSelf ? db.users[activeUserId!].stats.xp : p.xp - (p.level - 1) * 5000, // Normalize output score
    completedSkillsCount: p.completedSkillsCount,
  }));
}
