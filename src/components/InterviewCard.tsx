import React from "react";
import { InterviewPattern } from "../interviews/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import "./InterviewCard.css";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpenIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface InterviewCardProps {
  pattern: InterviewPattern;
  onLaunch: () => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ pattern, onLaunch }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-2xl">{pattern.name}</CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {pattern.tags && pattern.tags.length > 0 && (
          <div className="card-tags">
            {pattern.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator />

        <div className="card-metadata">
          {pattern.author && (
            <div className="metadata-item">
              <span className="text-sm text-muted-foreground">Author</span>
              <span className="text-sm text-foreground">{pattern.author}</span>
            </div>
          )}
          {pattern.estimatedTime && (
            <div className="metadata-item">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm text-foreground">
                {pattern.estimatedTime}
              </span>
            </div>
          )}
          <div className="metadata-item">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm text-foreground">v{pattern.version}</span>
          </div>
          <div className="metadata-item">
            <span className="text-sm text-muted-foreground">Instructions</span>
            {pattern.readmes && pattern.readmes.length > 0 && (
              <span className="text-sm text-foreground flex items-center gap-1">
                <BookOpenIcon className="w-4 h-4" /> {pattern.readmes.length}{" "}
                instruction
                {pattern.readmes.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="default"
          size="lg"
          onClick={onLaunch}
          className="w-full"
        >
          Launch challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
