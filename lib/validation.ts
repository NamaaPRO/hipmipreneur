import { type Project, type Analysis, type BusinessCanvas, type Persona, type Roadmap, type InvestorDeck } from '@/types';

export function validateAnalysis(data: any): data is Analysis {
  return (
    typeof data?.summary === 'string' &&
    typeof data?.validation_score === 'number'
  );
}

export function validateCanvas(data: any): data is BusinessCanvas {
  return (
    Array.isArray(data?.value_propositions) &&
    Array.isArray(data?.customer_segments)
  );
}

export function validatePersona(data: any): data is Persona {
  return (
    typeof data?.name === 'string' &&
    typeof data?.age === 'number'
  );
}

export function validateRoadmap(data: any): data is Roadmap {
  return (
    Array.isArray(data?.phases) &&
    data?.phases?.every((p: any) => typeof p.phase === 'string')
  );
}

export function validateDeck(data: any): data is InvestorDeck {
  return (
    Array.isArray(data?.slides) &&
    data?.slides?.every((s: any) => typeof s.title === 'string')
  );
}

export function validateProject(data: any): data is Project {
  return (
    typeof data?.id === 'string' &&
    typeof data?.idea === 'string' &&
    typeof data?.user_id === 'string'
  );
}
