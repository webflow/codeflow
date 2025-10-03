import React from 'react';
import { useState, useEffect } from 'react';
import { InterviewPattern } from '../interviews/types';

// Add type definition for webpack's require.context
declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (path: string): any;
  };
};

// Use webpack's require.context to get all pattern directories
const patternContext = require.context('../interviews', true, /index\.ts$/);

export const useInterviewPatterns = () => {
  const [patterns, setPatterns] = useState<InterviewPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatterns = async () => {
      try {
        setLoading(true);
        setError(null);

        const discoveredPatterns: InterviewPattern[] = [];

        // Get all pattern paths from the context
        const patternPaths = patternContext.keys();

        // Try to import each pattern
        const importPromises = patternPaths.map(async (path: string) => {
          try {
            const module = patternContext(path);

            if (module.pattern && typeof module.pattern === 'object') {
              return module.pattern as InterviewPattern;
            } else {
              return null;
            }
          } catch (error) {
            return null;
          }
        });

        // Wait for all import attempts to complete
        const results = await Promise.all(importPromises);

        // Filter out null results and add valid patterns
        results.forEach((pattern: InterviewPattern | null) => {
          if (pattern) {
            discoveredPatterns.push(pattern);
          }
        });

        setPatterns(discoveredPatterns);
      } catch (err) {
        console.error('Error loading patterns:', err);
        setError(err instanceof Error ? err.message : 'Failed to load interview patterns');
      } finally {
        setLoading(false);
      }
    };

    loadPatterns();
  }, []);

  return { patterns, loading, error };
};
