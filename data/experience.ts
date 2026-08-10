import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    id: "nextera",
    company_name: "Nextera",
    role: "Front-End Developer",
    duration: "Sep 2023 - Aug 2025",
    description:
      "Built reusable icon components and responsive dashboard for smart CCTV system with real-time WebSocket integration. Documented UI components in Storybook following Atomic Design principles.",
    technologies: ["React.js", "Material UI", "WebSocket", "Zustand", "Storybook", "TypeScript"],
    image_url: null,
    website_url: null,
    location: "Tehran, Iran - On-Site",
    created_at: "2025-08-01T00:00:00.000Z",
  },
  {
    id: "alborzeng",
    company_name: "AlborzEng Co.",
    role: "Front-End Developer",
    duration: "July 2023 - Aug 2024",
    description:
      "Refactored front-end into feature-based architecture and standardized data flows using TanStack Query. Translated Figma designs into pixel-perfect responsive components.",
    technologies: ["React.js", "shadcn", "TanStack Query", "Axios", "Tailwind CSS", "Figma"],
    image_url: null,
    website_url: null,
    location: "Tehran, Iran - On-Site",
    created_at: "2024-08-01T00:00:00.000Z",
  },
  {
    id: "esperez-team",
    company_name: "Esperez Team",
    role: "Front-End Developer",
    duration: "Sep 2021 - Jul 2023",
    description:
      "Implemented authentication systems with NextAuth and MongoDB. Built robust error handling and security measures. Collaborated in Agile/Scrum team with Git workflow.",
    technologies: ["NextAuth", "Express.js", "MongoDB", "Prisma", "Axios", "Git", "Agile"],
    image_url: null,
    website_url: null,
    location: "Siegen, Germany - Remote",
    created_at: "2023-07-01T00:00:00.000Z",
  },
];
