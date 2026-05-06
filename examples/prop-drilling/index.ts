import type { InterviewPattern } from "@/interviews/types";
import PropDrillingChallenge from "./PropDrillingChallenge";

export const pattern: InterviewPattern = {
  id: "prop-drilling-refactor",
  name: "Context API Refactor",
  description: "Refactor a prop-drilling architecture to use React Context.",
  version: "1.0.0",
  author: "Codeflow",
  estimatedTime: "15-20 minutes",
  tags: ["react", "context-api", "refactoring"],
  type: "react",
  component: PropDrillingChallenge,
  readmes: [
    {
      title: "Instructions",
      content: `
# Prop Drilling Refactor

## Objective
The provided component structure suffers from "prop drilling". State \`user\` and \`theme\` are passed down through multiple intermediate components that don't need them.

Your task is to refactor this code to use the **React Context API** to manage global state.

## Requirements
1. Create a \`UserContext\` and a \`ThemeContext\` (or a single combined \`AppContext\`).
2. Provide the state at the top level of the challenge component.
3. Consume the context in the components that actually need the data (e.g., \`UserInfo\`, \`ThemeToggle\`, \`Content\`).
4. Remove all unnecessary props from intermediate components like \`Header\`, \`MainLayout\`, and \`Sidebar\`.

## Bonus
* Implement custom hooks for consuming your contexts (e.g., \`useTheme\` or \`useUser\`).
      `.trim(),
    },
  ],
};
