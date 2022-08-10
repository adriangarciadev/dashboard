import { useMemo, useState } from "react";
import { cursorTo } from "readline";
import { getRandomUser } from "../data/users_data";
import { createAttributesArrays } from "../widgets/AreaChart/gl";
import Card from "../widgets/Card";


import * as d3 from 'd3';

import './scss/Members.scss'
import { Link } from "react-router-dom";
import { UserMessage } from "../widgets/UserMessage";


let testUsers:user[] = [];

//d3 pastel colors;
let colors = d3.schemePastel1;

const generateUsers = ():void=> {

    if(testUsers.length <= 0)
    {
        testUsers = new Array(25).fill(0).map(getRandomUser)

    }
}

export type MembersProps = {
    users: user[];
}


export const Members = ({users}: MembersProps)=>{

    if(testUsers.length<=0)
        generateUsers();


    //const [ usersState, setUsers] = useState(testUsers);
    
    const [filterState, setFilterState] = useState({
        name:'asc',
        deparment:'ALL',
    })


    
    //reducer of sorts.
    const reduceFilter = (message:{attribute:string, payload:any})=>{


        switch(message.attribute)
        {

            case "name":
                switch(message.payload){

                    case 'flip':
                        setFilterState(curr=>({...curr , name : curr.name==='asc'?'desc':'asc'}));
                        break;
                    case 'asc':
                        setFilterState(curr=>({...curr , name : 'asc'}));
                        break;
                    case 'desc':
                        setFilterState(curr=>({...curr , name : 'desc'}));
                        break;
                }
                break;

            case "department":
                setFilterState(curr=>({...curr , deparment: message.payload } ))
                break;


        }

    }
    //\\\\\\\\\\\\\\\\\\\\\\\\



    const getArrow = (direction:string)=>{

        if(direction === 'asc')
            return ( <i className="bx bx-up-arrow-alt"></i>);
        else return (<i className="bx bx-down-arrow-alt"></i>);

    }

    /////// filtered users
    const filteredUsers = useMemo(()=>{

        if( filterState.deparment ==='ALL')
        {
            if( filterState.name === 'asc'){
                return testUsers.sort((a,b)=>a.name.localeCompare(b.name))
            }
            else{
                return testUsers.sort((a,b)=>b.name.localeCompare(a.name))
            }
        }
        else{

            if( filterState.name === 'asc'){
                return testUsers.filter(curr=> curr.department === filterState.deparment ).sort((a,b)=>a.name.localeCompare(b.name))
            }
            else{
                return testUsers.filter(curr=> curr.department === filterState.deparment ).sort((a,b)=>b.name.localeCompare(a.name))
            }

        }

    }
    , [filterState]);
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



    /// how many departments
    const departments :string[]= useMemo(
        ()=>{
            return  Object.keys (
                testUsers.reduce( (prev, curr)=>({...prev, [curr.department]:true}) , {} )
            )
        }
        , [testUsers]);//in a real app this value would be a react state probably.

    //\\\\\\\\\\\\\\\\\\\\\\\\\



    ////RENDER
    /////////////////////////////////
    return (<>
    <div className="row g-0">
        
        <div className="filter-controls-container g-0">
            
            <ul className="filter-options">
                <li>
                    <button className="" onClick={()=>{ reduceFilter({attribute:'name', payload:'flip'}) } }>
                        Sort by name { getArrow(filterState.name) }
                    </button>
                </li>
                <li>
                    <label>Department:</label>
                    <select onChange={e=> reduceFilter({attribute:'department', payload: e.target.value })}>
                        <option value="ALL">All</option>
                        {
                            departments.map(curr=><option value={curr}>{curr}</option>)
                        }
                    </select>
                </li>
            </ul>

        </div>
       
        {
            filteredUsers.map( (curr,index) =>(
                <Card 
                animationTime={index*50} 
                className="member-card" 
                containerProps={{className:'col-xxl-3 col-lg-4 col-md-6', style:{padding:'1rem 1rem'}}}
                key={index}
                link
                renderContainer
                to={""+curr.id}
                style={{background: colors[ departments.indexOf (curr.department) % colors.length] }} 
                >


                    <div className="left">
                        <img className="img-fluid rounded-circle" src={`/profile_pictures/${curr.img}`} alt={"name:"+curr.name}></img>
                    </div>

                    <div className="right">
                        <p className="name">{curr.name}</p>
                        <p className="department">{curr.department}</p>
                    </div>
                </Card>

            ))
        }


    </div>
    
    <UserMessage timeout={10000}>
            <p>Some simple filtering, no pagination or framing!</p>
        </UserMessage>
    </>
    );

}


