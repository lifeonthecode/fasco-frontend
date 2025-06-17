import React, {useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser, userLogin } from '../../../App/Features/Auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()


    const handleUserLogin = async (e) => {
        e.preventDefault()
        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {

            const response = await dispatch(userLogin(userData)).unwrap();
            dispatch(fetchSingleUser());

            toast.success(response.message, {
                position: 'top-right'
            });
            
            // clear ui data 
            emailRef.current.value = '';
            passwordRef.current.value = '';

            // let's go product page 
            navigate(user?.role === 'admin' ? '/dashboard' :'/products');

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
                        <h4 className='text-3xl text-black font-normal capitalize flex items-center mb-14'>sign in to <span className='uppercase'>fasco</span></h4>
                        <form onSubmit={handleUserLogin} className='w-full h-auto flex flex-col gap-4.5 items-center'>
                            {/* input box email  */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input ref={emailRef} className='w-full h-full border-none outline-0' type="email" placeholder='Enter your email...' required />
                            </div>
                            {/* input box password */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input ref={passwordRef} className='w-full h-full border-none outline-0' type="text" placeholder='Enter your password...' required />
                            </div>
                            <div className='w-full h-auto flex items-center justify-center'>

                                <button className='max-w-[575px] w-full h-[60px] bg-black rounded-lg text-white text-xl font-poppins font-semibold capitalize flex items-center justify-center cursor-pointer mt-6' type='submit'>sign in</button>
                            </div>

                        </form>
                        <div className='w-full h-auto flex flex-col items-center justify-center mt-8 gap-4.5'>

                            <Link to={'/register'} className='max-w-[575px] w-full h-[60px] rounded-lg text-[#5b86e5] text-xl font-poppins font-semibold capitalize flex items-center justify-center cursor-pointer border-[2px] border-[#5b86e5]'>register now</Link>
                            <div className='max-w-[575px] w-full flex justify-end items-center'>
                                <Link to={'/forget-password'} className='text-[#5b86e5] text-xl font-poppins font-semibold capitalize'>forget password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;