type dimension ={
    width:number;
    height:number;
}

interface user {

    name : string,
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
    platform: ProjectType; 
    due_date: Date;
    progress: number;
    members: user[];
}
//****-LAYOUT-******/

type LayoutContainer = {

    type?:"sm" | "md" |"lg" | "xl" | "xxl" | "fluid" | "" ,
    children?:React.ReactNode,
    row?:boolean


}