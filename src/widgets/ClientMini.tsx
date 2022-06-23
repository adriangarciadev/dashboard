
type ClientMiniProps ={

    client:client

}

export const ClientMini = (props: ClientMiniProps)=>{


    const {client} = props;

    return (
        <div className="client-mini">
            <h3>{client.name}</h3>
            <h4>{client.company}</h4>

            <p>{client.since.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"})}</p>


        </div>
    );

}

