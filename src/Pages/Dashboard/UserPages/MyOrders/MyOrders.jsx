
const MyOrders = () => {
    return (
        <div className="w-ful min-h-screen border-gray-50">
            <div className="flex items-center justify-between gap-4 p-4 border-[2px] border-[#00ac4f] mb-8 rounded-lg">
                <h4 className="text-xl text-black font-semibold font-poppins capitalize">image</h4>
                <h4 className="text-xl text-black font-semibold font-poppins capitalize">details</h4>

                <h4 className="text-xl text-black font-semibold font-poppins capitalize">action</h4>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {
                    
                }
                <div className="flex justify-between gap-4">
                    <div>
                        <img className="w-[100px] h-[100px] rounded-3xl" src="../../../../../public/customers/customer_1.png" alt="" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base text-black font-poppins capitalize font-medium">name</h4>
                        <p className="text-base text-black font-poppins capitalize font-medium">price</p>
                        <p className="text-base text-black font-poppins capitalize font-medium">description</p>
                    </div>
                    <div>
                        <button className="text-base text-black font-poppins capitalize font-medium cursor-pointer">action</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;