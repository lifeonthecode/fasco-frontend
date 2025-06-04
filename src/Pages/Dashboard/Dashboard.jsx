import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const {user} = useSelector(state => state.users);
    return (
        <div>
            <div className='py-4 px-6 border-[2px] border-[#00ac4f] rounded-lg mb-10'>
                {
                    user?.role === 'admin' ? (
                        <div className='flex items-center justify-between gap-8'>
                            {/* total sell */}
                            <div className='flex items-center justify-center gap-2.5'>
                                <div>
                                    <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><MdSell size={'42px'} color='white' /></button>
                                </div>
                                <div className='flex flex-col gap-2.5'>
                                    <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>total sell</p>
                                    <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>5000</h4>
                                </div>
                            </div>

                            {/* total orders  */}
                            <div className='flex items-center justify-center gap-2.5'>
                                <div>
                                    <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><FaShippingFast size={'42px'} color='white' /></button>
                                </div>
                                <div className='flex flex-col gap-2.5'>
                                    <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>total orders</p>
                                    <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>5000</h4>
                                </div>
                            </div>

                            {/* new orders  */}
                            <div className='flex items-center justify-center gap-2.5'>
                                <div>
                                    <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><FaShippingFast size={'42px'} color='white' /></button>
                                </div>
                                <div className='flex flex-col gap-2.5'>
                                    <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>new orders</p>
                                    <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>50</h4>
                                </div>
                            </div>

                            {/* total users  */}
                            <div className='flex items-center justify-center gap-2.5'>
                                <div>
                                    <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><FaUser size={'42px'} color='white' /></button>
                                </div>
                                <div className='flex flex-col gap-2.5'>
                                    <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>total users</p>
                                    <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>500</h4>
                                </div>
                            </div>

                        </div>
                    )
                        :
                        (
                            <div className='flex items-center justify-between gap-8'>
                                {/* total orders */}
                                <div className='flex items-center justify-center gap-2.5'>
                                    <div>
                                        <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><MdSell size={'42px'} color='white' /></button>
                                    </div>
                                    <div className='flex flex-col gap-2.5'>
                                        <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>total orders</p>
                                        <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>10</h4>
                                    </div>
                                </div>

                                {/* total carts  */}
                                <div className='flex items-center justify-center gap-2.5'>
                                    <div>
                                        <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><FaShippingFast size={'42px'} color='white' /></button>
                                    </div>
                                    <div className='flex flex-col gap-2.5'>
                                        <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>total carts</p>
                                        <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>15</h4>
                                    </div>
                                </div>

                                {/* total wishlist  */}
                                <div className='flex items-center justify-center gap-2.5'>
                                    <div>
                                        <button className='w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#00ac4f] cursor-pointer'><FaShippingFast size={'42px'} color='white' /></button>
                                    </div>
                                    <div className='flex flex-col gap-2.5'>
                                        <p className='text-lg text-[#acacac] font-poppins capitalize font-medium'>wishlist</p>
                                        <h4 className='text-base font-semibold text-[#333333] capitalize font-poppins'>50</h4>
                                    </div>
                                </div>

                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default Dashboard;