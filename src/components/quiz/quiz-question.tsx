"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type QuizQuestionProps = {
  question: {
    id: string;
    title: string;
    options: { value: string; label: string }[];
  };
  selectedValue?: string;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
};

export function QuizQuestion({
  question,
  selectedValue,
  onAnswer,
  onNext,
  onBack,
  isFirstQuestion,
  isLastQuestion,
}: QuizQuestionProps) {
  const t = useTranslations("quiz");

  const handleOptionChange = (value: string) => {
    onAnswer(question.id, value);
  };

  const canProceed = !!selectedValue;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {question.title}
        </h2>
      </div>

      <RadioGroup value={selectedValue} onValueChange={handleOptionChange}>
        <div className="grid gap-3">
          {question.options.map((option) => (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={`${question.id}-${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`${question.id}-${option.value}`}
                className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
              >
                <span className="text-base font-medium">{option.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstQuestion}
          className="w-24"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("navigation.back")}
        </Button>
        <Button onClick={onNext} disabled={!canProceed} className="w-32">
          {isLastQuestion ? t("navigation.showResults") : t("navigation.next")}
          {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
