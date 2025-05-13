
const ProductFilter = () => {

    const productSizes = [
        {
            id: 1,
            size: 's',
        },
        {
            id: 2,
            size: 'm',
        },
        {
            id: 3,
            size: 'l',
        },
        {
            id: 4,
            size: 'xl',
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
            price: '0-50',
        },
        {
            id: 2,
            price: '50-100',
        },
        {
            id: 3,
            price: '100-150',
        },
        {
            id: 4,
            price: '150-200',
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
        },
        {
            id: 2,
            name: 'best sellers',
            collection: 'best_sellers',
        },
        {
            id: 3,
            name: 'new arrivals',
            collection: 'new_arrivals',
        },
        {
            id: 4,
            name: 'accessories',
            collection: 'accessories',
        }
    ]

    return (
        <div className="flex flex-col gap-8 max-w-[300px] w-full max-h-[1112px] h-full p-5 border-[1px] border-[#8a8a8a] rounded-lg">
            <h3 className="text-3xl text-black font-normal capitalize">filters</h3>
            {/* size box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">size</h4>
                <div className="flex flex-wrap gap-3">
                    {
                        productSizes?.map((sizeItem) => (
                            <button key={sizeItem?.id} className="text-[#8a8a8a] text-base w-[42px] h-[42px] flex items-center justify-center border-[1px] border-[#8a8a8a] rounded-lg cursor-pointer capitalize">{sizeItem?.size}</button>
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
                            <button key={colorItem?.id} className={`w-[40px] h-[40px] rounded-full cursor-pointer`} style={{
                                backgroundColor: `#${colorItem?.color}`
                            }}></button>
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
                            <button key={priceItem?.id} className="text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer">{priceItem?.price}</button>
                        ))
                    }
                </div>
            </div>

            {/* brands box  */}
            <div className="flex flex-col gap-4">
                <h4  className="text-lg text-black font-normal capitalize">brands</h4>
                <div  className="flex flex-col items-start gap-3">
                    {
                        productBrands?.map((brandItem) => (
                            <button key={brandItem?.id} className="text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer">{brandItem?.brand}</button>
                        ))
                    }
                </div>
            </div>

            {/* collections box  */}
            <div className="flex flex-col gap-4">
                <h4 className="text-lg text-black font-normal capitalize">collections</h4>
                <div  className="flex flex-col items-start gap-3">
                    {
                        productCollections?.map((collectionItem) => (
                            <button key={collectionItem?.id} className="text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer">{collectionItem?.name}</button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;