import { Link } from "react-router";

const Banner = () => {
    return (
        <div className="w-full pt-[90px]">
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between gap-6 max-h-[756px] h-full">
                    {/* left side  */}
                    <div className="max-w-1/3 w-full min-h-[756px] h-full bg-[#e0e0e0] rounded-lg flex items-end justify-center">
                        <img src="/banner/banner_1.png" alt="" />
                    </div>

                    {/* middle side  */}
                    <div className="max-w-1/3  flex flex-col items-center justify-between min-h-[756px]">
                        <div className="w-full min-h-[150px] h-full bg-[#e0e0e0] rounded-lg flex items-center justify-center">
                            <img className="w-full min-h-[150px] h-full object-cover" src="/banner/banner_2.png" alt="" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-[#484848] text-[75px] font-poppins font-medium uppercase">ultimate <br /> <span className="text-white text-stroke text-[145px]">sale</span></h3>
                            <p className="text-[#484848] text-xl font-normal font-poppins uppercase mb-5">new collection</p>
                            <Link to={'/products'} className="text-white font-poppins font-medium px-6 py-2.5 bg-black rounded-lg inline-block text-xl uppercase mb-8">shop now</Link>
                        </div>

                        <div className="min-h-[150px] h-full w-full">
                            <img className="w-full min-h-[150px] h-full object-cover" src="/banner/banner_3.png" alt="" />
                        </div>
                    </div>

                    {/* right side  */}
                    <div className="max-w-1/3 w-full min-h-[756px] h-full bg-[#e0e0e0] rounded-lg flex items-end justify-center">
                        <img src="/banner/banner_4.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;