var basemap = document.getElementById("mapid")
basemap.innerHTML = mySvg
var basemap_svg = document.getElementById("basemap_svg")
basemap_svg.style.width = "99%"
basemap_svg.style.height = "99%"
basemap_svg.style.margin = "0px" 
basemap_svg.style.padding = "0px" 




 //How to change marker to icon in GeoJSON or is should we use normal marker. If so where we should integrate GeoJSON
/* var mymap=L.map('mapid').setView([ 48.79228, 9],8);
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWdhZ2VsZGkiLCJhIjoiY2phbm5pcTRhM2ZpNDJxcnphbnk4bXhiaSJ9.4EoCP0AuZHTMY8pA0VO8Ew'
}).addTo(mymap);
*/
/*
	var geojsonPoint = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!",
		"show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [ 9.23205, 48.79228]
    }
	},{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!",
		"show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [8.8877, 49.2380]
    }
	},{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!",
		"show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [8.41312, 49.02010]
    }
	},{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!",
		"show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [8.50252, 49.47949]
    }
	},{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "<img src= 's6.jpg' height=50 width=70 ><p><h1>Last Stadion</h1></p> <p><b>Year Formed</b>: 1987</p><p><a href= 'https://en.wikipedia.org/wiki/Westfalenstadion' target='_blank'> Link... </a><p>.",
		"show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [7.89298, 47.98898]
    }
	},
	];
	
	var myPointMarker = {   // Marker of leaflet NOT GeoJSON
		color: "red",
		fillColor: "black",
		radius: 8,
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	}
/*	
	var StadionIcon = new L.Icon({
	iconUrl: 'stadiumIcon.png',
    
	iconSize:     [30, 25], // size of the icon
    iconAnchor:   [0, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	
	});
	
	function pointToLayer(feature, latlng){
		return L.marker(latlng, {icon: StadionIcon});
	};
	
	
	
	function onEachFeature(feature, layer){
		if(feature.properties && feature.properties.popupContent)
			layer.bindPopup(feature.properties.popupContent);
	}
	
	function filter(feature, layer){
		return feature.properties.show_on_map;
	}
	
	
	
	var myLayer = L.geoJSON(geojsonPoint,{
		pointToLayer: pointToLayer
		
	,onEachFeature: onEachFeature, filter: filter}).addTo(mymap);
	
	
	
	
function onMapClick1(e){
//	alert("You clicked the map at " + e.latlng);
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at "+ e.latlng.toString())
		.openOn(mymap);
}

mymap.on('click',onMapClick1)*/