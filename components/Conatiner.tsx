"use client";
import { useRouter } from "next/router";
import React from "react";

const Container = ({
  style,
  children,
}: {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gapSize?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col justify-center py-12`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
