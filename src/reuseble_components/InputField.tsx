import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  error?: FieldError;
  required?: boolean;
  inputstyle?: string;
};

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  placeholder,
  type,
  error,
  required,
  inputstyle,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...register?.(name, {
          required: required ? `${label} is required` : false,
        })}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded text-sm outline-none ${inputstyle}`}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
