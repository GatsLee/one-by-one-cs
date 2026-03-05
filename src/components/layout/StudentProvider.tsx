"use client";

import { useState, useEffect, ReactNode } from "react";
import { StudentContext, StudentState } from "@/lib/student";

export default function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cs-tutor-student");
    if (saved) {
      try {
        setStudent(JSON.parse(saved));
      } catch {
        // ignore invalid JSON
      }
    }
  }, []);

  const handleSetStudent = (s: StudentState | null) => {
    setStudent(s);
    if (s) {
      localStorage.setItem("cs-tutor-student", JSON.stringify(s));
    } else {
      localStorage.removeItem("cs-tutor-student");
    }
  };

  return (
    <StudentContext.Provider value={{ student, setStudent: handleSetStudent }}>
      {children}
    </StudentContext.Provider>
  );
}
