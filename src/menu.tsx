
const menuElements = ["Home","Members","Projects","Messages","Clients"];

function menu(){

    return (<ul>
        {
            menuElements.map(curr=> curr)
        }
    </ul>)
}

export default menu;