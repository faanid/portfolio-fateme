-- Clear existing data and insert real skills and projects based on resume
DELETE FROM skills;
DELETE FROM projects;
DELETE FROM collaborations;

-- Insert real skills from resume
INSERT INTO skills (name, category, proficiency, icon_name) VALUES
-- Current Stack - Frontend
('JavaScript', 'frontend', 5, 'code'),
('TypeScript', 'frontend', 5, 'code'),
('HTML', 'frontend', 5, 'code'),
('CSS', 'frontend', 5, 'palette'),
('SCSS', 'frontend', 4, 'palette'),
('React.js', 'frontend', 5, 'code'),
('Next.js', 'frontend', 5, 'code'),

-- State Management
('Redux', 'state-management', 4, 'layers'),
('RTK', 'state-management', 4, 'layers'),
('Zustand', 'state-management', 4, 'layers'),
('TanStack Query', 'state-management', 4, 'layers'),

-- Forms and Validation
('React Hook Form', 'frontend', 4, 'code'),
('Zod', 'frontend', 4, 'code'),

-- UI Libraries
('Material UI', 'design', 4, 'palette'),
('Tailwind CSS', 'design', 5, 'palette'),
('Shadcn', 'design', 4, 'palette'),
('Storybook', 'tools', 4, 'wrench'),

-- Backend and APIs
('Node.js', 'backend', 3, 'database'),
('Express.js', 'backend', 3, 'database'),
('REST APIs', 'backend', 4, 'database'),
('MongoDB', 'backend', 3, 'database'),

-- Testing and Tools
('Jest', 'tools', 3, 'wrench'),
('Axios', 'tools', 4, 'wrench'),
('Git', 'tools', 5, 'wrench'),
('GitHub', 'tools', 5, 'wrench'),
('GitLab', 'tools', 4, 'wrench'),
('Vite', 'tools', 4, 'wrench'),
('Husky', 'tools', 3, 'wrench'),
('Prettier', 'tools', 4, 'wrench'),

-- Interested in learning
('Svelte', 'frontend', 2, 'code'),
('Vue.js', 'frontend', 2, 'code'),
('Software Architecture', 'backend', 2, 'database'),
('System Design', 'backend', 2, 'database'),
('Docker', 'tools', 2, 'wrench'),
('SEO', 'frontend', 3, 'code'),
('Client-Side Security', 'backend', 3, 'database'),
('Linux', 'tools', 2, 'wrench');

