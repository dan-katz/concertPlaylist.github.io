  var marker;
  var circleMark;
  var myLat = 42.39674;
  var myLng = -71.121815
  var me = new google.maps.LatLng(myLat, myLng);
  var map;
  var cirlceRadius = 5;
  var timeStep = '1 month';
  var request = new XMLHttpRequest();

    function initMap()
    {
      infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: me
        });
        getGeolocation();
        circleRadius = 5;
    }

    function getGeolocation()
    {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          myLat = position.coords.latitude;
          myLng = position.coords.longitude;
          renderMap();
          addCircle();
        });
      }
      else {
        alert("Geolocation not supported by your browser");
      }
    }

    function renderMap()
    {
      me = new google.maps.LatLng(myLat, myLng);
      map.panTo(me);
      marker = new google.maps.Marker({
        position: me
      });
      marker.setMap(map);
      /*google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent("Closest T-Stop: " + findClosestStop());
          infowindow.open(map, marker);
      });*/
    }

    function makeMarker(options) {
        circleMark = new google.maps.Circle(options);
        circleMark.setMap(map);
    }

    function addCircle()
    {
      let circleOptions = {
            map: map,
            fillColor: "#FF0000",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeWeight: 1,
            center: me,
            radius: 5*1609,
        };
      makeMarker(circleOptions);
    }

    function removeCircle(val) {
      if (circleMark) {
        circleMark.setMap(null);
      }

      circleRadius = val;
      console.log(val);
        let circleOptions = {
              map: map,
              fillColor: "#FF0000",
              fillOpacity: 0.5,
              strokeColor: "#FF0000",
              strokeWeight: 1,
              center: me,
              radius: val*1609,
          };
        makeMarker(circleOptions);
    }

    function setTimestep (step) {
      console.log(step);
      timeStep = step;
    }

    function print() {
      console.log(circleRadius);
      console.log(timeStep);
      getAuth();
    }

    function getAuth() {
      function fetchOthers()
      {
        request.open("GET", "https://localhost:8888/login", true);
        /*request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
          if (request.readyState == 4 && request.status == 200) {
            locations = JSON.parse(request.responseText);
						console.log(locations)
            mode = Object.keys(locations)[0];
            text = document.getElementById("num");
            text.innerHTML = 'Number of available ' + mode + ': ' + locations[mode].length;
						renderMap();
          }
        }*/

        request.send();
      }
    }

    // var slider = new Slider("#ex8", {
    //   tooltip: 'always'
    // });
