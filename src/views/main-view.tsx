

//import CardContainer from "../widgets/Card";
import { ProjectType } from "../common";
import {ProjectPreviewProps , ProjectPreview} from "../widgets/ProjectPreview";
import {ClientPreviewProps, ClientPreview} from "../widgets/Client-Preview";

import Chart from "../widgets/Chart";
import {Chart1} from "../widgets/sampleChart"
import Title from "../widgets/Title";
import { Container } from "../layout/Container";
import { TeamMembersPreview, TeamMembersPreviewProps } from "../widgets/Team-Members-Preview";
import { AreaChart } from "../widgets/AreaChartWebgl";
import {D3Chart} from '../widgets/D3Chart'
import { D3PieChart } from "../widgets/D3Pie";
import { getProjecsArray, getProjects } from "../data/projects_data";
import { getClientsArray } from "../data/clients_data";
import { getDeparmentsArray } from "../data/departments_data";
import { Link } from "react-router-dom";
import Card from "../widgets/Card";
import { UserMessage } from "../widgets/UserMessage";

//typescript

const gutterWidth = 1;

const gutterStyle = {
    paddingLeft:  `${gutterWidth/2}rem`,
    paddingRight: `${gutterWidth/2}rem`

}



const MainView = ()=>{

    let projects = getProjecsArray();
    let clients = getClientsArray();
    let members = getDeparmentsArray();

    return (<div>
            <Title>Current Projects</Title>
            <div className="row g-0" style={ gutterStyle } >
            {

                projects.map( (curr,index) => (
                            <Card key={index} animationTime={0 +index*200} renderContainer containerProps={{className:'col-xxl-3',  style : gutterStyle}} style={{padding:'2rem'}}>
                                <ProjectPreview { ...{project:curr} }>
                                </ProjectPreview>
                            </Card>
                ))
                
            }
            
            </div>

            <Title>Sample Charts</Title>
            <div className="row g-0" style={ gutterStyle } >
                <Card animationTime={300} renderContainer style={{padding:'4rem'}} containerProps={{className:'col-xxl-4', style:gutterStyle }}>
                    <D3Chart />
                </Card>
                <Card animationTime={400} renderContainer style={{padding:'4rem'}} containerProps={ {className:'col-xxl-4', style:gutterStyle}}>
                    <D3PieChart />
                </Card>
            </div>



            <Title>Current Clients</Title>
            <div className="row g-0" style={ gutterStyle } >
            {
                clients.map( (curr,index)=>(
                    <Card animationTime={0+index*200} renderContainer containerProps={{className:'col-xxl-3', style:gutterStyle}}>
                        <ClientPreview {...curr} ></ClientPreview>
                    </Card>    


                ))

            }
            </div>
         
            <Title>Team</Title>
            <div className="row g-0" style={ gutterStyle } >
                {
                    members.map(curr=>(
                            <Card style={{padding:'1rem'}} renderContainer containerProps={{className:'col-xxl-3', style : gutterStyle} }>
                                <TeamMembersPreview {...curr}></TeamMembersPreview>
                            </Card>
                    ))

                }

            </div>

            
            <UserMessage timeout={10000}>
                <p>Hello! my name is Adrian, I put these little mock up together from components I had laying around in my secret lab!</p>
                <p> welcome to the this little demo!, a simple dashboard mockup with some charts implemented on top of <a href="https://d3js.org/">d3</a></p>
            </UserMessage>
            

    </div>);
}

export default MainView;