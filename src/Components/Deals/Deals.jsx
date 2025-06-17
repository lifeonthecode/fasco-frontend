import { Link } from "react-router";
import DealsSlider from "../DealsSlider/DealsSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDealsProducts } from "../../App/Features/Product/productSlice";

const Deals = () => {

    const dispatch = useDispatch();
    const { deals, loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getDealsProducts())
    }, [dispatch]);

    return (
        <div className="w-full min-h-[782px] bg-white mt-[100px] py-10">
            <div className="lg:container mx-auto">

                {
                    loading ? <div className="flex items-center justify-center">
                        <span className="loading loading-spinner text-primary loading-xl"></span>
                    </div>
                        :
                        <DealsSlider deals={deals} />
                }

            </div>
        </div>
    );
};

export default Deals;