import { useState } from "react";
import { Link } from "react-router";



const ProductFilter = ({ setColors, colors, setSizes, sizes, setBrands, brands, setPriceRanges, priceRanges }) => {

    const [sizesActive, setSizesActive] = useState([])
    const [colorsActive, setColorsActive] = useState([])
    const [pricesActive, setPricesActive] = useState([])
    const [brandsActive, setBrandsActive] = useState([])
    const [collection, setCollection] = useState({
        collection: '',
    });


    const productSizes = [
        {
            id: 0,
            size: 'XS',
        },
        {
            id: 1,
            size: 'S',
        },
        {
            id: 2,
            size: 'M',
        },
        {
            id: 3,
            size: 'L',
        },
        {
            id: 4,
            size: 'XL',
        },
        {
            id: 5,
            size: 'XXL',
        },
    ]

    const productColors = [
        {
            id: 1,
            color: 'ff6c6c',
        },
        {
            id: 2,
            color: '000000',
        },
        {
            id: 3,
            color: '6c7bff',
        },
        {
            id: 4,
            color: '6ca7ff',
        },
        {
            id: 5,
            color: '6cb9ff',
        },
        {
            id: 6,
            color: '6cf6ff',
        },
        {
            id: 7,
            color: '6cff9e',
        },
        {
            id: 8,
            color: '6cffdc',
        },
        {
            id: 9,
            color: '8a6cff',
        },
        {
            id: 10,
            color: '9bff6c',
        },
    ]

    const productPrices = [
        {
            id: 1,
            values: '0-50',
            minPrice: 0,
            maxPrice: 50,
        },
        {
            id: 2,
            values: '50-100',
            minPrice: 50,
            maxPrice: 100,
        },
        {
            id: 3,
            values: '100-150',
            minPrice: 100,
            maxPrice: 150,
        },
        {
            id: 4,
            values: '150-200',
            minPrice: 150,
            maxPrice: 200,
        },
        {
            id: 5,
            values: '200-250',
            minPrice: 200,
            maxPrice: 250,
        },
        {
            id: 6,
            values: '250-300',
            minPrice: 250,
            maxPrice: 300,
        },
        {
            id: 7,
            values: '300-400',
            minPrice: 300,
            maxPrice: 400,
        },
        {
            id: 8,
            values: '400-500',
            minPrice: 400,
            maxPrice: 500,
        },
    ];

    const productBrands = [
        {
            id: 1,
            brand: 'adidas',
        },
        {
            id: 2,
            brand: 'puma',
        },
        {
            id: 3,
            brand: 'nike',
        },
        {
            id: 4,
            brand: 'reebok',
        }
    ];

    const productCollections = [
        {
            id: 1,
            name: 'all products',
            collection: 'all_products',
            link: '/products'
        },
        {
            id: 2,
            name: 'best sellers',
            collection: 'best_sellers',
            link: '/best-seller'
        },
        {
            id: 3,
            name: 'new arrivals',
            collection: 'new_arrivals',
            link: '/new-arrivals'
        },
        {
            id: 4,
            name: 'accessories',
            collection: 'accessories',
            link: '/accessories'
        }
    ];


    return (
        <div className="flex flex-col gap-8 max-w-[300px] w-full max-h-[1200px] h-full p-5 border-[1px] border-[#8a8a8a] rounded-lg">
            <h3 className="text-3xl text-black font-normal capitalize">filters</h3>
            {/* size box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">size</h4>
                <div className="flex flex-wrap gap-3">
                    {
                        productSizes?.map((sizeItem) => (
                            <button
                                key={sizeItem?.id}
                                className={`text-[#8a8a8a] text-base w-[42px] h-[42px] flex items-center justify-center border-[2px] border-[#8a8a8a] rounded-lg cursor-pointer capitalize ${sizesActive.includes(sizeItem?.size) && 'border-red-500 border-[4px]'}`}
                                onClick={() => {
                                    setSizesActive([
                                        ...sizesActive,
                                        sizeItem?.size
                                    ]);
                                    setSizes([
                                        ...sizes,
                                        sizeItem?.size
                                    ])
                                }}
                            >
                                {sizeItem?.size}
                            </button>
                        ))
                    }
                </div>
            </div>

            {/* colors box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">colors</h4>
                <div className="flex flex-wrap gap-3">
                    {
                        productColors?.map((colorItem) => (
                            <button
                                key={colorItem?.id}
                                className={`w-[40px] h-[40px] rounded-full cursor-pointer ${colorsActive.includes('#' + colorItem?.color) && 'border-[5px] border-red-500'}`}
                                style={{
                                    backgroundColor: '#' + colorItem?.color
                                }}
                                onClick={() => {
                                    setColorsActive([
                                        ...colorsActive,
                                        '#' + colorItem?.color
                                    ])


                                    // console.log('update sizes: ', updatedSizes)

                                    setColors([
                                        ...colors,
                                        colorItem.color,
                                        // index+5

                                    ])
                                }}
                            ></button>
                        ))
                    }
                </div>
            </div>

            {/* prices box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">prices</h4>
                <div className="flex flex-col items-start gap-3">
                    {
                        productPrices?.map((priceItem) => (
                            <button
                                key={priceItem?.id}
                                className={`text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer ${pricesActive.includes(priceItem?.values) && 'text-red-500 underline'}`}
                                onClick={() => {

                                    setPricesActive([
                                        ...pricesActive,
                                        priceItem?.values
                                    ]);
                                    setPriceRanges([
                                        ...priceRanges,
                                        {
                                            maxPrice: priceItem?.maxPrice,
                                            minPrice: priceItem?.minPrice,
                                        }
                                    ])
                                }}
                            >{priceItem?.values}</button>
                        ))
                    }
                </div>
            </div>

            {/* brands box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">brands</h4>
                <div className="flex flex-col items-start gap-3">
                    {
                        productBrands?.map((brandItem) => (
                            <button
                                key={brandItem?.id}
                                className={`text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer ${brandsActive.includes(brandItem?.brand) && 'text-red-500 underline'}`}
                                onClick={() => {
                                    setBrands([
                                        ...brands,
                                        brandItem?.brand,
                                    ]);

                                    setBrandsActive([
                                        ...brandsActive,
                                        brandItem?.brand
                                    ])

                                }}
                            >{brandItem?.brand}</button>
                        ))
                    }
                </div>
            </div>

            {/* collections box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">collections</h4>
                <div className="flex flex-col items-start gap-3">
                    {
                        productCollections?.map((collectionItem, index) => (
                            <Link key={index} to={collectionItem?.link}>
                                <button
                                    key={collectionItem?.id}
                                    className={`text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize ${collection?.collection === collectionItem?.collection && 'text-red-500 underline'}`}
                                    onClick={() => setCollection({
                                        ...collection,
                                        collection: collectionItem?.collection
                                    })}
                                >{collectionItem?.name}</button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;