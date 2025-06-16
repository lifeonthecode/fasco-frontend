
const AdminOverviewPanel = ({ orders, totalOrders, loading, totalRevenue, totalProducts, totalUsers }) => {


    return (
        <div>

            {
                loading ? <div className="flex items-center justify-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
                </div>
                    :
                    <div>

                        <h1 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h1>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-4 rounded-lg shadow text-center">
                                <h2 className="text-gray-600 text-sm">Total Products</h2>
                                <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow text-center">
                                <h2 className="text-gray-600 text-sm">Total Orders</h2>
                                <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow text-center">
                                <h2 className="text-gray-600 text-sm">Total Users</h2>
                                <p className="text-2xl font-bold text-purple-600">{totalUsers}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow text-center">
                                <h2 className="text-gray-600 text-sm">Total Revenue</h2>
                                <p className="text-2xl font-bold text-rose-600">${totalRevenue}</p>
                            </div>
                        </div>

                        {/* Latest Orders Table (example static) */}
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold mb-3">Latest Orders</h2>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-2">Order ID</th>
                                        <th className="p-2">Customer</th>
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Amount</th>
                                        <th className="p-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orders?.map((orderItem) => (

                                            <tr className="border-b" key={orderItem?._id}>
                                                <td className="p-2">{orderItem?._id}</td>
                                                <td className="p-2">{orderItem?.shippingAddress?.name}</td>
                                                <td className="p-2">{new Date(orderItem?.createdAt).toLocaleDateString()}</td>
                                                <td className="p-2">${orderItem?.totalAmount}</td>
                                                <td className="p-2 text-green-600">{orderItem?.orderStatus}</td>
                                            </tr>
                                        ))
                                    }
                                    {/* <tr className="border-b">
                            <td className="p-2">ORD-1002</td>
                            <td className="p-2">Rafi</td>
                            <td className="p-2">14 June 2025</td>
                            <td className="p-2">৳850</td>
                            <td className="p-2 text-yellow-600">Pending</td>
                        </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }

        </div>
    );
};

export default AdminOverviewPanel;