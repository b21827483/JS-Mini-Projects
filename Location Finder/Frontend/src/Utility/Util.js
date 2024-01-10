const GOOGLE_API_KEY = "" //insert your key here

export async function getAddressFromCoor(coordinates) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`)

    if (!response.ok) {
        throw new Error("Couldn't get the address of the given coordinates.")
    } 

    const data = await response.json()
    const address = data.results[0].formatted_address
    
    return address 
}

export async function getCoorFromAddress(address) {

    const encodedAdr = encodeURI(address)
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdr}&key=${GOOGLE_API_KEY}`)

    if (!response.ok) {
        throw new Error("Couldn't get the coordinates of the given address.")
    } 

    const data = await response.json()
    const coor = data.results[0].geometry.location
    
    return coor 
} 