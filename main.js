const chargerDonnees = async () => {
    try {
        const reponse = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-emplacement-des-stations/records?limit=20")
        const donnees = await reponse.json()
        console.log(donnees.results)
        console.log(donnees.results[0].coordonnees_geo)
        displayCards(donnees.results)
        displayMarker(map, donnees.results)
    } catch (erreur) {
        console.error("Erreur de chargement :", erreur.message)
    }
}

chargerDonnees()

const container = document.querySelector('.container')

function displayCards(stations) {
    stations.forEach((station) => {
        const { name, stationcode, capacity } = station

        const card = document.createElement('div')
        card.classList.add('card-station')

        const cardName = document.createElement('p')
        cardName.textContent = name
        cardName.classList.add('card-name')

        const cardCode = document.createElement('p')
        cardCode.textContent = `Code station : ${stationcode}`
        cardCode.classList.add('card-station')

        const cardCapacity = document.createElement('p')
        cardCapacity.textContent = `Capacité : ${capacity}`
        cardCapacity.classList.add('card-capacity')

        card.appendChild(cardName)
        card.appendChild(cardCode)
        card.appendChild(cardCapacity)
        container.appendChild(card)
    })
} 

//Crées les marqueurs sur la maps
function displayMarker(map, stationList) {
    stationList.forEach((station) => {
        var marker = L.marker([station.coordonnees_geo.lat , station.coordonnees_geo.lon]).addTo(map).bindPopup(station.name);
    })
}

//map

// Mapview sur Paris
const map = L.map("map").setView([48.8566, 2.3522], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
}).addTo(map);

//Marqueur au centre de Paris
// L.marker([48.8566, 2.3522])
//     .addTo(map)
//     .bindPopup("Bienvenue à Paris !");

// var marker = L.marker([48.8761373390584, 2.3680844979417]).addTo(map).bindPopup("Test");