const express = require('express');
const cors = require('cors');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 5500;

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyCCmL9RkHxMJBQi7QJm1kGDaxJHxQcAdoA"; 

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Enable CORS
app.use(cors());

app.use(express.json());

app.post('/api/generate-response', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const result = await client.generateMessage({
            model: MODEL_NAME,
            temperature: 0.5,
            candidateCount: 1,
            prompt: {
                context: "Respond all questions just like a friend or buddy",
                examples: [
                    {
                        input: { content: "what is your name and how are you?" },
                        output: {
                            content: `my name is Rabbit Ai, and I am fine. What about you?`,
                        },
                    },
                ],
                messages: [{ content: message }],
            },
        });

        res.json({ response: result[0].candidates[0].content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the response' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// AIzaSyCCmL9RkHxMJBQi7QJm1kGDaxJHxQcAdoA