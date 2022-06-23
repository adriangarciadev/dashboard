import "./scss/ProgressBar.scss"

type ProgressBarProps = {

    progress:number;  //[0 , 1] *
    children?: React.ReactNode;

}


const ProgressBar = (props:ProgressBarProps)=>{

    let {progress} = props;
    progress = Math.max(0,Math.min(progress,1));

    const getStyle = ()=>{

        return {
            width : progress*100+ "%" ,

        };

    }

    return (
        <div className="progressbar-container">
            <div className="progressbar-outer">
                <div className="progressbar-inner" style={ getStyle() }>

                </div>
            </div>
        
        </div>
        
    );


}

export default ProgressBar;