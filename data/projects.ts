import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
{
id: "nectar",
title: "Nectar – Tour Booking API",
description:
"A scalable and secure RESTful backend for a tour booking platform, featuring authentication, user management, tours, reviews, bookings, and advanced MongoDB queries.",
long_description:
"Built a backend application for a tour and travel platform using Node.js, Express, MongoDB, and Mongoose. Implemented RESTful APIs for managing users, tours, reviews, and bookings, with JWT-based authentication, role-based authorization, password reset functionality, and secure account management. Added advanced API features including filtering, sorting, pagination, aggregation pipelines, and geospatial queries. Improved application security using Helmet, rate limiting, data sanitization, XSS protection, and MongoDB injection prevention.",
technologies: [
"Node.js",
"Express.js",
"MongoDB",
"Mongoose",
"JavaScript",
"REST API",
"JWT",
"bcrypt",
"Helmet",
"Express Rate Limit",
"Nodemailer"
],
image_url: "/images/nectar.jpg",
live_url: null,
github_url: "https://github.com/faanid/nectar",
featured: true,
created_at: "2026-06-27T00:00:00.000Z",
},

 {
id: "leetcode-solutions",
title: "LeetCode Solutions",
description:
"A collection of algorithm and data structure solutions built to strengthen problem-solving skills and practice coding interview patterns.",
long_description:
"An ongoing practice repository focused on improving problem-solving, algorithms, and data structure skills. Each solution includes the problem reference, implementation, explanation of the approach, and time and space complexity analysis. Solutions are primarily written in TypeScript, with some JavaScript implementations, and the repository is structured to support continued practice across different difficulty levels and programming languages.",
technologies: [
"TypeScript",
"JavaScript",
"Data Structures",
"Algorithms",
"Problem Solving",
"Big O",
"LeetCode"
],
image_url: "/images/leetcode-solutions.jpg",
live_url: null,
github_url: "https://github.com/faanid/leetcode-solutions",
featured: true,
created_at: "2025-08-10T00:00:00.000Z",
},
{
id: "cyberia-tech-challenge",
title: "Architecture Firm Portfolio",
description:
"A responsive architecture portfolio website built as a frontend technical challenge, featuring project listings, detailed project pages, image galleries, and a validated contact form.",
long_description:
"Developed a responsive React-based architecture firm portfolio as part of a frontend technical challenge. Built the application with Next.js and TypeScript, creating reusable UI components and responsive layouts for the homepage, portfolio grid, and project detail pages. Implemented project galleries with image carousels and added client-side form validation for the contact section, with a focus on translating the required UI scenario into a clean and maintainable frontend application.",
technologies: [
"Next.js",
"React.js",
"TypeScript",
"JavaScript",
"Tailwind CSS",
"Responsive Design",
"Form Validation"
],
image_url: "/images/cyberia-tech-challenge.jpg",
live_url: "https://cyberia-tech-challenge.netlify.app/",
github_url: "https://github.com/faanid/cyberia-tech-challenge",
featured: true,
created_at: "2025-08-01T00:00:00.000Z",
},



  // {
  //   id: "figma-to-code-implementation",
  //   title: "Figma to Code Implementation",
  //   description: "Pixel-perfect implementation of Figma designs using React and Tailwind CSS.",
  //   long_description:
  //     "Translated complex UI mockups from Figma into responsive front-end components using React and Tailwind CSS. Ensured pixel-perfect implementation while maintaining consistency with the design system. Implemented responsive breakpoints and accessibility features following WCAG guidelines.",
  //   technologies: ["React.js", "Tailwind CSS", "Figma", "Responsive Design", "Accessibility"],
  //   image_url: "/placeholder.svg",
  //   live_url: null,
  //   github_url: null,
  //   featured: false,
  //   created_at: "2025-03-01T00:00:00.000Z",
  // },

];
