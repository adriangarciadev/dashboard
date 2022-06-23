
type ButtonProps = {

    text:string;


}


const Button = (props:ButtonProps)=>{

    let {text} = props;


    return(
        <p>
            {text}
        </p>
    )





}

export default Button;