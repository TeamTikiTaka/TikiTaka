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
    status: 'Applied',
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

  // function deleteJob(event: React.ChangeEvent<HTMLSelectElement>){

  //   async function deleteRequest(){

  //   }
  // }

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
          className="fixed inset-0 z-50 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="relative flex flex-col items-center z-10 w-1/2 max-w-3xl min-w-[500px] mt-48 m-auto" 
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
        <div className="flex border-b-2 font-bold text-white">
          <span className='w-[12.5%]'>Company</span>
          <span className='w-[12.5%]'>Position</span>
          <span className='w-[12.5%]'>Location</span>
          <span className='w-[12.5%]'>Salary</span>
          <span className='w-[12.5%]'>Job Link</span>
          <span className='w-[12.5%]'>Status</span>
          <span className='w-[12.5%]'>Notes</span>
        </div>

        {jobList
          ? jobList.map((job) => (
            <Job
              key={job.id}
              job={job}
              setEditForm={setEditForm}
              setShowModal={setShowModal}
              setJobListChanged={setJobListChanged}
            />
          ))
          : null}
      </div>
    </div>
  );
}

export default JobBoard;
