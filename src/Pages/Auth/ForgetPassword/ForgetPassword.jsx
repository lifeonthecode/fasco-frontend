import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { forgetPassword } from '../../../App/Features/User/userSlice';

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const emailRef = useRef()

    const navigate = useNavigate()

    
    const handleForgetPassword = async (e) => {
        e.preventDefault()
        const userData = {
            email: emailRef.current.value,
        }
        try {

            const response = await dispatch(forgetPassword(userData)).unwrap();
            toast.success(response.message, {
                position: 'top-right'
            });
            console.log('response: ', response)
            // clear ui data 
            emailRef.current.value = '';

            // let's go confirmation code page
            navigate(`/confirmation-code/${response.userId}`)

        } catch (error) {

            toast.error(error.message, {
                position: 'top-right'
            });
        }

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
                        <h4 className='text-3xl text-black font-normal capitalize flex items-center mb-14'>forget password</h4>
                        <form onSubmit={handleForgetPassword} className='w-full h-auto flex flex-col gap-4.5 items-center'>
                            {/* input box email  */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input ref={emailRef} className='w-full h-full border-none outline-0' type="email" placeholder='Enter your email...' required />
                            </div>
                            <div className='w-full h-auto flex items-center justify-center'>

                                <button className='max-w-[575px] w-full h-[60px] bg-black rounded-lg text-white text-xl font-poppins font-semibold capitalize flex items-center justify-center cursor-pointer mt-6' type='submit'>send confirmation code</button>
                            </div>

                        </form>
                        <div className='w-full h-auto flex flex-col items-center justify-center mt-8 gap-4.5'>


                            <p className='max-w-[575px] w-full text-black flex items-center gap-3 justify-center'>Already have an account? <Link to={'/login'} className='text-lg font-poppins font-normal capitalize flex items-center justify-center cursor-pointer text-[#5b86e5]'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;