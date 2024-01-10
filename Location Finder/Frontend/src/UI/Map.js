export class Map {

    constructor(coordinates) {

        this.render(coordinates)
    }

    render(coordinates) {
        if (!google) {
            alert("Google Map couldn't load")
            return
        }

        const map = new google.maps.Map(document.getElementById("map"), {
            center: coordinates,
            zoom: 8
        })

        new google.maps.Marker({
            position: coordinates,
            map: map
        })
    }
}  