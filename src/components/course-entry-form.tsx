"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, BookOpen } from "lucide-react";
import { useGradeStore } from "@/store/useGradeStore";

const GRADE_OPTIONS = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
const getCreditOptions = (type: 'standard' | 'medical') => {
  return type === 'standard' ? ['1', '2', '3', '4', '5', '6'] : ['0.5', '1', '2', '3', '4', '5', '6', '7', '8'];
};

export function CourseEntryForm() {
  const [name, setName] = useState("");
  const [credit, setCredit] = useState("3");
  const [grade, setGrade] = useState("A+");
  const [isMajor, setIsMajor] = useState(false);
  const addCourse = useGradeStore((state) => state.addCourse);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCourse({
      name: name.trim(),
      credit: parseFloat(credit),
      grade: grade,
      isMajor: isMajor,
    });

    setName("");
    setCredit("3");
    setGrade("A+");
    setIsMajor(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl shadow-sm border border-border/50 items-end animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex-1 w-full space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1 ml-1">
          <BookOpen className="h-3 w-3" /> 과목명
        </label>
        <Input 
          placeholder="예: 미적분학, 알고리즘..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-visible:ring-accent"
        />
      </div>

      <div className="w-full md:w-32 space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground ml-1">학점</label>
        <Select value={credit} onValueChange={setCredit}>
          <SelectTrigger className="focus:ring-accent">
            <SelectValue placeholder="학점" />
          </SelectTrigger>
          <SelectContent>
            {getCreditOptions('standard').map(opt => (
              <SelectItem key={opt} value={opt}>{opt} 학점</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-32 space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground ml-1">성적</label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="focus:ring-accent">
            <SelectValue placeholder="성적" />
          </SelectTrigger>
          <SelectContent>
            {GRADE_OPTIONS.map(opt => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="isMajor" checked={isMajor} onCheckedChange={(checked) => setIsMajor(!!checked)} />
        <label htmlFor="isMajor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">전공</label>
      </div>

      <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-medium gap-2 btn-glow">
        <PlusCircle className="h-4 w-4" />
        과목 추가
      </Button>
    </form>
  );
}
