import { ProjectType } from "../common";
import Card from "./Card";
import ProgressBar from "./Progress-bar";
import {ProgressBarTasks} from "./Progress-bar-tasks";
import {UserList} from "./User-list";
import React from "react";
import { Link } from "react-router-dom";
import "./scss/CardProject.scss"






export type ProjectPreviewProps = {
    project:project;
    children?:React.ReactNode;
}

export const ProjectPreview = (props:ProjectPreviewProps)=>{


    let {id, title,platform, due_date, totalTasks, completedTasks,  members} = props.project;

    return (<div className="card-project">
                        <h2>{title}</h2> 
                        <div className="card-project-platform">{platform}</div>
                        <span className="card-project-date">{ due_date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"}) }</span>
                        <ProgressBarTasks currentCompletion={ completedTasks } totalTasks={totalTasks}></ProgressBarTasks>
                        <ProgressBar progress={completedTasks / totalTasks}></ProgressBar>
                        <UserList users={members}></UserList>
                
            </div>
    );

   
}

//export default CardProject;