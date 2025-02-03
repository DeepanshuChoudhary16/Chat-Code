import {useEffect, useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket ,receiveMessage,sendMessage } from '../config/socket'
const Project = () => {

    const navigate = useNavigate()

    const[isSidePanelOpen , setIsSidePanelOpen] = useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ selectedUserId, setSelectedUserId ] = useState(new Set()) 
    const [ users, setUsers ] = useState([])
    useEffect(()=>{

        initializeSocket() 
        axios.get('/api/v1/users/all').then(res => {

            setUsers(res.data.allUser)

        }).catch(err => {

            console.log(err)

        })

    },[])
    const handleUserClick = (_id) =>{
        setSelectedUserId(_id)
    }

    const location = useLocation()



    return (
    <main className='h-screen w-screen flex'>

        <section className='left flex flex-col h-full min-w-80 bg-gray-800'>
            <header className='flex justify-between items-center p-2 px-4 w-full bg-blue-300'>

                <button className='flex gap-2 text-blue-500 cursor-pointer'>
                    <i className="ri-user-add-line"></i>
                    <p className='text-black font-semibold'>Add Collaborator</p>
                </button>


                <button 
                    onClick= {()=>setIsSidePanelOpen(!isSidePanelOpen)}
                    className='p-2 cursor-pointer'>
                    <i className='ri-group-fill'></i>
                </button>
            </header>

            <div className="coversation-area flex-grow flex flex-col">
                <div className='message-box flex-grow flex flex-col gap-1 p-1'>
                    <div className="message max-w-56 flex flex-col p-2 bg-green-100 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>
                            example@gmail.com
                            </small>
                        <p className='tex-sm'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, culpa error quis veniam ratione facilis architecto enim perspiciatis sit amet.</p>
                    </div>

                    <div className="ml-auto message max-w-56 flex flex-col p-2 bg-green-100 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>
                            example@gmail.com
                            </small>
                        <p className='tex-sm'> lorem20</p>
                    </div>
                </div>
                <div className="inputField w-full flex">
                    <input 
                    className='p-2 px-4 border-none outline-none bg-white flex-grow' type="text" placeholder='Message'
                    />
                    <button className='px-3 bg-slate-300'>
                        <i class="ri-send-plane-line"></i>
                    </button>
                </div>
            </div>
            
            <div className={`sidePanel min-w-80 h-full flex flex-col gap-2 bg-gray-700 absolute transition-all ${isSidePanelOpen ?'translate-x-0':'-translate-x-full' } top-0`}>

                <header className='flex justify-end p-2 px-3 bg-slate-200'>
                    <button onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)} className='cursor-pointer'>
                        <i class="ri-close-large-line"></i>
                    </button>
                </header>

                <div className='users flex flex-col gap-2'>

                    <div className='user flex gap-2 item-center cursor-pointer  hover:bg-slate-800 p-2 '>

                        <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-pink-700 bg-blue-200'>
                            <i class="ri-user-heart-fill absolute"></i>
                        </div>

                        <h1 className='font-semibold text-lg text-white'>username</h1>

                    </div>

                </div>
            </div>
        </section>

        {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            {/* <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button> */}
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            // onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

    </main>
    )
}

export default Project
