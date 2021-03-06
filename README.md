# Instructions

## Build app
```
yarn install
yarn start
```

## Dépendances
- Framework : [React v17](https://github.com/facebook/react)
- Router : [React Router v6](https://github.com/ReactTraining/react-router)
- Weather data: [7timer](http://www.7timer.info/)
- Build tools: [Create React App](https://github.com/facebook/create-react-app)
- CSS: [Bulma](https://bulma.io/documentation/)

### Configuration custom

Ce projet a été crée grâce à [Create React App](https://github.com/facebook/create-react-app).
Pour plus d'information sur la customisation, nous vous invitons à consulter la documentation de l'outil.

## Step 1 : Afficher la météo du jour pour Grenoble

- Sur la page d’une ville récupérer et afficher la météo du jour.
- Le page d’une ville correspond au composant [`City`](./src/pages/city/City.jsx) 
- Utiliser le [service weather](./src/api/weather.api.js) (`getCityTodayWeather`) pour récupérer la météo en function des coordonnées GPS de Grenoble lorsque le composant est créé : [`componentDidMount()`](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)
- Binder les données de la météo du jour avec le template (https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)

## Step 2 : Afficher la météo du jour pour toutes les villes Zenika

- Afficher toutes les villes sur la page d'accueil [`Home`](./src/pages/home/Home.jsx) (https://reactjs.org/docs/lists-and-keys.html#rendering-multiple-components)
- Utiliser les getters du [pseudo-store](./src/store/Store.js) pour récupérer les coordonnées de la ville par son nom à partir des `params` de la route `cityName` (un exemple de code pour récupérer ce paramètre est disponible dans le fichier [`City`](./src/pages/city/City.jsx))
- Appeler la méthode pour obtenir la météo du jour (`getCityTodayWeather`) via le fichier *weather.api.js* avec ces coordonnées

## Step 3 : Afficher la météo des 8 prochains jours pour chaque ville

- Via le fichier d'api *weather.api.js*, récupérer maintenant la météo des 8 prochains jours (`getCityNextWeekWeather`)
- Binder les données avec le template 

## Step 4 : Avoir la possibilité de passer en Fahrenheit

- Ajouter des radios boutons, checkbox ou n’importe quoi d’autre pour choisir l’unité à afficher 
- Créer une fonction pour retourner les degrés à afficher dans la bonne unité
- Appliquer la fonction de conversion `F = C * 9/5 + 32`

## Step 5 : Ajouter un page pour enregistrer une nouvelle ville

- Créer un nouveau composant dans le dossier `pages`
- Créer dans le router, dans le fichier *App.jsx*, une route liée à ce composant 
- Modifier le [pseudo-store](./src/store/Store.js) pour créer une méthode qui modifie la liste des villes
- Créer un formulaire avec des inputs pour le nom de la vile, latitude et longitude
- Appeler la méthode `addCity` dans le [pseudo-store](./src/store/Store.js) lors de l’envoi du formulaire 

## Bonus : Afficher la météo détaillée d'un ville

- Une seconde API sur `7timer` permet d'obtenir une météo plus détaillée avec une prévision toute les 3 heures (http://www.7timer.info/bin/civil.php?lon=0&lat=0&unit=metric&output=json)
- Créer un nouveau point d'entrée sur le fichier d'api pour consommer ces données
- Afficher le résultat de la météo détaillée sur la page de la ville
- Ajouter un bouton pour afficher le mode simple ou le mode détaillé
