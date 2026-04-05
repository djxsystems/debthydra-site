import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

export default function Card({ padding = "md", className = "", children, ...props }: CardProps) {
  const padMap = { sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm ${padMap[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
