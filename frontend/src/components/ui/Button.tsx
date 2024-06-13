import { FC } from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {title}
    </button>
  );
};

export default Button;