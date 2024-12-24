export interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

export interface StepCardProps {
  step: Step;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}
