import React, { useContext, useEffect, useState } from 'react';
import { JobData } from '../../types/types';
import Job from '../Components/Job';
import NewJob from '../Components/NewJob';
import { useridFromCookie } from '../globalFunction';

function JobBoard() {
  const [jobList, setJobList] = useState<JobData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [jobListChanged, setJobListChanged] = useState(true);
  const userId = useridFromCookie();
  const emptyForm = {
    id: -2,
    company: '',
    position: '',
    location: '',
    salary: '',
    joblink: '',
    status: '',
    notes: ''
  };
  const [editForm, setEditForm] = useState<JobData>(emptyForm);

  useEffect(() => {

    console.log('Current user ID: ', userId);
    async function getData() {
      const response = await fetch(`/api/jobs/${userId}`);
      const data = await response.json();
      setJobList(data);
    }
    getData();

  }, [jobListChanged]);

  //TODO: add delete functionality

  return (
    <div className="p-10">
      <div className="flex items-center">
        <span className="text-4xl text-white">My Job Applications</span>
        <button
          className="text-white border border-2 text-3xl w-14 h-14 rounded-lg hover:bg-white hover:text-black ml-auto"
          onClick={() => {
            setEditForm(emptyForm);
            setShowModal(true);
          }}
        >
          +
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="z-10 w-1/2 max-w-3xl min-w-[500px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <NewJob
              setShowModal={setShowModal}
              setJobListChanged={setJobListChanged}
              initialData={editForm}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto mt-10 ">
        <div className="grid grid-cols-9 gap-4 mb-4 p-4 border-b-2 text-center font-bold text-white">
          <span>Company</span>
          <span>Position</span>
          <span>Location</span>
          <span>Salary</span>
          <span>Job Link</span>
          <span>Status</span>
          <span>Notes</span>
        </div>

        {jobList
          ? jobList.map((job) => (
            <Job
              key={job.id}
              job={job}
              setEditForm={setEditForm}
              setShowModal={setShowModal}
            />
          ))
          : null}
      </div>
    </div>
  );
}

export default JobBoard;
