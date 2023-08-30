import React, { useState, useContext } from 'react';
import { NewJobType } from '../../types/types';
import { JobData } from '../../types/types';
import { useridFromCookie } from '../globalFunction';

function NewJob({ setShowModal, setJobListChanged, initialData }: NewJobType) {
  const userId = useridFromCookie();
  const emptyForm: JobData = {
    id: initialData.id ? initialData.id : -2,
    company: initialData.company ? initialData.company : '',
    position: initialData.position ? initialData.position : '',
    location: initialData.location ? initialData.location : '',
    salary: initialData.salary ? initialData.salary : '',
    joblink: initialData.joblink ? initialData.joblink : '',
    status: initialData.status ? initialData.status : 'Applied',
    notes: initialData.notes ? initialData.notes : '',
  };
  const [formData, setFormData] = useState<JobData>(emptyForm);
  const [formState, setFormState] = useState('form');
  const [aiInput, setAiInput] = useState('');

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    async function addData() {
      console.log('adding data'); //! DELETE AFTER
      await fetch(`/api/jobs/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setJobListChanged((prevState) => !prevState);
      setShowModal(false);
    }
    async function updateData() {
      console.log('updating data'); //! DELETE AFTER
      await fetch(`/api/jobs/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setJobListChanged((prevState) => !prevState);
      setShowModal(false);
    }
    // Check if its a new job otherwies update data
    if (formData.id === -2) {
      addData();
    } else {
      updateData();
    }
  }

  function openRawDetails(): void {
    setFormState('textBox');
  }

  async function processRawDetails(): Promise<void> {
    setFormState('loading');
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDetails: aiInput }),
    });
    const jobDetails = await response.json();
    console.log(jobDetails);
    async function populateData() {
      const newFormData = { ...formData };
      if ('company' in jobDetails && jobDetails.company !== '')
        newFormData.company = jobDetails.company;
      else if ('Company' in jobDetails && jobDetails.Company !== '')
        newFormData.company = jobDetails.Company;
      if ('position' in jobDetails && jobDetails.position !== '')
        newFormData.position = jobDetails.position;
      else if ('Position' in jobDetails && jobDetails.Position !== '')
        newFormData.position = jobDetails.Position;
      if ('location' in jobDetails && jobDetails.location !== '')
        newFormData.location = jobDetails.location;
      else if ('Location' in jobDetails && jobDetails.Location !== '')
        newFormData.location = jobDetails.Location;
      if ('salary' in jobDetails && jobDetails.salary !== '')
        newFormData.salary = jobDetails.salary;
      else if ('Salary' in jobDetails && jobDetails.Salary !== '')
        newFormData.salary = jobDetails.Salary;

      setFormData(newFormData);
      setFormState('form');
    }
    await populateData();
  }

  return (
    <div className="bg-gray-600 py-10 px-5 rounded-md text-white w-full">
      {formState === 'loading' && (
        <div>Loading</div>
        //TODO: add loading animation
      )}
      {(formState === 'form' || formState === 'textbox') &&
        <div className="w-5/6 flex m-auto">
          <span
            className={`rounded-t-lg ${formState === 'form' && 'bg-gray-700'
              } px-5 w-max grow p-3 text-center`}
            onClick={(e) => {
              setFormState('form');
            }}
          >
            Input
          </span>
          <span
            className={`rounded-t-lg ${formState === 'textbox' && 'bg-gray-700'
              } px-5 w-max grow p-3 text-center`}
            onClick={(e) => {
              setFormState('textbox');
            }}
          >
            Parse
          </span>
        </div>
      }

      {formState === 'form' && (
        <div className="w-5/6 p-5 bg-gray-700 m-auto rounded-b-lg">
          <form
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Job Title"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <input
              type="text"
              id="joblink"
              name="joblink"
              value={formData.joblink}
              onChange={handleChange}
              placeholder="Job Link"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-white"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
              >
                <option value="Applied">Applied</option>
                <option value="Interview In Progress">
                  Interview In Progress
                </option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
              </select>
            </div>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="mt-2 p-2 bg-gray-900 focus:outline-none rounded-md focus:ring-white focus:ring-1 w-full"
            />

            <button
              type="submit"
              className="w-28 py-2 mt-4 bg-slate-950 m-auto rounded-full hover:bg-gray-100 hover:text-slate-950"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {formState === 'textbox' && (
        <div className="w-5/6 p-5 bg-gray-700 m-auto rounded-b-lg">
          <form className="fle w-full h-96 m-auto">
            <textarea
              id="input"
              name="input"
              rows={10}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Paste in job description"
              className="border rounded-md w-full bg-gray-900 p-5 focus:outline-none rounded-md focus:ring-white focus:ring-1"
            />
            <div className="flex flex-row justify-around">
              <button
                type="submit"
                onClick={processRawDetails}
                className="w-28 py-2 mt-4 bg-slate-950 m-auto rounded-full hover:bg-gray-100 hover:text-slate-950"
              >
                Parse Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 
      {formState === 'form' && (
        <div>
          <div></div>
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
            </div>
          </form>
        </div>
      )}
       */}
    </div>
  );
}

export default NewJob;
