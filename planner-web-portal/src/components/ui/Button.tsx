import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 shadow-sm",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500",
      outline: "border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-500 text-slate-700",
      ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-700 focus-visible:ring-slate-500",
      danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 py-2 px-4 text-sm",
      lg: "h-11 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
