var NodeHelper = require("node_helper")

const axios = require("axios");
const cheerio = require("cheerio");


module.exports = NodeHelper.create({
  init(){
		console.log("init module helper "+this.name);
	},

	start() {
		console.log(`Starting module helper: ${this.name}`);
	},

	stop(){
		console.log(`Stopping module helper: ${this.name}`);
  },
  
	socketNotificationReceived(notification, payload) {
		console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
		// if config message from module
		if (notification === "CONFIG") {
			// save payload config info
			this.config=payload
		}
		// module wants content from api
		else if(notification === "getcontent") {
			 this.getcontent()
		}
  },
  
  getcontent(){
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
      this.sendSocketNotification("node_data", foods)
    })
    
  }

})