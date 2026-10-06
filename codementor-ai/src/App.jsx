import { useState } from "react";
import ProblemInput from "./components/probleminput";
import Analysis from "./components/analyze";

function App() {
  const [problem, setProblem] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(problemText) {
    setProblem(problemText);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problem: problemText
        })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>codementor ai</h1>
        <p>Your DSA problem-solving Mentor</p>
      </header>

      <main>
        <ProblemInput
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {loading && (
          <p className="loading">
            Analyzing problem...
          </p>
        )}

        {analysis && !loading && (
          <Analysis analysis={analysis} />
        )}
      </main>
    </div>
  );
}

export default App;
