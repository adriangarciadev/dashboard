

export const Container = (props:LayoutContainer)=>{

    let {type, row,  children} = props;

    
    const getType = ()=>{

        if( typeof(type) !=="undefined" && type !=null){

            return "container"+(type!==""?"-"+type:"");
        }
        else{

            return "container";
        }
    }




    if( typeof(row) !=="undefined" && row === false){

        return (

            <div className={ getType()}>
                {children}
            </div>

        )

    }
    else{

        return(
            <div className={ getType()}>
                <div className="row">
                    {children}
                </div>
        </div>

        );

    }


}