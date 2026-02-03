"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import { CheckCircle, XCircle, ChevronRight, RefreshCw, Trophy } from "lucide-react";
import * as React from "react";
import { z } from "zod";

// 1. The Zod Schema
export const quizPanelSchema = z.object({
  topic: z.string().describe("The subject of the quiz (e.g. 'React Hooks', 'History of Rome')"),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      options: z.array(z.string()),
      correctAnswerIndex: z.number().describe("Index of the correct option (0-3)"),
      explanation: z.string().describe("Brief explanation of why the answer is correct"),
    })
  ).describe("List of 3-5 multiple choice questions"),
});

// 2. Types
export type QuizPanelProps = z.infer<typeof quizPanelSchema> & React.HTMLAttributes<HTMLDivElement>;

type QuizState = {
  currentQuestionIndex: number;
  selectedOptionIndex: number | null; // null means no answer selected yet
  score: number;
  isFinished: boolean;
  history: Record<string, boolean>; // Map of questionId -> isCorrect
};

// 3. The Component
export const QuizPanel = React.forwardRef<HTMLDivElement, QuizPanelProps>(
  ({ topic, questions, className, ...props }, ref) => {
    
    // Initialize Tambo State (This persists across chat turns!)
    const [state, setState] = useTamboComponentState<QuizState>(
      `quiz-${topic.replace(/\s/g, '-')}`, // Unique ID based on topic
      {
        currentQuestionIndex: 0,
        selectedOptionIndex: null,
        score: 0,
        isFinished: false,
        history: {},
      }
    );

    // If state isn't ready yet (hydration), show nothing or skeleton
    if (!state) return null;

    const currentQuestion = questions[state.currentQuestionIndex];
    const isAnswered = state.selectedOptionIndex !== null;

    const handleOptionClick = (index: number) => {
      if (isAnswered || state.isFinished) return; // Prevent changing answer

      const isCorrect = index === currentQuestion.correctAnswerIndex;
      
      setState({
        ...state,
        selectedOptionIndex: index,
        score: isCorrect ? state.score + 1 : state.score,
        history: { ...state.history, [currentQuestion.id]: isCorrect },
      });
    };

    const handleNext = () => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= questions.length) {
        setState({ ...state, isFinished: true });
      } else {
        setState({
          ...state,
          currentQuestionIndex: nextIndex,
          selectedOptionIndex: null,
        });
      }
    };

    const handleRestart = () => {
        setState({
            currentQuestionIndex: 0,
            selectedOptionIndex: null,
            score: 0,
            isFinished: false,
            history: {},
        });
    }

    // -- RENDER: Results Screen --
    if (state.isFinished) {
      return (
        <div ref={ref} className={cn("w-full max-w-md bg-card border rounded-xl p-6 text-center space-y-4 shadow-sm", className)} {...props}>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-muted-foreground">You scored {state.score} out of {questions.length}</p>
          
          <div className="w-full bg-muted rounded-full h-2.5 dark:bg-gray-700 mt-4 overflow-hidden">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-1000" 
              style={{ width: `${(state.score / questions.length) * 100}%` }}
            ></div>
          </div>

          <button 
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      );
    }

    // -- RENDER: Question Screen --
    return (
      <div ref={ref} className={cn("w-full max-w-md bg-card border rounded-xl overflow-hidden shadow-sm", className)} {...props}>
        {/* Header */}
        <div className="bg-muted/30 px-6 py-4 border-b flex justify-between items-center">
          <span className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">{topic}</span>
          <span className="text-xs font-mono bg-background border px-2 py-1 rounded">
            {state.currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-medium mb-6 leading-relaxed">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              // Styling logic for options based on state
              let optionStyle = "border-border hover:bg-muted/50 cursor-pointer";
              let icon = null;

              if (isAnswered) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  optionStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                  icon = <CheckCircle className="w-4 h-4" />;
                } else if (idx === state.selectedOptionIndex) {
                  optionStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                  icon = <XCircle className="w-4 h-4" />;
                } else {
                  optionStyle = "opacity-50 cursor-not-allowed";
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 border rounded-lg transition-all duration-200",
                    optionStyle
                  )}
                >
                  <span>{option}</span>
                  {icon}
                </div>
              );
            })}
          </div>

          {/* Explanation Footer */}
          {isAnswered && (
            <div className="mt-6 pt-4 border-t animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-semibold">Note:</span> {currentQuestion.explanation}
              </p>
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

QuizPanel.displayName = "QuizPanel";