import { getProjecsArray } from "../data/projects_data";
import Card from "../widgets/Card";
import { ProjectPreview } from "../widgets/ProjectPreview";
import Title from "../widgets/Title";
import { UserMessage } from "../widgets/UserMessage";


export const Projects = ()=>{

    const projects = getProjecsArray();

    const gutterStyle = {};

    return (
        <>
            <Title>Current Projects</Title>
            <div className="row g-0" style={gutterStyle}>
            {

                projects.map( (curr,index) => (
                            <Card 
                            animationTime={index*100} 
                            containerProps={{className:'col-xxl-3',  style : gutterStyle}} 
                            link
                            renderContainer 
                            style={{padding:'2rem'}}
                            to={`/projects/${curr.id}`}
                            >
                                <ProjectPreview { ...{project:curr} }>
                                </ProjectPreview>
                            </Card>
                ))
                
            }
            </div>

        <UserMessage timeout={10000}>
            <p>This view is just for completion's sake, the charts are responsive so click a project to see the charts at a bigger size</p>
        </UserMessage>

        </>
    );
    
}