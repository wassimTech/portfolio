export type Locale = "fr" | "en";

export interface LocalizedString {
  fr: string;
  en: string;
  ar?: string;
}

export interface LocalizedArray {
  fr: string[];
  en: string[];
  ar?: string[];
}

export interface ProjectTestimonial {
  author: string;
  role: LocalizedString;
  quote: LocalizedString;
  url: string;
  platform?: "linkedin" | "twitter" | "web";
}

export interface Project {
  id: string;
  title: string;
  role: LocalizedString;
  period: string;
  description: LocalizedString;
  tasks: LocalizedArray;
  technologies: string[];
  team: string;
  category: "fullstack" | "mobile" | "frontend";
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
  isConfidential?: boolean;
  confidentialityNotice?: LocalizedString;
  availabilityNotice?: LocalizedString;
  testimonial?: ProjectTestimonial;
}

export interface Experience {
  id: string;
  company: string;
  role: LocalizedString;
  period: string;
  description?: LocalizedString;
  projects?: Project[];
  tasks?: LocalizedArray;
  technologies?: string[];
  type: "work" | "education" | "instruction";
}

export interface SkillItem {
  name: string;
  level?: number;
  icon?: string;
  experience?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: LocalizedString;
  skills: SkillItem[];
}

export interface PersonalInfo {
  name: string;
  title: LocalizedString;
  email: string;
  phone: string;
  location: LocalizedString;
  linkedin: string;
  github?: string;
  bio: LocalizedString;
  languages: { name: LocalizedString; level: LocalizedString }[];
  interests: LocalizedArray;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface ChatSuggestion {
  id: string;
  label: LocalizedString;
  query: LocalizedString;
}

export interface ChatRequestBody {
  message: string;
  locale: Locale;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface ChatResponseBody {
  response: string;
  suggestions?: string[];
}
