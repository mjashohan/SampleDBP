/* 
    javascript codes
*/

var localApiUrl = 'http://localhost:8000/api/v1/update-menu';
Vue.config.debug = true;

const vm = new Vue({
    
    el: '#app',
    
    data: {
        currentBranch: 'dev',
        dishes: null
    },
     
    created: function () {
        
        this.fetchData();
    },

    methods: {
        
        fetchData: function () {
            
            var self = this;
            
            var xmlhttp = new XMLHttpRequest();    
            xmlhttp.onreadystatechange = getResult;
            xmlhttp.open("GET", localApiUrl, true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*"); // for CORS issue
            xmlhttp.send(null);
            
            function getResult() {
            
                if (xmlhttp.readyState == 4) {
                    console.log("completed Fetching Menu Dishes from API");
                    var data = JSON.parse(xmlhttp.responseText);
                    self.dishes = data
                    //console.log(data[0]);
                }
            }

        }

    }
      

});