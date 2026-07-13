import { formaterDonnee } from "./utils.js"

const container = document.querySelector(".container")
const searchInput = document.querySelector(".search_input")
const stationCount = document.querySelector(".station-count")

let toutesLesStations = []

const chargerDonnees = async () => {
    try {
        const reponse = await fetch(
            "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-emplacement-des-stations/records?limit=20"
        )

        const donnees = await reponse.json()

        toutesLesStations = donnees.results.map(formaterDonnee)

        displayCards(toutesLesStations)
        displayMarker(map, toutesLesStations)
    } catch (erreur) {
        alert("Impossible de se connecter à l'API.")
        console.error("Erreur de chargement :", erreur.message)
    }
}

chargerDonnees()

function displayCards(stations) {
    container.innerHTML = ""

    stations.forEach((station) => {
        const { nom, code, capacite } = station

        const card = document.createElement("div")
        card.classList.add("card-station")

        const cardName = document.createElement("p")
        cardName.textContent = nom
        cardName.classList.add("card-name")

        const cardCode = document.createElement("p")
        cardCode.textContent = `Code station : ${code}`
        cardCode.classList.add("code-station")

        const cardCapacity = document.createElement("p")
        cardCapacity.textContent = `Capacité : ${capacite}`
        cardCapacity.classList.add("card-capacity")

        card.appendChild(cardName)
        card.appendChild(cardCode)
        card.appendChild(cardCapacity)

        container.appendChild(card)
    })

    updateStationCount(stations.length)
}

function updateStationCount(nombre) {
    if (nombre === 0) {
        stationCount.textContent = "Aucune station trouvée"
    } else if (nombre === 1) {
        stationCount.textContent = "1 station trouvée"
    } else {
        stationCount.textContent = `${nombre} stations trouvées`
    }
}

searchInput.addEventListener("input", () => {
    const recherche = searchInput.value
        .trim()
        .toLowerCase()

    const stationsFiltrees = toutesLesStations.filter((station) => {
        const nomStation = station.nom.toLowerCase()
        const codeStation = station.code

        return (
            nomStation.includes(recherche) ||
            codeStation.includes(recherche)
        )
    })

    displayCards(stationsFiltrees)
})

//Filtre des cartes


// Création des marqueurs sur la carte
function displayMarker(map, stationList) {
    stationList.forEach((station) => {
        if (
            station.latitude === null ||
            station.longitude === null
        ) {
            return
        }

        L.marker([
            station.latitude,
            station.longitude
        ])
            .addTo(map)
            .bindPopup(station.nom)
    })
}

// Carte centrée sur Paris
const map = L.map("map").setView(
    [48.8566, 2.3522],
    13
)

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map)