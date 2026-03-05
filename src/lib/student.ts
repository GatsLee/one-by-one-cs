"use client";

import { createContext, useContext } from "react";

export interface StudentState {
  id: string;
  name: string;
}

export const StudentContext = createContext<{
  student: StudentState | null;
  setStudent: (s: StudentState | null) => void;
}>({ student: null, setStudent: () => {} });

export function useStudent() {
  return useContext(StudentContext);
}
