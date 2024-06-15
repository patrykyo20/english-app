import { ChangeEvent, FC } from "react";

interface FormFieldProps {
  title: string;
  type: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormField: FC<FormFieldProps> = ({
  title,
  type,
  placeholder,
  value,
  className,
  onChange
}) => {
  return (
    <label className="login__field login__label">
      {title}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className="input"
        onChange={onChange}
      />
    </label>
  );
};

export default FormField;