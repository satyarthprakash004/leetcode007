import { useState } from "react";

function ProblemInput({ onAnalyze, loading }) {
  const [problemText, setProblemText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!problemText.trim()) {
      return;
    }

    onAnalyze(problemText);
    setProblemText("");
  }

  return (
    <section className="problem-input">
      <h2>Analyze a Problem</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your coding problem here..."
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          rows={8}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Problem"}
        </button>
      </form>
    </section>
  );
}

export default ProblemInput;