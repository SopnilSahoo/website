"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#CC1414] text-white border border-[#CC1414] hover:bg-[#b01212] hover:border-[#b01212]",
  secondary:
    "bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/5",
  ghost:
    "bg-transparent text-white border-0 hover:bg-white/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

export default function Button({
  children,
  className = "",
  onClick,
  href,
  icon,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.span
        className="inline-flex"
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={springTransition}
      >
        <Link href={href} className={baseClasses}>
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={springTransition}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {inner}
    </motion.button>
  );
}
