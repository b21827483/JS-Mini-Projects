import { Map } from "./UI/Map"

class Location {
    constructor (coor, address) {

        new Map(coor)
        const title = document.querySelector("header h1")
        title.textContent = address
    }
}

const url = new URL(location.href)
const param = url.searchParams
const coor = {
    lat: +param.get("lat"),
    lng: +param.get("lng")
}

const address = param.get("address")
new Location(coor, address)

