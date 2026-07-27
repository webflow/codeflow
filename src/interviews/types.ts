export interface ReadmeFile {
  title: string;
  content: string;
}

export interface ImplementationDetails {
  steps: string[];
  tips: string[];
  testCases?: string;
}

export interface ApiRequest {
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
}

export interface ApiRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  handler: (req: ApiRequest) => Promise<unknown>;
}

// A practice terminal that runs REAL shell commands in the REAL starter directory a
// candidate already unzipped into src/interviews/<pattern.id>/ — CodeFlow never embeds
// file content or picks a language runtime; it just shells out to whatever the problem
// declares here, the same as if the candidate opened a real terminal themselves.
export interface TerminalWorkspace {
  // Shell command that runs the candidate's solution, e.g. "./run.sh". Every language
  // starter is expected to ship a run.sh wrapping its own toolchain so this stays generic.
  runCommand: string;
  // Shell command that runs a small, intentionally-incomplete sample of the checks the
  // solution will be judged against (not the full grading suite), e.g. "./test.sh".
  testCommand?: string;
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
  routes?: ApiRoute[];
  terminalWorkspace?: TerminalWorkspace;
}

export interface InterviewConfig {
  patterns: InterviewPattern[];
}
