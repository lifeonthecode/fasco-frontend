import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { confirmOtpCode, resendOtpCode } from "../../../App/Features/User/userSlice";
import { toast } from "react-toastify";

const ConfirmationCode = () => {

    const dispatch = useDispatch()
    const otpRef = useRef()
    const navigate = useNavigate()
    
    const {userId} = useParams()

    const handleConfirmationCode = async (e) => {
        e.preventDefault()
        const userData = {
            otp: otpRef.current.value,
        }
        try {

            const response = await dispatch(confirmOtpCode({userId,userData})).unwrap();
            toast.success(response.message, {
                position: 'top-right'
            });
            console.log('response: ', response)
            // clear ui data 
            otpRef.current.value = '';

            // let's go confirmation code page
            navigate(`/new-password/${response.userId}/${userData.otp}`)

        } catch (error) {

            toast.error(error.message, {
                position: 'top-right'
            });
        }

    };


    const handleResendOtpCode = async () => {
        try {

            const response = await dispatch(resendOtpCode(userId)).unwrap();
            toast.success(response.message, {
                position: 'top-right'
            });
            console.log('response: ', response)

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
                        <h4 className='text-3xl text-black font-normal capitalize flex items-center mb-14'>enter the confirmation code</h4>
                        <form onSubmit={handleConfirmationCode} className='w-full h-auto flex flex-col gap-4.5 items-center'>
                            {/* input box code   */}
                            <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                                <input ref={otpRef} className='w-full h-full border-none outline-0' type="text" placeholder='Confirmation Code' required />
                            </div>
                            <div className='w-full h-auto flex items-center justify-center'>

                                <button className='max-w-[575px] w-full h-[60px] bg-black rounded-lg text-white text-xl font-poppins font-semibold capitalize flex items-center justify-center cursor-pointer mt-6' type='submit'>recover account</button>
                            </div>

                        </form>
                        <div className='w-full h-auto flex flex-col items-center justify-center mt-8 gap-4.5'>


                            <p className='max-w-[575px] w-full text-black flex items-center gap-3 justify-center'>Didn't receive confirmation code?

                                <button onClick={handleResendOtpCode} className='text-lg font-poppins font-normal capitalize flex items-center justify-center cursor-pointer text-[#5b86e5]'>resend now</button>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationCode;