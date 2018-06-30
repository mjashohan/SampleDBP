/* 
    javascript codes
*/

// code for stylish console :)
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


var updateApiUrl = 'http://localhost:8000/api/v1/update-menu'; // local API endpoint for updating dishes
var allDishApiUrl = 'http://localhost:8000/api/v1/items'; // local API endpoint for getting all dishes
Vue.config.debug = true;


const vm = new Vue({
    
    el: '#app',
    
    data: {
        currentBranch: 'dev',
        searchValue: '',
        dishes: null,
        searching:false,
        updating:false
    },
     
    created: function () {
        
        this.fetchData();
    },

    filters: {
        
        // filter for removing unwanted tag syntex from string value
        tagModifier: function (value) {
            if (!value) return ''
            value = value.replace(/<\/?[^>]+(>|$)/g, "");
            return value;
        },
        // filter for empty price tag
        priceModifier: function (value) {
            if (value === "") {
                return 'Price Not Availabe!';
            }
        }
    },

    methods: {
        
        fetchData: function () {
            
            var self = this;
            var xmlhttp = new XMLHttpRequest();  // create new HTTP Request instance  
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
            
            this.updating = true;
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
                    self.updating = false;
                }
            }
        }, // update function ends

        searchDishes: function() {
            
            this.searching = true;
            var self = this;
            if(this.searchValue== ''){
                self.fetchData;
                self.searching = false;
                location.reload(); // hard reload page for all dishes after empty search 
            }else{
                var xmlhttp = new XMLHttpRequest(); 
                xmlhttp.onreadystatechange = getSearchResult;
                xmlhttp.open("GET", `http://localhost:8000/api/v1/search/items/${encodeURIComponent(this.searchValue)}`, true);
                xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*"); // for CORS issue
                xmlhttp.send(null);
                
                function getSearchResult() {
                
                    if (xmlhttp.readyState == 4) {
                        console.log('%c Search Completed!!', styles);
                        var data = JSON.parse(xmlhttp.responseText);
                        self.dishes = data;
                        self.searching = false;
                    }
                }
            } // else statement ends
                
		} // search function ends

    } // method ends
    
    
});