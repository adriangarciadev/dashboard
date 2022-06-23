import { CardClientProps } from "../widgets/Card-Client";


export const getClient = (id:string):CardClientProps=>(clientsData[id])
export const getClientsArray = ():CardClientProps[]=>(Object.keys(clientsData).map((key)=>({...clientsData[key], id:key})))

const clientsData: {[key:string] : CardClientProps} = {

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
