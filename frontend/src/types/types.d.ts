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

export interface AuthData {
  token: string | null;
  userId: number | null;
  role: string | null;
}

export interface Community {
  id: number;
  name: string;
  image: string;
  summary: string;
  members: {
    id: number;
    name: string;
    role: string;
    avatar: string;
  }[];
  messages: {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: string;
    isImage: boolean;
  }[];
}

export interface Message {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isImage: boolean;
}
