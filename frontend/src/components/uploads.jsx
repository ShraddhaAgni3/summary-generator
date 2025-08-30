// src/components/UploadBox.jsx
import { useDropzone } from "react-dropzone";
import { useState} from "react";

export default function UploadBox({ onFileSelect, onFileRemove }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
    },
    multiple: false,
  });

  const handleRemove = () => {
    setSelectedFile(null);
    if (onFileRemove) onFileRemove();
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
          hover:border-blue-400 hover:bg-blue-50`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop your file here...</p>
        ) : (
          <p className="text-gray-600 text-lg font-medium">
            Drag & drop a PDF or Image <br /> or click to upload
          </p>
        )}
      </div>

      {selectedFile && (
        <div className="p-4 border rounded-xl bg-gray-50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview"
                className="w-14 h-14 object-cover rounded-lg"
              />
            ) : (
              <span className="text-red-600 font-bold text-lg">📄 PDF</span>
            )}
            <span className="truncate font-medium">{selectedFile.name}</span>
          </div>

          <button
            onClick={handleRemove}
            className="px-3 py-1 text-red-500 hover:text-red-600 font-medium"
          >
            ✕ Remove
          </button>
        </div>
      )}
    </div>
  );
}
