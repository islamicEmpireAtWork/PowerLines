
      /*var points = new L.GeoJSON.AJAX("http://myjson.com/1foo5i");
      */

      /*
       * Create the map
       */
      var acwUrl = 'https://{s}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul-bw/{z}/{x}/{y}.png';
      var acwAttrib = 'Tiles &copy; Mapbox &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
      var acw = L.tileLayer(acwUrl, {
        maxZoom: 18,
        attribution: acwAttrib,
        noWrap: true
      });

      var map = L.map('map', {
        layers: [acw],
        center: new L.LatLng(30,55),
        zoom: 4,
        maxBounds: [[90,-180], [-90, 180]]
      });


      var slider = L.timelineSliderControl({
        enableKeyboardControls: true,
        duration: 70000,
        formatOutput: function(date){
          return moment(date).format("YYYY");
        }
      });
      map.addControl(slider);

      function updateList(timeline){
        var displayed = timeline.getLayers();
        var list = document.getElementById('displayed-list');
        list.innerHTML = "";
        displayed.forEach(function(el){
          var li = document.createElement('li');
          if (el.feature.properties.sidebar) {
            li.innerHTML = el.feature.properties.sidebar;
            list.appendChild(li)
            };
        });
      }

      function linePopUp (feature, layer) {
          if (feature.properties && feature.properties.name) {
              layer.bindPopup(
                  '<h3><i>' + feature.properties.name + '</i></h3>'
                  + '<p><b>Dates:</b> ' + feature.properties.start + ' to ' + feature.properties.end +'</p>'
                  + '<p><b>Notes:</b> ' + (feature.properties.notes ? feature.properties.notes : 'No notes') + '</p>'
                );
                layer.on('mouseover', function(event) {
            			layer.openPopup();
            		});
            		layer.on('mouseout', function(event) {
            			layer.closePopup();
            		});
              }
          };


      function pointPopUp (feature, layer) {
          if (feature.properties && feature.properties.name) {
                layer.bindPopup(
                  "<h1>" + feature.properties.name + '</h1>'
                  + '<p><i>' + feature.properties.capital_type + '</i></p>'
                  + '<p><b>Notes:</b> ' + (feature.properties.notes ? feature.properties.notes : 'No notes') + '</p>'
                );
                layer.on('mouseover', function(event) {
            			layer.openPopup();
            		});
            		layer.on('mouseout', function(event) {
            			layer.closePopup();
            		});
              }
          };

      var linestringTimeline = L.timeline(linestrings, {
          onEachFeature: linePopUp,
          style: function(feature) {
              return {
                  "weight": feature.properties.marker_size * feature.properties.marker_size / 2,
                  "color": feature.properties.marker_colour,
                  "opacity": 0.7}
                  }
              }
          );
      linestringTimeline.addTo(map);

      var pointTimeline = L.timeline(
          points,
          {
              onEachFeature: pointPopUp,
              pointToLayer: function(feature, latlng) {
                  return L.shapeMarker (
                      latlng,
                      {
                          radius: feature.properties.marker_size * 1.5,
                          color: "#fff",
                          shape: feature.properties.shape,
                          weight: 1,
                          opacity: 1,
                          fillColor: feature.properties.marker_colour,
                          fillOpacity: 0.5
                      }
                  )
              }
          }
      );
      pointTimeline.addTo(map);

      pointTimeline.on('change', function(e){
        updateList(e.target);
        });
       updateList(pointTimeline);

      slider.addTimelines(linestringTimeline, pointTimeline);

/* Open */
function openNav() {
document.getElementById("myNav").style.width = "20%";
}

/* Close */
function closeNav() {
document.getElementById("myNav").style.width = "0%";
closeMenuDivs();
}

/* Open Mental Maps div */
function openMMDiv() {
  document.getElementsByClassName("admin-maps-menu")[0].style.width = "0vw";
  document.getElementsByClassName("mental-maps-menu")[0].style.width = "150px";
}

function closeMMDiv() {
  document.getElementsByClassName("mental-maps-menu")[0].style.width = "0vw";
}

/* Open Admin Maps div */
function openAMDiv() {
  document.getElementsByClassName("mental-maps-menu")[0].style.width = "0vw";
  document.getElementsByClassName("admin-maps-menu")[0].style.width = "150px";
}

function closeAMDiv() {
  document.getElementsByClassName("admin-maps-menu")[0].style.width = "0vw";
}

/* Close all menus */
function closeMenuDivs() {
  document.getElementsByClassName("mental-maps-menu")[0].style.width = "0vw";
  document.getElementsByClassName("admin-maps-menu")[0].style.width = "0vw";
}
