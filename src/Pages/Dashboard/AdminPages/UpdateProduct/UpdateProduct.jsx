import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getSingleProduct, updateSingleProduct } from '../../../../App/Features/Product/productSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';


const productColors = [
    {
        id: 1,
        color: '#ff6c6c',
    },
    {
        id: 2,
        color: '#000000',
    },
    {
        id: 3,
        color: '#6c7bff',
    },
    {
        id: 4,
        color: '#6ca7ff',
    },
    {
        id: 5,
        color: '#6cb9ff',
    },
    {
        id: 6,
        color: '#6cf6ff',
    },
    {
        id: 7,
        color: '#6cff9e',
    },
    {
        id: 8,
        color: '#6cffdc',
    },
    {
        id: 9,
        color: '#8a6cff',
    },
    {
        id: 10,
        color: '#9bff6c',
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

const UpdateProduct = () => {

    const { id } = useParams();
    const { product } = useSelector((state) => state.product);
    const [images, setImages] = useState([]);
    const [updated, setUpdate] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedColors, setColors] = useState(product?.colors || []);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [dispatch, id]);



    // handle image change function 
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Preview
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };


    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;
        const originalPrice = e.target.originalPrice.value;
        const stock = e.target.stock.value;
        const size = e.target.sizes.value;
        const discount = e.target.discount.value;
        const brand = e.target.brand.value;
        const category = e.target.category.value;
        const star = e.target.star.value;
        const dealsEndDate = e.target.dealEndDate.value;

        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("originalPrice", originalPrice);
        productData.append("discount", discount);
        productData.append("stock", stock);
        productData.append("brand", brand);
        productData.append("category", category);
        productData.append("star", star);
        productData.append("size", size);

        productData.append("colors", JSON.stringify(selectedColors));

        const deals = {
            isDeals: dealsEndDate ? true : false,
            dealsEndDate
        };
        productData.append("deals", JSON.stringify(deals));

        images.forEach((image) => {
            productData.append("images", image);
        });


        try {
            const res = await dispatch(updateSingleProduct({ id, productData })).unwrap();

            console.log('update product: ', res)

            toast.success(res.message, { position: 'top-right' });
            dispatch(getProducts());
            dispatch(getSingleProduct(id));


            // clear all 
            e.target.reset();
            setImages([]);
            setPreviewImages([]);
            setUpdate(true);
            setColors([]);

            navigate(`/dashboard/admin/products`)


        } catch (error) {
            toast.error(error.message, { position: 'top-right' });
        }
    };

    if (id === null) {
        return <div className='flex items-center justify-center'>
            <p className='text-7xl text-blue-500'>Please product add</p>
        </div>
    }

    return (
        <div className='w-full bg-white'>

            {
                id === ':id' ? <div className='flex items-center justify-center'>
                    <p className='text-7xl text-blue-500'>Please product add</p>
                </div> :
                    (

                        <div className="flex flex-col gap-8">
                            <div className='flex items-center justify-center'>
                                <h3 className='text-4xl text-black font-semibold capitalize font-poppins'>update Product</h3>
                            </div>

                            <div>
                                <form onSubmit={handleUpdateProduct} className='flex flex-col gap-4'>
                                    {/* product and original price box  */}

                                    <div>
                                        <label className="block mb-1 font-medium">Update Product Image</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    {previewImages?.length > 0 && (
                                        <div className="grid grid-cols-6 gap-4 mt-4 border-2 p-3 rounded-lg border-red-600">
                                            {previewImages?.map((img, idx) => {
                                                return (<img
                                                    key={idx}
                                                    src={img?.url || img}
                                                    alt={`Preview ${idx}`}
                                                    className=" w-32 h-32 object-cover border rounded cursor-pointer"
                                                />)
                                            })}
                                        </div>
                                    )}


                                    {/* product and original price box  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product name box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="name">Name</label>
                                            <input type="text" id='name' name='name' defaultValue={product?.name} placeholder="Product Name" className="input input-success w-full" />
                                        </div>
                                        {/* product original price box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="originalPrice">Original Price</label>
                                            <input type="number" id='originalPrice' name='originalPrice' defaultValue={product?.originalPrice} placeholder="Product Original Price" className="input input-success w-full" />
                                        </div>
                                    </div>

                                    {/* discount and stock  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product name box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="discount">Discount ({product?.discount}%)</label>
                                            <input type="number" name='discount' id='discount' placeholder="Product Discount" defaultValue={product?.discount} className="input input-success w-full" />
                                        </div>
                                        {/* product description box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="stock">Stock</label>
                                            <input type="number" name='stock' id='stock' placeholder="Product stock" defaultValue={product?.stock} className="input input-success w-full" />
                                        </div>
                                    </div>

                                    {/* sizes and color  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product sizes box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="sizes" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Sizes</label>
                                            <select defaultValue={product?.size} name='sizes' className="select select-secondary text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize">
                                                <option disabled={true}>Sizes</option>
                                                <option value={'XS'}>XS</option>
                                                <option value={'S'}>S</option>
                                                <option value={'M'}>M</option>
                                                <option value={'L'}>L</option>
                                                <option value={'XL'}>XL</option>
                                                <option value={'XXL'}>XXL</option>
                                            </select>

                                        </div>

                                        {/* product color box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="colors" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize' >Colors</label>
                                            <div className="flex flex-wrap gap-6">
                                                {
                                                    productColors?.map((colorItem) => {
                                                        return (
                                                            <button type='button'
                                                                key={colorItem?.id}
                                                                className={`w-[50px] h-[50px] rounded-full cursor-pointer ${selectedColors.includes(colorItem.color) && 'border-[5px] border-red-500'}`}
                                                                style={{
                                                                    backgroundColor: colorItem?.color
                                                                }}
                                                                onClick={() => {
                                                                    setColors([
                                                                        ...selectedColors,
                                                                        colorItem.color
                                                                    ])
                                                                }}

                                                            ></button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* brand and category  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product brand box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <div className='flex flex-col gap-2.5'>
                                                <label htmlFor="brand" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer'>Brands</label>
                                                <select defaultValue={product?.brand} name='brand' className="select select-secondary capitalize text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer ">
                                                    {
                                                        productBrands?.map((brandItem) => (
                                                            <option value={brandItem?.brand}>{brandItem?.brand}</option>
                                                        ))
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        {/* product category box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="sizes" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer'>Categories</label>
                                            <select defaultValue={product?.category} name='category' className="select select-secondary text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize">
                                                <option disabled={true}>Categories</option>
                                                <option value={'mens_fashion'}>men's fashion</option>
                                                <option value={'womens_fashion'}>women's fashion</option>
                                                <option value={'women_accessories'}>women's accessories</option>
                                                <option value={'men_accessories'}>men accessories</option>
                                                <option value={'discount_deals'}>discount deals</option>
                                            </select>

                                        </div>
                                    </div>
                                    {/* star and deals  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product star box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="star">Star</label>
                                            <input type="text" name='star' id='star' placeholder="Product star" defaultValue={product?.star} className="input input-success w-full" />
                                        </div>
                                        {/* product deals box  */}
                                        <div className='flex flex-col gap-2.5 w-1/2'>
                                            <label htmlFor="dealEndDate">Deals ({product?.deals?.dealsEndDate})</label>
                                            <input type="date" defaultValue={product?.deals?.dealsEndDate} name='dealEndDate' id='deals' placeholder="Product deals" className="input input-success w-full" />
                                        </div>
                                    </div>
                                    {/* description  */}
                                    <div className='flex items-center gap-5 justify-between'>
                                        {/* product star box  */}
                                        <div className='flex flex-col gap-2.5 w-full'>
                                            <label htmlFor="description">Description</label>
                                            <textarea defaultValue={product?.description} placeholder="Description" name='description' id='description' className="textarea textarea-primary w-full"></textarea>
                                        </div>
                                    </div>

                                    {/* button  */}
                                    <div className='w-full h-[55px]'>

                                        <button className={`w-full h-full bg-[#5932ea] text-white text-xl font-semibold capitalize rounded-xl cursor-pointer ${updated && 'bg-gray-400'}`} type='submit' disabled={updated}>update product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default UpdateProduct;