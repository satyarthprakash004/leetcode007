require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

// Create Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());

console.log(
  process.env.GROQ_API_KEY
    ? "Groq API key loaded"
    : "Groq API key missing"
);

app.post("/api/analyze", async (req, res) => {
  try {
    const { problem } = req.body;

    console.log("Problem received:", problem);

    const completion = await groq.chat.completions.create({
           model: "qwen/qwen3.8-27b",

      response_format: {
        type: "json_object"
      },

      messages: [
        {
          role: "system",
          content: `
You are an expert coding interview mentor.
Analyze the coding problem provided by the user.
Return ONLY a valid JSON object with exactly these keys:
and provide me code also  in c++

{
  "pattern": "string",
  "difficulty": "string",
  "observations": ["string"],
  "approach": "string",
  "timeComplexity": "string",
  "spaceComplexity": "string",
  "similarProblems": ["string"],
  "nextProblems": ["string"]
}

Do not include markdown.
Do not include explanations outside the JSON.
`
        },

        {
          role: "user",
          content: problem
        }
      ]
    });

    // Get AI's response
    const aiResponse = completion.choices[0].message.content;

    console.log("Groq response:", aiResponse);

    // Convert JSON string → JavaScript object
    const data = JSON.parse(aiResponse);

    // Send result to React
    res.json(data);

  } catch (error) {

    console.error("Groq error:", error);

    res.status(500).json({
      error: "Failed to analyze the problem",
      details: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});