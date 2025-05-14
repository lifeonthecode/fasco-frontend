import { useState } from "react";
import ProductFilter from "../../Components/ProductFilter/ProductFilter";
import { CiGrid2V, CiGrid41, CiGrid31 } from "react-icons/ci";
import ProductCard from './../../Components/ProductCard/ProductCard';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const Product = () => {

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



    const products = [
        {
            productId: 1,
            productName: 'Product 1',
            price: 100,
            image: '/products/product_1.png',
            color: [
                {
                    id: 1,
                    color: 'red'
                },
                {
                    id: 2,
                    color: 'blue'
                },
            ],
            stock: 10,
            brand: 'Nike',

        },
        {
            productId: 2,
            productName: 'Product 2',
            price: 100,
            image: '/products/product_2.png',
            color: [
                {
                    id: 1,
                    color: 'yellow'
                },
                {
                    id: 2,
                    color: 'green'
                },
            ],
            stock: 0,
            brand: 'Nike',

        },
        {
            productId: 3,
            productName: 'Product 3',
            price: 100,
            image: '/products/product_3.png',
            color: [
                {
                    id: 1,
                    color: 'orange'
                },
                {
                    id: 2,
                    color: 'pink'
                },
            ],
            stock: 0,
            brand: 'adidas',

        },
        {
            productId: 4,
            productName: 'Product 4',
            price: 100,
            image: '/products/product_4.png',
            color: [
                {
                    id: 1,
                    color: 'orange'
                },
                {
                    id: 2,
                    color: 'pink'
                },
            ],
            stock: 0,
            brand: 'adidas',

        },
        {
            productId: 5,
            productName: 'Product 5',
            price: 100,
            image: '/products/product_5.png',
            color: [
                {
                    id: 1,
                    color: 'blue'
                },
                {
                    id: 2,
                    color: 'green'
                },
            ],
            stock: 5,
            brand: 'nike',

        },
        {
            productId: 6,
            productName: 'Product 6',
            price: 100,
            image: '/products/product_6.png',
            color: [
                {
                    id: 1,
                    color: 'orange'
                },
                {
                    id: 2,
                    color: 'pink'
                },
            ],
            stock: 20,
            brand: 'puma',

        },
        {
            productId: 7,
            productName: 'Product 7',
            price: 100,
            image: '/products/product_7.png',
            color: [
                {
                    id: 1,
                    color: 'red'
                },
                {
                    id: 2,
                    color: 'pink'
                },
            ],
            stock: 0,
            brand: 'reebok',

        },
        {
            productId: 8,
            productName: 'Product 8',
            price: 100,
            image: '/products/product_8.png',
            color: [
                {
                    id: 1,
                    color: 'blue'
                },
                {
                    id: 2,
                    color: 'orange'
                },
            ],
            stock: 0,
            brand: 'adidas',

        },
        {
            productId: 9,
            productName: 'Product 9',
            price: 100,
            image: '/products/product_9.png',
            color: [
                {
                    id: 1,
                    color: 'red'
                },
                {
                    id: 2,
                    color: 'green'
                },
            ],
            stock: 3,
            brand: 'reebok',

        },
    ]

    console.log('activeGrid', activeGrid);

    return (
        <div className="w-full pt-[50px]">
            <div className="lg:container mx-auto">
                {/* section header  */}
                <div className="pb-[100px] w-full flex items-center justify-center">
                    <h3 className="text-3xl text-black font-normal capitalize">fashion</h3>
                </div>


                {/* product wrapper */}
                <div className="flex justify-between gap-10 pb-[70px]">
                    {/* filter wrapper  */}
                    <ProductFilter />

                    {/* products wrapper  */}
                    <div className="w-full h-auto flex flex-col gap-8">

                        {/* product header  */}
                        <div className="flex items-center justify-between gap-16">
                            <h3 className="text-2xl text-black font-normal capitalize">products</h3>

                            <div className="flex items-center gap-4">
                                {
                                    gridLayout?.map((gridItem) => (
                                        <button
                                            key={gridItem?.id}
                                            className={`w-[42px] h-[42px] flex items-center justify-center rounded-sm cursor-pointer bg-[#f2f2f2] text-black ${activeGrid?.id === gridItem?.id && 'border-[2px] border-red-500'}`}
                                            onClick={() => setActiveGrid({
                                                grid:gridItem?.grid,
                                                id: gridItem?.id
                                            })}
                                            >
                                            {gridItem?.icon}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* product grid  */}
                        <div className={`grid ${activeGrid.grid} gap-6`}>
                            <ProductCard products={products} />
                        </div>
                    </div>
                </div>

                {/* pagination wrapper  */}
                <div className="flex items-center justify-center pb-[70px]">
                    <div className="flex items-center gap-5">
                        <button className="w-[56px] h-[56px] rounded-full bg-[#f3f3f3] flex items-center justify-center cursor-pointer"><IoIosArrowBack size={'1.5rem'} color="black" /></button>
                        <div className="flex items-center gap-5">
                            {
                                [...Array(5)]?.map((_, index) => (
                                    <button className="text-xl text-black font-medium w-[40px] h-[40px] flex items-center justify-center cursor-pointer" key={index}>{index+1}</button>
                                ))
                            }
                        </div>
                        <button className="w-[56px] h-[56px] rounded-full bg-[#f3f3f3] flex items-center justify-center cursor-pointer"><IoIosArrowForward size={'1.5rem'} color="black" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;