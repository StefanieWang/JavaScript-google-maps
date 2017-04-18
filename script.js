var map,
    marker,
    lat,
    lng,
    message;
var markers = [];

var initMap = function(){
	var mapOpt = {
		center: new google.maps.LatLng(0,0),
		zoom: 2
	};
    var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOpt);

};

var getUserInput = function(){
    lat = $("#lat").val();
    console.log("getting user input.");
    lng = $("#lng").val();
    message = $("#message").val();
};

var placeMarker = function(){
    var position = new google.maps.LatLng(lat, lng);
	marker = new google.maps.Marker({
		position: position,
		animation: google.maps.Animation.DROP
	});
	marker.setMap(map);
	markers.push(marker);
};

var showMessage = function(){
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});
	infoWindow.open(map, marker);
};

var clearMarkers = function(){
	markers.forEach(function(marker){
		marker.setMap(null);
	});
	markers = [];
};

$(document).ready(function(){   
	$("form").validate({
		errorClass: "error",
		errorPlacement: function(error, element){
			error.insertAfter(element);
		},

		submitHandler: function(){
            getUserInput();
            placeMarker();
            if($("#message").val()){
            	showMessage();
            }           
		},
		rules: {
			lat: {
				required: true,
				range: [-90, 90]
			},
			lng: {
				required: true,
				range: [-180, 180]
			}
		},
	});

	$("#clear").click(function(event){
		event.preventDefault();
		clearMarkers();
	})
})
