
import Banner from '../../Components/Banner/Banner';
import Brand from '../../Components/Brand/Brand';
import Deals from '../../Components/Deals/Deals';
import NewArrival from '../../Components/NewArrival/NewArrival';
import Blinder from '../../Components/Blinder/Blinder';
import FollowUs from '../../Components/FollowUs/FollowUs';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Newsletter from '../../Components/Newsletter/Newsletter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { productNewArrivals } from '../../App/Features/Product/productSlice';

const Home = () => {

    const dispatch = useDispatch();
    const { arrivals, loading } = useSelector((state) => state.product);
    const [activeCategory, setCategory] = useState('mens_fashion');

    useEffect(() => {
        // dispatch(getNewArrivals({category: activeCategory}))
        dispatch(productNewArrivals({category: activeCategory}))
    }, [dispatch , activeCategory] );

    // console.log('home: ', activeCategory)

    return (
        <div>

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
                <NewArrival products={arrivals} loading={loading} setCategory={setCategory} activeCategory={activeCategory} />
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