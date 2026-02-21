import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CalculatorType = 'general' | 'medical';

export interface Course {
  id: string;
  name: string;
  credit: number;
  grade: string;
  isMajor: boolean;
}

interface GradeState {
  courses: {
    [key in CalculatorType]: Course[];
  };
  addCourse: (course: Omit<Course, 'id'>, type: CalculatorType) => void;
  removeCourse: (id: string, type: CalculatorType) => void;
  updateCourse: (id: string, updatedCourse: Partial<Course>, type: CalculatorType) => void;
  resetCourses: (type: CalculatorType) => void;
}

export const useGradeStore = create<GradeState>()(
  persist(
    (set) => ({
      courses: { general: [], medical: [] },

      addCourse: (course, type) =>
        set((state) => ({
          courses: {
            ...state.courses,
            [type]: [...state.courses[type], { ...course, id: Date.now().toString() }],
          },
        })),

      removeCourse: (id, type) =>
        set((state) => ({
          courses: {
            ...state.courses,
            [type]: state.courses[type].filter((c) => c.id !== id),
          },
        })),

      updateCourse: (id, updatedCourse, type) =>
        set((state) => ({
          courses: {
            ...state.courses,
            [type]: state.courses[type].map((c) =>
              c.id === id ? { ...c, ...updatedCourse } : c
            ),
          },
        })),

      resetCourses: (type) =>
        set((state) => ({
          courses: {
            ...state.courses,
            [type]: [],
          },
        })),
    }),
    {
      name: 'grade-mate-storage-v2', // 로컬 스토리지 키 변경
      storage: createJSONStorage(() => localStorage),
    }
  )
);
