import { ClientPreviewProps } from "../widgets/Client-Preview";


export const getClient = (id:string):ClientPreviewProps=>(clientsData[id])
export const getClientsArray = ():ClientPreviewProps[]=>(Object.keys(clientsData).map((key)=>({...clientsData[key], id:key})))

const clientsData: {[key:string] : ClientPreviewProps} = {

    "001":
    {
        title:"AustinMahone",
        client:{
            name:"George Constanza",
            company:"Aerosoft",
            since: new Date(),
            description: "A good client"

        }
    },
    "002":   {
        title:"DoughGone",
        client:{
            name:"Jerry Smith",
            company:"Gigamart",
            since: new Date(),
            description: "A kind client"

        }
    },
    "003":{
        title:"AustinMahone",
        client:{
            name:"Cosmo Kraftz",
            company:"Danuvio",
            since: new Date(),
            description: "An excelent client"

        }
    }


}
