import * as d3 from 'd3';


const names:string[] = ["cat","pete","dough","steve","dog","pert","clark","donna","pissa","hamma","part"];
const randomNameIndex = d3.randomInt( 0 , names.length );


const jobs:string[] = ["Programming" ,"UI", "Quality assurance","Accounting","Management","Accounting"]
const randomJobs = d3.randomInt(0,jobs.length)


const randomProfile = d3.randomInt(1,9);

let id = 0;
const getNextID=()=>{
    const temp = id;
    id+=1;
    return temp;
}


export const getRandomUser=():user=>{


    
    const random = randomNameIndex();
   
  
    return {
            name:names[random] ,
            id:getNextID() ,
            img:`pfile_0${ randomProfile( ) }.png`,
            department:jobs[ randomJobs() ],
            "url":names[random]
    };
}
