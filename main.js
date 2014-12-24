$(document).ready(function(){
	//Initialize Material Design
	$.material.init()

	//Focus on the Search Bar
	document.querySelector("#search-bar").focus();

	//GET image URL from Bing for the picture of the day.
	$.ajax({
		url: 'http://www.bing.com/HPImageArchive.aspx',
		data: {
			format: "js",
			idx: "0",
			n: "1",
			mkt: "en-US"
		}
	}).success(function(data){
		var imgUrl= "http://www.bing.com"+data.images[0].url;
		document.querySelector(".bg").style.backgroundImage="url("+imgUrl+")";
	})

	//Get Top Sites of Chrome
	chrome.topSites.get(showTopSites);

	//Get Geolocation for Weather
	navigator.geolocation.getCurrentPosition(showWeather);
})




function showWeather(location) {
	var weatherCode;
	var sunset;
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather",
		data: {
			lat: location.coords.latitude,
			lon: location.coords.longitude
		}
	}).success(function(data){
		weatherCode=data.weather[0].id;
		sunset=data.sys.susnet;
		var iconClass= getWeatherIcon(weatherCode, sunset);
		$("#weather").addClass(iconClass)
	})

	

}



function getWeatherIcon(weatherCode, sunset) {
	var rain = [200,201,202,300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531];
	var thunderstorm = [210,211,212,221,230,231,232,956,957,958,959,960,961,962];
	var snow= [600,601,602,611,612,615,616,620,621,622,906];
	var sunny = [800,801,802];
	var clouds= [803,804,900,901,902,905];
	var rainbow = [951,952,953,954,955];
	var haze = [701,711,721,731,741,751,761,762,771,781];
	if(rain.indexOf(weatherCode)>-1) {
		return "rainy";
	}
	else if(thunderstorm.indexOf(weatherCode)>-1) {
		return "stormy";
	}
	else if(snow.indexOf(weatherCode)>-1) {
		return "snowy";
	}
	else if(sunny.indexOf(weatherCode)>-1) {
		if(Date.now()<sunset) return "sunny";
		return "starry";
	}
	else if(clouds.indexOf(weatherCode)>-1) {
		return "cloudy";
	}
	else if(rainbow.indexOf(weatherCode)>-1) {
		return "rainbow";
	}
	else if(haze.indexOf(weatherCode)>-1) {
		return "haze";
	}
}

function showTopSites(d) {
	for(i=0;i<12;i++) {
		var top = document.querySelector("#top .row"+parseInt(i/3));
		if(d[i]) {
			var tmp       = document.createElement ('a');
			tmp.href   = d[i].url;
			var arr = tmp.hostname.split(".");
			// var logoUrl="http://data.scrapelogo.com/"+arr[arr.length-2]+"."+arr[arr.length-1]+"/nlogo";
			// var logoUrl="http://"+arr[arr.length-2]+"."+arr[arr.length-1]+"/favicon.ico";
			var logoUrl = "chrome://favicon/http://"+tmp.hostname;
			var favIco= "<img class='favico' src='"+logoUrl+"'/>";

			// document.querySelector("#top").innerHTML="<img src="+logoUrl+"/>"

			top.innerHTML+="<a href='" +d[i].url+ "'class='top-site btn btn-default'>"+favIco+"<span class='favico-text'>"+d[i].title+"</span></a>"
			//<div style='background-image: linear-gradient(160deg,#1111aa,blue);' class='top-site-overlay'>&nbsp;</div>
		}
		
	}
}

