import Card from "./Card";
import { ClientMini } from "./ClientMini";




export type ClientPreviewProps = {

    title:string,
    client:client

}

export const ClientPreview = (props : ClientPreviewProps)=>{

    let {title,client} = props;

    return (
            <ClientMini client={client}></ClientMini>
      );
    

}

