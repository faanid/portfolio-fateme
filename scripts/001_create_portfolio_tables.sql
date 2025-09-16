-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
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
);

-- Create project comments table (no auth required)
CREATE TABLE IF NOT EXISTS project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project submissions table (from employers)
CREATE TABLE IF NOT EXISTS project_submissions (
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
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- frontend, backend, tools, etc.
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collaborations table
CREATE TABLE IF NOT EXISTS collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT,
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for skills
INSERT INTO skills (name, category, proficiency, icon_name) VALUES
('React.js', 'frontend', 5, 'react'),
('Next.js', 'frontend', 5, 'nextjs'),
('TypeScript', 'frontend', 4, 'typescript'),
('Tailwind CSS', 'frontend', 5, 'tailwind'),
('Material UI', 'frontend', 4, 'mui'),
('Redux', 'state-management', 4, 'redux'),
('RTK Query', 'state-management', 4, 'redux'),
('Zustand', 'state-management', 4, 'zustand'),
('JavaScript', 'frontend', 5, 'javascript'),
('HTML5', 'frontend', 5, 'html'),
('CSS3', 'frontend', 5, 'css'),
('Git', 'tools', 4, 'git'),
('Figma', 'design', 3, 'figma'),
('Responsive Design', 'frontend', 5, 'responsive');

-- Insert sample projects
INSERT INTO projects (title, description, long_description, technologies, image_url, live_url, github_url, featured) VALUES
('E-Commerce Dashboard', 'Modern admin dashboard for e-commerce management with real-time analytics', 'A comprehensive e-commerce admin dashboard built with Next.js and TypeScript. Features include real-time sales analytics, inventory management, order tracking, and customer management. The dashboard uses Redux for state management and Material UI for the component library.', ARRAY['Next.js', 'TypeScript', 'Redux', 'Material UI', 'Chart.js'], '/placeholder.svg?height=400&width=600', 'https://example.com', 'https://github.com/example', true),
('Task Management App', 'Collaborative task management application with team features', 'A full-featured task management application similar to Trello, built with React and TypeScript. Includes drag-and-drop functionality, team collaboration, real-time updates, and project organization. Uses Zustand for state management and Tailwind CSS for styling.', ARRAY['React.js', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Framer Motion'], '/placeholder.svg?height=400&width=600', 'https://example.com', 'https://github.com/example', true),
('Portfolio Website', 'Personal portfolio website with modern design and animations', 'A responsive portfolio website showcasing projects and skills. Built with Next.js and features smooth animations, dark/light mode toggle, and optimized performance. Uses Tailwind CSS for styling and Framer Motion for animations.', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], '/placeholder.svg?height=400&width=600', 'https://example.com', 'https://github.com/example', false);

-- Insert sample collaborations
INSERT INTO collaborations (company_name, role, description, duration, technologies, image_url, website_url) VALUES
('TechStart Inc.', 'Frontend Developer', 'Developed responsive web applications and improved user experience for their main product. Collaborated with design team to implement pixel-perfect UI components.', '6 months', ARRAY['React.js', 'TypeScript', 'Styled Components'], '/placeholder.svg?height=200&width=300', 'https://techstart.com'),
('Digital Agency Pro', 'React Developer', 'Built multiple client websites and web applications. Focused on performance optimization and SEO improvements. Worked in an agile environment with cross-functional teams.', '4 months', ARRAY['Next.js', 'Tailwind CSS', 'Redux'], '/placeholder.svg?height=200&width=300', 'https://digitalagency.com');

-- Enable RLS on tables that need it (project_comments, contact_messages, project_submissions don't need RLS as they're public)
-- Projects, skills, and collaborations are managed by admin, so no RLS needed for now

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_comments_project_id ON project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_submissions_created_at ON project_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
