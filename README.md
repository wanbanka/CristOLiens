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

* [Mapbox](https://www.mapbox.com/): service de cartographie open-source en ligne. L'API Directions a été utilisée, afin de récupérer les instructions GPS, permettant à l'utilisateur de mieux se repérer dans son parcours. 

Voici les différentes étapes pour visualiser le projet sur ordinateur: 


1. Si vous n'avez pas installé NodeJS, voici le [lien d'installation](https://nodejs.org/en/)
2. Sur NodeJS, installez OnsenUI: `npm install onsenui`. 
3. Puis installez Monaca: `npm install -g monaca`
4. Téléchargez ou clonez le dépôt (`git clone https://github.com/wanbanka/CristOLiens.git`, puis `git pull`)
5. En ligne de commande, placez-vous dans le dossier du projet
6. Puis tapez `npm run monaca:preview`. Le navigateur s'ouvre avec la visualisation de votre projet. 

**ATTENTION**: La géolocalisation n'est pas très opérationnelle sur ordinateur. 

Pour visualiser le projet sur téléphone (Android uniquement): 

1. Créez un compte sur [Monaca](https://monaca.io), puis connectez-vous. Choisissez l'abonnement gratuit.
2. Allez sur "Import", puis sur "Upload Project Package" (compressez au préalable le dossier du projet).
3. Cliquez sur le projet, puis sur "Open in Cloud IDE". Vous arrivez sur l'IDE de Monaca, avec le projet.
4. Sur le menu en haut, cliquez sur "Build", puis sur "Build app for Android". 
5. Laissez les options "Build for debugging" et "Debug Build" activées, puis cliquez sur "Start Build". Un fichier APK sera téléchargé automatiquement.
6. Transférez le fichier APK dans votre téléphone.
7. Sur votre téléphone, allez sur les fichiers du téléphone, puis sur "Fichiers installés". Vous devrez normalement retrouver le fichier transféré. 
8. Cliquez sur le fichier, puis sur Installer. Et vous pouvez enfin visualiser l'application sur votre téléphone !
