export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  summary: string;
  validation_score: number;
  market_size?: string;
  competitors?: string[];
  risks?: string[];
  opportunities?: string[];
}

export interface BusinessCanvas {
  value_propositions: string[];
  customer_segments: string[];
  channels: string[];
  customer_relationships: string[];
  revenue_streams: string[];
  key_resources: string[];
  key_activities: string[];
  key_partnerships: string[];
  cost_structure: string[];
}

export interface Persona {
  name: string;
  age: number;
  job_title: string;
  goals: string[];
  pain_points: string[];
  motivations: string[];
  preferred_channels: string[];
  objection_icons: string[];
  budget_range?: string;
}

export interface Phase {
  phase: string;
  duration: string;
  tasks: string[];
  milestones: string[];
}

export interface Roadmap {
  phases: Phase[];
}

export interface Slide {
  title: string;
  content: string;
  bullets: string[];
}

export interface InvestorDeck {
  slides: Slide[];
}

export interface Project {
  id: string;
  user_id: string;
  idea: string;
  analysis?: Analysis;
  business_canvas?: BusinessCanvas;
  buyer_persona?: Persona;
  roadmap?: Roadmap;
  investor_deck?: InvestorDeck;
  status: 'pending' | 'analyzed' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface AnalyzeRequest {
  idea: string;
}

export interface CanvasRequest {
  projectId: string;
  idea: string;
  analysis?: Analysis;
}

export interface PersonaRequest {
  projectId: string;
  idea: string;
  analysis?: Analysis;
}

export interface RoadmapRequest {
  projectId: string;
  idea: string;
  analysis?: Analysis;
}

export interface DeckRequest {
  projectId: string;
  idea: string;
  analysis?: Analysis;
  canvas?: BusinessCanvas;
  persona?: Persona;
  roadmap?: Roadmap;
}
