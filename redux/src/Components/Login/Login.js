import React, { useState, useEffect } from 'react';
import { initTWE, Input, Ripple } from 'tw-elements';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../Store/AuthContext';
import axios from 'axios';
import './Login.css';

export default function Login() {
    useEffect(() => {
        initTWE({ Input, Ripple });
    }, []);
    
    const { setIsAuthenticated, setRole } = useAuth(); // Include setRole
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });
            // Login successful
            setSuccess('Login successful!');
            localStorage.setItem('jwt', response.data.jwt);
            setIsAuthenticated(true);
            // Check credentials to set role
            let userRole;
            if (email === 'admin123@gmail.com' && password === '123456789') {
                userRole = 'admin';
            } else {
                userRole = 'user';
            }
            setRole(userRole);
            // Save the role in local storage
            localStorage.setItem('role', userRole);
            
            navigate('/', { state: { success: 'Login successful!' } });
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.response?.data?.error?.message || 'Invalid email or password');
        }
    };

    return (
        <section className="h-screen px-5">
            <div className="h-full">
                <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                        />
                    </div>
                    <div className="all mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                            {/* Sign in section */}
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 me-4 text-lg">Sign in with</p>
                                {/* Social login buttons */}
                                {/* ... (social buttons code remains unchanged) ... */}
                            </div>
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            {/* Email input */}
                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="text"
                                    className="py-7 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="exampleFormControlInput2"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-300 dark:peer-focus:text-primary"
                                >
                                    Email address
                                </label>
                            </div>
                            {/* Password input */}
                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="password"
                                    className="py-7 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput22"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label
                                    htmlFor="exampleFormControlInput22"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-300 dark:peer-focus:text-primary"
                                >
                                    Password
                                </label>
                            </div>
                            {/* Submit button */}
                            <div className="text-center lg:text-left">
                                <button
                                    type="submit"
                                    className="login inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_#3b71ca,0_4px_18px_0_#3b71ca] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_#3b71ca,0_4px_18px_0_#3b71ca] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_#3b71ca,0_4px_18px_0_#3b71ca]"
                                >
                                    Login
                                </button>
                                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                                    Don't have an account?{' '}
                                    <a
                                        href="/register"
                                        className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                    >
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}