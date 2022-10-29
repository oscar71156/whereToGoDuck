import locations from "./locations"
import nearbyAttraction from "./nearbyAttraction"
import nearbyHotel from "./nearbyHotel";
import nearbyRestaurant from "./nearbyRestaurant";
export const getTempNearbySpotsByType=(type)=>{
    switch(type){
        case 'hotel':
            return nearbyHotel;
        case 'restaurant':
            return nearbyRestaurant;
        case 'attraction':
            return nearbyAttraction;
        default:
            return [];
    }
}