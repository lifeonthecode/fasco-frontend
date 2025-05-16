
const Checkout = () => {
    return (
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                {/* section header  */}
                <div className='flex items-center justify-center w-full mb-10'>
                    <h3 className='text-4xl text-black font-poppins capitalize font-semibold'>checkout form</h3>
                </div>

                <div className="flex items-center justify-between gap-10">
                    {/* delivery details wrapper  */}
                    <div className='max-w-[550px] w-full h-auto flex flex-col gap-7'>
                        <h3 className='text-3xl text-black font-poppins font-semibold capitalize'>deliver details</h3>
                        <div className='w-full'>
                            <form className='flex flex-col gap-6'>

                                {/* first name box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="first_name" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>first Name</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='first_name' type="text" placeholder='First Name' required />
                                </div>

                                {/* street address box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="street_address" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>street address*</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='street_address' type="text" placeholder='Street Address' required />
                                </div>

                                {/* town/city box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="town_or_city" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>town/city*</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='town_or_city' type="text" placeholder='Town/City' required />
                                </div>

                                {/* postal box  */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="postal_code" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>postal code*</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='postal_code' type="text" placeholder='Postal Code' required />
                                </div>

                                {/* phone number box */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="phone_number" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>Phone number*</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='phone_number' type="text" placeholder='Phone Number' required />
                                </div>

                                {/* email box */}
                                <div className='w-full flex flex-col gap-2.5'>
                                    <label htmlFor="email" className='text-base text-black font-poppins font-normal capitalize cursor-pointer'>email address*</label>
                                    <input className='w-full outline-0 text-base text-black font-poppins font-normal capitalize pl-3 border-[3px] border-[#dadada] rounded-xl h-[56px]' id='email' type="email" placeholder='Email Address' required />
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* right side wrapper  */}
                </div>
            </div>
        </div>
    );
};

export default Checkout;