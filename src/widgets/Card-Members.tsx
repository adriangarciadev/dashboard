import Card from "./Card";
import { UserList } from "./User-list";

import "./scss/CardMembers.scss"


export type CardMembersProps = {

    department: string,
    quantity:number,
    users: user[]

};


export const CardMembers = (props: CardMembersProps)=>{

    const {department, quantity, users} = props;


    return (<div className="col-md-4 card-members">
        <Card>
            <div className="line">
                <span className="h1 fw-bold">{quantity}</span>
                <span className="hh3"> &#8250;</span>
            </div>
            <div className="line">
                <span>{department}</span>
                <div className="ms-auto d-inline">
                    <UserList users={users}></UserList>
                </div>
            </div>
        </Card>
        </div>);

}