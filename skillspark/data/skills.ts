export interface SkillModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  unlocked: boolean;
  lessonsCount: number;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'General';
  xp: number;
  levelRequired: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string; // Will store the SVG icon key or emoji representation
  progress: number; // 0 to 100
  modules: SkillModule[];
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: number;
  completedLessons: number;
}

export const initialUserStats: UserStats = {
  level: 4,
  xp: 2850,
  xpToNextLevel: 5000,
  streak: 7,
  rank: 12,
  completedLessons: 18,
};

export const skillsData: Skill[] = [
  {
    id: "react-arch",
    title: "React Architecture",
    description: "Master clean component patterns, state management, custom hooks, and rendering optimizations.",
    category: "Frontend",
    xp: 450,
    levelRequired: 1,
    difficulty: "Intermediate",
    icon: "react",
    progress: 75,
    modules: [
      { id: "ra-1", title: "Component Composition Patterns", duration: "25m", completed: true, unlocked: true, lessonsCount: 4 },
      { id: "ra-2", title: "Advanced React Hooks & Context API", duration: "35m", completed: true, unlocked: true, lessonsCount: 5 },
      { id: "ra-3", title: "State Management Strategies", duration: "40m", completed: true, unlocked: true, lessonsCount: 6 },
      { id: "ra-4", title: "Performance Profiling & Memoization", duration: "30m", completed: false, unlocked: true, lessonsCount: 4 },
      { id: "ra-5", title: "Concurrent Rendering & Suspense", duration: "45m", completed: false, unlocked: false, lessonsCount: 5 }
    ]
  },
  {
    id: "nextjs-app",
    title: "Next.js App Router",
    description: "Build fast, production-ready apps using Server Components, Server Actions, layouts, and API routes.",
    category: "Frontend",
    xp: 600,
    levelRequired: 2,
    difficulty: "Intermediate",
    icon: "nextjs",
    progress: 40,
    modules: [
      { id: "nx-1", title: "App Router Layouts & Routing", duration: "20m", completed: true, unlocked: true, lessonsCount: 3 },
      { id: "nx-2", title: "React Server Components (RSC) vs Client", duration: "30m", completed: true, unlocked: true, lessonsCount: 4 },
      { id: "nx-3", title: "Data Fetching, Caching & Revalidation", duration: "35m", completed: false, unlocked: true, lessonsCount: 5 },
      { id: "nx-4", title: "Server Actions & Form Mutations", duration: "25m", completed: false, unlocked: false, lessonsCount: 4 },
      { id: "nx-5", title: "Dynamic Routing & Route Handlers", duration: "30m", completed: false, unlocked: false, lessonsCount: 3 }
    ]
  },
  {
    id: "typescript-adv",
    title: "Advanced TypeScript",
    description: "Deep dive into type system mechanics: generics, utility types, conditional types, and schema validation.",
    category: "General",
    xp: 500,
    levelRequired: 3,
    difficulty: "Advanced",
    icon: "typescript",
    progress: 20,
    modules: [
      { id: "ts-1", title: "Generics & Generic Constraints", duration: "30m", completed: true, unlocked: true, lessonsCount: 4 },
      { id: "ts-2", title: "Mapped Types & Template Literal Types", duration: "40m", completed: false, unlocked: true, lessonsCount: 5 },
      { id: "ts-3", title: "Conditional Types & Type Inference", duration: "45m", completed: false, unlocked: false, lessonsCount: 6 },
      { id: "ts-4", title: "Utility Types and Custom Mappers", duration: "35m", completed: false, unlocked: false, lessonsCount: 4 }
    ]
  },
  {
    id: "ui-design-systems",
    title: "UI Design Systems",
    description: "Design premium components using typography hierarchies, unified grid systems, and glassmorphic micro-tokens.",
    category: "Design",
    xp: 350,
    levelRequired: 1,
    difficulty: "Beginner",
    icon: "design",
    progress: 100,
    modules: [
      { id: "ds-1", title: "Visual Hierarchy & Typography", duration: "15m", completed: true, unlocked: true, lessonsCount: 3 },
      { id: "ds-2", title: "Grid Systems & Responsive Spacing", duration: "20m", completed: true, unlocked: true, lessonsCount: 4 },
      { id: "ds-3", title: "Design Tokens & Dark Mode Palettes", duration: "25m", completed: true, unlocked: true, lessonsCount: 4 },
      { id: "ds-4", title: "Micro-animations & Interactive States", duration: "30m", completed: true, unlocked: true, lessonsCount: 5 }
    ]
  },
  {
    id: "nodejs-rest",
    title: "Node.js API Services",
    description: "Architect secure, scalable REST APIs using Express/Fastify, JSON Web Tokens (JWT), and databases.",
    category: "Backend",
    xp: 550,
    levelRequired: 2,
    difficulty: "Intermediate",
    icon: "nodejs",
    progress: 0,
    modules: [
      { id: "nd-1", title: "Node.js Runtime & Event Loop", duration: "25m", completed: false, unlocked: true, lessonsCount: 3 },
      { id: "nd-2", title: "Express Router & Middleware Architecture", duration: "30m", completed: false, unlocked: false, lessonsCount: 5 },
      { id: "nd-3", title: "JWT Auth & Route Protection", duration: "35m", completed: false, unlocked: false, lessonsCount: 4 },
      { id: "nd-4", title: "SQL & NoSQL Database Integration", duration: "40m", completed: false, unlocked: false, lessonsCount: 5 }
    ]
  },
  {
    id: "docker-devops",
    title: "Docker & Containers",
    description: "Learn containerization principles, Dockerfiles, docker-compose, and basic CI/CD pipeline deployments.",
    category: "Backend",
    xp: 700,
    levelRequired: 4,
    difficulty: "Advanced",
    icon: "docker",
    progress: 0,
    modules: [
      { id: "dk-1", title: "Introduction to Containerization", duration: "20m", completed: false, unlocked: false, lessonsCount: 3 },
      { id: "dk-2", title: "Writing Optimised Dockerfiles", duration: "30m", completed: false, unlocked: false, lessonsCount: 4 },
      { id: "dk-3", title: "Multi-container Setup with Compose", duration: "35m", completed: false, unlocked: false, lessonsCount: 4 },
      { id: "dk-4", title: "Production Container Deployments", duration: "40m", completed: false, unlocked: false, lessonsCount: 5 }
    ]
  }
];

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  completedSkillsCount: number;
}

