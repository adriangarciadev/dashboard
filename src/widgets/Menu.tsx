
type Link  = {

    text: string;
    link: string

}


type MenuProps = {

    elements : Link[];
    children: React.ReactNode;

}


let Menu = (props:MenuProps)=>{

    let {elements, children} = props;


    return (
        <ul>
        
        { 
            elements.map(curr=>(
                <li>
                    <a href={curr.link} >{curr.text} </a>

                </li>
            ))
        }
    
    </ul>
    )



}

export default Menu;