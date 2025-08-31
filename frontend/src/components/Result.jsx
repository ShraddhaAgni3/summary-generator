export default function Results({ title, content, bgColor }) {
  if (!content) return null;

  
  const lines = content
    .split("\n")
    .map((line) => line.replace(/[*]/g, "").trim())
    .filter((line) => line.length > 0);

  return (
    <div
      className={`${bgColor} border rounded-xl p-6 shadow-md min-h-[500px] max-h-[500px] overflow-y-auto
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="list-disc list-inside text-gray-800 space-y-1">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
