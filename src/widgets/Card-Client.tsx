import Card from "./Card";
import { ClientMini } from "./ClientMini";




export type CardClientProps = {

    title:string,
    client:client

}

export const CardClient = (props : CardClientProps)=>{

    let {title,client} = props;

    return (
    <div className="col-md-4 card-client">
        <Card title={ title } >
            <ClientMini client={client}></ClientMini>

        </Card>
    </div>);
    

}

