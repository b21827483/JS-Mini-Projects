import {Modal} from "./UI/Modal"
import {Map} from "./UI/Map"
import {getAddressFromCoor, getCoorFromAddress} from "./Utility/Util"


class PlaceFinder {

    constructor() {

        const addressForm = document.querySelector("form");
        const locateBttn = document.getElementById("locate-btn");
        this.shareBttn = document.getElementById("share-btn");

        locateBttn.addEventListener("click", this.locateUser.bind(this));
        addressForm.addEventListener("submit", this.findAddressLoc.bind(this))
    }



    showMap(coordinates, address) {

        if (this.map) {
            this.map.render(coordinates)
        }
        else {
            this.map = new Map(coordinates)}

        this.shareBttn.disabled = false
        const sharedLinkInput = document.getElementById("share-link")
        sharedLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
    }

    async findAddressLoc(event) {

        event.preventDefault()
        const address = event.target.querySelector("input").value
        if (!address) {
            alert("invalid adress.")
            return
        }

        const modal = new Modal("loading-modal-content")
        modal.show()

        try{
            const coordinates = await getCoorFromAddress(address)
            this.showMap(coordinates, address)}
        catch (error) {
            alert(error.message)
        }

        modal.hide()
    }

    
    locateUser() {
        
        if(!navigator.geolocation) {
            alert("Your browser is not supporting navigator. Please try it on different browser.");
            return;
        }

        const modal = new Modal("loading-modal-content")
        modal.show()

        navigator.geolocation.getCurrentPosition(async result => {
    
            const coordinates = {
                
                lat: result.coords.latitude + Math.random() * 50,
                lng: result.coords.longitude +  Math.random() * 50,
            };
            const address = await getAddressFromCoor(coordinates)
            modal.hide()
            this.showMap(coordinates, address)
            console.log(coordinates)
        },  
        error => {
            modal.hide()
            alert("Failed to get a location.");
        })
    }

}

const placefinder = new PlaceFinder()