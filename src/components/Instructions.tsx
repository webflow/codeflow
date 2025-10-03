import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReadmeFile } from "../interviews/types";
import "./Instructions.css";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InstructionsProps {
  readmes: ReadmeFile[];
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ readmes, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTabs, setVisibleTabs] = useState<number[]>([]);
  const [overflowTabs, setOverflowTabs] = useState<number[]>([]);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentReadme = readmes[currentIndex];

  // Focus management for modal
  useEffect(() => {
    const firstTab = document.getElementById('tab-0');
    firstTab?.focus();

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev < readmes.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [readmes.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToPage = useCallback((index: number) => {
    if (index >= 0 && index < readmes.length) {
      setCurrentIndex(index);
    }
  }, [readmes.length]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;

    // Show top shadow if not at the top
    setShowTopShadow(scrollTop > 0);

    // Show bottom shadow if not at the bottom (with small tolerance)
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 5);
  };

  // Calculate which tabs fit and which overflow
  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!tabsListRef.current || readmes.length <= 1) {
        setVisibleTabs(readmes.map((_, i) => i));
        setOverflowTabs([]);
        return;
      }

      const container = tabsListRef.current;
      const containerWidth = container.offsetWidth;
      const dropdownButtonWidth = 40;
      const availableWidth = containerWidth - dropdownButtonWidth;
      const tabsListPadding = 6;

      // Create invisible measurement elements to get accurate widths
      const measureTabWidths = () => {
        const tempContainer = document.createElement("div");
        tempContainer.style.cssText = `
          position: absolute;
          visibility: hidden;
          pointer-events: none;
          top: -9999px;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 500;
        `;

        const tabWidths: number[] = [];

        readmes.forEach((readme) => {
          const tempTab = document.createElement("span");
          tempTab.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.375rem;
            border: 1px solid transparent;
            padding: 0.25rem 0.5rem;
            white-space: nowrap;
          `;
          tempTab.textContent = readme.title;
          tempContainer.appendChild(tempTab);
        });

        document.body.appendChild(tempContainer);

        const tempTabs = tempContainer.querySelectorAll("span");
        tempTabs.forEach((tab) => {
          tabWidths.push((tab as HTMLElement).offsetWidth);
        });

        document.body.removeChild(tempContainer);
        return tabWidths;
      };

      const tabWidths = measureTabWidths();
      const totalWidth = tabWidths.reduce(
        (sum, width) => sum + width,
        tabsListPadding
      );

      if (totalWidth <= containerWidth) {
        // All tabs fit, no overflow needed
        setVisibleTabs(readmes.map((_, i) => i));
        setOverflowTabs([]);
      } else {
        // Need to overflow some tabs - keep natural order
        const visible = [];
        const overflow = [];
        let currentWidth = tabsListPadding;

        // Add tabs in natural order until we run out of space
        for (let i = 0; i < readmes.length; i++) {
          if (currentWidth + tabWidths[i] <= availableWidth) {
            visible.push(i);
            currentWidth += tabWidths[i];
          } else {
            overflow.push(i);
          }
        }

        setVisibleTabs(visible);
        setOverflowTabs(overflow);
      }
    };

    // Initial calculation
    calculateVisibleTabs();

    // Recalculate on window resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateVisibleTabs, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [readmes.length, currentIndex]);

  const formatMarkdown = (text: string) => {
    // First, protect code blocks from other transformations
    const codeBlocks: string[] = [];
    let codeBlockIndex = 0;

    // Extract and preserve code blocks
    text = text.replace(/```[\s\S]*?```/g, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
      codeBlocks[codeBlockIndex] = match;
      codeBlockIndex++;
      return placeholder;
    });

    // Extract and preserve inline code
    const inlineCodes: string[] = [];
    let inlineCodeIndex = 0;
    text = text.replace(/`([^`\n]+)`/g, (match, content) => {
      const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
      inlineCodes[inlineCodeIndex] = `<code>${content}</code>`;
      inlineCodeIndex++;
      return placeholder;
    });

    // Handle lists FIRST before other processing
    // Handle lists with a more reliable approach
    const lines = text.split('\n');
    const processedLines: string[] = [];
    let inBulletList = false;
    let inNumberedList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (/^[\*\-] (.+)$/.test(line)) {
        // Bullet list item
        if (!inBulletList) {
          processedLines.push('<ul>');
          inBulletList = true;
        }
        if (inNumberedList) {
          processedLines.push('</ol>');
          inNumberedList = false;
        }
        const content = line.replace(/^[\*\-] (.+)$/, '$1');
        processedLines.push(`<li>${content}</li>`);
      } else if (/^(\d+)\. (.+)$/.test(line)) {
        // Numbered list item
        if (!inNumberedList) {
          processedLines.push('<ol>');
          inNumberedList = true;
        }
        if (inBulletList) {
          processedLines.push('</ul>');
          inBulletList = false;
        }
        const content = line.replace(/^(\d+)\. (.+)$/, '$2');
        processedLines.push(`<li>${content}</li>`);
      } else {
        // Not a list item
        if (inBulletList) {
          processedLines.push('</ul>');
          inBulletList = false;
        }
        if (inNumberedList) {
          processedLines.push('</ol>');
          inNumberedList = false;
        }
        processedLines.push(line);
      }
    }

    // Close any remaining open lists
    if (inBulletList) processedLines.push('</ul>');
    if (inNumberedList) processedLines.push('</ol>');

    text = processedLines.join('\n');

    // Now process other markdown elements
    text = text
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p>");

    // Restore inline code
    inlineCodes.forEach((code, index) => {
      text = text.replace(`__INLINE_CODE_${index}__`, code);
    });

    // Restore and format code blocks
    codeBlocks.forEach((block, index) => {
      const content = block.replace(/```(\w*\n)?/, "").replace(/```$/, "");
      const formattedBlock = `<pre><code>${content
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`;
      text = text.replace(`__CODE_BLOCK_${index}__`, formattedBlock);
    });

    return text;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden pt-2">
      {/* <header className="flex items-center gap-2 p-4">
        <BookOpenIcon className="w-4 h-4" />
        <h2 className="text-xl font-bold">Instructions</h2>
      </header> */}

      <Tabs
        value={currentIndex.toString()}
        onValueChange={(value) => goToPage(parseInt(value))}
        className="flex-1 overflow-y-auto"
      >
        <div ref={tabsListRef} className="flex items-center gap-1">
          <TabsList className="flex-shrink-0">
            {visibleTabs.map((index) => (
              <TabsTrigger key={index} value={index.toString()}>
                {readmes[index].title}
              </TabsTrigger>
            ))}
          </TabsList>

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-9 w-9 p-0 flex-shrink-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <MoreHorizontalIcon className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50">
                {overflowTabs.map((index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={currentIndex === index}
                    onCheckedChange={() => goToPage(index)}
                  >
                    {readmes[index].title}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {readmes.map((readme, index) => (
          <TabsContent
            key={index}
            value={index.toString()}
            className="flex-1 overflow-hidden relative"
          >
            {/* Top border with gradient edges */}
            {showTopShadow && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent from-10% via-border via-90% to-transparent pointer-events-none z-10" />
            )}

            {/* Bottom border with gradient edges */}
            {showBottomShadow && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent from-10% via-border via-90% to-transparent pointer-events-none z-10" />
            )}

            <ScrollArea
              className="h-full"
              ref={scrollAreaRef}
              onScrollCapture={handleScroll}
            >
              <main className="px-8 py-2">
                <div className="markdown-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${formatMarkdown(readme.content)}</p>`,
                    }}
                  />
                </div>
              </main>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <footer className="p-4 relative">
        <div className="navigation-buttons">
          <Button
            variant="secondary"
            size="sm"
            className="prev"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            title="Previous page"
            style={{ pointerEvents: 'auto' }}
          >
            <ArrowLeftIcon className="w-4 h-4" style={{ pointerEvents: 'none' }} /> 
            <span style={{ pointerEvents: 'none' }}>Previous</span>
          </Button>

          <div className="absolute left-0 right-0 flex justify-center gap-2" style={{ pointerEvents: 'none' }}>
            {readmes.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToPage(index)}
                title={`Go to ${readmes[index].title}`}
                style={{ pointerEvents: 'auto' }}
              />
            ))}
          </div>

          <Button
            variant="default"
            size="sm"
            className="next"
            onClick={goToNext}
            disabled={currentIndex === readmes.length - 1}
            title="Next page"
            style={{ pointerEvents: 'auto' }}
          >
            <span style={{ pointerEvents: 'none' }}>Next</span> 
            <ArrowRightIcon className="w-4 h-4" style={{ pointerEvents: 'none' }} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Instructions;
