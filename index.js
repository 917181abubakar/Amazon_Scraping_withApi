const express = require('express');
const request = require('request-promise');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json()); //it will allow application to parse json
 
const ApiKey=process.env.ApiKey;
const baseUrl=`http://api.scraperapi.com?api_key=${ApiKey}&autoparse=true`;

// Welcome route
app.get('/', async (req, res) => {
    res.send('Hey! Welcome to Node js Express scraper for Amazon website through scraperApi. My Name is Abu Bakar Siddique. In this project, we are going to make node js express sscript to scrape amazon website. You will learn how to play with routes , apis and alot of new stuff. Welcome to Node js Express scraper for Amazon website');
});

//product details
app.get('/products/:productId', async (req,res)=>{
    const { productId } = req.params;

    try {
        const response=await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
        
    }

})
// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));