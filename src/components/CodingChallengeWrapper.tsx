import React, { useState } from 'react';
import { InterviewPattern } from '../interviews/types';
import Instructions from './Instructions';
import TerminalPreview from './TerminalPreview';
import './CodingChallengeWrapper.css';

interface CodingChallengeWrapperProps {
  pattern: InterviewPattern;
}

const CodingChallengeWrapper: React.FC<CodingChallengeWrapperProps> = ({ pattern }) => {
  const hasTerminal = Boolean(pattern.terminalWorkspace);
  // The left sidebar already shows the full readmes permanently, so patterns with a
  // terminal skip this internal duplicate and go straight to the terminal.
  const [showInstructions, setShowInstructions] = useState(!hasTerminal);
  const [hasViewedInstructions, setHasViewedInstructions] = useState(false);

  const handleInstructionsClose = () => {
    setShowInstructions(false);
    setHasViewedInstructions(true);
  };

  const copyTestCases = () => {
    if (pattern.implementationDetails?.testCases) {
      navigator.clipboard.writeText(pattern.implementationDetails.testCases);
    }
  };

  return (
    <div className="coding-challenge-wrapper">
      {showInstructions && pattern.readmes ? (
        <Instructions
          readmes={pattern.readmes}
          onClose={handleInstructionsClose}
          interviewId={pattern.id}
        />
      ) : hasTerminal ? (
        <div className="challenge-content">
          <div className="challenge-tabs">
            <span className="challenge-tab-hint">
              Write your solution in your own editor, then run these from your own terminal to check it.
            </span>
          </div>
          <div className="problem-container terminal-container">
            <TerminalPreview workspace={pattern.terminalWorkspace!} />
          </div>
        </div>
      ) : (
        <div className="challenge-content">
          <div className="problem-container">
            <div className="problem-header">
              <h2>Implementation Details</h2>
              <div className="header-actions">
                <button
                  className="btn btn-primary btn-sm copy-button"
                  onClick={copyTestCases}
                >
                  Copy Test Cases
                </button>
                <button
                  className="btn btn-primary btn-md instructions-button"
                  onClick={() => setShowInstructions(true)}
                >
                  View Full Problem
                </button>
              </div>
            </div>
            <div className="problem-content">
              <div className="process-focus">
                <div className="emphasis-banner">
                  <h3>🎯 Interview Focus</h3>
                  <p><strong>Quality over Speed:</strong> Demonstrate your problem-solving approach, code organization, and thoughtful use of tools. It's better to implement fewer features well than to rush through everything.</p>
                </div>

                <div className="implementation-steps">
                  <h3>Quick Start</h3>
                  <ol>
                    {pattern.implementationDetails?.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="tips">
                  <h3>Implementation Tips</h3>
                  <ul>
                    {pattern.implementationDetails?.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingChallengeWrapper;
