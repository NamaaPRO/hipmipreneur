import { type Analysis, type BusinessCanvas, type Persona, type Roadmap, type InvestorDeck } from '@/types';

export function formatAnalysisForDisplay(analysis: Analysis): string {
  return `## AI Analysis

**Summary:** ${analysis.summary}

**Validation Score:** ${analysis.validation_score}/100

${analysis.market_size ? `**Market Size:** ${analysis.market_size}` : ''}

${analysis.competitors?.length ? `**Competitors:**\n${analysis.competitors.map(c => `- ${c}`).join('\n')}` : ''}

${analysis.risks?.length ? `**Risks:**\n${analysis.risks.map(r => `- ${r}`).join('\n')}` : ''}

${analysis.opportunities?.length ? `**Opportunities:**\n${analysis.opportunities.map(o => `- ${o}`).join('\n')}` : ''}`;
}

export function formatCanvasForDisplay(canvas: BusinessCanvas): string {
  let output = '## Business Model Canvas\n\n';
  
  const sections = [
    { title: 'Value Propositions', data: canvas.value_propositions },
    { title: 'Customer Segments', data: canvas.customer_segments },
    { title: 'Channels', data: canvas.channels },
    { title: 'Customer Relationships', data: canvas.customer_relationships },
    { title: 'Revenue Streams', data: canvas.revenue_streams },
    { title: 'Key Resources', data: canvas.key_resources },
    { title: 'Key Activities', data: canvas.key_activities },
    { title: 'Key Partnerships', data: canvas.key_partnerships },
    { title: 'Cost Structure', data: canvas.cost_structure },
  ];
  
  sections.forEach(({ title, data }) => {
    if (data?.length) {
      output += `### ${title}\n${data.map(d => `- ${d}`).join('\n')}\n\n`;
    }
  });
  
  return output;
}

export function formatPersonaForDisplay(persona: Persona): string {
  return `## Buyer Persona: ${persona.name}

**Age:** ${persona.age}
**Job Title:** ${persona.job_title}

### Goals
${persona.goals.map(g => `- ${g}`).join('\n')}

### Pain Points
${persona.pain_points.map(p => `- ${p}`).join('\n')}

### Motivations
${persona.motivations.map(m => `- ${m}`).join('\n')}

### Preferred Channels
${persona.preferred_channels.map(c => `- ${c}`).join('\n')}

${persona.budget_range ? `### Budget Range\n${persona.budget_range}` : ''}`;
}

export function formatRoadmapForDisplay(roadmap: Roadmap): string {
  let output = '## Execution Roadmap\n\n';
  
  roadmap.phases.forEach(phase => {
    output += `### ${phase.phase} (${phase.duration})\n`;
    output += `**Tasks:**\n${phase.tasks.map(t => `- ${t}`).join('\n')}\n\n`;
    output += `**Milestones:**\n${phase.milestones.map(m => `- ${m}`).join('\n')}\n\n`;
  });
  
  return output;
}

export function formatDeckForDisplay(deck: InvestorDeck): string {
  let output = '';
  
  deck.slides.forEach((slide, i) => {
    output += `## Slide ${i + 1}: ${slide.title}\n\n`;
    output += `${slide.content}\n\n`;
    output += `${slide.bullets.map(b => `- ${b}`).join('\n')}\n\n`;
  });
  
  return output;
}
