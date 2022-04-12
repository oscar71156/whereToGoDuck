import { useState,useEffect } from "react";

const useImage=(imageName)=>{
    
    const [image,setImage]=useState(null);
    useEffect(()=>{
        const _getImage=async()=>{
            try{
                if(imageName){
                    const imageSrc=await import(`../assets/icons/${imageName}.jpg`);
                    setImage(imageSrc.default);
                }
            }catch(e){
                console.error('_getImage',e);
            }   

        }
        _getImage();
    },[imageName])

    return image;
}

export default useImage;