import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    id: "zarsaham",
    company_name: "Zarsaham Co.",
    role: "Front-End Developer",
    duration: "July 2025 - Present",
    description: `Refactored front-end into a feature-based architecture and standardized data flows.
    Contributed to the development of a fintech and gold trading platform using Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.
    Built responsive UI features, integrated APIs, implemented authentication and state management, and developed modules for wallet, payments, market data, and price visualization.`,
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Axios",
      "Tailwind CSS",
      "Figma",
      "UI/UX Design",
      "Git",
    ],
    image_url: "/images/zarsaham.jpg",
    website_url: "https://zarsaham.com/",
    location: "Tehran, Iran - On-Site",
    created_at: "2024-08-01T00:00:00.000Z",
  },

  {
    id: "nextera",
    company_name: "Nextera",
    role: "Front-End Developer",
    duration: "March 2024 - July 2025",
    description:
      "Built reusable icon components and responsive dashboard for smart CCTV system with real-time WebSocket integration. Documented UI components in Storybook following Atomic Design principles.",
    technologies: ["Next.js", "Material UI", "WebSocket", "Zustand", "Storybook", "TypeScript","git"],
    image_url: "/images/nextera.jpg",
    website_url: "https://www.nexterafactory.com/",
    location: "Tehran, Iran - On-Site",
    created_at: "2025-08-01T00:00:00.000Z",
  },

  // {
  //   id: "esperez-team",
  //   company_name: "Esperez Team",
  //   role: "Front-End Developer",
  //   duration: "Sep 2021 - Jul 2023",
  //   description:
  //     "Implemented authentication systems with NextAuth and MongoDB. Built robust error handling and security measures. Collaborated in Agile/Scrum team with Git workflow.",
  //   technologies: ["NextAuth", "Express.js", "MongoDB", "Prisma", "Axios", "Git", "Agile"],
  //   image_url: null,
  //   website_url: null,
  //   location: "Siegen, Germany - Remote",
  //   created_at: "2023-07-01T00:00:00.000Z",
  // },
];
