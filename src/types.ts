/**
 * Types and interfaces for Soham Sawant's Portfolio
 */

export interface Skill {
  name: string;
  category: string;
  proficiency: number; // percentage (e.g., 85)
  icon: string;       // Lucide icon name
  description: string;
  color: string;      // Tailwind text/bg color class identifier
}

export interface RoadmapItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  details: string[];
  isActive: boolean;
}

export interface Hobby {
  title: string;
  icon: string;
  description: string;
  badge: string;
  gradient: string;
}
