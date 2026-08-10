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

export interface EditItem {
  id: string;
  title: string;
  type: 'video' | 'design' | 'reel' | 'motion';
  categoryLabel: string;
  description: string;
  thumbnailUrl: string;
  mediaUrl?: string; // Video URL (YouTube embed/watch link, Vimeo, MP4, TikTok/IG, or image)
  softwareUsed: string[];
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
  duration?: string;
  date?: string;
  featured?: boolean;
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
  edits?: EditItem[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}
