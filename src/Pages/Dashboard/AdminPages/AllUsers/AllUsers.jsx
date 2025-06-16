import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchUsers, userDelete } from "../../../../App/Features/User/userSlice";
import { useEffect } from "react";


const AllUsers = () => {

    const dispatch = useDispatch()
    const { userLists, loading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    console.log('user Lists: ', userLists)

    const handleUserDelete = async (id, public_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await dispatch(userDelete({ id, public_id })).unwrap();

                Swal.fire({
                    title: "Deleted!",
                    text: response.message,
                    icon: "success"
                });
                dispatch(fetchUsers());
            }
        });
    }

    if (loading) {
        return <div className="flex items-center justify-between">
            <p className="text-5xl text-blue-500">User Loading</p>
        </div>
    }

    return (
        <section className="w-full bg-white">
            <header className="flex justify-center mb-10">
                <h3 className="text-3xl font-semibold text-black font-poppins">Users</h3>
            </header>

            <div className="flex flex-col gap-6">
                {
                    userLists?.map((user) => (
                        <div key={user?._id} className="flex items-center justify-between p-4 border border-red-500 rounded-lg">
                            <div>
                                <h3 className="text-base text-black font-medium capitalize font-poppins">{user?.name}</h3>
                            </div>
                            <div>
                                <h3 className="text-base text-black font-medium font-poppins">{user?.email}</h3>
                            </div>
                            <div>
                                <button onClick={() => handleUserDelete(user?._id, user?.avatar?.public_id)} className="text-bas font-medium font-poppins capitalize px-4 py-3 bg-red-500 rounded-lg text-white cursor-pointer">delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default AllUsers;
