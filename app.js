/* 
    javascript codes
*/

// code for stylish console
var styles = [
    'background: limegreen'
    , 'border: 1px solid #3E0E02'
    , 'color: black'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 30px'
    , 'text-align: center'
    , 'font-weight: bold'
].join(';');


var updateApiUrl = 'http://localhost:8000/api/v1/update-menu'; // local API Url
var allDishApiUrl = 'http://localhost:8000/api/v1/items'; // local API Url
Vue.config.debug = true;

// filter restaurant address string
Vue.filter('addressModifier', function (value) {
    if (!value) return ''
    value = value.replace(/<\/?[^>]+(>|$)/g, "");
    return value;
});


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
            xmlhttp.open("GET", allDishApiUrl, true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*"); // for CORS issue
            xmlhttp.send(null);
            
            function getResult() {
            
                if (xmlhttp.readyState == 4) {
                    console.log('%c Completed Fetching Menu Dishes', styles);
                    var data = JSON.parse(xmlhttp.responseText);
                    self.dishes = data;
                    //console.log(data[0]);
                }
            }

        }, // fetch function ends

        updatePage: function() {
            
            var self = this;
            var xmlhttp = new XMLHttpRequest();    
            xmlhttp.onreadystatechange = getUpdatedResult;
            xmlhttp.open("GET", updateApiUrl, true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*"); // for CORS issue
            xmlhttp.send(null);
            
            function getUpdatedResult() {
            
                if (xmlhttp.readyState == 4) {
                    console.log('%c Dishes updated!!', styles);
                    var data = JSON.parse(xmlhttp.responseText);
                    self.dishes = data;
                }
            }
        } // update function ends

    }
      

});