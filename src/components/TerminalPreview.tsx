import React, { useState } from 'react';
import { TerminalCommand, TerminalWorkspace } from '@/interviews/types';
import './TerminalPreview.css';

interface TerminalPreviewProps {
  workspace: TerminalWorkspace;
}

interface CommandLineProps {
  command: string;
  caption?: string;
}

const CommandLine: React.FC<CommandLineProps> = ({ command, caption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="terminal-preview-line">
      <div className="terminal-preview-command">
        <span className="terminal-preview-prompt">$</span>
        <span>{command}</span>
        <button className="terminal-preview-copy" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {caption && <p className="terminal-preview-caption">{caption}</p>}
    </div>
  );
};

const TerminalPreview: React.FC<TerminalPreviewProps> = ({ workspace }) => {
  const getCommandDetails = (command: TerminalCommand): { value: string; caption?: string } =>
    typeof command === 'string' ? { value: command } : command;

  return (
    <div className="terminal-preview">
      <div className="terminal-preview-window">
        <div className="terminal-preview-titlebar">
          <span className="terminal-preview-dot dot-red" />
          <span className="terminal-preview-dot dot-yellow" />
          <span className="terminal-preview-dot dot-green" />
          <span className="terminal-preview-titletext">terminal — your interview directory</span>
        </div>
        <div className="terminal-preview-body">
          {workspace.commands.map((command, index) => {
            const { value, caption } = getCommandDetails(command);

            return (
              <CommandLine
                key={`${value}-${index}`}
                command={value}
                caption={caption}
              />
            );
          })}
        </div>
      </div>
      <p className="terminal-preview-footnote">
        Run these from your own terminal, in the interview directory you unzipped — this panel is just a reference, not a live shell.
      </p>
    </div>
  );
};

export default TerminalPreview;
