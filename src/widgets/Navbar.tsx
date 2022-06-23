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
        text:"Home",
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
    {   to:"/blogs",
    text:"Blogs",
    icon:"bx bx-bookmark"

    },
    {   to:"/main",
    text:"Main",
    icon:"bx bx-folder"

    },


]

export const Navbar = ()=>{

    const [isOpen, setOpen] = useState(true);

    const openCloseMenu = ()=>{

        setOpen(!isOpen);
    }


    const getNavbarStyle=()=>{
        
        if(isOpen)
          return {
               maxWidth:CONFIG.widthExpanded,
               paddingLeft:`${CONFIG.navbarLeftPadding}rem`
         }
        else
          return {
               maxWidth:CONFIG.widthCollapsed()+"rem",
               paddingLeft:`${CONFIG.navbarLeftPadding}rem`
        }
    }

    const renderCloseControls = ()=>{

        if(isOpen)
        {
            return (
                <li className="close-controls">
                    <span>Close this container</span> <span className="ms-auto"><i className='bx bxs-arrow-from-right' onClick={openCloseMenu}></i></span>
                </li>

            );
        }
        else{

            return (

                <li className="close-controls">
                    <span></span><i className='bx bxs-arrow-from-left' onClick={openCloseMenu}></i>
                </li>
            );
        }
    }

    return (
                <nav className="navbar" style={getNavbarStyle()}>
                    
                    <ul className="list-unstyled text-center">
                    
                    {renderCloseControls()}
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