var weatherAPIKey = "2772656d14bf2b82c3acd03ad1fd7062";

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(returnPosition);
} 

function returnPosition(position) {
    url =  "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude
             +	"&lon=" + position.coords.longitude + "appid=" + weatherAPIKey ;  
	console.log(position.coords.latitude);
	
}

console.log(url);
var xmlhttp = new XMLHttpRequest(); // get data from openweathermap.org
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
		console.log(myArr.name);
      //  myFunction(myArr);
    }
}
