"use client";

import React from "react";

interface HighlighterProps {
  children: React.ReactNode;
  slot?: string;
}

export function Highlighter({ children, slot }: HighlighterProps) {
  return <div slot={slot}>{children}</div>;
}
