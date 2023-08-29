import React from "react";
import { JobData } from '../../types/types';

function Job({job, setEditForm, setShowModal} : { job: JobData, setEditForm(value: JobData): void, setShowModal(value: boolean): void}) {
  return (
    <div className="grid grid-cols-9 gap-4 p-4 border-b">
      <div className="flex justify-center">{job.company}</div>
      <div className="flex justify-center">{job.position}</div>
      <div className="flex justify-center">{job.location}</div>
      <div className="flex justify-center">{job.salary}</div>
      <div className="flex justify-center">
        <a href={job.joblink} target="_blank" rel="noopener noreferrer">{job.joblink}</a>
      </div>
      <div className="flex justify-center">{job.status}</div>
      <div className="flex justify-center">{job.notes}</div>
      <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          onClick={() => {
            setEditForm(job)
            setShowModal(true)
          }}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
    </div>
  );
}

export default Job;
