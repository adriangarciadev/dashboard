import * as d3 from 'd3';


const names:string[] = ["cat","pete","dough","steve","dog","pert","clark","donna","pissa","hamma","part"];
const randomNameIndex = d3.randomInt( 0 , names.length );


const jobs:string[] = ["Programming" ,"UI", "Quality assurance","Accounting","Management",""]
const randomJobs = d3.randomInt(0,jobs.length)


const randomProfile = d3.randomInt(1,9);


export const getRandomUser=():user=>{


    
    const random = randomNameIndex();
   
  
    return {
            name:names[random],
            img:`pfile_0${ randomProfile( ) }.png`,
            department:jobs[ randomJobs() ],
            "url":names[random]
    };
}
