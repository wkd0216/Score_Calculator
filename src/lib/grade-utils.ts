import { Course } from '@/store/useGradeStore';

export const GRADE_POINTS: { [key: string]: number } = {
  'A+': 4.5,
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
};

export const calculateGPA = (courses: Course[], isMajorOnly = false) => {
  const filteredCourses = isMajorOnly ? courses.filter(c => c.isMajor) : courses;
  const gpaCourses = filteredCourses.filter(c => c.grade !== 'F');

  if (gpaCourses.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  gpaCourses.forEach(course => {
    totalPoints += GRADE_POINTS[course.grade] * course.credit;
    totalCredits += course.credit;
  });

  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

export const calculateTotalCredits = (courses: Course[]) => {
  return courses.reduce((sum, course) => sum + course.credit, 0);
};

export const calculateEarnedCredits = (courses: Course[]) => {
  return courses
    .filter(c => c.grade !== 'F')
    .reduce((sum, course) => sum + course.credit, 0);
};