export const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: "Alex Rivers", avatar: "⚡", level: 12, xp: 14850, completedSkillsCount: 9 },
  { rank: 2, name: "Sophia Chen", avatar: "✨", level: 10, xp: 11200, completedSkillsCount: 7 },
  { rank: 3, name: "Tariq Malik", avatar: "🔥", level: 9, xp: 9550, completedSkillsCount: 6 },
  { rank: 4, name: "Jessica Doe", avatar: "🛡️", level: 8, xp: 8400, completedSkillsCount: 5 },
  { rank: 5, name: "Marcus Vance", avatar: "🧬", level: 6, xp: 5900, completedSkillsCount: 4 },
  { rank: 6, name: "Emily Watson", avatar: "💻", level: 5, xp: 4700, completedSkillsCount: 3 },
  { rank: 7, name: "Ravi Kumar", avatar: "🚀", level: 4, xp: 3800, completedSkillsCount: 2 },
  { rank: 8, name: "You (Guest)", avatar: "🎯", level: 4, xp: 2850, completedSkillsCount: 1 },
  { rank: 9, name: "Liam O'Connor", avatar: "☕", level: 3, xp: 2100, completedSkillsCount: 1 },
  { rank: 10, name: "Zoe Jenkins", avatar: "🐾", level: 2, xp: 1450, completedSkillsCount: 0 }
];

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export const dailyChallengeQuestion: TriviaQuestion = {
  id: "daily-q1",
  question: "Which of the following describes the primary difference between a React Server Component (RSC) and a Client Component?",
  options: [
    "Client Components can only be styled with Tailwind CSS, while RSCs use CSS Modules.",
    "RSCs run exclusively on the server and do not ship JavaScript to the browser, while Client Components are hydrated on the client.",
    "Client Components cannot access any browser API (like window or document) whereas RSCs can.",
    "RSCs are only rendered once at build time and cannot be updated dynamic on user interactions."
  ],
  correctIndex: 1,
  explanation: "React Server Components render on the server and do not include client-side runtime JavaScript in the final bundle, improving performance. Client Components are compiled and then hydrated in the browser, allowing them to support client-side reactivity (e.g. state, effects, event listeners).",
  xpReward: 100
};
