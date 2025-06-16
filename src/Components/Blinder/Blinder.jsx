import React from 'react';
import { Link } from 'react-router';
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const Blinder = () => {
    return (
        <div className='w-full pb-[150px]'>
            <div className="lg:container mx-auto">

                {/* top wrapper  */}
                <div className="flex items-center">
                    <div className="max-w-1/2 w-full min-h-[570px]">
                        <img className='w-full h-full object-cover min-h-[570px]' src="/blinder/blinder_1.png" alt="blinder image" />
                    </div>
                    <div className="max-w-1/2 w-full min-h-[570px] bg-[#dadada] p-8 flex justify-center flex-col">
                        <span className='text-base text-[#767676] font-poppins font-normal capitalize mb-5 block'>women collections</span>
                        <h3 className='text-5xl text-[#484848] font-normal capitalize mb-5'>peaky blinders</h3>
                        <span className='text-base text-black font-poppins font-normal uppercase underline mb-5 block'>description</span>
                        <p className='text-base text-[#767676] font-poppins font-normal mb-5 max-w-[515px] w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero pariatur perspiciatis, rem iusto hic nihil!</p>
                        <p className='text-base text-[#767676] font-poppins font-normal capitalize'>size: <span className='inline-block px-4 py-1 bg-black rounded-sm text-white ml-3 mb-5'>m</span></p>
                        <p className='text-2xl text-black mb-5'>$1000.00</p>
                        <Link to={'/products'} className='text-base text-white font-poppins font-medium capitalize px-6 py-2.5 bg-black rounded-lg max-w-[207px] w-full h-auto flex items-center justify-center'>buy now</Link>
                    </div>
                </div>


            </div>

            <div className="w-full bg-white min-h-[200px] h-full flex items-center justify-center shadow-lg">
                <div className="lg:container mx-auto">
                    {/* bottom wrapper  */}
                    <div className="flex items-center justify-between gap-8">
                        <div className='flex items-center gap-3'>
                            <button><FaHandHoldingHeart size={'2.5rem'} color='black' /></button>
                            <div>
                                <h4 className='text-xl text-[#484848] font-poppins font-medium capitalize mb-2'>high quality</h4>
                                <span className='text-base text-[#484848] font-poppins font-normal'>crafted from top materials</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button><FaAward size={'2.5rem'} color='black' /></button>
                            <div>
                                <h4 className='text-xl text-[#484848] font-poppins font-medium capitalize mb-2'>warranty</h4>
                                <span className='text-base text-[#484848] font-poppins font-normal'>over 2 years</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button><FaShippingFast size={'2.5rem'} color='black' /></button>
                            <div>
                                <h4 className='text-xl text-[#484848] font-poppins font-medium capitalize mb-2'>free shipping</h4>
                                <span className='text-base text-[#484848] font-poppins font-normal'>oder over 150 $</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button><IoCall size={'2.5rem'} color='black' /></button>
                            <div>
                                <h4 className='text-xl text-[#484848] font-poppins font-medium capitalize mb-2'>24/7 support</h4>
                                <span className='text-base text-[#484848] font-poppins font-normal'>dedicated support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blinder;