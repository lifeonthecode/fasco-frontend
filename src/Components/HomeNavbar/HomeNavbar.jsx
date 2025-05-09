import React from 'react';
import { Link, NavLink } from 'react-router';

const HomeNavbar = () => {
    return (
        <div className='w-full'>
            <div className="lg:container w-full mx-auto">
                <div className="flex items-center justify-between">
                    {/* logo wrapper  */}
                    <div className="logo_wrapper">
                        <Link to={'/'}><h3 className='text-[3.5rem] text-[#484848] uppercase font-normal'>fasca</h3></Link>
                    </div>

                    {/* navbar  */}
                    <nav className='flex items-center gap-[3.5rem]'>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>home</NavLink>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>deals</NavLink>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>new arrivals</NavLink>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>packages</NavLink>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins block'>sign in</NavLink>
                        <NavLink to={'/'} className='text-base capitalize font-normal font-poppins px-6 py-2.5 bg-black text-white rounded-lg'>sign up</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HomeNavbar;