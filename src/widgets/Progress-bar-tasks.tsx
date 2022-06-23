import "./scss/ProgressbarTasks.scss"


import ProgressBar from "./Progress-bar";



export type ProgressBarTasksProps = {

    currentCompletion: number,
    totalTasks : number, 


}

export enum progress  {

    starting="Starting",
    progress = "In Progress",
    completed = "Completed"
}

export const ProgressBarTasks = (props: ProgressBarTasksProps)=>
{

    const {currentCompletion, totalTasks} = props;
    
    const getCompletion = ()=>{

        if(currentCompletion===0)
            return progress.starting;
        else if(currentCompletion===totalTasks)
            return progress.completed;
        else
            return progress.progress;


    }

    return (
        <>
        <div className="progressbar-tasks d-flex">
            <span className="">{getCompletion()}</span>
            <span className="ms-auto"> { currentCompletion } / { totalTasks }</span>
            
        </div>
        </>


    );

}

//export default ProgressBarTasks;