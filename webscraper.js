const axios = require("axios");
const cheerio = require("cheerio");

const fetchFood = async () => {
  try {
   const response = await axios.get('https://dining.uiowa.edu/burge-market-place');
   const html = response.data;
   const $ = cheerio.load(html);
 
   const foods = [];
 
   const international = $("div.panel.panel-default.marketplace-station.marketplace-station-Burge-International > div.panel-body > div.menu-course > div.menu-item > div.h6.menu-item-title").each((_idx, el) => {
    const food = $(el).text()
    foods.push(food)
   })
   return foods
  }
  catch (error) {
    console.log(error);
  }
  finally {
    console.log("Done")
  }
 };

fetchFood().then(foods => {
  console.log(foods)
})