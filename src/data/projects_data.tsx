import { ProjectType } from "../common"
import { ProjectPreviewProps } from "../widgets/ProjectPreview";
import { getRandomUser } from "./users_data";


/*data utilities mockup projects data*/
export const getProjects = ():{[key:string] :project } => projects;
export const getProject = (id:string):project => {return projects[id]};

export const getProjecsArray = ():project[] => Object.keys(projects).map((key)=>({...projects[key] }));




const getUser = (name:string, id:number, department: string, img:string, url:string) : user=>{

    return {
        name:name,
        id:id , 
        department: department,
        img:img,
        url:url

    }
}


const projects: {[key:string] :project } = {

    "001":{
        id:"001",
        title:"Money Manager",
        description:  "A simple and reliable money management program it will help you get y our finances in order no matter how financially literate you are!. release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        platform: ProjectType.android,
        totalTasks:10,
        completedTasks:8,
        due_date:new Date(),
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
            description:"<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><br /><p>Integer vel nisl aliquam, posuere purus vitae, maximus libero. Donec congue imperdiet nunc quis dignissim. Proin semper, sem ut aliquam rhoncus, sem arcu fringilla lectus, at scelerisque magna leo id odio. Phasellus quis placerat sapien. Duis id tempus nibh, et consequat mi. Nullam id scelerisque tellus. Aliquam erat volutpat. Vivamus nec ullamcorper nibh. Donec volutpat porta nunc. Sed commodo, nulla eu rutrum tincidunt, lectus nunc sagittis nunc, in euismod est lacus ac mi. Aenean suscipit risus tortor, a malesuada diam tempor a.</p>",
            platform: ProjectType.iOS,
            due_date:new Date(),
            totalTasks:5,
            completedTasks:5,
            members:[  
            
                getRandomUser(),
            
                getRandomUser(),
            
                getRandomUser()
            ]
        },
        "003":{
            id:"003",
            title:"data point 3",
            description:"<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><br /><p>Integer vel nisl aliquam, posuere purus vitae, maximus libero. Donec congue imperdiet nunc quis dignissim. Proin semper, sem ut aliquam rhoncus, sem arcu fringilla lectus, at scelerisque magna leo id odio. Phasellus quis placerat sapien. Duis id tempus nibh, et consequat mi. Nullam id scelerisque tellus. Aliquam erat volutpat. Vivamus nec ullamcorper nibh. Donec volutpat porta nunc. Sed commodo, nulla eu rutrum tincidunt, lectus nunc sagittis nunc, in euismod est lacus ac mi. Aenean suscipit risus tortor, a malesuada diam tempor a.</p>",
                platform: ProjectType.iOS,
            due_date:new Date(),
            totalTasks:20,
            completedTasks:20,
            members:[  
            
                getRandomUser(),
            
                getRandomUser(),
            
                getRandomUser() 
            ]
            }
    }

