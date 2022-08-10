import Card from "./Card";
import { UserList } from "./User-list";

import "./scss/CardMembers.scss"


export type TeamMembersPreviewProps = {

    department: string,
    quantity:number,
    users: user[]

};


export const TeamMembersPreview = (props: TeamMembersPreviewProps)=>{

    const {department, quantity, users} = props;


    return (<div className="team-preview">
            <div className="line">
                <span className="quantity h1 fw-bold">{quantity}</span>
                <span className="hh3"> &#8250;</span>
            </div>
            <div className="line">
                <span className="department">{department}</span>
                <div className="ms-auto d-inline">
                    <UserList users={users}></UserList>
                </div>
            </div>
        
        </div>);

}