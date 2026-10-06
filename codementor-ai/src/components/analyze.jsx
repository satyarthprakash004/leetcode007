function Analysis({ analysis }) {
  return (
    <section className="analysis">

      <div className="analysis-header">
        <h2>Problem Analysis</h2>

        <div className="badges">
          <span>{analysis.pattern}</span>
          <span>{analysis.difficulty}</span>
        </div>
      </div>

      <div className="analysis-section">
        <h3>🔍 Observations</h3>

        <ul>
          {analysis.observations.map((observation, index) => (
            <li key={index}>
              {observation}
            </li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>💡 Approach</h3>
        <p>{analysis.approach}</p>
      </div>

      <div className="complexity">

        <div>
          <h3>Time Complexity</h3>
          <p>{analysis.timeComplexity}</p>
        </div>

        <div>
          <h3>Space Complexity</h3>
          <p>{analysis.spaceComplexity}</p>
        </div>

      </div>

      <div className="analysis-section">
        <h3>🔗 Similar Problems</h3>

        <ul>
          {analysis.similarProblems.map((problem, index) => (
            <li key={index}>
              {problem}
            </li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>🚀 Recommended Next</h3>

        <ul>
          {analysis.nextProblems.map((problem, index) => (
            <li key={index}>
              {problem}
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

export default Analysis;