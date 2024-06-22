import { FC } from "react";

interface ButtonProps {
  variant?: string;
  type?: "button" | "reset" | "submit" | undefined
  title: string;
  onClick?: (e: any) => void;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "default",
  type = "button",
  title,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant} ${className}`}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;