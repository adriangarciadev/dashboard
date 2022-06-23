import { ProjectType } from "../common"
import { CardProjectProps } from "../widgets/Card-Project";
import { getRandomUser } from "./users_data";


/*data utilities mockup projects data*/
export const getProjects = ():{[key:string] :project } => projects;
export const getProject = (id:string):project => {return projects[id]};

export const getProjecsArray = ():project[] => Object.keys(projects).map((key)=>({...projects[key] }));




const getUser = (name:string, department: string, img:string, url:string) : user=>{

    return {
        name:name,
        department: department,
        img:img,
        url:url

    }
}


const projects: {[key:string] :project } = {

    "001":{
        id:"001",
        title:"Money Manager",
        platform: ProjectType.android,
        due_date:new Date(),
        progress:0.8,
        members:[
            
            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            getRandomUser(),

            
        ]
        },
        "002":{
            id:"002",
            title:"data point 2",
            platform: ProjectType.iOS,
            due_date:new Date(),
            progress:0.3,
            members:[  
            
                getRandomUser(),
            
                getRandomUser(),
            
                getRandomUser()
            ]
        },
        "003":{
            id:"003",
            title:"data point 3",
            platform: ProjectType.iOS,
            due_date:new Date(),
            progress:0.3,
            members:[  
            
                getRandomUser(),
            
                getRandomUser(),
            
                getRandomUser() 
            ]
            }
    }

