import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "smart-cctv-dashboard",
    title: "Smart CCTV Dashboard",
    description:
      "Real-time monitoring dashboard for smart CCTV system with WebSocket integration and responsive design.",
    long_description:
      "Built a comprehensive dashboard for a smart CCTV system featuring real-time charts with WebSocket connectivity, achieving <1s data-update latency for critical views. Implemented componentized UI using Material UI and integrated Zustand for state management. The dashboard provides live monitoring capabilities with responsive design for various screen sizes.",
    technologies: ["React.js", "Material UI", "WebSocket", "Zustand", "TypeScript", "Real-time Charts"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2025-08-01T00:00:00.000Z",
  },
  {
    id: "reusable-icon-component-library",
    title: "Reusable Icon Component Library",
    description: "SVG React component library with offline support and comprehensive documentation.",
    long_description:
      "Developed a comprehensive library of reusable icon components as SVG React components with Zustand state management to support offline display. Created detailed documentation in Storybook following Atomic Design principles to maintain consistency across applications. The library includes over 100+ icons with customizable sizes, colors, and variants.",
    technologies: ["React.js", "SVG", "Zustand", "Storybook", "TypeScript", "Atomic Design"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2025-07-01T00:00:00.000Z",
  },
  {
    id: "form-validation-system",
    title: "Form Validation System",
    description: "Advanced form system with React Hook Form and Zod validation for dashboard applications.",
    long_description:
      "Implemented a robust dashboard form system using React Hook Form with Zod for comprehensive input validation and error handling. The system provides real-time validation feedback, custom error messages, and seamless user experience. Includes support for complex nested forms and dynamic field validation.",
    technologies: ["React Hook Form", "Zod", "TypeScript", "Form Validation", "React.js"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2025-06-01T00:00:00.000Z",
  },
  {
    id: "feature-based-architecture-refactor",
    title: "Feature-Based Architecture Refactor",
    description: "Complete front-end refactoring project implementing feature-based architecture with reusable components.",
    long_description:
      "Led a comprehensive refactoring initiative to transform the front-end into a feature-based architecture. Built reusable React components and UI primitives with shadcn to improve maintainability and accelerate feature development. The new architecture reduced code duplication by 40% and improved development velocity.",
    technologies: ["React.js", "shadcn", "TypeScript", "Architecture", "Component Library"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2025-05-01T00:00:00.000Z",
  },
  {
    id: "data-flow-standardization",
    title: "Data Flow Standardization",
    description: "Standardized client-side data flows using TanStack Query with comprehensive error handling.",
    long_description:
      "Standardized client-side data flows and error handling using TanStack Query for fetch/retry/cache functionality. Integrated backend endpoints via Axios for consistent, testable request flows. Implemented comprehensive error boundaries and loading states for improved user experience.",
    technologies: ["TanStack Query", "Axios", "React.js", "Error Handling", "TypeScript"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2025-04-01T00:00:00.000Z",
  },
  {
    id: "figma-to-code-implementation",
    title: "Figma to Code Implementation",
    description: "Pixel-perfect implementation of Figma designs using React and Tailwind CSS.",
    long_description:
      "Translated complex UI mockups from Figma into responsive front-end components using React and Tailwind CSS. Ensured pixel-perfect implementation while maintaining consistency with the design system. Implemented responsive breakpoints and accessibility features following WCAG guidelines.",
    technologies: ["React.js", "Tailwind CSS", "Figma", "Responsive Design", "Accessibility"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "authentication-session-management",
    title: "Authentication & Session Management",
    description: "Complete authentication system with NextAuth and MongoDB integration.",
    long_description:
      "Implemented comprehensive authentication and session flows using NextAuth with custom Express.js endpoints. Designed user models and relations in MongoDB with Prisma ORM. Integrated client calls via Axios and validated endpoints with Postman to ensure stable client-server contracts.",
    technologies: ["NextAuth", "Express.js", "MongoDB", "Prisma", "Axios", "Postman"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2025-02-01T00:00:00.000Z",
  },
  {
    id: "security-error-handling",
    title: "Security & Error Handling",
    description: "Robust client-side security implementation with comprehensive error handling.",
    long_description:
      "Built comprehensive client-side error handling, retry logic, and form validation for authentication and profile flows. Added input sanitization and token handling to mitigate XSS risks. Enforced server-side checks to maintain secure and predictable authentication flows.",
    technologies: ["Security", "Error Handling", "XSS Prevention", "Token Management", "Form Validation"],
    image_url: "/placeholder.svg",
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2025-01-01T00:00:00.000Z",
  },
];
