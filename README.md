# Instructions

## Build app

Install [pnpm package manager](https://pnpm.io/fr/installation)

```
pnpm install
pnpm dev
```

## Dépendances

- Framework : [React v18](https://github.com/facebook/react)
- Router : [React Router v6](https://github.com/ReactTraining/react-router)
- Weather data: [7timer](http://www.7timer.info/)
- Build tools: [Vite](https://vitejs.dev/)
- CSS: [Bulma](https://bulma.io/documentation/)

### Configuration custom

Ce projet a été crée grâce à [Vite](https://vitejs.dev/).
Pour plus d'information sur la customisation, nous vous invitons à consulter la documentation de l'outil [configuration](https://vitejs.dev/config/).

## Step 1 : Afficher la météo du jour pour Grenoble

- Sur la page d’une ville récupérer et afficher la météo du jour.
- Le page d’une ville correspond au composant [`CityPage`](./src/pages/city/CityPage.jsx)
- Utiliser le [service weather](./src/api/weather.api.js) (`getCityTodayWeather`) pour récupérer la météo en function des coordonnées GPS de Grenoble lorsque le composant est créé à l'aide d'un [`useEffect`](https://react.dev/learn/lifecycle-of-reactive-effects)
- Binder les données de la météo du jour avec le template JSX (https://react.dev/learn/writing-markup-with-jsx)

## Step 2 : Afficher la météo du jour pour toutes les villes Zenika

- Afficher toutes les villes sur la page d'accueil [`HomePage`](./src/pages/home/HomePage.jsx) (https://react.dev/learn/rendering-lists)
- Utiliser les getters du [pseudo-store](./src/store/Store.js) pour récupérer les coordonnées de la ville par son nom à partir des `params` de la route `cityName` (un exemple de code pour récupérer ce paramètre est disponible dans le fichier [`CityPage`](./src/pages/city/CityPage.jsx))
- Appeler la méthode pour obtenir la météo du jour (`getCityTodayWeather`) via le fichier _weather.api.js_ avec ces coordonnées

## Step 3 : Afficher la météo des 8 prochains jours pour chaque ville

- Via le fichier d'api _weather.api.js_, récupérer maintenant la météo des 8 prochains jours (`getCityNextWeekWeather`)
- Binder les données avec le template

## Step 4 : Avoir la possibilité de passer en Fahrenheit

- Ajouter des radios boutons, checkbox ou n’importe quoi d’autre pour choisir l’unité à afficher
- Créer un [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) qui aura un state `degree` et une methode associée qui retournera la température dans la bonne unité
- Appliquer la fonction de conversion `F = C * 9/5 + 32`

## Step 5 : Ajouter un page pour enregistrer une nouvelle ville

- Créer un nouveau composant dans le dossier `pages/city`
- Créer dans le router, dans le fichier _App.jsx_, une route liée à ce composant
- Créer une methode `addCity` dans le [pseudo-store](./src/store/Store.js) qui permet d'ajouter une ville à la liste
- Créer un formulaire avec des inputs pour le nom de la ville, latitude et longitude
- Appeler la méthode `addCity` du [pseudo-store](./src/store/Store.js) lors de l’envoi du formulaire

## Bonus : Afficher la météo détaillée d'un ville

- Une seconde API sur `7timer` permet d'obtenir une météo plus détaillée avec une prévision toute les 3 heures (http://www.7timer.info/bin/civil.php?lon=0&lat=0&unit=metric&output=json)
- Créer un nouveau point d'entrée sur le fichier d'api pour consommer ces données
- Afficher le résultat de la météo détaillée sur la page de la ville
- Ajouter un bouton pour afficher le mode simple ou le mode détaillé
- Afficher un loader pendant le chargement des données pour faire patienter l'utilisateur, avec une durée d'au moins 2 secondes

## Correction

<details>
  <summary>Step 1</summary>
  https://github.com/Zenika/grenoble-hands-on-react/compare/step0...step1
</details>

<details>
  <summary>Step 2</summary>
  https://github.com/Zenika/grenoble-hands-on-vuejs/compare/step1...step2
</details>

<details>
  <summary>Step 3</summary>
  https://github.com/Zenika/grenoble-hands-on-vuejs/compare/step2...step3
</details>

<details>
  <summary>Step 4</summary>
  https://github.com/Zenika/grenoble-hands-on-vuejs/compare/step3...step4
</details>

<details>
  <summary>Step 5</summary>
  https://github.com/Zenika/grenoble-hands-on-vuejs/compare/step4...step5
</details>

<details>
  <summary>Bonus</summary>
  https://github.com/Zenika/grenoble-hands-on-vuejs/compare/step5...bonus
</details>
