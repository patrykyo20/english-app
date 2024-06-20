import { ChangeEvent, FC } from "react";

interface InputProps {
  variant?: 'input' | 'textarea';
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: FC<InputProps> = ({
  variant = 'input',
  value,
  type = 'text',
  placeholder,
  onChange,
}) => {

  const dynamicWidth = `${value? value?.length * 3: 100}px`
  const dynamicHeight = `${value? value?.length / 2: 100}px`

  return (
    variant === 'input' ? ( 
      <input
        type={type}
        value={value}
        className="input user__field--input"
        placeholder={placeholder || 'data...'}
        onChange={onChange}

      />
    ) : (
      <textarea
        value={value}
        className="input user__field--textarea"
        placeholder={placeholder || 'data...'}
        onChange={onChange}
        style={{
          maxWidth: dynamicWidth,
          minHeight: dynamicHeight
        }}
      />
    )
  );
};

export default Input;
