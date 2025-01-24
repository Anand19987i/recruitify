import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-80 rounded-lg shadow-lg p-6 font-poppins relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h1 className="text-2xl font-semibold text-black text-center mb-4">
                    Login or Signup
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Access your account to explore amazing features!
                </p>

                {/* Buttons */}
                <div className="flex justify-between gap-4">
                    <Link to="/login" className="w-1/2 py-2 bg-blue-500 text-center text-white rounded-lg hover:bg-blue-600 transition">
                        Login
                    </Link>
                    <Link to="/signup" className='w-1/2 py-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
                        Signup
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default RegisterPopup;
