import { FC } from "react";

interface ButtonProps {
  variant?: string;
  type?: "button" | "reset" | "submit" | undefined
  title: string;
  onClick?: (e: any) => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  variant = "default",
  type = "button",
  title,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant} ${className}`}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;