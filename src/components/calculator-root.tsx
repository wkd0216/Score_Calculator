"use client";

import { CourseEntryForm } from "./course-entry-form";
import { GradeSummary } from "./grade-summary";
import { CourseList } from "./course-list";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useGradeStore } from "@/store/useGradeStore";

export function CalculatorRoot() {
  const { courses } = useGradeStore();

  const handleResetAll = () => {
    if (window.confirm("모든 과목을 초기화하시겠습니까?")) {
      useGradeStore.setState({ courses: [] });
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 animate-in fade-in duration-700">
      <GradeSummary courses={courses} />
      <CalculatorCard onReset={handleResetAll} />
    </div>
  );
}

interface CalculatorCardProps {
  onReset: () => void;
}

function CalculatorCard({ onReset }: CalculatorCardProps) {
  const courses = useGradeStore((state) => state.courses);
  return (
    <Card className="border-none shadow-xl bg-background/50 backdrop-blur-sm mb-8 overflow-hidden card-lifted">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-xl font-semibold">
            과목 입력
          </CardTitle>
          <CardDescription>
            과목명, 학점(1-6), 성적을 입력하세요.
          </CardDescription>
        </div>
        {courses.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-destructive gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            초기화
          </Button>
        )}
      </CardHeader>
      <div className="p-6 pt-0">
        <CourseEntryForm />
        <CourseList />
      </div>
    </Card>
  );
}
