# Interview Challenges

This directory contains your interview challenge files. When you receive interview materials from your interviewer, they'll automatically be discovered and loaded by Codeflow.

## 🚀 Quick Start

1. **Receive interview materials** from your interviewer (usually a zip file)
2. **Extract the folder** into this directory: `src/interviews/`
3. **Restart the development server** (`Ctrl+C` then `npm start`)
4. **Done!** Your interview challenge appears automatically in the main interface

**✨ Zero Configuration Required ✨**
- No files to edit
- No imports to add  
- No configuration to update
- Just drop and restart!

## 📁 What's in Your Interview Files

Your interview challenge will typically include:

```
your-challenge-name/
├── index.ts              # Challenge configuration
├── YourComponent.tsx     # Where you'll implement your solution
├── styles.css           # Styling for your component
├── mockData.ts          # Sample data (if needed)
└── any-other-files...    # Additional resources
```

## 🔧 How It Works

Codeflow automatically detects and loads your interview challenge:

- **Automatic Discovery** - No manual configuration needed
- **Instant Loading** - Challenges appear immediately after restart
- **Self-Contained** - Each challenge includes everything you need
- **Professional Interface** - Clean UI with built-in instructions

## 🎯 Your Workflow

1. **Extract** your interview files to this directory
2. **Restart** the development server
3. **Click** on your challenge in the main interface
4. **Read** the instructions carefully
5. **Implement** your solution in the provided React component
6. **Test** your work as you build

## 💡 Tips

- **Take your time** to understand the requirements
- **Ask questions** if anything is unclear
- **Focus on code quality** and user experience
- **Test thoroughly** before considering yourself done

The system handles all the technical setup automatically - just focus on building great code!




# Creating CodeFlow Interview Questions

Every interview pattern must export a `pattern` object in its `index.ts` file that implements the `InterviewPattern` interface:

```typescript
import {InterviewPattern} from '../types';
import YourComponent from './src/YourComponent';

export const pattern: InterviewPattern = {
  id: 'your-pattern-id',                    // Unique identifier
  name: 'Your Pattern Name',                // Display name in UI
  description: 'Brief pattern description', // Shown on pattern card
  version: '1.0.0',                        // Pattern version
  author: 'Your Name',                     // Pattern author
  estimatedTime: '30 minutes',             // Expected completion time
  tags: ['React', 'TypeScript', 'API'],    // Technology/skill tags
  type: 'react',                           // Pattern type (optional)
  component: YourComponent,                 // Main React component
  readmes: [                               // Instruction tabs (optional)
    {
      title: 'Getting Started',
      content: 'Your markdown instructions...'
    },
    {
      title: 'Part 1: Requirements', 
      content: 'More detailed instructions...'
    }
  ]
};
```

### Pattern Types

- **`react`** (default): Interactive React component challenges
- **`coding-challenge`**: Algorithm or logic problems  
- **`code-review`**: Code analysis and review exercises

### Required Pattern Structure

```
your-pattern/
├── index.ts              # Pattern definition (required)
├── src/
│   └── YourComponent.tsx # Main implementation file
├── styles.css           # Component styling (optional)
└── mockData.ts          # Sample data (optional)
```

### Field Descriptions

- **`id`**: Unique identifier used for routing and pattern discovery
- **`name`**: Display name shown in the pattern selection interface
- **`description`**: Brief description displayed on pattern cards
- **`version`**: Pattern version for tracking updates and compatibility
- **`author`**: Pattern creator information
- **`estimatedTime`**: Expected completion duration (helps set expectations)
- **`tags`**: Array of technology/skill tags for categorization and filtering
- **`type`**: Pattern type - defaults to 'react' if not specified
- **`component`**: Reference to the main React component candidates will work on
- **`readmes`**: Array of instruction tabs with markdown content for guidance