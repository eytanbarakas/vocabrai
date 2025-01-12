import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question1, question2, question3 } = req.body;

    const userResponses = `
      Question 1: ${question1}
      Question 2: ${question2}
      Question 3: ${question3}
    `;

    const apiKey = process.env.OPENAI_API_KEY;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a personality analysis assistant.' },
            { role: 'user', content: `Analyze the following responses and summarize the user's personality: ${userResponses}` }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const result = response.data.choices[0].message.content;
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error connecting to OpenAI API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

