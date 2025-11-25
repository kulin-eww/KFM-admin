import { useRef } from "react";
import CloudUpArrow from "../../assets/icons/common/cloud-up-arrow.svg?react";

type AvatarUploadInputProps = {
  name: string;
  value: File | string | null;
  onChange: (file: File | string | null) => void;
  accept?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  disabled?: boolean;
};

const AvatarUploadInput: React.FC<AvatarUploadInputProps> = ({ name, value, onChange, accept = "image/*", error, helperText, label, disabled = false }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onChange(files && files[0] ? files[0] : null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const isFile = value instanceof File;
  const src = isFile ? URL.createObjectURL(value as File) : (value as string | null);

  return (
    <div className="inline-flex flex-col items-start">
      {label && <div className="mb-2 text-secondary font-medium text-sm tracking-wide">{label}</div>}
      <div className="relative" style={{ width: 96, height: 96 }}>
        <button
          type="button"
          aria-label="Upload logo"
          className="rounded-full overflow-hidden border bg-white w-full h-full"
          style={{ borderColor: error ? "#ef4444" : "#9ca3af" }}
          onClick={() => !disabled && inputRef.current?.click()}
          disabled={disabled}
        >
          {src ? (
            <img src={src} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <CloudUpArrow className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </button>

        {src && !disabled && (
          <button
            type="button"
            aria-label="Remove logo"
            className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs shadow"
            onClick={(e) => {
              e.stopPropagation();
              remove();
            }}
          >
            ✕
          </button>
        )}
      </div>
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
      <input ref={inputRef} id={name} name={name} type="file" className="hidden" accept={accept} onChange={handleFileChange} disabled={disabled} />
    </div>
  );
};

export default AvatarUploadInput;



