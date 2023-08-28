import React, {useEffect, useState} from "react";
import {JobData} from '../../types/types';
import Job from "../Components/Job";

function JobBoard() {
  
  const [jobList, setJobList] = useState<JobData[]>([]);

  useEffect(() => {
    //! Change this later. Dummy data for now
    const sampleData = [{
      company:'Apple',
      position:'IT Support',
      location:'India',
      salary:'$1000',
      joblink:'www.google.com',
      status:'applied',
      notes:'hello this is IT support'
    },{
      company:'Mcdonalds',
      position:'CEO',
      location:'USA',
      salary:'$1,000,000',
      joblink:'www.mcd.com',
      status:'Accepted',
      notes:'Ronald Mcdonald'
    },{
      company:'CodeSmith',
      position:'Fellow',
      location:'Remote',
      salary:'$50,000',
      joblink:'www.codesmith.com',
      status:'Interview',
      notes:'lets go Mcdonald'
    }]
    setJobList(sampleData)

  }, [])

  //& Create headers

  return (
    <>
    <div>Job Board</div>
    <div>
      {jobList ? jobList.map((job) => {
        return <Job 
        key={job.company} 
        company={job.company} 
        position={job.position} 
        location={job.location} 
        salary={job.salary} 
        joblink={job.joblink} 
        status={job.status} 
        notes={job.notes} />;
      }) : null}
    </div>
    </>
  )
}

export default JobBoard