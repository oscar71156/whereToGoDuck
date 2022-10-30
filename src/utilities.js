export const formatDataArrayIdAndName = (data, type) => {
  let idName = "";
  let nameKeyOfData = "";
  if (type === "restaurant") {
    idName = "RestaurantID";
    nameKeyOfData = "RestaurantName";
  } else if (type === "hotel") {
    idName = "HotelID";
    nameKeyOfData = "HotelName";
  } else {
    idName = "ScenicSpotID";
    nameKeyOfData = "ScenicSpotName";
  }
  return data.map(({ [idName]: id, [nameKeyOfData]: name, ...restPart }) => ({
    id,
    name,
    ...restPart,
  }));
};

export const formatDataIdAndName = (data, type) => {
  let idName = "";
  let nameKeyOfData = "";
  if (type === "restaurant") {
    idName = "RestaurantID";
    nameKeyOfData = "RestaurantName";
  } else if (type === "hotel") {
    idName = "HotelID";
    nameKeyOfData = "HotelName";
  } else {
    idName = "ScenicSpotID";
    nameKeyOfData = "ScenicSpotName";
  }
  let formatedData= {
    id: data[idName],
    name: data[nameKeyOfData],
    ...data,
  };
  delete formatedData[idName];
  delete formatedData[nameKeyOfData];
  return formatedData;
};

export const getDataById = (id, type, data) => {
  try {
    let idName = "";
    if (type === "restaurant") {
      idName = "RestaurantID";
    } else if (type === "hotel") {
      idName = "HotelID";
    } else {
      idName = "ScenicSpotID";
    }
    return data.find(({ [idName]: idNameValue }) => idNameValue === id);
  } catch (e) {
    console.log("error getDataById", e);
  }
};

export const getMOTCPTXURLByType=(type)=>{
  switch(type){
    case "restaurant":
      return "/Tourism/Restaurant";
    case "hotel":
      return "/Tourism/Hotel";
    default:
      return "/Tourism/ScenicSpot";
  }
}
