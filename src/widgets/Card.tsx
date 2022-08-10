import React from "react";
import { useState , memo} from "react";
import { Link, LinkProps } from "react-router-dom";
import { useInterval } from "../hooks/useInterval";
import "./scss/Card.scss"


type CardProps= {

    title?: string;
    content? :React.ReactNode;
    children?: React.ReactNode;
    renderContainer?:any;
    containerProps?:React.HTMLAttributes<HTMLDivElement>;
    animationTime?:number;
    link?:boolean;
    to?:string;

}&React.HTMLProps<HTMLDivElement>


let Card = (props: CardProps)=>{

    let {title, renderContainer=false, containerProps, content, children, animationTime, link=false, to='/', ...rest} = props;


    const startingOpacity = typeof(animationTime) === 'undefined'? '1.0' :'0'; 
    const [opacity, setOpacity] = useState( startingOpacity )
    //fade in after a time.
    useInterval( ()=>{ setOpacity('1.0')}, animationTime)


    rest.className = "Card rounded "+(rest?.className??'');
    rest.style = {...rest.style , opacity:opacity};

    //should render the title?
    const RenderTitle = ()=>{

        if( (typeof(title) !== 'undefined' && title != null)){
            return <h3>{title}</h3>
        }
        else{
            return null;
        }

    }

    //settle the container props
    const settleContainerProps = () =>{

        if((typeof(renderContainer) !== 'undefined') && renderContainer){


            if( typeof(containerProps) !== 'undefined' ){
                containerProps!.className = 'Card-container '+(containerProps?.className??'');
            }
            else{
                containerProps = {className:'Card-container'};
            }

        }
    }
        

    //container related code flow
    settleContainerProps();


    const CardContainer = renderContainer?'div':React.Fragment;
    containerProps = renderContainer ? containerProps:undefined;
    
   
    //link related code flow

   
    return (
        <CardContainer {...containerProps} >
            <LinkContainer link={link} to={to}>
                <div {...rest}>
                    <RenderTitle />
                    {content}
                    {children}
                </div>
            </LinkContainer>
        </CardContainer>
    );

    
        
}

//bringing it outside fixes the rerendering issue

const LinkContainer = (props: {children:React.ReactNode, link:boolean, to:string}) : JSX.Element=>{

    const {to, link} = props;

    if(link){
        return <Link to={to} className="Card-link">{props.children}</Link>
    }
    else{
        return <>{props.children}</>
    }

}

export default Card;