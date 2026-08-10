export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  technologies: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon_name: string | null;
  created_at: string;
}

export interface Experience {
  id: string;
  company_name: string;
  role: string;
  description: string;
  duration: string | null;
  technologies: string[];
  image_url: string | null;
  website_url: string | null;
  location: string | null;
  created_at: string;
}
