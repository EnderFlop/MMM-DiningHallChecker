const { not } = require("cheerio/lib/api/traversing")

Module.register("dining-hall", {
  defaults:{
    category: "Fine Dining",
    fetchInterval: 1000 * 60 * 60 //every hour
  },
  start: function () {},
  getDom: function() {
    var element = document.createElement("div")
    element.className = "Burge Food"
    if(this.content.length > 0){
      for(i=0; i<this.content.length; i++){
        var newDiv = document.createElement("div")
        var food = this.content[i]
        newDiv.innerHTML = food
        element.appendChild(newDiv)
      }
    }
    else{
      element.innerText = "Nothing in this.content!"
    }
    return element
  },
  notificationReceived: function(notification, payload) {
    Log.log("notification recieved: " + notification)
    if(notification == "ALL_MODULES_STARTED"){
      this.sendSocketNotification("getcontent", null)
    }
  },
  socketNotificationReceived: function(notification, payload) {
    if(notification == "node_data"){
      Log.log("data recieved back from helper")
      this.content = payload
      Log.log(payload)
      this.updateDom(1)
    }
  },
  })