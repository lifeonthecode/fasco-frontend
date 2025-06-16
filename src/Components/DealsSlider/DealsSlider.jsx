import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import { HiOutlineArrowCircleLeft, HiOutlineArrowCircleRight } from "react-icons/hi";
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';


const getRemainingTime = (dealsEndDate) => {
    const endTime = new Date(dealsEndDate).getTime();
    const now = new Date().getTime();

    let timeLeft = endTime - now;

    if (timeLeft < 0) return null;

    // days
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    timeLeft %= (24 * 60 * 60 * 1000);

    // hours 
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    timeLeft %= (60 * 60 * 1000);

    // minutes
    const minutes = Math.floor(timeLeft / (60 * 1000));
    timeLeft %= (60 * 1000);
    // seconds 
    const seconds = Math.floor(timeLeft / 1000);
    const milliseconds = timeLeft % 1000;

    return { days, hours, minutes, seconds, milliseconds }
};


const DealCountdown = ({ deal, shop_id }) => {

    const [timeLeft, setTimeLeft] = useState({})
    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = getRemainingTime(deal);
            setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [deal])

    return (
        <div className="deals_wrapper">
            <h3 className="text-5xl text-[#484848] font-normal capitalize mb-5">deals of the month</h3>
            <p className="text-base tex-[#8a8a8a] font-poppins font-normal mb-10 max-w-[444px] w-full h-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit deserunt adipisci consectetur perspiciatis facilis veritatis, pariatur exercitationem quo amet sunt.</p>
            <Link to={`/products/${shop_id}`} className="text-base text-white font-poppins font-normal capitalize px-8 py-2.5 bg-black rounded-lg">buy now</Link>

            <div className="mt-10">
                <h5 className="text-[27px] text-[#484848] font-poppins font-medium capitalize mb-4">hurry, before it's too late!</h5>
                <div className="flex items-center gap-8 cursor-pointer">
                    <div className="days flex flex-col gap-2.5 items-center justify-center">
                        <h5 className="w-[76px] h-[76px] rounded-sm bg-white shadow text-[#484848] text-3xl font-normal flex items-center justify-center">{timeLeft?.days}</h5>
                        <p className="text-[22px] text-[#484848] font-poppins font-normal capitalize">days</p>
                    </div>

                    {/* hr box  */}
                    <div className="hr flex flex-col gap-2.5 items-center justify-center">
                        <h5 className="w-[76px] h-[76px] rounded-sm bg-white shadow text-[#484848] text-3xl font-normal flex items-center justify-center">{timeLeft?.hours}</h5>
                        <p className="text-[22px] text-[#484848] font-poppins font-normal capitalize">hr</p>
                    </div>

                    {/* mins box  */}
                    <div className="mins flex flex-col gap-2.5 items-center justify-center">
                        <h5 className="w-[76px] h-[76px] rounded-sm bg-white shadow text-[#484848] text-3xl font-normal flex items-center justify-center">{timeLeft?.minutes}</h5>
                        <p className="text-[22px] text-[#484848] font-poppins font-normal capitalize">mins</p>
                    </div>

                    {/* secs box  */}
                    <div className="secs flex flex-col gap-2.5 items-center justify-center">
                        <h5 className="w-[76px] h-[76px] rounded-sm bg-white shadow text-[#484848] text-3xl font-normal flex items-center justify-center">{timeLeft?.seconds}</h5>
                        <p className="text-[22px] text-[#484848] font-poppins font-normal capitalize">sec</p>
                    </div>

                </div>
            </div>
        </div>

    )
}

