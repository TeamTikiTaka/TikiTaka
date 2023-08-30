import React from 'react';
import { JobData } from '../../types/types';
import { useridFromCookie } from '../globalFunction';

function Job({
  job,
  setEditForm,
  setShowModal,
  setJobListChanged,
}: {
  job: JobData;
  setEditForm(value: JobData): void;
  setShowModal(value: boolean): void;
  setJobListChanged: (
    value: boolean | ((prevState: boolean) => boolean),
  ) => void;
}) {
  const userId = useridFromCookie();
  function deleteJob() {
    // DELETE FETCH
    // setJobListChanged
    async function deleteRequest() {
      await fetch(`/api/jobs/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: job.id }),
      });
      setJobListChanged((prevState) => !prevState);
    }
    deleteRequest();
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'text-blue-500';
      case 'Interview':
        return 'text-yellow-500';
      case 'Rejected':
        return 'text-red-500';
      case 'Offer':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex py-4 border-b text-white backdrop-blur-sm bg-gray-500 bg-opacity-5">
      <div className="w-[12.5%] ml-2 truncate">{job.company}</div>
      <div className="w-[12.5%] truncate">{job.position}</div>
      <div className="w-[12.5%] truncate">{job.location}</div>
      <div className="w-[12.5%] truncate">{job.salary}</div>
      <div className="w-[12.5%] underline">
        <img
          className="w-5 h-5"
          src="/assets/link.png"
          onClick={() => {
            window.open(`${job.joblink}`, '_blank')
          }}
        ></img>
        {/* <a href={job.joblink} target="_blank" rel="noopener noreferrer">
          Link
        </a> */}
      </div>
      <div className={`w-[12.5%] ${statusColor(job.status)} truncate`}>{job.status}</div>
      <div className="w-[12.5%] truncate">{job.notes}</div>
      <div className="w-[12.5%] flex place-content-around">
        <img
          className="w-5 h-5 p-0.5 "
          src="/assets/pen.png"
          onClick={() => {
            setEditForm(job);
            setShowModal(true);
          }}
        ></img>
        <img
          className="w-5 h-5 "
          src="/assets/delete.png"
          onClick={deleteJob}
        ></img>
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
}

export default Job;
