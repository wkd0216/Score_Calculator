"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateGPA, calculateEarnedCredits } from "@/lib/grade-utils";
import { Course } from "@/store/useGradeStore";
import { GraduationCap, Award, Star } from "lucide-react";

interface GradeSummaryProps {
  courses: Course[];
}

export function GradeSummary({ courses }: GradeSummaryProps) {
  const overallGpa45 = calculateGPA(courses, false, 4.5);
  const overallGpa40 = calculateGPA(courses, false, 4.0);
  const majorGpa45 = calculateGPA(courses, true, 4.5);
  const earnedCredits = calculateEarnedCredits(courses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-primary text-primary-foreground border-none shadow-lg transform transition-all duration-300 hover:scale-[1.02] card-glow-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Award className="h-4 w-4" />
            전체 평점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold font-headline">
            {overallGpa45.toFixed(2)}
          </div>
          <p className="text-xs opacity-80 mt-1">4.5 만점</p>
          <p className="text-lg font-semibold opacity-90"> / {overallGpa40.toFixed(2)} (4.0 환산)</p>
        </CardContent>
      </Card>

      <Card className="bg-accent text-accent-foreground border-none shadow-lg transform transition-all duration-300 hover:scale-[1.02] card-glow-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4" />
            전공 평점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold font-headline">
            {majorGpa45.toFixed(2)}
          </div>
          <p className="text-xs opacity-80 mt-1">4.5 만점 (전공만)</p>
        </CardContent>
      </Card>

      <Card className="bg-background/80 backdrop-blur-sm border-none shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            총 취득 학점
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
