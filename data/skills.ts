import type { Skill } from "@/types/portfolio";

const CREATED_AT = "2025-01-01T00:00:00.000Z";

export const skills: Skill[] = [
  // Frontend
  { id: "javascript", name: "JavaScript", category: "frontend", proficiency: 4, icon_name: "code", created_at: CREATED_AT },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 3, icon_name: "code", created_at: CREATED_AT },
  { id: "html", name: "HTML", category: "frontend", proficiency: 5, icon_name: "code", created_at: CREATED_AT },
  { id: "css", name: "CSS", category: "frontend", proficiency: 5, icon_name: "palette", created_at: CREATED_AT },
  { id: "scss", name: "SCSS", category: "frontend", proficiency: 4, icon_name: "palette", created_at: CREATED_AT },
  { id: "reactjs", name: "React.js", category: "frontend", proficiency: 3, icon_name: "code", created_at: CREATED_AT },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 3, icon_name: "code", created_at: CREATED_AT },

  // State management
  { id: "redux", name: "Redux", category: "state-management", proficiency: 2, icon_name: "layers", created_at: CREATED_AT },
  { id: "rtk", name: "RTK", category: "state-management", proficiency: 2, icon_name: "layers", created_at: CREATED_AT },
  { id: "zustand", name: "Zustand", category: "state-management", proficiency: 2, icon_name: "layers", created_at: CREATED_AT },
  { id: "tanstack-query", name: "TanStack Query", category: "state-management", proficiency: 2, icon_name: "layers", created_at: CREATED_AT },

  // Forms and validation
  { id: "react-hook-form", name: "React Hook Form", category: "frontend", proficiency: 2, icon_name: "code", created_at: CREATED_AT },
  { id: "zod", name: "Zod", category: "frontend", proficiency: 2, icon_name: "code", created_at: CREATED_AT },

  // UI libraries
  { id: "material-ui", name: "Material UI", category: "design", proficiency: 4, icon_name: "palette", created_at: CREATED_AT },
  { id: "tailwind-css", name: "Tailwind CSS", category: "design", proficiency: 5, icon_name: "palette", created_at: CREATED_AT },
  { id: "shadcn", name: "Shadcn", category: "design", proficiency: 4, icon_name: "palette", created_at: CREATED_AT },
  { id: "storybook", name: "Storybook", category: "tools", proficiency: 4, icon_name: "wrench", created_at: CREATED_AT },

  // Backend and APIs
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 3, icon_name: "database", created_at: CREATED_AT },
  { id: "expressjs", name: "Express.js", category: "backend", proficiency: 3, icon_name: "database", created_at: CREATED_AT },
  { id: "rest-apis", name: "REST APIs", category: "backend", proficiency: 4, icon_name: "database", created_at: CREATED_AT },
  { id: "mongodb", name: "MongoDB", category: "backend", proficiency: 3, icon_name: "database", created_at: CREATED_AT },

  // Testing and tools
  { id: "jest", name: "Jest", category: "tools", proficiency: 2, icon_name: "wrench", created_at: CREATED_AT },
  { id: "axios", name: "Axios", category: "tools", proficiency: 2, icon_name: "wrench", created_at: CREATED_AT },
  { id: "git", name: "Git", category: "tools", proficiency: 5, icon_name: "wrench", created_at: CREATED_AT },
  { id: "github", name: "GitHub", category: "tools", proficiency: 5, icon_name: "wrench", created_at: CREATED_AT },
  { id: "gitlab", name: "GitLab", category: "tools", proficiency: 5, icon_name: "wrench", created_at: CREATED_AT },
  { id: "vite", name: "Vite", category: "tools", proficiency: 4, icon_name: "wrench", created_at: CREATED_AT },
  { id: "husky", name: "Husky", category: "tools", proficiency: 4, icon_name: "wrench", created_at: CREATED_AT },
  { id: "prettier", name: "Prettier", category: "tools", proficiency: 5, icon_name: "wrench", created_at: CREATED_AT },

  // Interested in learning
  { id: "software-architecture", name: "Software Architecture", category: "backend", proficiency: 2, icon_name: "database", created_at: CREATED_AT },
  { id: "system-design", name: "System Design", category: "backend", proficiency: 2, icon_name: "database", created_at: CREATED_AT },
  { id: "docker", name: "Docker", category: "tools", proficiency: 2, icon_name: "wrench", created_at: CREATED_AT },
  { id: "seo", name: "SEO", category: "frontend", proficiency: 3, icon_name: "code", created_at: CREATED_AT },
  { id: "client-side-security", name: "Client-Side Security", category: "backend", proficiency: 3, icon_name: "database", created_at: CREATED_AT },
  { id: "linux", name: "Linux", category: "tools", proficiency: 2, icon_name: "wrench", created_at: CREATED_AT },
];
