/**
 * Setup script for Neon database
 * Run with: node --env-file-if-exists=/vercel/share/.env.project scripts/setup-neon.ts
 */

import { sql } from '@neondatabase/serverless';

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Drop existing tables if they exist
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS project_submissions CASCADE`;
    await sql`DROP TABLE IF EXISTS contact_messages CASCADE`;
    await sql`DROP TABLE IF EXISTS project_comments CASCADE`;
    await sql`DROP TABLE IF EXISTS projects CASCADE`;
    await sql`DROP TABLE IF EXISTS collaborations CASCADE`;
    await sql`DROP TABLE IF EXISTS skills CASCADE`;

    // Create projects table
    console.log('Creating projects table...');
    await sql`
      CREATE TABLE projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        technologies TEXT[] NOT NULL DEFAULT '{}',
        image_url TEXT,
        live_url TEXT,
        github_url TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create project comments table
    console.log('Creating project comments table...');
    await sql`
      CREATE TABLE project_comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create contact messages table
    console.log('Creating contact messages table...');
    await sql`
      CREATE TABLE contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create project submissions table
    console.log('Creating project submissions table...');
    await sql`
      CREATE TABLE project_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        project_title TEXT NOT NULL,
        project_description TEXT NOT NULL,
        budget_range TEXT,
        timeline TEXT,
        technologies TEXT[] DEFAULT '{}',
        priority TEXT DEFAULT 'medium',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create skills table
    console.log('Creating skills table...');
    await sql`
      CREATE TABLE skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
        icon_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create collaborations table
    console.log('Creating collaborations table...');
    await sql`
      CREATE TABLE collaborations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name TEXT NOT NULL,
        role TEXT NOT NULL,
        description TEXT NOT NULL,
        duration TEXT,
        technologies TEXT[] DEFAULT '{}',
        image_url TEXT,
        website_url TEXT,
        location TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Insert all skills data
    console.log('Inserting skills data...');
    const skillsInserts = [
      ['JavaScript', 'frontend', 5],
      ['TypeScript', 'frontend', 5],
      ['HTML', 'frontend', 5],
      ['CSS', 'frontend', 5],
      ['SCSS', 'frontend', 4],
      ['React.js', 'frontend', 5],
      ['Next.js', 'frontend', 5],
      ['Redux', 'state-management', 4],
      ['RTK', 'state-management', 4],
      ['Zustand', 'state-management', 4],
      ['TanStack Query', 'state-management', 4],
      ['React Hook Form', 'frontend', 4],
      ['Zod', 'frontend', 4],
      ['Material UI', 'design', 4],
      ['Tailwind CSS', 'design', 5],
      ['Shadcn', 'design', 4],
      ['Storybook', 'tools', 4],
      ['Node.js', 'backend', 3],
      ['Express.js', 'backend', 3],
      ['REST APIs', 'backend', 4],
      ['MongoDB', 'backend', 3],
      ['Jest', 'tools', 3],
      ['Axios', 'tools', 4],
      ['Git', 'tools', 5],
      ['GitHub', 'tools', 5],
      ['GitLab', 'tools', 4],
      ['Vite', 'tools', 4],
      ['Husky', 'tools', 3],
      ['Prettier', 'tools', 4],
      ['Svelte', 'frontend', 2],
      ['Vue.js', 'frontend', 2],
      ['Software Architecture', 'backend', 2],
      ['System Design', 'backend', 2],
      ['Docker', 'tools', 2],
      ['SEO', 'frontend', 3],
      ['Client-Side Security', 'backend', 3],
      ['Linux', 'tools', 2],
    ];

    for (const [name, category, proficiency] of skillsInserts) {
      await sql`
        INSERT INTO skills (name, category, proficiency, icon_name)
        VALUES (${name}, ${category}, ${proficiency}, ${category === 'frontend' ? 'code' : category === 'backend' ? 'database' : category === 'design' ? 'palette' : 'wrench'})
      `;
    }

    // Insert all projects data
    console.log('Inserting projects data...');
    const projectsInserts = [
      [
        'Smart CCTV Dashboard',
        'Real-time monitoring dashboard for smart CCTV system with WebSocket integration and responsive design.',
        'Built a comprehensive dashboard for a smart CCTV system featuring real-time charts with WebSocket connectivity, achieving <1s data-update latency for critical views. Implemented componentized UI using Material UI and integrated Zustand for state management. The dashboard provides live monitoring capabilities with responsive design for various screen sizes.',
        ['React.js', 'Material UI', 'WebSocket', 'Zustand', 'TypeScript', 'Real-time Charts'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        true,
      ],
      [
        'Reusable Icon Component Library',
        'SVG React component library with offline support and comprehensive documentation.',
        'Developed a comprehensive library of reusable icon components as SVG React components with Zustand state management to support offline display. Created detailed documentation in Storybook following Atomic Design principles to maintain consistency across applications. The library includes over 100+ icons with customizable sizes, colors, and variants.',
        ['React.js', 'SVG', 'Zustand', 'Storybook', 'TypeScript', 'Atomic Design'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        true,
      ],
      [
        'Form Validation System',
        'Advanced form system with React Hook Form and Zod validation for dashboard applications.',
        'Implemented a robust dashboard form system using React Hook Form with Zod for comprehensive input validation and error handling. The system provides real-time validation feedback, custom error messages, and seamless user experience. Includes support for complex nested forms and dynamic field validation.',
        ['React Hook Form', 'Zod', 'TypeScript', 'Form Validation', 'React.js'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        false,
      ],
      [
        'Feature-Based Architecture Refactor',
        'Complete front-end refactoring project implementing feature-based architecture with reusable components.',
        'Led a comprehensive refactoring initiative to transform the front-end into a feature-based architecture. Built reusable React components and UI primitives with shadcn to improve maintainability and accelerate feature development. The new architecture reduced code duplication by 40% and improved development velocity.',
        ['React.js', 'shadcn', 'TypeScript', 'Architecture', 'Component Library'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        true,
      ],
      [
        'Data Flow Standardization',
        'Standardized client-side data flows using TanStack Query with comprehensive error handling.',
        'Standardized client-side data flows and error handling using TanStack Query for fetch/retry/cache functionality. Integrated backend endpoints via Axios for consistent, testable request flows. Implemented comprehensive error boundaries and loading states for improved user experience.',
        ['TanStack Query', 'Axios', 'React.js', 'Error Handling', 'TypeScript'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        false,
      ],
      [
        'Figma to Code Implementation',
        'Pixel-perfect implementation of Figma designs using React and Tailwind CSS.',
        'Translated complex UI mockups from Figma into responsive front-end components using React and Tailwind CSS. Ensured pixel-perfect implementation while maintaining consistency with the design system. Implemented responsive breakpoints and accessibility features following WCAG guidelines.',
        ['React.js', 'Tailwind CSS', 'Figma', 'Responsive Design', 'Accessibility'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        false,
      ],
      [
        'Authentication & Session Management',
        'Complete authentication system with NextAuth and MongoDB integration.',
        'Implemented comprehensive authentication and session flows using NextAuth with custom Express.js endpoints. Designed user models and relations in MongoDB with Prisma ORM. Integrated client calls via Axios and validated endpoints with Postman to ensure stable client-server contracts.',
        ['NextAuth', 'Express.js', 'MongoDB', 'Prisma', 'Axios', 'Postman'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        true,
      ],
      [
        'Security & Error Handling',
        'Robust client-side security implementation with comprehensive error handling.',
        'Built comprehensive client-side error handling, retry logic, and form validation for authentication and profile flows. Added input sanitization and token handling to mitigate XSS risks. Enforced server-side checks to maintain secure and predictable authentication flows.',
        ['Security', 'Error Handling', 'XSS Prevention', 'Token Management', 'Form Validation'],
        '/placeholder.svg?height=400&width=600',
        null,
        null,
        false,
      ],
    ];

    for (const [title, description, longDesc, techs, img, live, github, featured] of projectsInserts) {
      await sql`
        INSERT INTO projects (title, description, long_description, technologies, image_url, live_url, github_url, featured)
        VALUES (${title}, ${description}, ${longDesc}, ${techs}, ${img}, ${live}, ${github}, ${featured})
      `;
    }

    // Insert all collaborations data
    console.log('Inserting collaborations data...');
    const collabInserts = [
      [
        'Nextera',
        'Front-End Developer',
        'Sep 2023 - Aug 2025',
        'Built reusable icon components and responsive dashboard for smart CCTV system with real-time WebSocket integration. Documented UI components in Storybook following Atomic Design principles.',
        ['React.js', 'Material UI', 'WebSocket', 'Zustand', 'Storybook', 'TypeScript'],
        null,
        'Tehran, Iran - On-Site',
      ],
      [
        'AlborzEng Co.',
        'Front-End Developer',
        'July 2023 - Aug 2024',
        'Refactored front-end into feature-based architecture and standardized data flows using TanStack Query. Translated Figma designs into pixel-perfect responsive components.',
        ['React.js', 'shadcn', 'TanStack Query', 'Axios', 'Tailwind CSS', 'Figma'],
        null,
        'Tehran, Iran - On-Site',
      ],
      [
        'Esperez Team',
        'Front-End Developer',
        'Sep 2021 - Jul 2023',
        'Implemented authentication systems with NextAuth and MongoDB. Built robust error handling and security measures. Collaborated in Agile/Scrum team with Git workflow.',
        ['NextAuth', 'Express.js', 'MongoDB', 'Prisma', 'Axios', 'Git', 'Agile'],
        null,
        'Siegen, Germany - Remote',
      ],
    ];

    for (const [company, role, duration, description, techs, websiteUrl, location] of collabInserts) {
      await sql`
        INSERT INTO collaborations (company_name, role, duration, description, technologies, website_url, location)
        VALUES (${company}, ${role}, ${duration}, ${description}, ${techs}, ${websiteUrl}, ${location})
      `;
    }

    // Create indexes for better performance
    console.log('Creating indexes...');
    await sql`CREATE INDEX idx_projects_featured ON projects(featured)`;
    await sql`CREATE INDEX idx_projects_created_at ON projects(created_at DESC)`;
    await sql`CREATE INDEX idx_project_comments_project_id ON project_comments(project_id)`;
    await sql`CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC)`;
    await sql`CREATE INDEX idx_project_submissions_created_at ON project_submissions(created_at DESC)`;
    await sql`CREATE INDEX idx_skills_category ON skills(category)`;

    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
