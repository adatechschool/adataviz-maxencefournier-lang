const chargerDonnees = async () => {
    const reponse = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-emplacement-des-stations/records?limit=20")
    const donnees = await reponse.json()
    console.log(donnees)
}

chargerDonnees()

//map

// Marqueur sur Paris
const map = L.map("map").setView([48.8566, 2.3522], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
}).addTo(map);

L.marker([48.8566, 2.3522])
    .addTo(map)
    .bindPopup("Paris");

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();