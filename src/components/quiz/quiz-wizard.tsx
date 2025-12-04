"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "./quiz-question";
import { QuizResults } from "./quiz-results";
import { Progress } from "@/components/ui/progress";
import type { VpnProvider } from "@/lib/vpn-data";
import type { VpnData } from "@/lib/db/vpn-service";
import { useTranslations } from "next-intl";

export type QuizAnswers = {
  primaryUse?: string;
  budget?: string;
  devices?: string;
  speedPriority?: string;
  location?: string;
};

type QuizWizardProps = {
  vpns: (VpnProvider | VpnData)[];
  locale: string;
};

export function QuizWizard({ vpns, locale }: QuizWizardProps) {
  const t = useTranslations("quiz");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults
        answers={answers}
        vpns={vpns}
        onBack={handleBack}
        onReset={handleReset}
        locale={locale}
      />
    );
  }

  const questions = [
    {
      id: "primaryUse",
      title: t("questions.primaryUse.title"),
      options: [
        { value: "streaming", label: t("questions.primaryUse.options.streaming") },
        { value: "privacy", label: t("questions.primaryUse.options.privacy") },
        { value: "gaming", label: t("questions.primaryUse.options.gaming") },
        { value: "torrenting", label: t("questions.primaryUse.options.torrenting") },
        { value: "work", label: t("questions.primaryUse.options.work") },
      ],
    },
    {
      id: "budget",
      title: t("questions.budget.title"),
      options: [
        { value: "free", label: t("questions.budget.options.free") },
        { value: "budget", label: t("questions.budget.options.budget") },
        { value: "midrange", label: t("questions.budget.options.midrange") },
        { value: "premium", label: t("questions.budget.options.premium") },
      ],
    },
    {
      id: "devices",
      title: t("questions.devices.title"),
      options: [
        { value: "1-2", label: t("questions.devices.options.few") },
        { value: "3-5", label: t("questions.devices.options.several") },
        { value: "6-10", label: t("questions.devices.options.many") },
        { value: "unlimited", label: t("questions.devices.options.unlimited") },
      ],
    },
    {
      id: "speedPriority",
      title: t("questions.speedPriority.title"),
      options: [
        { value: "critical", label: t("questions.speedPriority.options.critical") },
        { value: "important", label: t("questions.speedPriority.options.important") },
        { value: "notPriority", label: t("questions.speedPriority.options.notPriority") },
      ],
    },
    {
      id: "location",
      title: t("questions.location.title"),
      options: [
        { value: "europe", label: t("questions.location.options.europe") },
        { value: "northAmerica", label: t("questions.location.options.northAmerica") },
        { value: "asia", label: t("questions.location.options.asia") },
        { value: "middleEast", label: t("questions.location.options.middleEast") },
        { value: "other", label: t("questions.location.options.other") },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t("progress.step")} {currentStep + 1} {t("progress.of")} {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 md:p-8">
        <QuizQuestion
          question={currentQuestion}
          selectedValue={currentAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirstQuestion={currentStep === 0}
          isLastQuestion={currentStep === totalSteps - 1}
        />
      </Card>

      {/* Help Text */}
      <p className="text-center text-sm text-muted-foreground">
        {t("helpText")}
      </p>
    </div>
  );
}
