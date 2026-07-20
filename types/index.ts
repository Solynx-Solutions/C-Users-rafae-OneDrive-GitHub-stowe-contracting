// =============================================================================
// GLOBAL TYPESCRIPT TYPES & INTERFACES
// Define all shared data structures here. Import via @/types
// =============================================================================

// ── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

// ── Services ──────────────────────────────────────────────────────────────────

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  relatedServices?: string[]; // Array of slugs
}

// ── Projects ──────────────────────────────────────────────────────────────────

export interface ProjectItem {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  description: string;
  services: string[]; // Array of service slugs
  images: ProjectImage[];
  completedAt?: string; // ISO date string
  featured?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface TestimonialItem {
  id: string;
  author: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  date?: string; // ISO date string
  verified?: boolean;
  platform?: 'google' | 'yelp' | 'houzz' | 'facebook' | 'direct';
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// ── Blog / Content ────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date string
  modifiedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  readingTimeMinutes?: number;
}

// ── Forms ─────────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceInterest?: string;
}

export interface EstimateFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  serviceType: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;
}

// ── API Responses ─────────────────────────────────────────────────────────────

export interface ApiResponse<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ── Component Utilities ───────────────────────────────────────────────────────

/** Standard className prop interface */
export interface WithClassName {
  className?: string;
}

/** Standard children prop interface */
export interface WithChildren {
  children: React.ReactNode;
}
