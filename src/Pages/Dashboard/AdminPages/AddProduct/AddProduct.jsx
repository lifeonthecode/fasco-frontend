
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, getProducts } from './../../../../App/Features/Product/productSlice';
import { toast } from 'react-toastify';


const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const dispatch = useDispatch();
    const [selectedColors, setColors] = useState([]);


    // handle image change function 
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Preview
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleAddProduct = async (e) => {
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

        // Serialize arrays/objects
        // productData.append("sizes", JSON.stringify(sizes));
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
            const res = await dispatch(createProduct(productData)).unwrap();
            toast.success(res.message, { position: 'top-right' });
            dispatch(getProducts());



            // clear all 
            e.target.reset();
            setImages([]);
            setPreviewImages([]);
            setColors([])


        } catch (error) {
            toast.error(error.message, { position: 'top-right' });
        }
    };


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


    return (
        <div className='w-full bg-white'>

            <div className="flex flex-col gap-8">
                <div className='flex items-center justify-center'>
                    <h3 className='text-4xl text-black font-semibold capitalize font-poppins'>Add Product</h3>
                </div>

                <div>
                    <form onSubmit={handleAddProduct} className='flex flex-col gap-4'>
                        {/* product and original price box  */}

                        <div>
                            <label className="block mb-1 text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                            />
                        </div>

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-6 gap-4 mt-4">
                                {previewImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Preview ${idx}`}
                                        className="w-full h-32 object-cover border rounded"
                                    />
                                ))}
                            </div>
                        )}


                        {/* product and original price box  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product name box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="name">Product Name</label>
                                <input type="text" id='name' name='name' placeholder="Product Name" className="input input-success w-full" />
                            </div>
                            {/* product original price box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="originalPrice" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Product original Price</label>
                                <input type="number" id='originalPrice' name='originalPrice' placeholder="Product Original Price" className="input input-success w-full" />
                            </div>
                        </div>

                        {/* discount and stock  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product name box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="discount" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Discount (Optional)</label>
                                <input type="number" name='discount' id='discount' placeholder="Product Discount" className="input input-success w-full" />
                            </div>
                            {/* product description box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="stock" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Stock</label>
                                <input type="number" name='stock' id='stock' placeholder="Product stock" className="input input-success w-full" />
                            </div>
                        </div>

                        {/* sizes and color  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product sizes box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="sizes" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Sizes</label>
                                <select defaultValue="XS" name='sizes' className="select select-secondary text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize">
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
                                        productColors?.map((colorItem) => (
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
                                        ))
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
                                    <select defaultValue="adidas" name='brand' className="select select-secondary capitalize text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer ">

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
                                <select defaultValue="mens_fashion" name='category' className="select select-secondary text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize">
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
                                <label htmlFor="star" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>star</label>
                                <input type="text" name='star' id='star' placeholder="Product star" className="input input-success w-full" />
                            </div>
                            {/* product deals box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="dealEndDate" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Deals (Optional)</label>
                                <input type="date" name='dealEndDate' id='deals' placeholder="Product deals" className="input input-success w-full" />
                            </div>
                        </div>
                        {/* description  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product star box  */}
                            <div className='flex flex-col gap-2.5 w-full'>
                                <label htmlFor="description" className='text-base text-[#8a8a8a] font-poppins font-semibold cursor-pointer capitalize'>Description</label>
                                <textarea placeholder="Description" name='description' id='description' className="textarea textarea-primary w-full"></textarea>
                            </div>
                        </div>

                        {/* button  */}
                        <div className='w-full h-[55px]'>

                            <button className='w-full h-full bg-[#5932ea] text-white text-xl font-semibold capitalize rounded-xl cursor-pointer' type='submit'>add product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;