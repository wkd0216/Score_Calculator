"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateGPA, calculateEarnedCredits } from "@/lib/grade-utils";
import { Course } from "@/store/useGradeStore";
import { GraduationCap, Award, Star } from "lucide-react";

interface GradeSummaryProps {
  courses: Course[];
}

export function GradeSummary({ courses }: GradeSummaryProps) {
  const overallGpa = calculateGPA(courses);
  const majorGpa = calculateGPA(courses, true);
  const earnedCredits = calculateEarnedCredits(courses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-primary text-primary-foreground border-none shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Award className="h-4 w-4" />
            전체 평점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold font-headline">
            {overallGpa.toFixed(2)}
          </div>
          <p className="text-xs opacity-80 mt-1">4.5점 만점 기준</p>
        </CardContent>
      </Card>

      <Card className="bg-accent text-accent-foreground border-none shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4" />
            전공 평점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold font-headline">
            {majorGpa.toFixed(2)}
          </div>
          <p className="text-xs opacity-80 mt-1">전공 과목 기준</p>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md border-none transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            취득 학점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-foreground font-headline">
            {earnedCredits}
          </div>
          <p className="text-xs text-muted-foreground mt-1">F 학점 제외</p>
        </CardContent>
      </Card>
    </div>
  );
}
