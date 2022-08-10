import './scss/Title.scss'

type TitleProps ={

    children?: React.ReactNode;
}

const Title = (props:TitleProps)=>{

    let {children} = props;


    return (
        
        <h1 className="title">{children}</h1>

    );

}

export default Title;