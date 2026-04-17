import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  asChild = false,
  ...props
}) => {
  const baseStyles =
    "font-medium inline-flex items-center justify-center rounded-full " +
    "transition-all duration-150 " +
    "active:translate-y-[1px] active:scale-[0.98] active:shadow-sm" +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[hsl(var(--primary))] text-[hsl(var(--white))] hover:bg-[hsl(var(--primary)/0.9)] dark:hover:text-[#f5f9f7]",
    secondary:
      "bg-[hsl(var(--secondary))] text-[hsl(var(--green-1))] hover:bg-[hsl(var(--white))]",
    outline:
      "border border-[hsl(var(--border))] text-[hsl(var(--white))] hover:bg-[hsl(var(--muted)/0.9)] hover:text-[hsl(var(--green-1))]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-[14px]",
    lg: "px-6 py-3 text-md",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  //asChild: clone the child (NavLink/Link) and inject the button classes
  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error(
        "Button with asChild expects a single React element child.",
      );
    }

    const child = children as React.ReactElement<any>;
    const mergedClassName = `${classes} ${child.props.className ?? ""}`.trim();

    const {
      type, //button only
      disabled, // button only
      ...restProps
    } = props;


    // 1 - Take the child elememt (NavLink or Link)
    // 2 - Cloning it
    // 3 - Injecting new props into it
    return React.cloneElement(child, {
      ...restProps,
      className: mergedClassName,
      "aria-disabled": disabled ? true : child.props["aria-disabled"],
      tabIndex: disabled ? -1 : child.props.tabIndex,
    })
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
