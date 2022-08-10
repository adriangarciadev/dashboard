import './scss/ClientPreview.scss'


type ClientMiniProps ={

    client:client

}

export const ClientMini = (props: ClientMiniProps)=>{


    const {client} = props;

    return (
        <div className="client-mini">
            <h3 className="name">{client.name}</h3>
            <h4 className="company">{client.company}</h4>

            <p className="date">{client.since.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"})}</p>


        </div>
    );

}

