
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, getProducts } from './../../../../App/Features/Product/productSlice';
import { toast } from 'react-toastify';


const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const dispatch = useDispatch();


    // handle image change function 
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Preview
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    // const handleInputChange = (e) => {

    // }

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;
        const originalPrice = e.target.originalPrice.value;
        const stock = e.target.stock.value;
        const sizes = e.target.sizes.value.split(',');
        const discount = e.target.discount.value;
        const brand = e.target.brand.value;
        const category = e.target.category.value;
        const star = e.target.star.value;
        const dealsEndDate = e.target.dealEndDate.value;

        const colors = [
            e.target.color_1.value,
            e.target.color_2.value,
            e.target.color_3.value,
            e.target.color_4.value,
            e.target.color_5.value,
        ];

        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("originalPrice", originalPrice);
        productData.append("discount", discount);
        productData.append("stock", stock);
        productData.append("brand", brand);
        productData.append("category", category);
        productData.append("star", star);

        // Serialize arrays/objects
        productData.append("sizes", JSON.stringify(sizes));
        productData.append("colors", JSON.stringify(colors));

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

            console.log('product response: ', res)

            toast.success(res.message, { position: 'top-right' });
            dispatch(getProducts());



            // clear all 
            e.target.reset();
            setImages([]);
            setPreviewImages([]);


        } catch (error) {
            console.error("Product add failed:", error);
            toast.error(error.message, { position: 'top-right' });
        }
    };



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
                            <label className="block mb-1 font-medium">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                            />
                        </div>

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-9 gap-4 mt-4">
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
                                <label htmlFor="originalPrice">Product original Price</label>
                                <input type="number" id='originalPrice' name='originalPrice' placeholder="Product Original Price" className="input input-success w-full" />
                            </div>
                        </div>

                        {/* discount and stock  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product name box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="discount">Discount (Optional)</label>
                                <input type="number" name='discount' id='discount' placeholder="Product Discount" className="input input-success w-full" />
                            </div>
                            {/* product description box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="stock">Stock</label>
                                <input type="number" name='stock' id='stock' placeholder="Product stock" className="input input-success w-full" />
                            </div>
                        </div>

                        {/* sizes and color  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product sizes box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="sizes">Sizes</label>
                                <select defaultValue="sizes" name='sizes' className="select select-secondary">
                                    <option disabled={true}>Sizes</option>
                                    <option value={'sm'}>SM</option>
                                    <option value={'md'}>MD</option>
                                    <option value={'lg'}>LG</option>
                                    <option value={'xl'}>XL</option>
                                    <option value={'xxl'}>xxl</option>
                                    <option value={'sm, md'}>SM, MD</option>
                                    <option value={'sm, md, lg'}>SM, MD, LG</option>
                                    <option value={'sm, md, lg, xl'}>SM, MD, LG, XL</option>
                                    <option value={'sm, md, lg, xl, xxl'}>SM, MD, LG, XL, xxl</option>
                                </select>

                            </div>
                            {/* product color box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="colors">Colors</label>
                                <div className="flex items-center gap-4">

                                    <input type="color" name='color_1' placeholder="Product Colors" className="input input-success w-full" />

                                    <input type="color" name='color_2' placeholder="Product Colors" className="input input-success w-full" />

                                    <input type="color" name='color_3' placeholder="Product Colors" className="input input-success w-full" />

                                    <input type="color" name='color_4' placeholder="Product Colors" className="input input-success w-full" />

                                    <input type="color" name='color_5' placeholder="Product Colors" className="input input-success w-full" />
                                </div>
                            </div>
                        </div>

                        {/* brand and category  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product brand box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="brand">brand</label>
                                <input type="text" name='brand' id='brand' placeholder="Product brand" className="input input-success w-full" />
                            </div>
                            {/* product category box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="category">Category</label>
                                <input type="text" name='category' id='category' placeholder="Product category" className="input input-success w-full" />
                            </div>
                        </div>
                        {/* star and deals  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product star box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="star">star</label>
                                <input type="number" name='star' id='star' placeholder="Product star" className="input input-success w-full" />
                            </div>
                            {/* product deals box  */}
                            <div className='flex flex-col gap-2.5 w-1/2'>
                                <label htmlFor="dealEndDate">Deals (Optional)</label>
                                <input type="date" name='dealEndDate' id='deals' placeholder="Product deals" className="input input-success w-full" />
                            </div>
                        </div>
                        {/* description  */}
                        <div className='flex items-center gap-5 justify-between'>
                            {/* product star box  */}
                            <div className='flex flex-col gap-2.5 w-full'>
                                <label htmlFor="description">Description</label>
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