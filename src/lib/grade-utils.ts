import { Course } from "@/store/useGradeStore";

// 4.5 만점 기준
const GRADE_TO_4_5_SCALE: { [key: string]: number } = {
  'A+': 4.5,
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0,
};

// 4.0 만점 기준
const GRADE_TO_4_0_SCALE: { [key: string]: number } = {
    'A+': 4.0,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0,
  };


export const calculateGPA = (
    courses: Course[],
    isMajorOnly = false,
    scale: 4.5 | 4.0 = 4.5
  ): number => {
    const targetCourses = isMajorOnly ? courses.filter((c) => c.isMajor) : courses;
    let totalCredits = 0;
    let totalPoints = 0;
  
    const gradeMap = scale === 4.5 ? GRADE_TO_4_5_SCALE : GRADE_TO_4_0_SCALE;
  
    targetCourses.forEach((course) => {
        if (course.grade !== 'F') { // F는 취득학점에서 제외되지만, 평점계산에는 포함될 수 있음. 여기선 제외.
            const point = gradeMap[course.grade];
            if (point !== undefined) {
                totalCredits += course.credit;
                totalPoints += course.credit * point;
            }
        }
    });
  
    if (totalCredits === 0) return 0;

    const gpa = totalPoints / totalCredits;

    // 4.0 스케일의 경우, 최종 GPA가 4.0을 넘지 않도록 보정
    if (scale === 4.0) {
        return Math.min(gpa, 4.0);
    }
  
    return gpa;
  };
  

export const calculateEarnedCredits = (courses: Course[]): number => {
  return courses
    .filter((c) => c.grade !== 'F')
    .reduce((sum, c) => sum + c.credit, 0);
};
