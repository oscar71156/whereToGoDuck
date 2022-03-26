import { CHANGE_COUNTY } from "./types"
export const changeInputCounty=(county)=>{
    return{
        type:CHANGE_COUNTY,
        payload:county
    }
}