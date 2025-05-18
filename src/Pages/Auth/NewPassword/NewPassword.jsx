import React from 'react';
import { useNavigate } from 'react-router';

const NewPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate('/')
    }

    return (
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between gap-10">
                    {/* image wrapper  */}
                    <div className='max-w-[949px] w-full min-h-[1077px] h-full'>
                        <img className='w-full h-full object-cover' src="/auth/auth_image_1.png" alt="login image" />
                    </div>

                    {/* content wrapper  */}
                    <div className='max-w-[628px] w-full h-auto'>
                        <h3 className='text-6xl text-[#484848] font-normal uppercase mb-9'>fasco</h3>
                        <h4 className='text-3xl text-black font-normal capitalize flex items-center mb-14'>enter your new password</h4>
                        <form onSubmit={handleSubmit} className='w-full h-auto flex flex-col gap-4.5 items-center'>
                            {/* input box new password   */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input className='w-full h-full border-none outline-0' type="text" placeholder='New Password' required />
                            </div>
                            {/* input box confirm password   */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input className='w-full h-full border-none outline-0' type="text" placeholder='Confirmation Password' required />
                            </div>
                            <div className='w-full h-auto flex items-center justify-center'>

                                <button className='max-w-[575px] w-full h-[60px] bg-black rounded-lg text-white text-xl font-poppins font-semibold capitalize flex items-center justify-center cursor-pointer mt-6' type='submit'>submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;