-- Insert real projects based on work experience
INSERT INTO projects (title, description, long_description, technologies, image_url, live_url, github_url, featured) VALUES
('Smart CCTV Dashboard', 
 'Real-time monitoring dashboard for smart CCTV system with WebSocket integration and responsive design.',
 'Built a comprehensive dashboard for a smart CCTV system featuring real-time charts with WebSocket connectivity, achieving <1s data-update latency for critical views. Implemented componentized UI using Material UI and integrated Zustand for state management. The dashboard provides live monitoring capabilities with responsive design for various screen sizes.',
 ARRAY['React.js', 'Material UI', 'WebSocket', 'Zustand', 'TypeScript', 'Real-time Charts'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 true),

('Reusable Icon Component Library', 
 'SVG React component library with offline support and comprehensive documentation.',
 'Developed a comprehensive library of reusable icon components as SVG React components with Zustand state management to support offline display. Created detailed documentation in Storybook following Atomic Design principles to maintain consistency across applications. The library includes over 100+ icons with customizable sizes, colors, and variants.',
 ARRAY['React.js', 'SVG', 'Zustand', 'Storybook', 'TypeScript', 'Atomic Design'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 true),

('Form Validation System', 
 'Advanced form system with React Hook Form and Zod validation for dashboard applications.',
 'Implemented a robust dashboard form system using React Hook Form with Zod for comprehensive input validation and error handling. The system provides real-time validation feedback, custom error messages, and seamless user experience. Includes support for complex nested forms and dynamic field validation.',
 ARRAY['React Hook Form', 'Zod', 'TypeScript', 'Form Validation', 'React.js'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 false),

('Feature-Based Architecture Refactor', 
 'Complete front-end refactoring project implementing feature-based architecture with reusable components.',
 'Led a comprehensive refactoring initiative to transform the front-end into a feature-based architecture. Built reusable React components and UI primitives with shadcn to improve maintainability and accelerate feature development. The new architecture reduced code duplication by 40% and improved development velocity.',
 ARRAY['React.js', 'shadcn', 'TypeScript', 'Architecture', 'Component Library'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 true),

('Data Flow Standardization', 
 'Standardized client-side data flows using TanStack Query with comprehensive error handling.',
 'Standardized client-side data flows and error handling using TanStack Query for fetch/retry/cache functionality. Integrated backend endpoints via Axios for consistent, testable request flows. Implemented comprehensive error boundaries and loading states for improved user experience.',
 ARRAY['TanStack Query', 'Axios', 'React.js', 'Error Handling', 'TypeScript'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 false),

('Figma to Code Implementation', 
 'Pixel-perfect implementation of Figma designs using React and Tailwind CSS.',
 'Translated complex UI mockups from Figma into responsive front-end components using React and Tailwind CSS. Ensured pixel-perfect implementation while maintaining consistency with the design system. Implemented responsive breakpoints and accessibility features following WCAG guidelines.',
 ARRAY['React.js', 'Tailwind CSS', 'Figma', 'Responsive Design', 'Accessibility'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 false),

('Authentication & Session Management', 
 'Complete authentication system with NextAuth and MongoDB integration.',
 'Implemented comprehensive authentication and session flows using NextAuth with custom Express.js endpoints. Designed user models and relations in MongoDB with Prisma ORM. Integrated client calls via Axios and validated endpoints with Postman to ensure stable client-server contracts.',
 ARRAY['NextAuth', 'Express.js', 'MongoDB', 'Prisma', 'Axios', 'Postman'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 true),

('Security & Error Handling', 
 'Robust client-side security implementation with comprehensive error handling.',
 'Built comprehensive client-side error handling, retry logic, and form validation for authentication and profile flows. Added input sanitization and token handling to mitigate XSS risks. Enforced server-side checks to maintain secure and predictable authentication flows.',
 ARRAY['Security', 'Error Handling', 'XSS Prevention', 'Token Management', 'Form Validation'],
 '/placeholder.svg?height=400&width=600',
 NULL,
 NULL,
 false);

-- Insert real collaborations based on work experience
INSERT INTO collaborations (company_name, role, duration, description, technologies, company_url, location) VALUES
('Nextera', 
 'Front-End Developer', 
 'Sep 2023 - Aug 2025', 
 'Built reusable icon components and responsive dashboard for smart CCTV system with real-time WebSocket integration. Documented UI components in Storybook following Atomic Design principles.',
 ARRAY['React.js', 'Material UI', 'WebSocket', 'Zustand', 'Storybook', 'TypeScript'],
 NULL,
 'Tehran, Iran - On-Site'),

('AlborzEng Co.', 
 'Front-End Developer', 
 'July 2023 - Aug 2024', 
 'Refactored front-end into feature-based architecture and standardized data flows using TanStack Query. Translated Figma designs into pixel-perfect responsive components.',
 ARRAY['React.js', 'shadcn', 'TanStack Query', 'Axios', 'Tailwind CSS', 'Figma'],
 NULL,
 'Tehran, Iran - On-Site'),

('Esperez Team', 
 'Front-End Developer', 
 'Sep 2021 - Jul 2023', 
 'Implemented authentication systems with NextAuth and MongoDB. Built robust error handling and security measures. Collaborated in Agile/Scrum team with Git workflow.',
 ARRAY['NextAuth', 'Express.js', 'MongoDB', 'Prisma', 'Axios', 'Git', 'Agile'],
 NULL,
 'Siegen, Germany - Remote');
