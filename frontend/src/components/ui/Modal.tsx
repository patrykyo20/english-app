import { FC } from "react";

interface ModalProps {
  variant: 'success' | 'alert' | 'danger';
  title: string;
}

const Modal: FC<ModalProps> = ({
  variant,
  title
}) => {
  return (
    <div className={`modal modal--${variant}`}>
      <p>{title}</p>
    </div>
  );
};

export default Modal;