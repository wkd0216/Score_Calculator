import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the interface for a single course
export interface Course {
  id: string;
  name: string;
  credit: number;
  grade: string;
  isMajor: boolean; // 전공 과목 여부
}

// Define the state and actions for the store
interface GradeState {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  removeCourse: (id: string) => void;
  updateCourse: (id: string, updatedCourse: Partial<Course>) => void;
  calculateGPA: () => { gpa: number; totalCredits: number };
}

// Grade mapping for calculation
const gradeToPoint: { [key: string]: number } = {
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

export const useGradeStore = create<GradeState>()(
  persist(
    (set, get) => ({
      courses: [],

      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, { ...course, id: Date.now().toString() }],
        })),

      removeCourse: (id) =>
        set((state) => ({ courses: state.courses.filter((course) => course.id !== id) })),

      updateCourse: (id, updatedCourse) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id ? { ...course, ...updatedCourse } : course
          ),
        })),

      calculateGPA: () => {
        const { courses } = get();
        let totalCredits = 0;
        let totalPoints = 0;

        courses.forEach((course) => {
          if (course.credit > 0 && course.grade in gradeToPoint) {
            totalCredits += course.credit * 1;
            totalPoints += course.credit * gradeToPoint[course.grade];
          }
        });

        const gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
        return { gpa: parseFloat(gpa.toFixed(2)), totalCredits };
      },
    }),
    {
      name: 'grade-mate-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ courses: state.courses }), // persist only the 'courses' state
    }
  )
);
