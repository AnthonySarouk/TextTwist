require('dotenv').config();
const axios = require('axios');
const translateApiKey = process.env.RAPIDAPI_KEY_TRANSLATOR;
async function translateText(text, sourceLanguage, targetLanguage) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', sourceLanguage);
    encodedParams.set('target_language', targetLanguage);
    encodedParams.set('text', text);

    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': translateApiKey,  
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data.data.translatedText;
    } catch (error) {
        console.error("Error translating text:", error);
        throw new Error('Failed to translate');
    }
}

module.exports = translateText;
