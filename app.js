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
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.send(null);
            
            function getResult() {
            
                if (xmlhttp.readyState == 4) {
                    console.log("completed");
                    var data = JSON.parse(xmlhttp.responseText);
                    console.log(data);
                }
            }

        }

    }
      

});