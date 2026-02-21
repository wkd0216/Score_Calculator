"use client";

import { useGradeStore, CalculatorType } from "@/store/useGradeStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, BookText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseListProps {
  calculatorType: CalculatorType;
}

export function CourseList({ calculatorType }: CourseListProps) {
  const courses = useGradeStore((state) => state.courses[calculatorType]);
  const removeCourse = useGradeStore((state) => state.removeCourse);

  if (courses.length === 0) {
    return (
      <div className="text-center py-12 bg-white/10 dark:bg-slate-900/10 rounded-xl border border-dashed border-muted-foreground/30 mt-6">
        <BookText className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">아직 추가된 과목이 없습니다.</p>
        <p className="text-sm text-muted-foreground/60">위 입력창을 사용하여 과목을 추가해 보세요!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white/10 dark:bg-slate-900/10 rounded-xl shadow-sm border border-border/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Table>
        <TableHeader className="bg-muted/30 dark:bg-slate-800/30">
          <TableRow>
            <TableHead className="w-[40%] font-semibold">과목명</TableHead>
            <TableHead className="text-center font-semibold">학점</TableHead>
            <TableHead className="text-center font-semibold">성적</TableHead>
            <TableHead className="text-center font-semibold">전공</TableHead>
            <TableHead className="text-right font-semibold">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} className="group hover:bg-muted/20 dark:hover:bg-slate-800/30 transition-colors">
              <TableCell className="font-medium">{course.name || '이름 없는 과목'}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="font-normal border-muted-foreground/20">
                  {course.credit}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <span className={`font-bold ${
                  course.grade.startsWith('A') ? 'text-primary' : 
                  course.grade.startsWith('B') ? 'text-accent' : 
                  course.grade === 'F' ? 'text-destructive' : 'text-foreground'
                }`}>
                  {course.grade}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {course.isMajor && <Badge className="bg-accent text-accent-foreground">전공</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  onClick={() => removeCourse(course.id, calculatorType)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
