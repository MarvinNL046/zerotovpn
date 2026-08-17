"use client";

import type { RefObject } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Check,
  CircleHelp,
  Code2,
  Gamepad2,
  Gift,
  Home,
  Laptop,
  LockKeyhole,
  Monitor,
  Plane,
  Play,
  Router,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  Terminal,
  Tv,
  UserRound,
  Wifi,
} from "lucide-react";
import type { FinderQuestion, FinderQuestionId } from "@/data/vpn-finder";
import styles from "./vpn-finder.module.css";

const optionIcons: Record<
  FinderQuestion["options"][number]["icon"],
  LucideIcon
> = {
  shield: ShieldCheck,
  play: Play,
  gamepad: Gamepad2,
  plane: Plane,
  briefcase: BriefcaseBusiness,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: TabletSmartphone,
  terminal: Terminal,
  tv: Tv,
  router: Router,
  devices: Laptop,
  gift: Gift,
  code: Code2,
  user: UserRound,
  sparkles: Sparkles,
  home: Home,
  wifi: Wifi,
  lock: LockKeyhole,
  building: BriefcaseBusiness,
  help: CircleHelp,
};

type QuizQuestionProps = {
  question: FinderQuestion;
  selectedValue: string | string[] | undefined;
  onAnswer: (questionId: FinderQuestionId, value: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
  validationMessage?: string;
};

export function QuizQuestion({
  question,
  selectedValue,
  onAnswer,
  headingRef,
  validationMessage,
}: QuizQuestionProps) {
  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue
      ? [selectedValue]
      : [];
  const headingId = `finder-question-${question.id}`;
  const descriptionId = `${headingId}-description`;

  return (
    <div className={styles.questionPanel}>
      <div className={styles.questionHeading}>
        <p>{question.eyebrow}</p>
        <h2 ref={headingRef} id={headingId} tabIndex={-1}>
          {question.title}
        </h2>
        <p id={descriptionId}>{question.description}</p>
      </div>

      <fieldset
        className={styles.questionFieldset}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
      >
        <legend className="sr-only">{question.title}</legend>
        <div className={styles.choiceGrid}>
          {question.options.map((option) => {
            const Icon = optionIcons[option.icon];
            const checked = selectedValues.includes(option.value);
            const inputId = `${question.id}-${option.value}`;

            return (
              <label
                key={option.value}
                className={styles.choiceWrap}
                htmlFor={inputId}
              >
                <input
                  id={inputId}
                  name={question.type === "single" ? question.id : inputId}
                  type={question.type === "single" ? "radio" : "checkbox"}
                  value={option.value}
                  checked={checked}
                  onChange={() => onAnswer(question.id, option.value)}
                  className={styles.choiceControl}
                />
                <span className={styles.choiceTile}>
                  <span className={styles.choiceIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.choiceText}>
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </span>
                  <span className={styles.choiceCheck} aria-hidden="true">
                    <Check />
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {validationMessage ? (
        <p className={styles.validation} role="alert">
          {validationMessage}
        </p>
      ) : null}
    </div>
  );
}
