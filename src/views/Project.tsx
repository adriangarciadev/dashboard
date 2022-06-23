import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProject } from "../data/projects_data";
import Card from "../widgets/Card";
import { CardProjectProps } from "../widgets/Card-Project";
import { D3PieChart } from "../widgets/D3Pie";
import ProgressBar from "../widgets/Progress-bar";
import { ProgressBarTasks } from "../widgets/Progress-bar-tasks";
import { UserList } from "../widgets/User-list";

import './scss/Project.scss'


export const ProjectView = ()=>{

    let params = useParams();
    
    let {title,platform, due_date, progress, members} = getProject(params.projectID!);

    return (<div className="project">

        <Card>
            <h2 className="hh2">{title}</h2>
            <p className="platform">{platform}</p>
            <span className="card-project-date">{ due_date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"}) }</span>
            <ProgressBarTasks currentCompletion={0} totalTasks={0}></ProgressBarTasks>
            <ProgressBar progress={progress}></ProgressBar>
            <div className="row">
                <div className="col-xxl-6">
                    <D3PieChart />
                </div>
                <MembersTable members={members} className="col-xxl-6"/>
            </div>
            <UserList users={members}></UserList>
        </Card>
        </div>)


}

const RenderMembers = ({members}:{members:user[]})=>{

    return(

        <div className="row">

        {
            members.map(curr=>(
            <Card className="col-md-4">
                <Link to='/'>

                    <ul className="user-table">


                    </ul>
                    <p>{curr.name}</p>
                    <p>{curr.department}</p>
                    <img className="img-fluid rounded-circle" src={`/profile_pictures/${curr.img}`} alt={"name:"+curr.name}></img>
                </Link>
            </Card>
            ))
        }

        </div>
    );
}

const MembersTable = ({members,...rest}:{members:user[]}&React.HTMLAttributes<HTMLUListElement>)=>{

    let {className, ...otherRest} = rest;

    return (<ul className={"user-table "+className??''} {...otherRest}>

        <li className="table-header">
            <span>Name</span>
            <span>Department</span>
            <span>Date Joined</span>
        </li>

        {
            members.map(curr=>(

                <RenderMemberRow user={curr} />
            ))
        }

    </ul>

    );
}

const RenderMemberRow=({user}:{user:user})=>{

    return(<li>
            <div>
                <img className="img-fluid rounded-circle" src={`/profile_pictures/${user.img}`} alt={"name:"+user.name}></img>
                <span>{user.name}</span>
            </div>
            <span>{user.department}</span>
            <span>{new Date().toDateString()}</span>
    </li>);
}