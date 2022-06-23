import * as d3 from "d3";
import { CardMembersProps } from "../widgets/Card-Members";
import { getRandomUser } from "./users_data";




export const getDepartment=(id:string):CardMembersProps=>(departments[id]);
export const getDeparmentsArray=():CardMembersProps[]=>(Object.keys(departments).map(key=>({...departments[key],id:key})))

const departments:{[key:string] : CardMembersProps} = {
"001":{
    department:"UI",
    quantity:9,
    users:[
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser()
    ]
},
"002":{
    department:"Quality Assurance",
    quantity:6,
    users:[
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser()

    ]
},
"003":{
    department:"Software Engineers",
    quantity:5,
    users:[
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),
        getRandomUser(),


    ]
}
}

