const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
