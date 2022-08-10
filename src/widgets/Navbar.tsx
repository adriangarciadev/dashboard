import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";

import "./scss/Navbar.scss"/** Grid version could be more backwards compatible **/



/*  Collapse size = 
|left padding|icon width|column gap|
column gap should be equal to left padding so it is symetrical
*/
const CONFIG = {

    navbarLeftPadding:2,
    icondWidth:2,
    columnGap:2,
    widthCollapsed:function(){
        return this.navbarLeftPadding+ this.icondWidth +this.columnGap;
    },
    widthExpanded:"30rem"//fix
}

const Links: {to:string,text:string,icon:string}[] = [

    {   to:"/",
        text:"Main",
        icon:"bx bx-grid-alt"
    },
    {   to:"/Members",
    text:"Members",
    icon:"bx bx-user"

    },

    {   to:"/Projects",
    text:"Projects",
    icon:"bx bx-message-square-detail"

    },
    {   to:"/charts",
    text:"Charts",
    icon:"bx bx-bookmark"

    },



]

const getWindowDimensions =()=> {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


export const Navbar = ()=>{


    // on desktop the navbar starts open, on screen sizes smaller than or equal to 600 it starts closed;
    const initialState = getWindowDimensions().width > 600;

    const [isOpen, setOpen] = useState( initialState );


    const toggleMenu = ()=>{

        setOpen(!isOpen);
    }



    return (
                <nav className={"navbar" + (isOpen?'':' closed')}>
                    

                    <div className="close-controls" onClick={ toggleMenu }>
                        {isOpen&&<span>Minimize menu</span>}
                        <span className="ms-auto"><i className={ 'bx bxs-arrow-from-'+(isOpen?'right':'left') } ></i></span>
                    </div>
                    <ul className="list-unstyled text-center">
                        {
                            Links.map(curr=>(
                                <li>
                                    <NavLink style={{columnGap:`${CONFIG.columnGap}rem`}}className="navbar-element menu-element" to={curr.to}><i className={curr.icon} style={{fontSize:`${CONFIG.icondWidth}rem`}}></i>{curr.text}</NavLink>
                                </li>
                            ))
                        }
                    </ul>   
                   
                    <Link to="/" className="rounded-pill menu-element help"><i className='bx bx-help-circle'></i> <span>Need Help?</span></Link>     
            
                </nav>
            
    );


}