import * as d3 from "d3";
import { TeamMembersPreviewProps } from "../widgets/Team-Members-Preview";
import { getRandomUser } from "./users_data";




export const getDepartment=(id:string):TeamMembersPreviewProps=>(departments[id]);
export const getDeparmentsArray=():TeamMembersPreviewProps[]=>(Object.keys(departments).map(key=>({...departments[key],id:key})))

const departments:{[key:string] : TeamMembersPreviewProps} = {
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

