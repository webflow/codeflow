# Codeflow

A specialized coding interview environment designed for structured technical assessments.

---

## 🎯 For Interview Candidates

If you've received this link for a technical interview, follow these steps to set up your environment:

### Quick Setup (<5 minutes)

1. **Prerequisites**
   - Node.js (v14 or higher) - [Download here](https://nodejs.org/)
   - npm (v6 or higher) - comes with Node.js

2. **Installation**
   ```bash
   # Clone or extract the project to your local machine
   # Open a terminal in the project directory

   # Install dependencies (this may take a minute)
   npm install

   # Start the development server
   npm start
   ```

3. **Access the Interview Environment**
   - Once started, open your browser to: **`http://localhost:8080`**
   - You should see the Codeflow interface ready for your interview

### During Your Interview

Your interviewer will provide you with a `.zip` file containing the coding challenge:

1. **Extract** the pattern's `.zip` file to your computer
2. **Drag and drop** the extracted folder into the `src/interviews` directory
3. The challenge will **automatically appear** in the interface
4. **Click on the pattern** to begin coding

**Good luck with your interview!** 🚀

---

## 👥 For Contributors & everyone else

Welcome to Codeflow! This is an open-source shell for conducting structured technical interviews where candidates can code in their own environemnt, and use the AI tools they prefer. 

### What is Codeflow?

Codeflow is a React-based interview platform that provides:
- A clean, distraction-free coding environment
- Support for multiple interview patterns and challenges
- Extensible architecture for custom interview formats

### Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **Build**: Create React App with Craco
- **Code Editor**: Monaco Editor (VSCode's editor)

### Project Structure

```
codeflow/
├── src/
│   ├── components/       # UI components
│   ├── interviews/      # Interview patterns & challenges
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies
```

### Getting Started

```bash
# Clone the repository
git clone git@github.com:webflow/codeflow.git
cd codeflow

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Creating Interview Patterns

Interview patterns are modular challenges that can be loaded dynamically. See `src/interviews/README.md` for pattern documentation.

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

---

## 📚 Additional Resources

- [Interview Pattern Documentation](./src/interviews/README.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [System Architecture](./INTERVIEW_SYSTEM.md)

## 🤝 Support

For issues or questions:
- **Candidates**: Contact your interviewer or recruiting team
- **Contributors**: Open an issue on GitHub or check existing discussions