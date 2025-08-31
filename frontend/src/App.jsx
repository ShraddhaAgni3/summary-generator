import { useState, useCallback } from "react";
import axios from "axios";
import UploadBox from "./components/uploads";
import SummaryOptions from "./components/summaryoptions";
import Results from "./components/Result";

function App() {
  const [file, setFile] = useState(null);
  const [summaryType, setSummaryType] = useState("short");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [improvements, setImprovements] = useState("");

  const cleanText = (text) => {
    if (!text) return "";
    return text
      .split("\n")
      .map((line) => line.replace(/[*]/g, "").trim())
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const handleFileSelect = useCallback((f) => {
    setFile(f);
    setSummary("");
    setImprovements("");
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setSummary("");
    setImprovements("");
  }, []);

  const handleSummarize = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("summaryType", summaryType);

      const res = await axios.post(
        "https://summary-generator-uy79.onrender.com/summarize",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSummary(cleanText(res.data.summary));
      setImprovements(cleanText(res.data.improvements));
    } catch (err) {
      console.error(err);
      alert("Error processing file. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        📑 Document Summarizer
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-6">
       
        <div className="flex flex-col gap-4 bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-sm">
          <UploadBox onFileSelect={handleFileSelect} onFileRemove={handleRemoveFile} />
          <SummaryOptions summaryType={summaryType} setSummaryType={setSummaryType} />
        </div>

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          disabled={loading || !file}
          className="mt-4 w-full md:w-1/3 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition disabled:bg-black font-medium text-lg self-center"
        >
          {loading ? "Processing..." : "Summarize"}
        </button>

        {/* Results Section */}
        {(summary || improvements) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Results
              title="Summary"
              content={summary}
              bgColor="bg-green-50 border-green-400 rounded-xl p-6 shadow-md min-h-[500px] overflow-y-auto"
            />
            <Results
              title="Suggested Improvements"
              content={improvements}
              bgColor="bg-red-50 border-red-400 rounded-xl p-6 shadow-md min-h-[500px] overflow-y-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
