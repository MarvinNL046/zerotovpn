"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type {
  FinderAnswers,
  FinderCopy,
  FinderProvider,
  FinderPlatform,
  FinderQuestion,
  FinderQuestionId,
  FinderSource,
} from "@/data/vpn-finder";
import { QuizQuestion } from "./quiz-question";
import { QuizResults } from "./quiz-results";
import styles from "./vpn-finder.module.css";

type QuizWizardProps = {
  copy: FinderCopy;
  providers: FinderProvider[];
  sources: FinderSource[];
};

function valueForQuestion(
  answers: FinderAnswers,
  questionId: FinderQuestionId,
): string | string[] | undefined {
  return answers[questionId];
}

function hasAnswer(value: string | string[] | undefined): boolean {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function answerLabel(
  question: FinderQuestion,
  value: string | string[] | undefined,
  empty: string,
): string {
  if (!hasAnswer(value)) return empty;
  const values = Array.isArray(value) ? value : [value];
  return values
    .map(
      (selected) =>
        question.options.find((option) => option.value === selected)?.label ??
        selected,
    )
    .join(", ");
}

function AnswerSummary({
  copy,
  answers,
  currentStep,
  onEdit,
  onReset,
  mobile = false,
}: {
  copy: FinderCopy;
  answers: FinderAnswers;
  currentStep: number;
  onEdit: (step: number) => void;
  onReset: () => void;
  mobile?: boolean;
}) {
  const content = (
    <>
      <ol className={styles.answerList}>
        {copy.questions.map((question, index) => {
          const value = valueForQuestion(answers, question.id);
          const answered = hasAnswer(value);
          return (
            <li
              key={question.id}
              className={
                index === currentStep ? styles.currentAnswer : undefined
              }
            >
              <span className={styles.answerNumber}>{index + 1}</span>
              <span>
                <strong>{question.eyebrow}</strong>
                <small>
                  {answerLabel(question, value, copy.answers.empty)}
                </small>
              </span>
              {answered ? (
                <button type="button" onClick={() => onEdit(index)}>
                  {copy.answers.edit}
                </button>
              ) : null}
            </li>
          );
        })}
      </ol>
      <button type="button" className={styles.resetLink} onClick={onReset}>
        <RotateCcw aria-hidden="true" />
        {copy.answers.reset}
      </button>
    </>
  );

  if (mobile) {
    return (
      <details className={`${styles.answerSummary} ${styles.answerMobile}`}>
        <summary>{copy.answers.mobileSummary}</summary>
        {content}
      </details>
    );
  }

  return (
    <aside className={`${styles.answerSummary} ${styles.answerDesktop}`}>
      <h2>{copy.answers.title}</h2>
      {content}
    </aside>
  );
}

export function QuizWizard({ copy, providers, sources }: QuizWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  const currentQuestion = copy.questions[currentStep];
  const currentValue = valueForQuestion(answers, currentQuestion.id);
  const progressValue = ((currentStep + 1) / copy.questions.length) * 100;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (showResults) {
      resultHeadingRef.current?.focus({ preventScroll: true });
      resultHeadingRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      return;
    }
    questionHeadingRef.current?.focus({ preventScroll: true });
  }, [currentStep, showResults]);

  const handleAnswer = (questionId: FinderQuestionId, value: string) => {
    const question = copy.questions.find((item) => item.id === questionId);
    if (!question) return;

    setAnswers((previous) => {
      if (question.type === "multi") {
        const current = Array.isArray(previous.platforms)
          ? previous.platforms
          : [];
        const platform = value as FinderPlatform;
        const platforms = current.includes(platform)
          ? current.filter((item) => item !== platform)
          : [...current, platform];
        return { ...previous, platforms } as FinderAnswers;
      }
      return { ...previous, [questionId]: value } as FinderAnswers;
    });
    setShowValidation(false);
  };

  const moveToStep = (step: number) => {
    setShowResults(false);
    setShowValidation(false);
    setCurrentStep(Math.max(0, Math.min(step, copy.questions.length - 1)));
  };

  const handleNext = () => {
    if (!hasAnswer(currentValue)) {
      setShowValidation(true);
      return;
    }
    if (currentStep < copy.questions.length - 1) {
      moveToStep(currentStep + 1);
      return;
    }
    setShowValidation(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setShowValidation(false);
  };

  const hasAnyAnswer = Object.values(answers).some((value) => hasAnswer(value));

  if (showResults) {
    return (
      <div className={styles.wizardShell}>
        <QuizResults
          answers={answers}
          providers={providers}
          sources={sources}
          copy={copy}
          resultRef={resultHeadingRef}
          onEdit={moveToStep}
          onBack={() => moveToStep(copy.questions.length - 1)}
          onReset={handleReset}
        />
      </div>
    );
  }

  return (
    <div className={styles.wizardShell}>
      <div className={styles.progressRow} aria-live="polite">
        <span>
          {copy.progress.step} {currentStep + 1} {copy.progress.of}{" "}
          {copy.questions.length}
        </span>
        <strong>{Math.round(progressValue)}%</strong>
      </div>
      <Progress
        value={progressValue}
        className={styles.progressTrack}
        aria-label={`${copy.progress.step} ${currentStep + 1} ${copy.progress.of} ${copy.questions.length}`}
        aria-valuetext={`${Math.round(progressValue)}% ${copy.progress.complete}`}
      />

      {hasAnyAnswer ? (
        <AnswerSummary
          copy={copy}
          answers={answers}
          currentStep={currentStep}
          onEdit={moveToStep}
          onReset={handleReset}
          mobile
        />
      ) : null}

      <div className={styles.wizardGrid}>
        <div>
          <QuizQuestion
            question={currentQuestion}
            selectedValue={currentValue}
            onAnswer={handleAnswer}
            headingRef={questionHeadingRef}
            validationMessage={
              showValidation ? copy.navigation.chooseOne : undefined
            }
          />

          <nav className={styles.wizardNavigation} aria-label="Quiz navigation">
            <button
              type="button"
              onClick={() => moveToStep(currentStep - 1)}
              disabled={currentStep === 0}
            >
              <ArrowLeft aria-hidden="true" />
              {copy.navigation.back}
            </button>
            <button
              type="button"
              className={styles.primaryCta}
              onClick={handleNext}
              disabled={!hasAnswer(currentValue)}
            >
              {currentStep === copy.questions.length - 1
                ? copy.navigation.results
                : copy.navigation.next}
              <ArrowRight aria-hidden="true" />
            </button>
          </nav>
        </div>

        <AnswerSummary
          copy={copy}
          answers={answers}
          currentStep={currentStep}
          onEdit={moveToStep}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
