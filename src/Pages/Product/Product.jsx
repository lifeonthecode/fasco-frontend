import { useEffect, useState } from "react";
import ProductFilter from "../../Components/ProductFilter/ProductFilter";
import { CiGrid2V, CiGrid41, CiGrid31 } from "react-icons/ci";
import ProductCard from './../../Components/ProductCard/ProductCard';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../App/Features/Product/productSlice";
const Product = () => {

    const dispatch = useDispatch();
    const { productList, loading } = useSelector((state) => state.product);
    const [page, setPage] = useState(1); // state for current page
    const [pages, setPages] = useState(1); // state for total pages
    const [priceRanges, setPriceRanges] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sort, setSort] = useState('');

    const [activeGrid, setActiveGrid] = useState({
        grid: 'grid-cols-3',
        id: 2
    }) // initial state for active grid

    const gridLayout = [
        {
            id: 1,
            grid: 'grid-cols-2',
            icon: <CiGrid2V size={'1.5rem'} color="black" />,

        },
        {
            id: 2,
            grid: 'grid-cols-3',
            icon: <CiGrid31 size={'1.5rem'} color="black" />,

        },
        {
            id: 3,
            grid: 'grid-cols-4',
            icon: <CiGrid41 size={'1.5rem'} color="black" />,

        },
    ];

    useEffect(() => {
        const fetchAllProducts = async () => {
            const response = await dispatch(getProducts({ page, sizes, colors, priceRanges, brands, sort })).unwrap();
            setPages(response?.pages);
            setPage(response?.page);
        };

        fetchAllProducts()
    }, [dispatch, page, sizes, colors, priceRanges, brands, sort]);

    const { products } = productList

    const handleSortChange = (e) => {
        setSort(
            e.target.value
        );
    }


    return (
        <div className="w-full pt-[10px]">
            <div className="lg:container mx-auto">
                {/* section header  */}
                <div className="pb-[60px] w-full flex items-center justify-center">
                    <h3 className="text-3xl text-black font-normal capitalize">fashion</h3>
                </div>


                {/* product wrapper */}
                <div className="flex justify-between gap-10 pb-[70px]">
                    {/* filter wrapper  */}
                    <ProductFilter setSizes={setSizes} sizes={sizes} setColors={setColors} colors={colors} setPriceRanges={setPriceRanges} setBrands={setBrands} brands={brands} priceRanges={priceRanges} />

                    {/* products wrapper  */}
                    <div className="w-full h-auto flex flex-col gap-8">

                        {/* product header  */}
                        <div className="flex items-center justify-between gap-16">
                            <h3 className="text-2xl text-black font-normal capitalize">products</h3>

                            <div className="flex items-center gap-8 ">
                                <div className="flex items-center gap-4">

                                    <p className="text-lg capitalize font-medium font-poppins text-black">sort by</p>
                                    <div className="flex items-center gap-3">
                                        <select id="sort" onChange={handleSortChange} defaultValue="" className="select  border-black">
                                            <option disabled={false} value={''}>Default (Newest)</option>
                                            <option value={'priceAsc'}>Price: Low to High</option>
                                            <option value={'priceDsc'}>Price: High to Low</option>
                                            <option value={'rating'}>Rating: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">

                                    {
                                        gridLayout?.map((gridItem) => (
                                            <button
                                                key={gridItem?.id}
                                                className={`w-[42px] h-[42px] flex items-center justify-center rounded-sm cursor-pointer bg-[#f2f2f2] text-black ${activeGrid?.id === gridItem?.id && 'border-[2px] border-red-500'}`}
                                                onClick={() => setActiveGrid({
                                                    grid: gridItem?.grid,
                                                    id: gridItem?.id
                                                })}
                                            >
                                                {gridItem?.icon}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* product grid  */}

                        <div>

                            {
                                products?.length > 0 ? (

                                    loading ? <div className="flex items-center justify-center">
                                        <span className="loading loading-spinner text-primary loading-xl"></span>
                                    </div>
                                        :

                                        <div className={`grid ${activeGrid.grid} gap-6`}>
                                            <ProductCard products={products} />
                                        </div>
                                )
                                    :

                                    (
                                        <div className="flex items-center justify-center">
                                            <span className="loading loading-spinner text-primary loading-xl"></span>
                                        </div>
                                    )
                            }
                        </div>

                    </div>
                </div>

                {/* pagination wrapper  */}
                <div className="flex flex-col items-center justify-center pb-[70px]">
                    <p className="text-lg text-black font-normal">Page {page} of {pages}</p>
                    <div className="flex gap-2 5 mt-6">
                        <button onClick={() => {
                            if (page > 1) {
                                setPage(
                                    page - 1
                                );
                            }
                        }} className="w-[45px] h-[45px] rounded-full bg-[#f3f3f3] flex items-center justify-center cursor-pointer"><IoIosArrowBack size={'1.5rem'} color="black" /></button>
                        <div className="flex items-center gap-5">
                            {
                                Array.from({ length: pages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${page === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            }
                        </div>
                        <button onClick={() => {
                            if (page < pages) {
                                setPage(
                                    page + 1
                                );
                            }
                        }} className="w-[45px] h-[45px] rounded-full bg-[#f3f3f3] flex items-center justify-center cursor-pointer"><IoIosArrowForward size={'1.5rem'} color="black" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;