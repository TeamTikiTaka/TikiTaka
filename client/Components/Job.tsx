import React from "react";
import {JobData} from '../../types/types';


function Job( props: JobData) {

  return (
    <>
    <div className="flex flex-row">
      <div>{props.company}</div>
      <div>{props.position}</div>
      <div>{props.location}</div>
      <div>{props.salary}</div>
      <div>{props.joblink}</div>
      <div>{props.status}</div>
      <div>{props.notes}</div>
    </div>
    </>
  )
}

export default Job