import NearbySpotTemplate from "../UI/NearbySpot"
const Restaurant=({name,pictureAlt,pictureURL,address,phone,openTime,description})=>{
    return(
      <NearbySpotTemplate
        name={name}
        pictureURL={pictureURL}
        pictureAlt={pictureAlt}
        address={address}
        phone={phone}
        openTime={openTime}
        description={description}
      />
    )
}

export default Restaurant;