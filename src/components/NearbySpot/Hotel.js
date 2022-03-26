import NearbySpotTemplate from "../UI/NearbySpot"
const Hotel=({name,pictureAlt,pictureURL,address,phone,openTime,description,parkingInformation})=>{
    return(
      <NearbySpotTemplate
        name={name}
        pictureURL={pictureURL}
        pictureAlt={pictureAlt}
        address={address}
        phone={phone}
        openTime={openTime}
        description={description}
        parkingInformation={parkingInformation}
      />
    )
}

export default Hotel;