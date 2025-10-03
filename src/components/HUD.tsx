import React, { useState } from "react";
import { InterviewPattern } from "../interviews/types";
import { useInterviewPatterns } from "../hooks/useInterviewPatterns";
import InterviewCard from "./InterviewCard";
import "./HUD.css";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface HUDProps {
  onLaunchPattern: (pattern: InterviewPattern) => void;
}

const HUD: React.FC<HUDProps> = ({ onLaunchPattern }) => {
  const { patterns, loading, error } = useInterviewPatterns();
  const [showHelp, setShowHelp] = useState(false);

  const hasPatterns = !loading && !error && patterns.length > 0;
  const shouldShowHelp = !hasPatterns || showHelp;

  return (
    <div className="h-svh flex flex-col">
      {/* Skip Navigation Links - Accessibility feature from main */}
      <div className="skip-navigation">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {hasPatterns && <a href="#interview-patterns" className="skip-link">Skip to interview patterns</a>}
      </div>

      <header className="h-14 flex items-center justify-between px-4 border-b">
        <button
          onClick={() => window.location.reload()}
          className="w-[94px] h-[19px]"
          title="Home"
        >
          <svg
            viewBox="0 0 94 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.272 18.24C5.152 18.24 4.168 18.032 3.32 17.616C2.488 17.184 1.84 16.584 1.376 15.816C0.912 15.032 0.68 14.112 0.68 13.056L0.68 9.744C0.68 8.672 0.912 7.752 1.376 6.984C1.84 6.216 2.488 5.624 3.32 5.208C4.168 4.776 5.152 4.56 6.272 4.56C7.936 4.56 9.264 4.992 10.256 5.856C11.248 6.704 11.768 7.864 11.816 9.336H8.816C8.768 8.648 8.52 8.12 8.072 7.752C7.64 7.368 7.04 7.176 6.272 7.176C5.472 7.176 4.84 7.4 4.376 7.848C3.912 8.28 3.68 8.904 3.68 9.72L3.68 13.056C3.68 13.872 3.912 14.504 4.376 14.952C4.84 15.4 5.472 15.624 6.272 15.624C7.04 15.624 7.64 15.44 8.072 15.072C8.52 14.688 8.768 14.152 8.816 13.464H11.816C11.768 14.936 11.248 16.104 10.256 16.968C9.264 17.816 7.936 18.24 6.272 18.24ZM18.6706 18.216C17.5506 18.216 16.5746 18.008 15.7426 17.592C14.9266 17.16 14.2866 16.56 13.8226 15.792C13.3746 15.008 13.1506 14.088 13.1506 13.032V9.768C13.1506 8.712 13.3746 7.8 13.8226 7.032C14.2866 6.248 14.9266 5.648 15.7426 5.232C16.5746 4.8 17.5506 4.584 18.6706 4.584C19.8066 4.584 20.7826 4.8 21.5986 5.232C22.4146 5.648 23.0466 6.248 23.4946 7.032C23.9586 7.8 24.1906 8.704 24.1906 9.744V13.032C24.1906 14.088 23.9586 15.008 23.4946 15.792C23.0466 16.56 22.4146 17.16 21.5986 17.592C20.7826 18.008 19.8066 18.216 18.6706 18.216ZM18.6706 15.6C19.4706 15.6 20.0866 15.384 20.5186 14.952C20.9666 14.504 21.1906 13.864 21.1906 13.032V9.768C21.1906 8.92 20.9666 8.28 20.5186 7.848C20.0866 7.416 19.4706 7.2 18.6706 7.2C17.8866 7.2 17.2706 7.416 16.8226 7.848C16.3746 8.28 16.1506 8.92 16.1506 9.768V13.032C16.1506 13.864 16.3746 14.504 16.8226 14.952C17.2706 15.384 17.8866 15.6 18.6706 15.6ZM30.0133 18.24C28.7013 18.24 27.6372 17.784 26.8212 16.872C26.0212 15.96 25.6212 14.736 25.6212 13.2V9.624C25.6212 8.072 26.0212 6.84 26.8212 5.928C27.6212 5.016 28.6853 4.56 30.0133 4.56C31.1013 4.56 31.9653 4.872 32.6053 5.496C33.2453 6.104 33.5653 6.944 33.5653 8.016L32.8933 7.32H33.5893L33.4933 4.176V0.48L36.4932 0.48V18H33.5653V15.48H32.8933L33.5653 14.784C33.5653 15.856 33.2453 16.704 32.6053 17.328C31.9653 17.936 31.1013 18.24 30.0133 18.24ZM31.0693 15.648C31.8373 15.648 32.4293 15.424 32.8453 14.976C33.2773 14.512 33.4933 13.872 33.4933 13.056V9.744C33.4933 8.928 33.2773 8.296 32.8453 7.848C32.4293 7.384 31.8373 7.152 31.0693 7.152C30.3013 7.152 29.7013 7.376 29.2693 7.824C28.8373 8.272 28.6213 8.912 28.6213 9.744V13.056C28.6213 13.888 28.8373 14.528 29.2693 14.976C29.7013 15.424 30.3013 15.648 31.0693 15.648ZM43.6359 18.24C42.5159 18.24 41.5399 18.024 40.7079 17.592C39.8759 17.16 39.2279 16.56 38.7639 15.792C38.3159 15.008 38.0919 14.096 38.0919 13.056V9.744C38.0919 8.704 38.3159 7.8 38.7639 7.032C39.2279 6.248 39.8759 5.64 40.7079 5.208C41.5399 4.776 42.5159 4.56 43.6359 4.56C44.7399 4.56 45.6999 4.776 46.5159 5.208C47.3479 5.64 47.9879 6.248 48.4359 7.032C48.8999 7.8 49.1319 8.704 49.1319 9.744V12.12L40.9959 12.12V13.056C40.9959 13.984 41.2199 14.688 41.6679 15.168C42.1159 15.632 42.7799 15.864 43.6599 15.864C44.3319 15.864 44.8759 15.752 45.2919 15.528C45.7079 15.288 45.9719 14.944 46.0839 14.496H49.0359C48.8119 15.632 48.2039 16.544 47.2119 17.232C46.2359 17.904 45.0439 18.24 43.6359 18.24ZM46.2279 10.44V9.72C46.2279 8.808 46.0119 8.112 45.5799 7.632C45.1479 7.136 44.4999 6.888 43.6359 6.888C42.7719 6.888 42.1159 7.136 41.6679 7.632C41.2199 8.128 40.9959 8.832 40.9959 9.744V10.248L46.4439 10.2L46.2279 10.44ZM53.1785 7.392H51.0665L51.4265 5.592L53.5385 5.592C53.6985 4.968 53.8425 4.36 53.9705 3.768C54.1145 3.176 54.3145 2.656 54.5705 2.208C54.8265 1.744 55.1785 1.376 55.6265 1.104C56.0905 0.815999 56.7305 0.671999 57.5465 0.671999C57.8345 0.671999 58.1225 0.687999 58.4105 0.719999C58.6985 0.735999 58.9785 0.783999 59.2505 0.863999L58.9145 2.592C58.7385 2.56 58.5705 2.536 58.4105 2.52C58.2505 2.488 58.0985 2.472 57.9545 2.472C57.4585 2.472 57.0745 2.568 56.8025 2.76C56.5305 2.936 56.3145 3.176 56.1545 3.48C56.0105 3.768 55.8985 4.096 55.8185 4.464C55.7545 4.832 55.6665 5.208 55.5545 5.592L57.9305 5.592L57.5945 7.392H55.1945L52.9145 18H50.8745L53.1785 7.392ZM61.3841 0.863999H63.4241L59.8241 18H57.8081L61.3841 0.863999ZM62.6724 13.104C62.6724 12.096 62.8244 11.12 63.1284 10.176C63.4484 9.232 63.9044 8.4 64.4964 7.68C65.1044 6.96 65.8324 6.384 66.6804 5.952C67.5444 5.52 68.5204 5.304 69.6084 5.304C71.2884 5.304 72.5684 5.744 73.4484 6.624C74.3284 7.488 74.7684 8.76 74.7684 10.44C74.7684 11.448 74.6164 12.424 74.3124 13.368C74.0084 14.312 73.5604 15.152 72.9684 15.888C72.3764 16.608 71.6564 17.184 70.8084 17.616C69.9604 18.048 68.9924 18.264 67.9044 18.264C67.0884 18.264 66.3524 18.136 65.6964 17.88C65.0564 17.624 64.5124 17.272 64.0644 16.824C63.6164 16.36 63.2724 15.816 63.0324 15.192C62.7924 14.552 62.6724 13.856 62.6724 13.104ZM64.7124 13.08C64.7124 14.104 65.0004 14.928 65.5764 15.552C66.1524 16.176 67.0004 16.488 68.1204 16.488C68.8724 16.488 69.5284 16.296 70.0884 15.912C70.6644 15.528 71.1444 15.048 71.5284 14.472C71.9284 13.88 72.2244 13.24 72.4164 12.552C72.6244 11.864 72.7284 11.216 72.7284 10.608C72.7284 10.128 72.6644 9.672 72.5364 9.24C72.4084 8.808 72.2084 8.44 71.9364 8.136C71.6644 7.816 71.3204 7.568 70.9044 7.392C70.5044 7.2 70.0244 7.104 69.4644 7.104C68.6804 7.104 67.9924 7.296 67.4004 7.68C66.8084 8.064 66.3124 8.552 65.9124 9.144C65.5124 9.72 65.2084 10.36 65.0004 11.064C64.8084 11.768 64.7124 12.44 64.7124 13.08ZM86.9656 18H84.8056L84.1816 8.352H84.1336L79.6936 18H77.5336L76.0696 5.592H78.2296L78.9976 15.456H79.0456L83.5096 5.592L85.8136 5.592L86.4136 15.456H86.4616L91.1656 5.592H93.3736L86.9656 18Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="flex items-center gap-4">
          {hasPatterns && (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Ready</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Interview challenges are loaded and ready to launch
                </TooltipContent>
              </Tooltip>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col">
        <main className="flex-1 py-20 bg-accent" id="main-content">
          <div className="flex flex-col gap-24 max-w-7xl mx-auto">
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-8 max-w-3xl">
                <h1 className="text-5xl font-bold">
                  Welcome to your interview session!
                </h1>
                <div className="flex flex-col gap-4">
                  <p className="text-lg text-muted-foreground">
                    Your interview will begin shortly. Below we've outlined high
                    level an overview of what happens during your interview and
                    some pro tips to help you succeed.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Once you're ready, go to the Challenges section below and
                    select a challenge to begin your interview.
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <Card className="flex-1">
                  <CardHeader>
                    <h3 className="text-xl font-bold">
                      What happens during your interview
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <ol>
                      <li>
                        <strong>Receive Interview Materials:</strong> Your
                        interviewer will provide you with a zip file containing
                        the interview challenge.
                      </li>
                      <li>
                        <strong>Extract to Project:</strong> Unzip the file and
                        drag the contents into:
                        <code className="bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-100 px-1 py-0.5 rounded font-mono text-sm">
                          src/interviews/
                        </code>
                      </li>
                      <li>
                        <strong>Launch Interview:</strong> The interview
                        challenge will appear below as a card. Click "Launch
                        challenge" to begin! If the problem does not load,
                        restart the development server with{" "}
                        <code className="bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-100 px-1 py-0.5 rounded font-mono text-sm">
                          npm start
                        </code>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <h3 className="text-xl font-bold">Pro tips</h3>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>
                        Keep this tab open - you'll return here between
                        interview rounds
                      </li>
                      <li>
                        Each interview pattern runs in its own isolated
                        environment
                      </li>
                      <li>
                        You can navigate back to this page anytime using the
                        "Home" button
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="flex flex-col gap-8">
              {/* Loading/Error/Patterns Section */}
              {loading && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading interview challenges...</p>
                </div>
              )}

              {error && (
                <div className="error-state">
                  <h3>Error loading challenges</h3>
                  <p>{error}</p>
                </div>
              )}

              {hasPatterns && (
                <>
                  <div className="flex flex-col gap-4 max-w-3xl">
                    <h2 className="text-4xl font-bold">Challenges</h2>
                    <p className="text-lg text-muted-foreground">
                      Click "Launch challenge" to begin that challenge.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {patterns.map((pattern) => (
                      <InterviewCard
                        key={pattern.id}
                        pattern={pattern}
                        onLaunch={() => onLaunchPattern(pattern)}
                      />
                    ))}
                  </div>
                </>
              )}

              {!loading && !error && patterns.length === 0 && (
                <div className="waiting-for-interview">
                  <h3>Waiting for interview materials...</h3>
                  <p>
                    No interview challenges are currently loaded. Your
                    interviewer will provide you with the materials when your
                    interview session begins.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>

        <footer className="min-h-12 h-12 border-t flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Codeflow v1.0.0</p>
        </footer>
      </div>
    </div>
  );
};

export default HUD;
