

//import CardContainer from "../widgets/Card";
import { ProjectType } from "../common";
import {CardProject, CardProjectProps} from "../widgets/Card-Project";
import {CardClient, CardClientProps} from "../widgets/Card-Client";

import Chart from "../widgets/Chart";
import {Chart1} from "../widgets/sampleChart"
import Title from "../widgets/Title";
import { Container } from "../layout/Container";
import { CardMembers, CardMembersProps } from "../widgets/Card-Members";
import { AreaChart } from "../widgets/AreaChartWebgl";
import {D3Chart} from '../widgets/D3Chart'
import { D3PieChart } from "../widgets/D3Pie";
import { getProjecsArray, getProjects } from "../data/projects_data";
import { getClientsArray } from "../data/clients_data";
import { getDeparmentsArray } from "../data/departments_data";
import { Link } from "react-router-dom";

//typescript





const MainView = ()=>{

    let projects = getProjecsArray();
    let clients = getClientsArray();
    let members = getDeparmentsArray();

    return (<div>
            <p>MAIN VIEW TEST</p>
            <D3Chart />
            <D3PieChart />
            

            <Container type="fluid">
            <Title text="Current Project"></Title>

            {

                projects.map(curr => (
                            <CardProject { ...{project:curr} }>
                            </CardProject>
                    
                ))
                
            }
            </Container>

            <Container type="fluid">
            <Title text="Current Clients"></Title>
            {
                clients.map(curr=>(
                    <CardClient {...curr} ></CardClient>

                ))

            }
            </Container>

            <Container type="fluid">
            <Title text="Team"></Title>

            {
                members.map(curr=>(
                    <CardMembers {...curr}></CardMembers>

                ))

            }

            </Container>

            

            

    </div>);
}

export default MainView;