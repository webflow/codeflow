import React, { useState, useEffect } from 'react';
import HUD from './components/HUD';
import InterviewShell from './components/InterviewShell';
import { InterviewPattern } from './interviews/types';
import { useInterviewPatterns } from './hooks/useInterviewPatterns';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const [currentPattern, setCurrentPattern] = useState<InterviewPattern | null>(null);
  const [pendingHashRestore, setPendingHashRestore] = useState<string | null>(null);
  const { patterns, loading } = useInterviewPatterns();

  // Handle URL hash for persistence
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      
      if (!hash) {
        setCurrentPattern(null);
        setPendingHashRestore(null);
        return;
      }

      // If patterns are loaded, try to find and set the pattern
      if (!loading && patterns.length > 0) {
        const pattern = patterns.find(p => p.id === hash);
        if (pattern) {
          setCurrentPattern(pattern);
          setPendingHashRestore(null);
        } else {
          // Hash exists but pattern not found - might be invalid
          console.warn(`Pattern with id "${hash}" not found`);
          setPendingHashRestore(null);
        }
      } else {
        // Patterns still loading - store hash for later restoration
        setPendingHashRestore(hash);
      }
    };

    // Check initial hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [patterns, loading]);

  // Restore pending hash when patterns finish loading
  useEffect(() => {
    if (!loading && patterns.length > 0 && pendingHashRestore) {
      const pattern = patterns.find(p => p.id === pendingHashRestore);
      if (pattern) {
        setCurrentPattern(pattern);
      }
      setPendingHashRestore(null);
    }
  }, [loading, patterns, pendingHashRestore]);

  const handleLaunchPattern = (pattern: InterviewPattern) => {
    setCurrentPattern(pattern);
    window.location.hash = pattern.id;
  };

  const handleBackToHUD = () => {
    setCurrentPattern(null);
    window.location.hash = '';
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="codeflow-ui-theme">
      <div className="App">
        {currentPattern ? (
          <InterviewShell
            pattern={currentPattern}
            onBack={handleBackToHUD}
          />
        ) : pendingHashRestore ? (
          <div className="loading-state" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundColor: '#292929',
            color: 'white'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner" style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e2e8f0',
                borderTop: '4px solid #4299e1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }}></div>
              <p>Restoring interview session...</p>
            </div>
          </div>
        ) : (
          <HUD onLaunchPattern={handleLaunchPattern} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
