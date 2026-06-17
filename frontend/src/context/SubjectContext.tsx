"use client";

import {
  createContext,
  useContext,
} from "react";

import { SubjectDetail } from "@/types/subject";

interface SubjectContextType {
  subject: SubjectDetail;
}

const SubjectContext =
  createContext<SubjectContextType | null>(null);

export function SubjectProvider({
  subject,
  children,
}: {
  subject: SubjectDetail;
  children: React.ReactNode;
}) {
  return (
    <SubjectContext.Provider
      value={{ subject }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubject() {
  const context =
    useContext(SubjectContext);

  if (!context) {
    throw new Error(
      "useSubject must be used inside SubjectProvider"
    );
  }

  return context;
}    