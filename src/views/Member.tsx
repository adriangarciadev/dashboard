import * as d3 from "d3";
import { useParams } from "react-router-dom";
import { getRandomUser } from "../data/users_data";

import './scss/Member.scss'



const loremIpsum = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec venenatis odio, pretium mattis libero. In maximus sodales arcu in laoreet. Maecenas urna ipsum, faucibus ut faucibus a, imperdiet ac velit. Quisque ac sagittis enim. Nunc tempor lorem porttitor convallis tristique. Donec ultrices erat non ex hendrerit, ut tempor nibh porta. Vestibulum felis nulla, auctor vitae ante sit amet, suscipit dapibus ligula. Suspendisse interdum felis lobortis, aliquet est vel, aliquam tellus. Nam id urna eleifend, fermentum est fringilla, fringilla erat. Maecenas faucibus lectus eget nunc vehicula porta. Maecenas ligula dolor, tempor quis convallis nec, vulputate vel neque. Nullam vel mauris mollis, sollicitudin nibh nec, placerat odio. Nam rutrum lacinia dui, vitae maximus elit blandit eu. Nunc nibh eros, bibendum eget libero id, ultrices gravida turpis.

Sed iaculis lectus vel quam imperdiet, ac posuere eros gravida. Mauris bibendum est at neque interdum eleifend. Nullam ultricies suscipit diam, non tempus odio varius eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget purus elementum, commodo massa sit amet, dignissim neque. Donec nec vehicula felis. Nullam ligula purus, condimentum elementum urna ac, viverra auctor nisi.

Curabitur in neque pretium, gravida enim eget, cursus nibh. Cras ac suscipit tortor. Mauris non condimentum lorem, ac mollis orci. Cras non eros leo. Pellentesque aliquet sagittis luctus. Phasellus sodales euismod leo posuere facilisis. Suspendisse a volutpat quam. Etiam vulputate mauris elit, vel viverra felis tempus et. Curabitur congue nisl sit amet lacinia sollicitudin. Nullam sed urna id velit pharetra molestie ut iaculis lectus. Mauris viverra vel libero eu semper. Suspendisse potenti. Proin vitae enim et felis suscipit cursus. Praesent laoreet suscipit vestibulum. Nam dolor enim, scelerisque eget lectus non, luctus finibus orci.

Quisque a luctus felis, at elementum libero. Pellentesque auctor eu urna eu condimentum. Quisque sit amet scelerisque mauris. Praesent euismod magna eget odio blandit, eu tristique magna vulputate. In viverra sem aliquam vestibulum ultricies. Aenean laoreet lorem nec felis varius convallis. Donec consectetur egestas tellus a convallis. Vestibulum a malesuada tortor.

Cras libero tortor, tristique sed odio non, luctus imperdiet turpis. Nulla eget ligula eleifend ante egestas maximus non nec elit. Donec tincidunt volutpat ex, at tincidunt sapien aliquet sed. Cras a dictum nisi. Nunc dictum dui turpis, nec dignissim risus interdum quis. Praesent suscipit, urna ac porttitor facilisis, arcu nulla molestie nibh, id porttitor orci ante sed erat. Proin pretium tempor ante, eget auctor quam sodales eget. Integer malesuada lacinia lorem, at iaculis lacus congue eget. Etiam consectetur odio eget nisi dictum fermentum. Nam ut nibh libero. Cras sit amet efficitur odio, ut tincidunt ligula. Praesent vitae neque sapien. Sed venenatis ultricies orci, in tempor risus. Vestibulum porttitor purus sit amet ante consectetur, et laoreet leo elementum. `;

const colors = d3.schemePastel1;
const randomIndex=d3.randomInt( 0 , colors.length );


export const Member = ()=>{


    const curr = getRandomUser();

    const bgColor = colors[randomIndex() ];


    let params = useParams();

    return (
        <div className="member row g-0 p-0" style={{backgroundColor:bgColor, height:'100%'}} >
            <div className="col-lg-3 member-data">
                <div>
                    <img className="img-fluid rounded-circle" src={`${process.env.PUBLIC_URL}/profile_pictures/${curr.img}`} alt={"name:"+curr.name}></img>
                </div>
                <p className="name">{curr.name}</p>
                <p className="department">{curr.department}</p>
            </div>
            <div className="col-lg-9 member-info">
                {loremIpsum}
            </div>    
        </div>

    );
}