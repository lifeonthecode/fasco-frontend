import React from 'react';

const Newsletter = () => {
    return (
        <div className='w-full bg-white pt-[150px] pb-[50px]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between">

                    {/* left side wrapper  */}
                    <div className='max-w-[355px] w-full min-h-[747px] h-full'>
                        <img className='w-full h-full object-cover' src="/newsletter/newsletter_1.png" alt="newsletter image" />
                    </div>

                    {/* middle side wrapper  */}
                    <div className='flex item-center flex-col gap-5 max-w-[631px] w-full p-8 shadow-2xl rounded-xl'>
                        <h1 className='text-4xl text-[#484848] font-normal capitalize'>subscribe to our newsletter</h1>
                        <p className='text-base text-[#8a8a8a] font-poppins font-normal text-center max-w-[614px] w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque porro nihil at sunt asperiores dolorum voluptates nam, numquam praesentium nisi.</p>

                        <form className='w-full flex flex-col gap-6'>
                            <input className='w-full h-[56px] bg-[#d9d9d9] rounded-sm shadow pl-3 outline-none' type="text" placeholder='demo@gmail.com' />
                            <button type='submit' className='text-xl text-white font-medium font-poppins capitalize px-8 py-2.5 bg-black rounded-lg max-w-[207px] w-full h-[56px] flex items-center justify-center cursor-pointer mx-auto'>Subscribe</button>
                        </form>
                    </div>

                    {/* right side wrapper  */}
                    <div className='max-w-[355px] w-full min-h-[747px] h-full'>
                        <img className='w-full h-full object-cover' src="/newsletter/newsletter_2.png" alt="newsletter image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;