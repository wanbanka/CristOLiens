# CristOLiens

Lors de l'année de licence professionnelle CRRW à Champs-sur-Marne, nous devions par grouper réaliser un projet numérique pour le compte de la mairie de Créteil. Notre groupe de projet devait créer une application mobile qui regroupe des parcours dans la ville, reliant différents points d'intérêt. Cette application est construite grâce au framework mobile OnsenUI et à la plate-forme Monaca (à installer en suivant [les instructions suivantes](https://github.com/wanbanka/CristOLiens/blob/master/www/lib/onsenui/README.md)). 

Cette application utilise les frameworks et outils suivants: 

![Logo Leaflet](https://leafletjs.com/docs/images/logo.png) 

* [Leaflet](https://leafletjs.com/): librairie JavaScript générant des cartes interactives. Elle comprend également une liste de plugins pour enrichir les fonctionnalités de l'application. CristOLiens en comprend deux: 
    * [Leaflet GPS](https://www.npmjs.com/package/leaflet-gps): plugin gérant la géolocalisation et le tracking de l'appareil. 
    * [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/): plugin permettant la création de tracés d'itinéraires entre plusieurs points. 

![Logo JQuery](https://upload.wikimedia.org/wikipedia/fr/thumb/b/b3/Jquery-logo.png/330px-Jquery-logo.png)

* [JQuery](https://jquery.com/): librarie JavaScript permettant de faciliter les appels AJAX pour récupérer les différentes informations stockées dans une base de données MySQL (description des lieux, parcours...).

![Logo Mapbox](https://miro.medium.com/max/2083/0*ok6yuDnTx4o2PSFx.png)

* [Mapbox](https://www.mapbox.com/): service de cartographie open-source en ligne. L'API Directions a été utilisée, afin de récupérer les instructions GPS, permettant à l'utilisateur de mieux se repérer dans son parcours. 

Voici les différentes étapes pour visualiser le projet: 

