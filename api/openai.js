export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userMessage } = req.body;

    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
    const data = {
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: 'You are a ai asistant for a turkish 8th gradelarning app called vocabr you answer turkish 8th grade questions and explain answers and only answer in turkish like a teacher wouldt.' },
        { role: 'user', content: userMessage },
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      res.status(200).json({ result: responseData.choices[0].message.content });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error fetching data." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
