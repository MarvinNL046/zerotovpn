"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TocItem {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
}

export interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  collapsible?: boolean;
  className?: string;
}

export function TableOfContents({
  items,
  title = "Table of Contents",
  collapsible = true,
  className = ""
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className={`bg-muted/30 ${className}`}>
      <CardHeader className="pb-2">
        <button
          onClick={() => collapsible && setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
          disabled={!collapsible}
        >
          <CardTitle className="text-lg flex items-center gap-2">
            <List className="h-5 w-5" />
            {title}
          </CardTitle>
          {collapsible && (
            isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <nav aria-label="Table of contents">
            <ol className="space-y-2 text-sm">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`${item.level === 2 ? 'ml-4' : item.level === 3 ? 'ml-8' : ''}`}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">{index + 1}.</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </CardContent>
      )}
    </Card>
  );
}
