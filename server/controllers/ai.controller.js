const { GoogleGenerativeAI } = require("@google/generative-ai");

const MOCK_ROADMAP = [
    {
        week: "Week 1-2",
        title: "Foundations of the Field",
        topics: ["Core Concepts", "Basic Terminologies", "Setting up Environment"],
        resources: [
            { type: "course", title: "Introductory Course", platform: "Coursera" },
            { type: "video", title: "Basics Explained in 10 Mins", platform: "YouTube" }
        ]
    },
    {
        week: "Week 3-4",
        title: "Intermediate Concepts",
        topics: ["Deep Dive into Tools", "Practical Applications", "First Mini-Project"],
        resources: [
            { type: "article", title: "Best Practices", platform: "Medium" },
            { type: "project", title: "Starter Project", platform: "GitHub" }
        ]
    },
    {
        week: "Week 5-8",
        title: "Advanced Mastery",
        topics: ["Complex Problem Solving", "Optimization Techniques", "Real-world Case Studies"],
        resources: [
            { type: "course", title: "Advanced Specialization", platform: "Udacity" },
            { type: "video", title: "Expert Walkthrough", platform: "YouTube" }
        ]
    }
];

exports.generateRoadmap = async (req, res) => {
    const { goal } = req.body;

    if (!goal) {
        return res.status(400).json({ message: "Goal is required" });
    }

    // 1. Check for API Key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.log("No GEMINI_API_KEY found. Returning mock data.");
        // Return mock data with slightly customized title to simulate personalization
        const personalizedMock = MOCK_ROADMAP.map(item => {
            if (item.week === "Week 1-2") return { ...item, title: `Foundations of ${goal}` };
            return item;
        });
        return res.json({ roadmap: personalizedMock, source: "mock" });
    }

    // 2. Use Gemini API
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      Generate a 4-step learning roadmap for a user who wants to: "${goal}".
      Return ONLY a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
      Each object must have:
      - "week": string (e.g., "Week 1-2")
      - "title": string (short title)
      - "topics": array of strings (3-4 points)
      - "resources": array of objects with keys: "type" (video/course/article), "title", "platform".
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if Gemini wraps in code blocks
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const roadmap = JSON.parse(cleanedText);
        res.json({ roadmap, source: "ai" });

    } catch (error) {
        console.error("Gemini API Error:", error.message);
        // Fallback to mock if API fails
        res.json({ roadmap: MOCK_ROADMAP, source: "mock_fallback" });
    }
};
