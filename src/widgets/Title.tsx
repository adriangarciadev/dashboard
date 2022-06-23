

type TitleProps ={

    text : string;
}

const Title = (props:TitleProps)=>{

    let {text} = props;


    return (
        
        <h1>{text}</h1>

    );

}

export default Title;