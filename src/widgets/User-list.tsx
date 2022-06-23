import { useTransition } from "react";
import "./scss/User-list.scss"


export type UserListProps = {

    users: user [],
    cutoff?: number
}



export const UserList = (props: UserListProps)=>{

    let {users, cutoff =3} = props;

    const renderExtraMembers = ()=>{

        if(users.length>cutoff){

            return (
                <li className="rounded-circle extra-users">
                    {users.length - cutoff}
                </li>
            );
        }
        else{
            return null;
        }
    }

    return (<ul className="user-list-mini">
    
            {
                users.filter( (curr, index)=>index<cutoff).map(curr =>(
                     <li>
                         <img className="img-fluid rounded-circle" src={"/profile_pictures/"+curr.img} alt={"name:"+curr.name}></img>
                    </li>)
            )}

            {renderExtraMembers()}
        

     </ul>);


}

//export default UserList;