const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const OPENAI_API_KEY = 'your_openai_api_key_here';

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                }
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