const DealsSlider = ({ deals }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);


    const breakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1440: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
    };


    return (
        <div className='overflow-hidden relative pb-16'>

            <div className='absolute left-0 bottom-0 flex items-center gap-5 z-50'>
                <div>
                    <button ref={prevRef} className='w-[48px] h-[48px] bg-white shadow flex items-center justify-center border-[1px] border-[#8a8a8a] rounded-full cursor-pointer'><HiOutlineArrowCircleLeft size={'1.8rem'} /></button>
                </div>
                <div>
                    <button ref={nextRef} className='w-[48px] h-[48px] bg-white shadow flex items-center justify-center border-[1px] border-[#8a8a8a] rounded-full cursor-pointer'><HiOutlineArrowCircleRight size={'1.8rem'} /></button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={breakpoints}>

                {
                    deals?.map(dealsItem => {
                        return (

                            <SwiperSlide key={dealsItem?._id}>
                                <div className="flex justify-between gap-8">


                                    <DealCountdown deal={dealsItem?.deals.dealsEndDate} shop_id={dealsItem?._id} />

                                    {/* image box  */}
                                    <div className='max-h-[700px] h-full max-w-[650px] w-full'>

                                        <Link to={`/products/${dealsItem?._id}`}>
                                            <div className='relative cursor-pointer w-full h-full'>
                                                <img className='w-full max-h-[582px] h-full object-cover rounded-2xl border-red-500 border-2' src={dealsItem?.images[0]?.url} alt="deals one" />
                                                <div className='absolute bottom-25 left-0 transform translate-y-1/2 translate-x-1/2 max-w-[217px] w-full max-h-[130px] h-full bg-white flex flex-col items-center justify-center gap-2.5 z-10'>
                                                    <h5 className='text-base text-[#484848] font-poppins font-normal capitalize'>01- Spring sale</h5>
                                                    <span className='text-xl text-[#484848] font-poppins capitalize font-medium'>{dealsItem?.discount}% off</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }

                {/* <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full max-h-[582px] h-full object-cover' src="/deals/deals_2.png" alt="deals two" />
                        <div className='absolute bottom-25 left-0 transform translate-y-1/2 translate-x-1/2 max-w-[217px] w-full max-h-[130px] h-full bg-white flex flex-col items-center justify-center gap-2.5 z-10'>
                            <h5 className='text-base text-[#484848] font-poppins font-normal capitalize'>02- Spring sale</h5>
                            <span className='text-xl text-[#484848] font-poppins capitalize font-medium'>30% off</span>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full max-h-[582px] h-full object-cover' src="/deals/deals_3.png" alt="deals tree" />
                        <div className='absolute bottom-25 left-0 transform translate-y-1/2 translate-x-1/2 max-w-[217px] w-full max-h-[130px] h-full bg-white flex flex-col items-center justify-center gap-2.5 z-10'>
                            <h5 className='text-base text-[#484848] font-poppins font-normal capitalize'>03- Spring sale</h5>
                            <span className='text-xl text-[#484848] font-poppins capitalize font-medium'>30% off</span>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full max-h-[582px] h-full object-cover' src="/deals/deals_1.png" alt="deals one" />
                        <div className='absolute bottom-25 left-0 transform translate-y-1/2 translate-x-1/2 max-w-[217px] w-full max-h-[130px] h-full bg-white flex flex-col items-center justify-center gap-2.5 z-10'>
                            <h5 className='text-base text-[#484848] font-poppins font-normal capitalize'>01- Spring sale</h5>
                            <span className='text-xl text-[#484848] font-poppins capitalize font-medium'>30% off</span>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full max-h-[582px] h-full object-cover' src="/deals/deals_2.png" alt="deals two" />
                        <div className='absolute bottom-25 left-0 transform translate-y-1/2 translate-x-1/2 max-w-[217px] w-full max-h-[130px] h-full bg-white flex flex-col items-center justify-center gap-2.5 z-10'>
                            <h5 className='text-base text-[#484848] font-poppins font-normal capitalize'>02- Spring sale</h5>
                            <span className='text-xl text-[#484848] font-poppins capitalize font-medium'>30% off</span>
                        </div>
                    </div>
                </SwiperSlide> */}
            </Swiper>

        </div>
    );
};

export default DealsSlider;