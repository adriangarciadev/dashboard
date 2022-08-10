type dimension ={
    width:number;
    height:number;
}

interface user {

    name : string,
    id:number,
    department: string,
    img : string,
    url : string


}

interface client {
    name: string,
    company:string,
    since: Date,
    description?: string

}
enum ProjectType {

    iOS = "iOS",
    android = "Android",
    tablet = "Tablet"
}

type project = {

    id:string;
    title : string;
    description: string;
    platform: ProjectType; 
    due_date: Date;
    totalTasks:number;
    completedTasks:number;
    members: user[];
}
//****-LAYOUT-******/

type LayoutContainer = {

    type?:"sm" | "md" |"lg" | "xl" | "xxl" | "fluid" | "" ,
    children?:React.ReactNode,
    row?:boolean


}