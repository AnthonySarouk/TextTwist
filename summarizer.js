require('dotenv').config();
const axios = require('axios');
const summarizerApiKey = process.env.RAPIDAPI_KEY_SUMMARIZER;

async function summarizeText(inputText, outputSentences = 1) {
    if (typeof inputText !== 'string' || inputText.length < 100) {
        throw new Error('Input text should be a string and longer than 100 characters.');
    }

    const options = {
        method: 'POST',
        url: 'https://text-summarizer1.p.rapidapi.com/summarize',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': summarizerApiKey,
            'X-RapidAPI-Host': 'text-summarizer1.p.rapidapi.com'
        },
        data: {
            text: inputText,
            language: 'en',
            output_sentences: outputSentences 
        }
    };

    try {
        const response = await axios.request(options);
        if (response.data && response.data.detail) {
            throw new Error(response.data.detail[0].msg);
        }
        return response.data;
    } catch (error) {
        console.error('Error while requesting the summarization:', error.message);
        throw new Error('Error summarizing the text.');
    }
}

module.exports = summarizeText;