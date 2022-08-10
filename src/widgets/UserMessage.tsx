import { Props } from "@react-three/fiber";
import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { useTimeout } from "../hooks/useTimeout";

import './scss/UserMessage.scss'

type userMessageProps = {

    timeout?:number;
    children?:React.ReactNode;

}

const admin = {
    name:"Adrian",
    pic: "pfile_03.png"

}

const initialStyle = {color:'white'}

export const UserMessage = (props: userMessageProps)=>{


    const [style, setStyle] = useState(initialStyle);

    const {timeout, children} = props;



    useTimeout(()=>{ setStyle(
            curr=>({...curr, transform:'translate(-50%, 0%)'} ))
        },500);

    useTimeout(()=>{ setStyle(
        curr=>({...curr , transform:'translate(-50%,200%)' } ))
    },timeout);




    return (
        <div className="message-container" style={style}>
          
            <div className="message">
                <div className="name-picture">
                    <img src={`/profile_pictures/${admin.pic}`} alt="admin" />
                    <p>{`${admin.name}`}</p>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>

    );
    //useInterval()

}


