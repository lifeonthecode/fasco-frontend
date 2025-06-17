import { NavLink } from "react-router";
import { IoIosAddCircle } from "react-icons/io";
import { GrDeliver } from "react-icons/gr";
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";



const Sidebar = ({ user }) => {


    return <nav className="flex flex-col gap-6 text-3xl capitalize text-black">
        {
            user?.role === 'admin' ? <>
                <NavLink to={'/dashboard'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#7e6fb3] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><IoIosAddCircle size={'1.5rem'} />Dashboard</NavLink>

                <NavLink to={'/dashboard/admin/add-product'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><IoIosAddCircle size={'1.5rem'} /> add Product</NavLink>

                <NavLink to={'/dashboard/admin/orders'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><MdLocalShipping size={'1.5rem'} /> orders</NavLink>

                <NavLink to={'/dashboard/admin/products'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><FaProductHunt size={'1.5rem'} /> Products</NavLink>


                <NavLink to={'/dashboard/admin/users'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><LuUsersRound size={'1.5rem'} /> users</NavLink>

            </> : <>
                <NavLink to={'/dashboard'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#7e6fb3]  text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4 '
                }><IoIosAddCircle size={'1.5rem'} />Dashboard</NavLink>

                <NavLink to={'/dashboard/user/orders'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><GrDeliver size={'1.5rem'} /> orders</NavLink>

                <NavLink to={'/dashboard/user/cart'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-lg capitalize font-poppins font-medium flex items-center gap-4'
                }><BsCartCheckFill size={'1.5rem'} /> cart</NavLink>

                <NavLink to={'/dashboard/user/wishlist'} className={({ isActive }) =>
                    isActive ? 'px-4 py-3 bg-[#5932ea] text-white text-lg capitalize font-poppins font-medium rounded-xl text-center flex items-center gap-4' : 'text-[#9197b3] text-xl capitalize font-poppins font-medium flex items-center gap-4'
                }><FaHeart size={'1.5rem'} /> wishlist</NavLink>
            </>
        }
    </nav>
};

export default Sidebar;