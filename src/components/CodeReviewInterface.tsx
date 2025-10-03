import React from 'react';
import { InterviewPattern } from '../interviews/types';
import './CodeReviewInterface.css';

interface CodeReviewInterfaceProps {
  pattern: InterviewPattern;
}

const CodeReviewInterface: React.FC<CodeReviewInterfaceProps> = ({ pattern }) => {
  return (
    <div className="code-review-interface">
      <div className="welcome-section">
        <div className="welcome-header">
          <h1>🔍 Live Code Review Exercise</h1>
          <p className="exercise-subtitle">{pattern.description}</p>
        </div>

        <div className="live-interview-notice">
          <div className="notice-icon">📹</div>
          <div className="notice-content">
            <h3>This is a Live Interview Exercise</h3>
            <p>
              <strong>Share your screen</strong> with the interviewer and open the files below in your preferred IDE.
              Walk through the code systematically and discuss your findings out loud.
            </p>
          </div>
        </div>
      </div>

      <div className="file-explorer">
        <h3>📁 Files to Review</h3>
        <p className="file-explorer-hint">Open these files in your IDE to begin the code review:</p>

        <div className="file-tree">
          <div className="file-item">
            <span className="file-icon">📄</span>
            <code>src/index.jsx</code>
            <span className="file-description">Application entry point</span>
          </div>
          <div className="file-item">
            <span className="file-icon">📄</span>
            <code>src/App.jsx</code>
            <span className="file-description">Main application component</span>
          </div>
          <div className="file-item">
            <span className="file-icon">📄</span>
            <code>src/SearchInputComponent.jsx</code>
            <span className="file-description">Search form inputs</span>
          </div>
          <div className="file-item">
            <span className="file-icon">📄</span>
            <code>src/SearchResultsComponent.jsx</code>
            <span className="file-description">Results display and API integration</span>
          </div>
          <div className="file-item">
            <span className="file-icon">⚙️</span>
            <code>package.json</code>
            <span className="file-description">Project dependencies and configuration</span>
          </div>
        </div>
      </div>

      <div className="review-guidance">
        <h3>🎯 Review Focus Areas</h3>
        <div className="focus-grid">
          <div className="focus-item bugs">
            <h4>🐛 Bugs & Errors</h4>
            <p>Look for syntax errors, logic flaws, and runtime issues</p>
          </div>
          <div className="focus-item security">
            <h4>🔒 Security Issues</h4>
            <p>Check for exposed data, input validation, and vulnerabilities</p>
          </div>
          <div className="focus-item performance">
            <h4>⚡ Performance</h4>
            <p>Identify unnecessary calls, memory leaks, and optimization opportunities</p>
          </div>
          <div className="focus-item ux">
            <h4>🎨 UX & Accessibility</h4>
            <p>Consider loading states, error handling, and user experience</p>
          </div>
        </div>
      </div>

      <div className="interview-tips">
        <h3>💡 Interview Tips</h3>
        <ul>
          <li><strong>Think out loud</strong> - Explain your reasoning as you review</li>
          <li><strong>Ask questions</strong> - Clarify anything that seems unclear</li>
          <li><strong>Be systematic</strong> - Go through files methodically</li>
          <li><strong>Prioritize issues</strong> - Distinguish critical bugs from nice-to-have improvements</li>
          <li><strong>Suggest solutions</strong> - Don't just identify problems, propose fixes</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeReviewInterface;
