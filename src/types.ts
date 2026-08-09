export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  keyFeatures?: string[];
  impactMetric?: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    iconName?: string;
    description?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  details?: string;
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  tiktok?: string;
  snapchat?: string;
  location: string;
  website?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl: string;
  statusText: string;
  isAvailableForHire: boolean;
  socials: SocialLinks;
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}
