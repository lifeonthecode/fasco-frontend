import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchSingleUser, userLogout } from '../../App/Features/User/userSlice';

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector(state => state.users);
    // console.log('navbar user check: ', user, 'isAuthenticated: ', isAuthenticated)

    const handleLogout = async () => {
        try {

            const response = await dispatch(userLogout()).unwrap();

            dispatch(fetchSingleUser());
            toast.success(response.message, {
                position: 'top-right'
            });

        } catch (error) {
            toast.error(error.message, {
                position: 'top-right'
            })
        }
    }
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

                        location?.pathname === '/' || (location?.pathname === '/login' || location?.pathname === '/register' || location?.pathname === '/forget-password' || location?.pathname === '/confirmation-code' || location?.pathname === '/new-password') ? (
                            <nav className='flex items-center gap-[3.5rem]'>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>home</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>deals</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>new arrivals</NavLink>
                                <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>packages</NavLink>
                                <NavLink to={'/login'} className='text-base text-[#484848] capitalize font-normal font-poppins block'>sign in</NavLink>

                                <NavLink to={'/register'} className='text-base capitalize font-normal font-poppins px-6 py-2.5 bg-black text-white rounded-lg'>sign up</NavLink>
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


                                    <div className="dropdown">

                                                <div tabIndex={0} role="button">
                                                    {
                                                        user?.avatar?.url ? (
                                                            <img className='w-[40px] h-[40px] rounded-full object-cover border-2 border-green-500 cursor-pointer' src={user?.avatar?.url} alt="" />
                                                        )
                                                        :
                                                         
                                                        (

                                                            <button className='cursor-pointer'><FaUser size={'1.5rem'} color='#484848' /></button>
                                                        )
                                                    }
                                                </div>
                                        {
                                            (isAuthenticated ?

                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                    <li><Link to={'/dashboard'} className='text-base text-black font-poppins capitalize font-semibold '>Dashboard</Link></li>

                                                    <li><Link to={`/dashboard/user/upload-profile/${user?._id}`} className='text-base text-black font-poppins capitalize font-semibold '>upload profile</Link></li>
                                                    <li>
                                                        <button onClick={handleLogout} className='text-base text-black font-poppins capitalize font-semibold '>logout</button></li>
                                                </ul> : '')
                                        }
                                    </div>
                                </div>
                                {/* wishlist box  */}
                                <div>
                                    <Link className='cursor-pointer'><FaHeart size={'1.5rem'} color='#484848' /></Link>
                                </div>
                                {/* cart box  */}
                                <div>
                                    <Link to={`/cart/${user?._id}`} className='cursor-pointer'><BsMinecartLoaded size={'1.5rem'} color='#484848' /></Link>
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