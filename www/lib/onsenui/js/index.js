
         console.log('Ready');
          var globalLatLng;
          timer = -1;
          
          document.addEventListener('init', function(e){
         var page = e.target;
        console.log(page.id);
              
              var tinnedGps = {lat: 0, lng: 0};
          var navigatorM = document.querySelector('#myNavigator');
              
              
              tracesItineraires = [], map = undefined, tableauPoints = [], index = 0;
                     
                     function convertToMinutes(duration){
                         var duration = ""+ duration/60 + "";
                         
                         if(duration.indexOf('.') !== -1){
                             var tableau = duration.split('.');
                             tableau[1] = "0." + tableau[1];
                             var seconds = parseFloat(tableau[1]) * 60;
                             
                             return tableau[0] + "min" + Math.round(seconds) + "s";
                         } else {
                             return duration + "min";
                         }
                     }
                     
                     function convertToKilometers(distance){
                         return (distance/1000).toPrecision(3);
                     }
              
              
              function appelParcours(type, tableauLieux = []){
                  if(type === "secteur"){
                                          $.ajax({
                               url: 'https://theosenilh.fr/api_appli_creteil/liste_points_interet_parcours.php',
                                method: 'GET',
                                data: {api_key: "jdhey7te6", parcours_id: parseInt(page.data.id)},
                                dataType: 'json',
                                success: function(data){
                                    
                                    (function(){
                         $('.leaflet-top.leaflet-right').hide();
                         
                         $('.leaflet-bar.gps-control').hide();
                     })();
                                    
                                    console.log(data);
                                    
                                    var tableauWaypoints = [];
                                        
                                        $.each(data, function(i){
                                       tableauWaypoints.push(L.latLng(parseFloat(data[i].latitude_point_interet), parseFloat(data[i].longitude_point_interet))); 
                                    });
                                    
                                    if(index > 0){
                                        tableauWaypoints.slice(index);
                                    }
                                    
                                    intervalleAppel('map_parcours', tableauWaypoints, type);
                                    
                                }
                                              
                            });
                                      } else if(type === "theme"){
                                          $.ajax({
                                             url: "https://theosenilh.fr/api_appli_creteil/liste_points_interet_theme.php",
                                              method: 'GET',
                                              data: {api_key: "jdhey7te6", theme_id: parseInt(page.data.id)},
                                              dataType: 'json',
                                              success: function(data){
                    (function(){
                         $('.leaflet-top.leaflet-right').hide();
                         
                         $('.leaflet-bar.gps-control').hide();
                     })();
                                    
                                    console.log(data);
                                    
                                    var tableauWaypoints = [];
                                        
                                        $.each(data, function(i){
                                       tableauWaypoints.push(L.latLng(parseFloat(data[i].latitude_point_interet), parseFloat(data[i].longitude_point_interet))); 
                                    });
                                                  
                                                  if(index > 0){
                                        tableauWaypoints.slice(index);
                                    }
                                    
                                    console.log(tableauWaypoints);
                                                  
                                                  intervalleAppel('map_parcours', tableauWaypoints, type);
                                    
                                }
                                          });
              } else if(type === "perso" && tableauLieux.length > 0){
                  
                  if(index > 0){
                                        tableauLieux.slice(index);
                                    }
                  
                  intervalleAppel('mapperso', tableauLieux, type);
              }
                  
              }
              
              
              
              function appelMapbox(latlng, tableauWaypoints, type){
                  
                  if(tableauPoints.length === 0){
                      tableauWaypoints.splice(0, 0, latlng);
                      tableauPoints = tableauWaypoints;
                  } else {
                      tableauWaypoints.splice(0, 1, latlng);
                  }
                  
                  console.log(tableauWaypoints);
                         
                         if(latlng == undefined || latlng == null){
                             latlng = globalLatLng;
                             console.log(latlng);
                         } else {
                             globalLatLng = latlng;
                         }
                         
                         console.log("appel " + latlng);
                         
                         var waypoint = L.latLng(latlng.lat, latlng.lng);
                             
                             map.setView([latlng.lat, latlng.lng], 17);
                  
                  map.setMinZoom(16);
                  
                  map.setMaxZoom(17);
                  
                  console.log(tracesItineraires);
                         
                         if(tracesItineraires.length > 0){
                             map.removeControl(tracesItineraires[0]);
                             
                             tracesItineraires = [];
                         }
                             
                            var routing = L.Routing.control({
                  waypoints: tableauWaypoints,
                         language: 'fr',
                          router: L.Routing.mapbox("pk.eyJ1IjoidG9ueXlhbWkiLCJhIjoiY2p3eDlrbHE4MGJ4NzN6cGphdXM5NmlxNiJ9.u_zQPHlie8Fu6q6WjYcT6w", {profile: "mapbox/walking"}),
                             lineOptions: {
                                            addWaypoints: false,
                                 draggableWaypoints: false
                                        },
                                 createMarker: function(i, waypoint){
                                     if(i === 0){
                                         
                                         var myIcon = L.icon({
                                            iconUrl: 'img/pointer.gif',
                                             iconSize: [60, 60]
                                         });
                                         
                                         return L.marker(waypoint.latLng, {icon: myIcon});
                                     } else {
                                         return L.marker(waypoint.latLng);
                                     }
                                 }
              });
                         tracesItineraires.push(routing);
                         
                         routing.addTo(map).on('routesfound', function(){
                        page.querySelector('.leaflet-top.leaflet-left .leaflet-control-zoom .leaflet-control-zoom-out').click(); 
                                    });
                  
                  var chaine = "";
                  
                  for(var m = 0; m < tableauWaypoints.length; m++){
                      chaine +=  "" + tableauWaypoints[m].lng + "," + tableauWaypoints[m].lat;
                      
                      if(m !== tableauWaypoints.length - 1){
                          chaine += ";";
                      }
                  }
                     
                     var coords = encodeURI(chaine);
                     
                     
                     
                     $.ajax({
                        url: 'https://api.mapbox.com/directions/v5/mapbox/walking/' + coords + '.json',
                         method: 'GET',
                         data: {access_token: "pk.eyJ1IjoidGhlb2Rvcm9zIiwiYSI6ImNqb2sxdW01YTAyN28zb21uY21jeXMzY3cifQ._g5OAq0Wjfou_LsBW07TAQ", steps: "true", banner_instructions: "true", language: "fr"},
                         dataType: 'json',
                         success: function(data){
                             
                             var turnInstruction;
                             
                             console.log(data);
                             
                             console.log(convertToMinutes(data.routes[0].duration));
                             
                             console.log(convertToKilometers(data.routes[0].distance));
                             
                             console.log(convertToKilometers(data.routes[0].distance) <= 0.01);
                             
                             if(data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.type === "arrive"){
                                 turnInstruction = "arrive";
                             } else {
                                 
                                 console.log(data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.modifier);
                                 switch(data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.modifier){
                                 case "straight":
                                     turnInstruction = "continue";
                                     break;
                                     
                                 case "slight left":
                                     turnInstruction = "bear-left";
                                     break;
                                     
                                 case "slight right":
                                     turnInstruction = "bear-right";
                                     break;
                                     
                                 case "sharp right":
                                     turnInstruction = "sharp-right";
                                     break;
                                     
                                 case "sharp left":
                                     turnInstruction = "sharp-left";
                                     break;
                                     
                                 case "uturn":
                                     turnInstruction = "u-turn";
                                     break;
                                     
                                 default:
                                     turnInstruction = data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.type + "-" + data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.modifier;
                                     break;
                                     
                             }
                                 
                             }
                             
                             if(turnInstruction === "fork-right" || turnInstruction === "fork-left"){
                                 turnInstruction = "bear-" + data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.modifier;
                             }
                             
                             console.log(turnInstruction);
                             
                             $('.leaflet-top.leaflet-right').html('<div class="leaflet-routing-container leaflet-bar leaflet-routing-collapsible leaflet-control"><div class="leaflet-routing-alternatives-container"><div class="leaflet-routing-alt"><div><span class="leaflet-routing-icon leaflet-routing-icon-'+ turnInstruction +'"></span></div><strong>'+ data.routes[0].legs[0].steps[0].distance.toPrecision(3) +' m</strong><h1>' + data.routes[0].legs[0].steps[0].bannerInstructions[0].primary.text + '</h1></div></div></div>').show();
                             
                             $('.leaflet-top.leaflet-right .leaflet-routing-container .leaflet-routing-alternatives-container .leaflet-routing-alt').append('<blockquote><strong>'+ convertToKilometers(data.routes[0].distance) +'km, '+ convertToMinutes(data.routes[0].duration) +'</strong><br><br><i>'+ convertToKilometers(data.routes[0].legs[0].distance) +'km avant le prochain point d\'intérêt</i></blockquote>');
                             
                             if(convertToKilometers(data.routes[0].distance) <= 0.1){
                                 ons.notification.alert("<h3>Parcours terminé</h3>").then(function(){
                                    navigatorM.popPage(); 
                                    
                                 });
                             }
                             
                             if(convertToKilometers(data.routes[0].legs[0].distance) <= 0.1){
                                 
                                 $.ajax({
                     url: 'https://theosenilh.fr/api_appli_creteil/places_by_latlng.php',
                         method: 'GET',
                         data: {api_key: "jdhey7te6", lat: tableauPoints[1].lat, lng: tableauPoints[1].lng},
                         dataType: 'json',
                         success: function(data){
                             
                             console.log(data);
                             
                             var json_infos;
                             
                             json_infos = data[0];
                             
                             console.log(json_infos);
                             
                             var chaine_html = "<h3>"+ json_infos.nom_point_interet +"</h3><img src=\""+ json_infos.photo_point_interet +"\" alt=\"Photo du lieu\" title=\"Photo du lieu\"><br><br><p>"+ json_infos.description_point_interet +"</p><i>"+ json_infos.adresse_point_interet +"</i>";
                             
                             ons.notification.alert(chaine_html).then(function(){
                                 index += 1;
                                 
                                 if(type === "perso"){
                                     appelParcours(type, tableauWaypoints);
                                 } else {
                                     appelParcours(type);
                                 }
                                 
                             });
                         }
                  });
                                 
                             }
                             
                         }
                     });
                     }
              
              function intervalleAppel(nomCarte, tableauWaypoints, type){
                         
                     console.log("Réactualisé");
                     
                         if(map != undefined || map != null){
                             map.remove();
                         }
                         
                      map = L.map(nomCarte);
              var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
              var osmAttrib = "Map data © OpenStreetMap contributors";
                  
                  var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
              
                         console.log("Réactualisé 2");
                         
              map.addLayer(osm);
                         
                         console.log("Réactualisé 3");
                         
                         var tableauLatlng = [];
                  
                  console.log(tableauWaypoints);
                             
                             new GPSControl({
                         successCallback: function(latlng){
                             
                             console.log("Réactualisé 4");
                             
                             $('.leaflet-bar.gps-control').hide();
                             
                             console.log(latlng);
                             
                             if(tableauLatlng.length > 0){
                                     for(var k = 0; k < tableauLatlng.length; k++){
                                         map.removeLayer(tableauLatlng[k]);
                                     }
                                     
                                     tableauLatlng = [];
                                 }
                             
                             
                             appelMapbox(latlng, tableauWaypoints, type);
                             
                             
                             map.eachLayer(function(layer){
                                 
                                 console.log(layer);
                                 
                                if(layer._latlng){
                                   tableauLatlng.push(layer);
                                }
                         });
                             
                             
                             
                         }
                     }).addTo(map);
                     
    
                }
              
              
              
              
              if(page.id === "home"){
                  tableauPoints = [], index = 0;
                  
                  var tableauLiens = page.querySelectorAll('.homebackground .homemask ons-list-item');
                  
                  for(var i = 0; i < tableauLiens.length; i++){
                      tableauLiens[i].addEventListener('click', function(){
                          navigatorM.pushPage(this.id);
                      });
                  }
              } else if (page.id === 'liste_pt_interet'){
                  
                  tableauPoints = [], index = 0;
                  
                  function clickListItem(navigation){
                      $('ons-list-item').on('click', function(){
                                    navigation.pushPage('pt_interet.html', {data: {id: $(this).attr('tabindex')}}); 
                                 });
                  }
                  
                  function appelListItems(){
                      $.ajax({
                            url: 'https://theosenilh.fr/api_appli_creteil/json_coords.php',
                             method: 'GET',
                             data: {api_key: 'jdhey7te6', location_id: 'all'},
                             dataType: 'json',
                             success: function(data){
                                 
                                 var chaine = "";
                                 
                                 for(var i = 0; i < data.length; i++){
                                     chaine += '<ons-list-item tappable tabindex="'+ data[i].id_point_interet +'"><div class="left"><img class="list-item__thumbnail" src="'+ data[i].photo_point_interet +'"></div><p>'+ data[i].nom_point_interet +'</p></ons-list-item>';
                                 }
                                 
                                 $('ons-list').html(chaine);
                                 
                                 clickListItem(navigatorM);
                                 
                             }
                         });
                  }
                  
                  $('ons-list').html('<br><br><div class="center"><ons-progress-circular indeterminate class="center"></ons-progress-circular></div>');
                  
                  appelListItems();
                  
                  
                  $('ons-search-input').on('keyup', function(e){
                      var valeur = $('ons-search-input').val().trim();
                      
                      if(valeur !== ""){
                           $.ajax({
                         url: 'https://theosenilh.fr/api_appli_creteil/search_coords.php',
                         method: 'GET',
                         data: {api_key: "jdhey7te6", cherche: valeur},
                         dataType: 'json',
                         success: function(data){
                             
                             var chaine = "";
                                 
                             console.log(data);
                             
                             
                                 if(data.length !== 0){
                                     for(var i = 0; i < data.length; i++){
                                     chaine += '<ons-list-item tappable tabindex="'+ data[i].id_point_interet +'"><div class="left"><img class="list-item__thumbnail" src="'+ data[i].photo_point_interet +'"></div><p>'+ data[i].nom_point_interet +'</p></ons-list-item>';
                                         
                                     }
                                         
                                         $('ons-list').html(chaine);
                                     
                                     clickListItem(navigatorM);
                                         
                                 } else {
                                     $('ons-list').html('<br><br><p class="center"><ons-icon icon="md-block-alt" size="20px"></ons-icon>&nbsp;Pas de résultats à votre recherche</p>');
                                 }
                             
                             
                         }
                     });
                      } else {
                            
                            appelListItems();
                              
                            }
                      
                    
                  });
                  
                  
                         
                         } else if(page.id === "pt_interet"){
                             
                             tableauPoints = [], index = 0;
                             
                             $.ajax({
                                url: 'https://theosenilh.fr/api_appli_creteil/json_coords.php',
                                 method: 'GET',
                                 data: {api_key: 'jdhey7te6', location_id: parseInt(page.data.id)},
                                 dataType: 'json',
                                 success: function(data){
                                     
                                     
                                     for(var i = 0; i < data.length; i++){
                                         
                                         var chaine = "";
                                         
                                         page.querySelector('.center').textContent = data[i].nom_point_interet;
                                         
                                         $('ons-card img').attr('src', data[i].photo_point_interet);
                                         
                                         $('ons-card img').attr('alt', data[i].nom_point_interet);
                                         
                                         $('ons-card img').attr('title', data[i].nom_point_interet);
                                         
                                         $('.title').text(data[i].nom_point_interet);
                                         
                                         chaine += "<i>"+ data[i].adresse_point_interet +"</i><br><p>"+ data[i].description_point_interet +"</p>";
                                         
                                         if(data[i].autres_images_point_interet !== "" && data[i].autres_images_point_interet !== null){
                                             var tableau = JSON.parse(data[i].autres_images_point_interet);
                                             
                                             chaine += "<br><section>";
                                             
                                             for(var j = 0; j < tableau.length; j++){
                                                 chaine += '<img src="'+ tableau[j] +'" alt="'+ tableau[j] +'" title="'+ tableau[j] +'" width="20%" height="20%">';
                                             }
                                             
                                             chaine += "</section>";
                                         }
                                         
                                         $('.content').html(chaine);
                                         
                                     }
                                 }
                             });
                             
                             
                         } else if(page.id === "carte"){
                             
                             tableauPoints = [], index = 0;
              
              function afficheMarkers(infoRecup, map){
                  
                  $.ajax({
                  url: 'https://theosenilh.fr/api_appli_creteil/json_coords.php',
                  method: 'GET',
                  data: {api_key: 'jdhey7te6', location_id: infoRecup},
                  dataType: 'json',
                 success: function(data){
                     
                     if(infoRecup === "all"){
                      map.setView([48.7942, 2.46172], 15);
                  } else {
                      map.setView([parseFloat(data[0].latitude_point_interet), parseFloat(data[0].longitude_point_interet)], 18);
                  }
                     
                     var json_autres_images = [];
                     
                     for(var i = 0; i < data.length; i++){
                         
                         var marker = L.marker([parseFloat(data[i].latitude_point_interet), parseFloat(data[i].longitude_point_interet)]);
                         
                         if(data[i].autres_images_point_interet !== "" && data[i].autres_images_point_interet !== null){
                             
                             var tableau = JSON.parse(data[i].autres_images_point_interet);
                             
                             json_autres_images.push(tableau);
                         } else {
                             json_autres_images.push("");
                         }
                     
                     marker.bindPopup("<h1>"+ data[i].nom_point_interet +"</h1><img src=\""+ data[i].photo_point_interet +"\" width=\"100\" height=\"100\"><br><i>Adresse: </i><strong>"+ data[i].adresse_point_interet +"</strong><br><br><p>"+ data[i].description_point_interet +"</p><br>" + recupereDonnees(json_autres_images, i));
                     
                     marker.addTo(map);
                         
                     }
                 } 
              });
              }
              
              function latLngMarker(infoRecup, map){
                  
                 return $.ajax({
                  url: 'https://theosenilh.fr/api_appli_creteil/json_coords.php',
                  method: 'GET',
                  data: {api_key: 'jdhey7te6', location_id: infoRecup},
                  dataType: 'json'
                  });
              }
              
              function recupereDonnees(tableau_images, index){
                  
                  var chaine = "";
                  
                  if(tableau_images){
                      if(tableau_images[index] !== "" && tableau_images[index] !== null){
                      for(var i = 0; i < tableau_images[index].length; i++){
                         chaine += "<img src=\""+ tableau_images[index][i] +"\" width=\"100\" height=\"100\">"; 
                      }
                  }
                  }
                  
                  return chaine;
              }
              
              function autocompleteSearch(requete, search, autoriseBoucle, map){
                  
                  var listItems = $(requete);
                  
                  console.log(listItems);
                  
                  if(autoriseBoucle){
                          listItems.on('click', function(){
                          search.val($(this).find(".center h1").text());
                              
                              afficheMarkers(parseInt($(this).find(".center p").text()), map);
                              
                          $('#places_list').html('');
                          
                      });
                  
                  }
              }
              
              
              var mapid = L.map('mapid');
              var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
              var osmAttrib = "Map data © OpenStreetMap contributors";
                  
                  var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
              
              mapid.addLayer(osm);
              
              afficheMarkers("all", mapid);
                  
                  
              
              $('ons-page ons-search-input').on('keyup', function(){
                 
                  var valeur = $('ons-page ons-search-input').val();

                  if(valeur !== ""){
                      $.ajax({
                     url: 'https://theosenilh.fr/api_appli_creteil/search_coords.php',
                      method: 'GET',
                      data: {api_key: "jdhey7te6", cherche: valeur.trim()},
                      dataType: 'json',
                      success: function(data){
                          
                          var chainehtml = "";
                          
                              if(data.length !== 0){
                              for(var i = 0; i < data.length; i++){
                              chainehtml += '<ons-list-item modifier="longdivider" tappable><h1>'+ data[i].nom_point_interet +'</h1><i>'+ data[i].adresse_point_interet +'</i><p style="display: none;">'+ data[i].id_point_interet +'</p></ons-list-item>';
                          }
                          } else {
                              chainehtml = '<ons-list-item modifier="longdivider"><p>Pas de correspondance</p></ons-list-item>';
                          }
                              $('#places_list').html(chainehtml);
                          autocompleteSearch('#places_list ons-list-item', $('ons-search-input'), (data.length !== 0), mapid);
                          
                      }
                  });
                      
                  } else {
                      $('#places_list').html("");
                  }
                  
                  
              });
                } else if(page.id === "liste_parcours"){
                    
                    tableauPoints = [], index = 0;
                    
                    function listeParcours(option){
                            return $.ajax({
                               url: "https://theosenilh.fr/api_appli_creteil/liste_parcours.php",
                                method: 'GET',
                                data: {api_key: "jdhey7te6", parcours_id: option},
                                dataType: 'json'
                            });
                        }
                    
                    function listeThemes(option){
                        return $.ajax({
                           url: 'https://theosenilh.fr/api_appli_creteil/liste_themes.php',
                            method: 'GET',
                            data: {api_key: "jdhey7te6", theme_id: option},
                            dataType: 'json'
                        });
                    }
                    
                    listeParcours("all").done(function(data){
                        var chaine = "<ons-list-header>Parcours par secteur</ons-list-header>";
                        
                        $.each(data, function(i){
                            chaine += "<ons-list-item class=\"sector\" tappable tabindex=\""+ data[i].id_parcours +"\">"+ data[i].nom_parcours +"</ons-list-item>";
                        });
                        
                        $('.card_sector').html(chaine);
                        
                     $('ons-list-item.sector').on('click', function(){
                            document.querySelector('ons-navigator').pushPage('carte_parcours.html', {data: {id: $(this).attr('tabindex'), title: $(this).text(), type: "secteur"}});
                        });
                    });
                    
                    listeThemes("all").done(function(data){
                        var chaine = "<ons-list-header>Parcours par thème</ons-list-header>";
                        
                        $.each(data, function(i){
                            chaine += "<ons-list-item class=\"theme\" tappable tabindex=\""+ data[i].id_theme +"\">"+ data[i].nom_theme +"</ons-list-item>";
                        });
                        
                        $('.card_theme').html(chaine);
                        
                     $('ons-list-item.theme').on('click', function(){
                            document.querySelector('ons-navigator').pushPage('carte_parcours.html', {data: {id: $(this).attr('tabindex'), title: $(this).text(), type: "theme"}});
                        });
                    });
                    
                    page.querySelector('ons-button').addEventListener('click', function(){
                                navigatorM.pushPage('perso_parcours.html'); 
                             });
                        
                        } else if(page.id === "perso_parcours"){
                            
                            checkedPlaces = [];
                            
                            tableauPoints = [], index = 0;
                            
                            $('ons-list').html('<br><br><div class="center"><ons-progress-circular indeterminate class="center"></ons-progress-circular></div>');
                           
                            $.ajax({
                            url: 'https://theosenilh.fr/api_appli_creteil/json_coords.php',
                             method: 'GET',
                             data: {api_key: 'jdhey7te6', location_id: 'all'},
                             dataType: 'json',
                             success: function(data){
                                 
                                 var chaine = "";
                                 
                                 for(var i = 0; i < data.length; i++){
                                     chaine += '<ons-list-item tappable><label class="left"><ons-checkbox input-id="'+ data[i].id_point_interet +'" value="['+ data[i].latitude_point_interet +', '+ data[i].longitude_point_interet +']"></ons-checkbox></label><label for="'+ data[i].id_point_interet +'" class="center">'+ data[i].nom_point_interet +'</label></ons-list-item>';
                                 }
                                 
                                 $('ons-list').html(chaine);
                                 
                                 $('ons-list ons-list-item').on('click', function(){
                                     checkedPlaces = $('ons-list ons-list-item ons-checkbox :checkbox:checked');
                                     console.log(checkedPlaces);
                                 });
                                 
                                 $('ons-button').on('click', function(){
                                    navigatorM.pushPage('perso_carte.html', {data: {checked_elements: checkedPlaces}}); 
                                 });
                                 
                             }
                         });
                            
                        } else if(page.id === "perso_carte"){
                             
                            
                            var tableauLieux = [];
                            
                            console.log(page.data.checked_elements);
                            
                            (function(){
                         $('.leaflet-top.leaflet-right').hide();
                         
                         $('.leaflet-bar.gps-control').hide();
                     })();
                                
                                for(var i = 0; i < page.data.checked_elements.length; i++){
                                    tableauLieux.push(L.latLng(JSON.parse($(page.data.checked_elements[i]).val())));
                                }
                            
                            appelParcours("perso", tableauLieux);
                                  
                                  } else if(page.id === "carte_parcours"){
                        
                            page.querySelector('ons-toolbar .center').textContent = page.data.title;
                                      
                                      appelParcours(page.data.type);
                            
                 } /* else if(page.id === "about"){
                     
                     (function(){
                         $('.leaflet-top.leaflet-right').hide();
                         
                         $('.leaflet-bar.gps-control').hide();
                     })();
                     
                     intervalleAppel('maptest', [L.latLng(48.8366345, 2.5838218)]);
                     
//Utile pour tester l'appli sans se déplacer
                     
//timer = setInterval(appelMapbox, 5000);
                     
                     
    }*/
          
      });