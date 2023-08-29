import React, { useState } from "react";
import { NewJobType } from '../../types/types';
import { JobData } from '../../types/types';


function NewJob({ setShowModal, setJobListChanged, initialData }: NewJobType) {

  const emptyForm: JobData = { 
    company: initialData.company ? initialData.company : '', 
    position: initialData.position ? initialData.position : '', 
    location: initialData.location ? initialData.location : '', 
    salary: initialData.salary ? initialData.salary : '', 
    joblink: initialData.joblink ? initialData.joblink : '', 
    status: initialData.status ? initialData.status : '', 
    notes: initialData.notes ? initialData.notes : ''
  } 
  const [formData, setFormData] = useState<JobData>(emptyForm);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }


  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    //TODO: POST method to DB
    setShowModal(false);
    setJobListChanged(true);
  }

  return (
    <div className="bg-gray-200 p-6 rounded-md">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder='Codesmith'
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder='Software Engineer'
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder=''
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder=''
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="joblink" className="block text-sm font-medium text-gray-700">Job Link</label>
          <input
            type="text"
            id="joblink"
            name="joblink"
            value={formData.joblink}
            onChange={handleChange}
            placeholder=''
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="Applied">Applied</option>
            <option value="Interview In Progress">Interview In Progress</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Job Offer</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder=''
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
          <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            x
          </button>
        </div>
      </form>
    </div>
  )

}

export default NewJob