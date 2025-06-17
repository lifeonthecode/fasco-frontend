import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { uploadProfilePicture } from './../../../../App/Features/User/userSlice';
import { fetchSingleUser } from '../../../../App/Features/Auth/authSlice';

const UploadProfile = () => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const {id} = useParams()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpload = async(e) => {
        e.preventDefault();
        console.log(avatar)
        try {

            const avatarForm = new FormData();
            avatarForm.append('avatar', avatar)

            const response = await dispatch(uploadProfilePicture({id, avatarForm})).unwrap();
            console.log('uploaded avatar: ', response);
            dispatch(fetchSingleUser())
            
            toast.success(response.message, {
                position: 'top-center'
            })
        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleProfileUpload}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Upload Profile</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {preview && (
                    <div className="mb-4">
                        <p className="text-gray-600 mb-2">Image Preview:</p>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full border mx-auto"
                        />
                    </div>
                )}
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadProfile;