# CristOLiens

![Logo CristOLiens](https://github.com/wanbanka/CristOLiens/blob/master/res/android/icon/xxxhdpi.png?raw=true)

Lors de l'année de licence professionnelle CRRW à Champs-sur-Marne, nous devions par groupe réaliser un projet numérique pour le compte de la mairie de Créteil. Notre groupe de projet devait créer une application mobile qui regroupe des parcours dans la ville, reliant différents points d'intérêt. Cette application est construite grâce au framework mobile [OnsenUI](https://onsen.io/) et à son écosystème [Monaca](https://monaca.io/). 

Cette application utilise les frameworks et outils suivants: 

![Logo Leaflet](https://leafletjs.com/docs/images/logo.png) 

* [Leaflet](https://leafletjs.com/): librairie JavaScript générant des cartes interactives. Elle comprend également une liste de plugins pour enrichir les fonctionnalités de l'application. CristOLiens en comprend deux: 
    * [Leaflet GPS](https://www.npmjs.com/package/leaflet-gps): plugin gérant la géolocalisation et le tracking de l'appareil. 
    * [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/): plugin permettant la création de tracés d'itinéraires entre plusieurs points. 

![Logo JQuery](https://upload.wikimedia.org/wikipedia/fr/thumb/b/b3/Jquery-logo.png/330px-Jquery-logo.png)

* [JQuery](https://jquery.com/): librarie JavaScript permettant de faciliter les appels AJAX pour récupérer les différentes informations stockées dans une base de données MySQL (description des lieux, parcours...).

![Logo Mapbox](https://miro.medium.com/max/2083/0*ok6yuDnTx4o2PSFx.png)

* [Mapbox](https://www.mapbox.com/): service de cartographie open-source en ligne. L'API Directions a été utilisée, afin de récupérer les instructions GPS, permettant à l'utilisateur de mieux se repérer dans son parcours. Son service de routing a également permis de générer les tracés d'itinéraires avec Leaflet Routing Machine.

Voici les différentes étapes pour visualiser le projet sur ordinateur: 


1. Si vous n'avez pas installé NodeJS, voici le [lien d'installation](https://nodejs.org/en/)
2. Sur NodeJS, installez OnsenUI: `npm install onsenui`. 
3. Puis installez Monaca: `npm install -g monaca`
4. Téléchargez ou clonez le dépôt (`git clone https://github.com/wanbanka/CristOLiens.git`, puis `git pull`)
5. En ligne de commande, placez-vous à la racine du dossier du projet
6. Puis tapez `npm run monaca:preview`. Le navigateur s'ouvre avec la visualisation de votre projet. 

**ATTENTION**: La géolocalisation n'est pas opérationnelle sur ordinateur. 

Pour visualiser le projet sur téléphone (Android uniquement): 

1. En ligne de commande, placez-vous à la racine du dossier du projet.
2. Tapez `monaca build`.
3. Une fois l'opération effectuée, dirigez-vous vers le dossier `platforms\android\build\outputs\apk` de votre projet. Vous trouverez un fichier APK nommé `android-debug.apk`. Cela signifie que le build de l'application a bien été effectuée. 
4. Transférez le fichier APK dans votre téléphone.
5. Sur votre téléphone, allez sur les fichiers du téléphone, puis sur "Fichiers installés". Vous devrez normalement retrouver le fichier transféré. 
6. Cliquez sur le fichier, puis sur Installer. Et vous pouvez enfin visualiser l'application sur votre téléphone !
