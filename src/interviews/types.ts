export interface ReadmeFile {
  title: string;
  content: string;
}

export interface ImplementationDetails {
  steps: string[];
  tips: string[];
  testCases?: string;
}

export interface InterviewPattern {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  estimatedTime: string;
  tags: string[];
  readmes?: ReadmeFile[];
  component?: React.ComponentType;  // Optional for code-review type
  type?: 'react' | 'coding-challenge' | 'code-review';  // Added code-review type
  implementationDetails?: ImplementationDetails;
}

export interface InterviewConfig {
  patterns: InterviewPattern[];
}
