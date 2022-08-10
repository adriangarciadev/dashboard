import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProject } from "../data/projects_data";
import Card from "../widgets/Card";
import { ProjectPreview } from "../widgets/ProjectPreview";
import { D3PieChart } from "../widgets/D3Pie";
import ProgressBar from "../widgets/Progress-bar";
import { ProgressBarTasks } from "../widgets/Progress-bar-tasks";
import { UserList } from "../widgets/User-list";

import './scss/Project.scss'


export const ProjectView = ()=>{

    let params = useParams();
    
    let {title,platform, description, due_date, totalTasks, completedTasks, members} = getProject(params.projectID!);

    const usersByDepartment = members.reduce<{[key:string]:number}>((prev,curr)=>
                ({...prev , [curr.department]: (prev[curr.department]??0) +1 })
                ,{})

    const labels = Object.keys(usersByDepartment).map(curr=>curr);
    const total = Object.keys(usersByDepartment).reduce((prev,curr)=> prev + usersByDepartment[curr],0)
    const data = Object.keys(usersByDepartment).map(curr=> (usersByDepartment[curr] /total)*100 );
    
    return (<div className="project">

            <Card renderContainer style={{padding:'1rem 4rem 1rem 4rem'}}>
                <h2 className="hh2">{title}</h2>
                <p className="platform">{platform}</p>
                <span className="card-project-date">{ due_date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"}) }</span>
                <div>{description}</div>
                <ProgressBarTasks currentCompletion={8} totalTasks={10}></ProgressBarTasks>
                <ProgressBar progress={completedTasks / totalTasks}></ProgressBar>
            </Card>

            <div className="row g-0">
                <Card style={{padding:'4rem 4rem 2rem 4rem', margin:'2rem 0 0 0'}} renderContainer containerProps={{className:"col-xxl-6"}}>
                    <D3PieChart title={"Employees by department"} labels={labels} dataArray={data} shouldRestart={false}/>
                </Card>
                <Card style={{padding:'4rem 4rem 2rem 4rem', margin:'2rem 0 0 0'}} renderContainer containerProps={{className:"col-xxl-6"}}>
                    <MembersTable members={members} />
                </Card>
            </div>

            <UserList users={members}></UserList>
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