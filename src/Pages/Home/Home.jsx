import React from 'react';
import HomeNavbar from '../../Components/HomeNavbar/HomeNavbar';
import Banner from '../../Components/Banner/Banner';
import Brand from '../../Components/Brand/Brand';
import Deals from '../../Components/Deals/Deals';
import NewArrival from '../../Components/NewArrival/NewArrival';
import Blinder from '../../Components/Blinder/Blinder';
import FollowUs from '../../Components/FollowUs/FollowUs';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Newsletter from '../../Components/Newsletter/Newsletter';

const Home = () => {
    return (
        <div>
            
            {/* Home page Navbar  */}
            <HomeNavbar/>

            {/* banner component  */}
            <div>
                <Banner/>
            </div>

            {/* brand component  */}
            <div>
                <Brand/>
            </div>

            {/* deals component  */}
            <div>
                <Deals/>
            </div>

            {/* new arrival component  */}
            <div>
                <NewArrival/>
            </div>

            {/* blinder component  */}
            <div>
                <Blinder/>
            </div>

            {/* follow us component  */}
            <div>
                <FollowUs/>
            </div>

            {/* testimonial component  */}
            <div>
                <Testimonial/>
            </div>


            {/* newsletter component  */}
            <div>
                <Newsletter/>
            </div>


            

        </div>
    );
};

export default Home;