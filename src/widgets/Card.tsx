import "./scss/Card.scss"


type CardProps= {

    title?: string;
    content? :React.ReactNode;
    children?: React.ReactNode;

}&React.HTMLProps<HTMLDivElement>


let Card = (props: CardProps)=>{

    //can just pass rest
    let {title, content, children, ...rest} = props;
    
    rest.className = "Card rounded "+rest?.className??'';

    const renderTitle = ()=>{

        if( (typeof(title) !== 'undefined' && title != null)){
            return <h3>{title}</h3>
        }
        else{
            return null;
        }

    }

    return (
        <div {...rest}>
            {renderTitle()}
            {content}
            {children}
        </div>

    )

    
}

export default Card;