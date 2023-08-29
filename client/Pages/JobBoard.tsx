import React, { useEffect, useState } from "react";
import { JobData } from '../../types/types';
import Job from "../Components/Job";
import NewJob from "../Components/NewJob";

function JobBoard() {

  const [jobList, setJobList] = useState<JobData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [jobListChanged, setJobListChanged] = useState(true);
  const emptyForm = { id: -1, company: '', position: '', location: '', salary: '', joblink: '', status: '', notes: '' }
  const [editForm, setEditForm] = useState<JobData>(emptyForm);

  


  useEffect(() => {

    const userId = 10; //! Change this once you figure out cookies

    // const sampleData = [{
    //   company: 'Apple',
    //   position: 'IT Support',
    //   location: 'India',
    //   salary: '$1000',
    //   joblink: 'www.google.com',
    //   status: 'applied',
    //   notes: 'hello this is IT support'
    // }, {
    //   company: 'Mcdonalds',
    //   position: 'CEO',
    //   location: 'USA',
    //   salary: '$1,000,000',
    //   joblink: 'www.mcd.com',
    //   status: 'Accepted',
    //   notes: 'Ronald Mcdonald'
    // }, {
    //   company: 'CodeSmith',
    //   position: 'Fellow',
    //   location: 'Remote',
    //   salary: '$50,000',
    //   joblink: 'www.codesmith.com',
    //   status: 'Interview',
    //   notes: 'lets go Mcdonald'
    // }]
    async function getData(){
      const response = await fetch(`/api/jobs/${userId}`)
      const data = await response.json()
      setJobList(data);
    }
    getData();
    console.log('Job List changed: ', jobListChanged) //! DELETE AFTER
  }, [jobListChanged])



  //TODO: add delete functionality

  return (
    <>
      <button className= 'p-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300'onClick={() => {
        setEditForm(emptyForm)
        setShowModal(true)
        }}>Add Job</button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 max-w-2xl mx-auto">
            <NewJob setShowModal={setShowModal} setJobListChanged={setJobListChanged} initialData={editForm} />
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

        {jobList ? jobList.map((job) => (
          <Job
            key={job.id}
            job={job}
            setEditForm={setEditForm}
            setShowModal={setShowModal}
          />
        )) : null}
      </div>

    </>
  )
}

export default JobBoard