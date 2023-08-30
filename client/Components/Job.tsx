import React from "react";
import { JobData } from '../../types/types';

function Job({ job, setEditForm, setShowModal }: { job: JobData, setEditForm(value: JobData): void, setShowModal(value: boolean): void }) {
  return (
    <div className="grid grid-cols-9 gap-4 p-4 border-b text-white">
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
        className="w-2/3 py-2 mt-4 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        onClick={() => {
          setEditForm(job)
          setShowModal(true)

        }}
      >
        Edit
      </button>
      <button
        className="w-2/3 py-2 mt-4 bg-red-500 hover:bg-red-700 focus:ring focus:ring-red-300"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
    </div>
  );
}

export default Job;
