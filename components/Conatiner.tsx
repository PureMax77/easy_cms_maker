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
  let router = useRouter();
  let maxWidth = "1280px";
  return (
    <div
      className={`fflex flex-col items-center justify-center py-12`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
