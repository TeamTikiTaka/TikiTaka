import React from 'react';
import { JobData } from '../../types/types';

function Job({
  job,
  setEditForm,
  setShowModal,
}: {
  job: JobData;
  setEditForm(value: JobData): void;
  setShowModal(value: boolean): void;
}) {
  return (
    <div className="flex py-4 border-b text-white">
      <div className="w-[12.5%]">{job.company}</div>
      <div className="w-[12.5%]">{job.position}</div>
      <div className="w-[12.5%]">{job.location}</div>
      <div className="w-[12.5%]">{job.salary}</div>
      <div className="w-[12.5%]">
        <a href={job.joblink} target="_blank" rel="noopener noreferrer">
          {job.joblink}
        </a>
      </div>
      <div className="w-[12.5%]">{job.status}</div>
      <div className="w-[12.5%]">{job.notes}</div>
      <div className="w-[12.5%] flex">
        <button
          className="w-2/3 py-2 mt-4 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
          onClick={() => {
            setEditForm(job);
            setShowModal(true);
          }}
        >
          Edit
        </button>{' '}
        <button
          className="w-2/3 py-2 mt-4 bg-red-500 hover:bg-red-700 focus:ring focus:ring-red-300"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Job;
