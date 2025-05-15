import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";

const Navbar = () => {
    const location = useLocation()
    return (
        <div className='w-full h-auto bg-white'>
            <div className="lg:container w-full mx-auto">
                <div className="flex items-center justify-between">
                    {/* logo wrapper  */}
                    <div className="logo_wrapper">
                        <Link to={'/'}><h3 className='text-[3.5rem] text-[#484848] uppercase font-normal'>fasca</h3></Link>
                    </div>

                    {/* navbar  */}
                    {

                        location?.pathname === '/' ? (
                            <nav className='flex items-center gap-[3.5rem]'>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>home</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>deals</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>new arrivals</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>packages</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins block'>sign in</NavLink>
                                <NavLink to={'/'} className='text-base capitalize font-normal font-poppins px-6 py-2.5 bg-black text-white rounded-lg'>sign up</NavLink>
                            </nav>
                        )
                            : (
                                <nav className='flex items-center gap-[3.5rem]'>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>home</NavLink>
                                <NavLink to={'/products'} className='text-base text-[#484848] capitalize font-normal font-poppins'>shop</NavLink>
                            </nav>
                            )

                    }

                    {
                        location?.pathname !== '/' && (
                            <div className='flex items-center gap-8'>
                                {/* search box  */}
                                <div>
                                    <Link className='cursor-pointer'><CiSearch size={'1.5rem'} color='#484848' /></Link>
                                </div>
                                {/* user box  */}
                                <div>
                                    <Link  className='cursor-pointer'><FaUser size={'1.5rem'} color='#484848' /></Link>
                                </div>
                                {/* wishlist box  */}
                                <div>
                                    <Link className='cursor-pointer'><FaHeart size={'1.5rem'} color='#484848' /></Link>
                                </div>
                                {/* cart box  */}
                                <div>
                                    <Link to={'/cart'} className='cursor-pointer'><BsMinecartLoaded size={'1.5rem'} color='#484848' /></Link>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;