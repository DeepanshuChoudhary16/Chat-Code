import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/User.Contex';
import axios from "../config/axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [project, setProject] = useState([]);

    const navigate = useNavigate();

    function createProject(e) {
        e.preventDefault();
        console.log({ projectName });

        axios.post('/api/v1/project/create', { name: projectName })
            .then((res) => {
                console.log(res);
                setIsModalOpen(false);
                setProject([...project, res.data.project]); // Add new project to state
            })
            .catch(() => {
                console.log("Project creation failed");
            });
    }

    useEffect(() => {
        console.log('Token:', localStorage.getItem('token'));

        axios.get('/api/v1/project/all')
            .then((res) => {
                console.log("Response:", res.data);
                setProject(res.data.data.projects || []);
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
            });

    }, []); // Run only once

    return (
        <main className='p-4'>
            <div className="projects flex flex-wrap gap-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

                {project && project.length > 0 ? (
                    project.map((proj) => (
                        <div key={proj._id}
                            onClick={() => navigate(`/project`, { state: { project: proj } })}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                            <h2 className='font-semibold'>{proj.name}</h2>

                            <div className="flex gap-2">
                                <p><small><i className="ri-user-line"></i> Collaborators</small> :</p>
                                {proj.users.length}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                                    onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
