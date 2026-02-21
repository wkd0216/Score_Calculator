"use client";

import { CourseEntryForm } from "./course-entry-form";
import { GradeSummary } from "./grade-summary";
import { CourseList } from "./course-list";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useGradeStore, CalculatorType } from "@/store/useGradeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CalculatorRoot() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 animate-in fade-in duration-700">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/80 backdrop-blur-sm">
          <TabsTrigger value="general">일반 대학용</TabsTrigger>
          <TabsTrigger value="medical">의/치과 대학용</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <CalculatorInstance type="general" />
        </TabsContent>
        <TabsContent value="medical">
          <CalculatorInstance type="medical" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface CalculatorInstanceProps {
  type: CalculatorType;
}

function CalculatorInstance({ type }: CalculatorInstanceProps) {
  const courses = useGradeStore((state) => state.courses[type]);
  const resetCourses = useGradeStore((state) => state.resetCourses);

  const handleReset = () => {
    if (window.confirm("정말로 모든 과목을 초기화하시겠습니까?")) {
      resetCourses(type);
    }
  };

  const descriptions = {
    general: "과목명, 학점 (1-6), 성적을 입력하세요.",
    medical: "과목명, 학점 (0.5-8), 성적을 입력하세요.",
  };

  const creditOptions = {
    general: { min: 1, max: 6, step: 1 },
    medical: { min: 0.5, max: 8, step: 0.5 },
  };

  return (
    <div className="mt-6">
      <GradeSummary courses={courses} />
      <Card className="border-none shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden card-lifted">
        <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-semibold">
              과목 입력
            </CardTitle>
            <CardDescription>
              {descriptions[type]}
            </CardDescription>
          </div>
          {courses.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-destructive gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              초기화
            </Button>
          )}
        </CardHeader>
        <div className="p-6 pt-0">
          <CourseEntryForm
            calculatorType={type}
            creditOptions={creditOptions[type]}
          />
          <CourseList calculatorType={type} />
        </div>
      </Card>
    </div>
  );
}
