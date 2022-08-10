

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




    if( typeof(row) ==="undefined" || row === false){

        return (

            <div className={ getType()}>
                {children}
            </div>

        )

    }
    else{

        return(
            <div className={ getType() +' g-0 p-0"'}>
                <div className="row  g-0 m-0">
                    {children}
                </div>
        </div>

        );

    }


}