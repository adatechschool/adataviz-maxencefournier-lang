// Reçoit une station brute provenant de l'API
// et retourne un objet plus simple à utiliser.
export const formaterDonnee = (item) => {
    return {
        nom: item.name,
        code: String(item.stationcode),
        capacite: Number(item.capacity),
        latitude: item.coordonnees_geo?.lat ?? null,
        longitude: item.coordonnees_geo?.lon ?? null
    }
}