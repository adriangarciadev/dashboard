import { ProjectType } from "../common";
import Card from "./Card";
import ProgressBar from "./Progress-bar";
import {ProgressBarTasks} from "./Progress-bar-tasks";
import {UserList} from "./User-list";
import "./scss/CardProject.scss"
import React from "react";
import { Link } from "react-router-dom";






export type CardProjectProps = {
    project:project;
    children?:React.ReactNode;
}

export const CardProject = (props:CardProjectProps)=>{


    let {id, title,platform, due_date, progress, members} = props.project;

    return (<div className="col-md-4 card-project">
                <Link to={`/projects/${id}`}  style={{textDecoration: 'none',color:'inherit'}}>

                    <Card title={title}>
                        <div className="card-project-platform">{platform}</div>
                        <span className="card-project-date">{ due_date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"}) }</span>
                        <ProgressBarTasks currentCompletion={0} totalTasks={0}></ProgressBarTasks>
                        <ProgressBar progress={progress}></ProgressBar>
                        <UserList users={members}></UserList>
                    </Card>
                </Link>
            </div>)


   
}

//export default CardProject;