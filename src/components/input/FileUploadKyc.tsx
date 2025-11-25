import { useRef, useState, memo, useMemo, useEffect } from "react";
import CloudUpArrow from "../../assets/icons/common/cloud-up-arrow.svg?react";
import { useTranslation } from "react-i18next";

// PDF Preview Component - moved outside to prevent recreation on re-renders
const PDFPreview = memo<{ src: string; alt: string; className?: string }>(({ src, alt, className }) => {
  return (
    <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
      <iframe src={src} title={alt} className="w-full h-full rounded-lg border-0" style={{ minHeight: "120px" }} />
    </div>
  );
});

type ExistingImage = { id?: number; url: string };

type FileUploadInputProps = {
  label?: string;
  name: string;
  value: File | (File | string | ExistingImage)[] | string | ExistingImage | null;
  onChange: (files: File | File[] | (File | string | ExistingImage)[] | string | ExistingImage | null) => void;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  onRemove?: (removed: File | string | ExistingImage, index?: number) => void;
};

const FileUploadKycInput: React.FC<FileUploadInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  multiple = false,
  maxFiles,
  accept,
  onRemove,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const blobUrlCache = useRef<Map<File, string>>(new Map());

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      blobUrlCache.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      blobUrlCache.current.clear();
    };
  }, []);

  // Create stable blob URLs for File objects
  const getStableBlobUrl = (file: File): string => {
    if (!blobUrlCache.current.has(file)) {
      const url = URL.createObjectURL(file);
      blobUrlCache.current.set(file, url);
    }
    return blobUrlCache.current.get(file)!;
  };
  const getFileNameFromUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname;
      const segments = pathname.split("/");
      const last = segments[segments.length - 1];
      return decodeURIComponent(last || "file");
    } catch {
      const segmentsFallback = url.split("?")[0].split("/");
      return decodeURIComponent(segmentsFallback[segmentsFallback.length - 1] || "file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      let newFiles: (File | string | ExistingImage)[] = Array.from(files);

      if (Array.isArray(value)) {
        newFiles = [...value, ...newFiles];
      }

      if (maxFiles && newFiles.length > maxFiles) {
        newFiles = newFiles.slice(0, maxFiles);
      }

      onChange(newFiles);
    } else {
      onChange(files[0] || null);
    }

    // Reset input value so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (multiple) {
      let newFiles: (File | string | ExistingImage)[] = files;

      if (Array.isArray(value)) {
        newFiles = [...value, ...files];
      }

      if (maxFiles && newFiles.length > maxFiles) {
        newFiles = newFiles.slice(0, maxFiles);
      }

      onChange(newFiles);
    } else {
      onChange(files[0] || null);
    }
  };

  const handleRemove = (index?: number) => {
    if (multiple && Array.isArray(value)) {
      const removed = value[index as number];
      if (removed !== undefined) {
        onRemove && onRemove(removed, index);
      }
      const updated = value.filter((_, i) => i !== index);
      onChange(updated.length > 0 ? updated : []);
    } else {
      if (value != null) {
        onRemove && onRemove(value as any, undefined);
      }
      onChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderPreview = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-col gap-2 w-full p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {value.map((item, index) => {
              const isFile = item instanceof File;
              const itemUrl = !isFile && typeof item === "object" && item !== null && "url" in item ? (item as ExistingImage).url : (!isFile ? (item as string) : "");
              const isImage = isFile ? item.type.startsWith("image/") : typeof itemUrl === "string";
              const isPDF = isFile
                ? item.type === "application/pdf"
                : typeof itemUrl === "string" && itemUrl.toLowerCase().includes(".pdf");
              const src = isFile ? getStableBlobUrl(item) : (itemUrl as string);
              const displayName = isFile ? item.name : getFileNameFromUrl(String(src));
              return (
                <div key={index} className="relative border rounded-lg p-2 flex flex-col items-center">
                  {isImage ? (
                    <img src={src} alt={`Preview-${index}`} className="max-h-24 rounded-lg object-contain" />
                  ) : isPDF ? (
                    <PDFPreview src={src} alt={`PDF Preview-${index}`} className="max-h-24 w-full" />
                  ) : (
                    <p className="text-gray-700 text-sm text-center">{displayName}</p>
                  )}
                  <button
                    className="absolute top-1 right-1 bg-primary text-white px-2 py-1 rounded text-xs cursor-pointer"
                    onClick={() => handleRemove(index)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* ✅ Keep a clickable "Add More" */}
          <label htmlFor={name} className="cursor-pointer text-sm text-primary underline mt-2 self-start">
            + {t("fileUpload.addMoreFiles")}
          </label>
        </div>
      );
    }

    if (!multiple && value instanceof File) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {value.type.startsWith("image/") ? (
            <img src={getStableBlobUrl(value)} alt="Preview" className="max-h-32 rounded-lg object-contain" />
          ) : value.type === "application/pdf" ? (
            <PDFPreview src={getStableBlobUrl(value)} alt="PDF Preview" className="max-h-32 w-full" />
          ) : (
            <p className="text-gray-700 font-medium mr-20">{value.name}</p>
          )}
          <button
            className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs cursor-pointer"
            onClick={() => handleRemove()}
            type="button"
          >
            {t("fileUpload.remove")}
          </button>

          {/* ✅ Allow re-selecting file */}
          <label htmlFor={name} className="cursor-pointer text-sm text-primary underline mt-2">
            {t("changeFile")}
          </label>
        </div>
      );
    }

    if (!multiple && (typeof value === "string" || (typeof value === "object" && value !== null && "url" in (value as any)))) {
      const url = typeof value === "string" ? value : (value as ExistingImage).url;
      const displayName = getFileNameFromUrl(url);
      const isPDF = url.toLowerCase().includes(".pdf");
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-3">
          {isPDF ? (
            <PDFPreview src={url} alt="PDF Preview" className="max-h-32 w-full" />
          ) : (
            /* Assume URL is an image; browsers will render if valid */
            <img src={url} alt="Preview" className="max-h-32 rounded-lg object-contain" />
          )}
          <p className="text-gray-700 text-xs mt-4 break-all mr-20">{displayName}</p>
          <button
            className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs cursor-pointer"
            onClick={() => handleRemove()}
            type="button"
          >
            {t("fileUpload.remove")}
          </button>

          <label htmlFor={name} className="cursor-pointer text-sm text-primary underline mt-2">
            {t("fileUpload.changeFile")}
          </label>
        </div>
      );
    }

    // Default initial state
    return (
      <label htmlFor={name} className="flex flex-col items-center justify-center cursor-pointer">
        <CloudUpArrow className="h-8 cursor-pointer" />
        <span className="text-gray-600 font-medium underline">{t("common.browseFile")}</span>
        {/* <span className="text-sm text-gray-500">{multiple ? "Drag & drop files here" : "Drag & drop file here"}</span> */}
        <span className="text-sm text-gray-500">{multiple ? t("common.dragAndDropFilesHere") : t("common.dragAndDropFileHere")}</span>
      </label>
    );
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-secondary font-medium text-sm tracking-wide">{label}</label>
      <div
        className={`flex items-center justify-center w-full min-h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${
          error ? "border-red-500" : "border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          id={name}
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
        {renderPreview()}
      </div>
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default FileUploadKycInput;
