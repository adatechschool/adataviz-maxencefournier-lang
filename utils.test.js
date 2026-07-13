import { describe, expect, test } from "vitest"
import { formaterDonnee } from "./utils.js"

describe("formaterDonnee", () => {
    test("retourne une station correctement formatée", () => {
        const stationBrute = {
            name: "Charonne - Robert et Sonia Delaunay",
            stationcode: 11025,
            capacity: 20,
            coordonnees_geo: {
                lat: 48.8559,
                lon: 2.3925
            }
        }

        const resultat = formaterDonnee(stationBrute)

        expect(resultat).toEqual({
            nom: "Charonne - Robert et Sonia Delaunay",
            code: "11025",
            capacite: 20,
            latitude: 48.8559,
            longitude: 2.3925
        })
    })

    test("retourne null si les coordonnées sont absentes", () => {
        const stationBrute = {
            name: "Station sans coordonnées",
            stationcode: "12345",
            capacity: 15
        }

        const resultat = formaterDonnee(stationBrute)

        expect(resultat.latitude).toBeNull()
        expect(resultat.longitude).toBeNull()
    })

    test("convertit le code en texte et la capacité en nombre", () => {
        const stationBrute = {
            name: "Station test",
            stationcode: 12345,
            capacity: "30",
            coordonnees_geo: {
                lat: 48.8,
                lon: 2.3
            }
        }

        const resultat = formaterDonnee(stationBrute)

        expect(resultat.code).toBe("12345")
        expect(resultat.capacite).toBe(30)
    })
})