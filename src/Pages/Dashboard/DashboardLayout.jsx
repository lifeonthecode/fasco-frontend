import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router';
import { IoSettingsOutline } from "react-icons/io5";

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='min-h-screen bg-white pt-[30px] pb-[50px]'>
            <div className="lg:container mx-auto">


                <div className="flex justify-between gap-10 w-full min-h-screen h-full">

                    <div className='max-w-[250px] flex flex-col gap-14 w-full py-10 px-4 bg-white shadow-2xl shadow-[#E2ECF9]'>
                        <div>
                            <h2 className='flex items-center gap-4 text-2xl text-black font-poppins font-semibold capitalize cursor-pointer'><IoSettingsOutline size={'24px'} /> dashboard</h2>
                        </div>
                        <Sidebar user={user} />

                        <div className='flex flex-col gap-4'>
                            <h4 className='text-xl text-black font-semibold capitalize font-poppins'>Navigate Pages</h4>
                            <nav className='flex flex-col gap-4'>
                                <Link to={'/'} className='text-base text-black font-medium capitalize font-poppins underline'>Home</Link>
                                <Link to={'/products'} className='text-base text-black font-medium capitalize font-poppins underline'>shop</Link>

                                <Link to={'/best-seller'} className='text-base text-black font-medium capitalize font-poppins underline'>best products</Link>

                                <Link to={'/new-arrivals'} className='text-base text-black font-medium capitalize font-poppins underline'>new arrivals</Link>

                                <Link to={'/accessories'} className='text-base text-black font-medium capitalize font-poppins underline'>accessories</Link>
                            </nav>
                        </div>

                    </div>

                    <main className='flex-1 min-w-[800px] w-full h-full'>

                        

                        <Outlet />
                    </main>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;