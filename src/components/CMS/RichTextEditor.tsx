import ReactQuill from "react-quill-new";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  isRTL?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  isRTL = false,
  readOnly,
  error,
  helperText,
}: RichTextEditorProps) {
  const [editorValue, setEditorValue] = useState(value);
  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md shadow-sm overflow-hidden">
        <div
          className={`quill-wrapper ${isRTL ? "quill-rtl" : "quill-ltr"}`}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          lang={isRTL ? "ar" : "en"}
        >
          <ReactQuill
            theme="snow"
            value={editorValue}
            readOnly={readOnly}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className={`rich-editor ${isRTL ? "rtl" : "ltr"}`}
            style={{ height: "300px" }} // 👈 height of the entire editor
          />
        </div>
      </div>
      {error && <p className="text-red-500">{helperText}</p>}
    </div>
  );
}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  },
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet", "align", "link"];
