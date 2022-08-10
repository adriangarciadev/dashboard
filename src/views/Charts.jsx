import Title from "../widgets/Title";
import Card from "../widgets/Card";
import {D3Chart} from '../widgets/D3Chart'
import { D3PieChart } from "../widgets/D3Pie";
import { UserMessage } from "../widgets/UserMessage";



export const Charts = ()=>{

    const gutterStyle= {};


    return (
        <>
        
        <Title>Sample Charts</Title>
        <div className="row g-0" style={ gutterStyle } >
            <Card animationTime={100} renderContainer style={{padding:'4rem'}} containerProps={{className:'col-xxl-4', style:gutterStyle }}>
                <D3Chart />
            </Card>
            <Card animationTime={120} renderContainer style={{padding:'4rem'}} containerProps={ {className:'col-xxl-4', style:gutterStyle}}>
                <D3PieChart />
            </Card>
        </div>

        <UserMessage timeout={10000}>
                <p>The charts are based on this <a href="https://wattenberger.com/blog/react-and-d3">website</a> the idea is using d3 as an auxiliary library to achieve declarative charts with react. There're a few implementations that already do this, but they lack flexibility! </p>
        </UserMessage>

        </>
    );

}