import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useridFromCookie } from '../globalFunction';

const Resources = () => {
  const [addResource, setAddResource] = useState('');
  const [addResourceName, setAddResourceName] = useState('');
  const [resources, setResources] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedResource, setDeletedResource]= useState(-1)
  const [reloadPage, setReloadpage] = useState(false)
  const userId = useridFromCookie();

  const addNewResource = async () => {
    try {
       await fetch(`/api/resources/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: addResource, name: addResourceName }),
      });
      setReloadpage(prevState => !prevState); 

    } catch (error) {
      console.log(error);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await fetch(`/api/resources/${userId}`); // Replace with your backend endpoint
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletebutton = async () => {
    try {
      await fetch(`/api/resources/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: deletedResource }),
      });
      setShowDeleteModal(false);
      setReloadpage(prevState => !prevState); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [reloadPage]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center space-x-2">
        <input
          type="text"
          placeholder="Enter the link"
          onChange={(e) => {
            setAddResource(e.target.value);
          }}
          className="border rounded p-1"
        />
        <input
          type="text"
          placeholder="Enter the name"
          onChange={(e) => {
            setAddResourceName(e.target.value);
          }}
          className="border rounded p-1"
        />
        <button
          onClick={addNewResource}
          className="bg-blue-500 text-white px-3 py-1 rounded "
        >
          Add
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete a Link
        </button>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="bg-slate-700 p-4 rounded shadow-md">
            <div className='flex flex-col'>
            {resources.map((resource:{id:number,link:string,linkname:string,name:string}) => (
                <button key={resource.id}
                  onClick={() => setDeletedResource(resource.id)}
                  className={`mb-2 text-left ${
                    deletedResource === resource.id ? 'bg-red-200 bg-opacity-50' : ''
                  }`}>
                  {resource.linkname}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-white mr-4"
              >
                Cancel
              </button>
              <button onClick={deletebutton} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-5xl text-white underline ">Main Resources</div>
      <div className="text-white flex flex-row flex-wrap items-center text-3xl space-x-10 my-6">
      <Link
          className="flex flex-row "
          target="_blank"
          rel="noopener noreferrer"
          to={'https://drive.google.com/drive/u/0/my-drive'}
        >
          <img
            className="w-10 h-10 p-0.5 mx-5"
            src="/assets/googledrive.png"
            alt="Google Drive"
          />
          Google Drive
        </Link>
        <Link
          className="flex flex-row"
          target="_blank"
          rel="noopener noreferrer"
          to={'https://leetcode.com/problemset/all/'}
        >
          <img className="w-10 h-10 p-0.5 mx-5" src='/assets/leetCode.png' alt="Leetcode" />
          Leetcode
        </Link>
        <Link
          className="flex flex-row"
          target="_blank"
          rel="noopener noreferrer"
          to={'https://www.ziprecruiter.com/'}
        >
          <img className="w-10 h-10 p-0.5 mx-5" src='/assets/zipRecruiter.png' alt="Leetcode" />
          ZipRecruiter
        </Link>
        <Link
          className="flex flex-row "
          target="_blank"
          rel="noopener noreferrer"
          to={'https://www.indeed.com/'}
        >
          <img className="w-10 h-10 p-0.5 mx-5" src='/assets/Indeed.png' alt="Indeed" />
          Indeed
        </Link>
        <Link
          className="flex flex-row"
          target="_blank"
          rel="noopener noreferrer"
          to={'https://www.linkedin.com/jobs/'}
        >
          <img className="w-10 h-10 p-0.5 mx-5" src='/assets/Linkedin.png' alt="LinkedIn Jobs" />
          LinkedIn Jobs
        </Link>
      </div>
      <div className="text-5xl text-white underline">Other Resources</div>
      <div className="text-white flex flex-row flex-wrap items-center text-3xl space-x-10 my-5">
        {resources.map((resource:{id:number,link:string,linkname:string}) => (
          <div key={resource.id}>
            <a href={resource.link.startsWith('http') ? resource.link : `http://${resource.link}`}
             target="_blank" rel="noopener noreferrer">
              {resource.linkname}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
