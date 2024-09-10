import './Navbar.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Collapse, Dropdown, initTWE } from 'tw-elements';
import { removeFromCart } from '../../Store/cartSlice';
import { logout } from '../../Store/userSlice';
import logo from '../../images/logo.png';
import { useAuth } from '../../Store/AuthContext';

export default function Navbar() {
    useEffect(() => {
        initTWE({ Collapse, Dropdown });
    }, []);

    const { isAuthenticated, setIsAuthenticated, role, setRole } = useAuth();
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItemsCount = useSelector((state) => state.cart.items.length);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }, [setRole]);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await fetch("http://localhost:1337/api/users/me?populate=profilePicture", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    if (userData.profilePicture && userData.profilePicture.url) {
                        setUser({
                            id: userData.id,
                            username: userData.username,
                            email: userData.email,
                            profilePicture: `${process.env.REACT_APP_API_APP}${userData.profilePicture.url}`,
                        });
                    } else {
                        setUser({
                            id: userData.id,
                            username: userData.username,
                            email: userData.email,
                            profilePicture: "https://via.placeholder.com/150",
                        });
                    }
                } else {
                    console.error("Failed to fetch user data.");
                }
            } catch (error) {
                console.error("An error occurred while fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleRemove = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };

    const handleLogout = () => {
        setSuccess('Successfully logged out!');
        localStorage.removeItem('user');
        dispatch(logout());
        setIsAuthenticated(false);
        localStorage.removeItem('role');
        setTimeout(() => {
            setSuccess('');
            navigate('/');
        }, 5000);
    };

    useEffect(() => {
        const paypalButton = document.getElementById('paypal-button');
        if (cartItems.length > 0) {
            if (paypalButton && !paypalButton.hasChildNodes()) {
                if (window.paypal) {
                    window.paypal.Buttons().render('#paypal-button');
                } else {
                    console.error('PayPal SDK not loaded');
                }
            }
        } else {
            if (paypalButton && paypalButton.hasChildNodes()) {
                paypalButton.innerHTML = '';
            }
        }
    }, [cartItems.length]);

    const toggleActive = () => {
        setIsActive(prev => !prev);
    };

    return (
        <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <button
                    className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-twe-collapse-init
                    data-twe-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" id="navbarSupportedContent1" data-twe-collapse-item>
                    <Link to="/">
                        <div
                            className="logo mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                        >
                            <img
                                src={logo}
                                style={{ height: '30px', marginRight: '8px' }}
                                alt="Store Logo"
                                loading="lazy"
                            />
                            <span className="text-lg font-semibold">BASHAR STORE</span>
                        </div>
                    </Link>

                    <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row" data-twe-navbar-nav-ref>
                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <Link to="products/Women">
                                <a
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="#"
                                    data-twe-nav-link-ref
                                >
                                    Women
                                </a>
                            </Link>
                        </li>


                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <Link to="products/Man">
                                <a
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="#"
                                    data-twe-nav-link-ref
                                >
                                    Men
                                </a>
                            </Link>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <Link to="products/kids">
                                <a
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="#"
                                    data-twe-nav-link-ref
                                >
                                    Kids
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={`nav_item relative flex items-center ${isMenuOpen ? 'open' : ''}`}>
                    <a className="me-4 text-neutral-600 dark:text-white" href="/">
                        <h1 className="bg-red-700 text-white px-3 rounded-lg">{success}</h1>
                    </a>
                    <a className="me-4 text-neutral-600 dark:text-white" href="/">
                        <h1>Home page</h1>
                    </a>

                    <a className="me-4 text-neutral-600 dark:text-white" href="/story">
                        <h1>Stories</h1>
                    </a>


                    <div className="relative" data-twe-dropdown-ref data-twe-dropdown-alignment="end">
                        <a
                            className="me-4 flex items-center text-neutral-600 dark:text-white"
                            href="#"
                            id="dropdownMenuButton1"
                            role="button"
                            data-twe-dropdown-toggle-ref
                            aria-expanded="false"
                        >
                            <span className="[&>svg]:w-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                            </span>
                            {cartItemsCount > 0 && (
                                <span className="absolute top-[-6px] right-[10px] rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                                    {cartItemsCount}
                                </span>
                            )}
                        </a>
                        <ul
                            className="w-80 absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                            aria-labelledby="dropdownMenuButton1"
                            data-twe-dropdown-menu-ref
                        >
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => {
                                    const imageUrl = item?.attributes?.image?.data?.attributes?.url;
                                    const title = item?.attributes?.title;
                                    const price = item?.attributes?.num;

                                    if (!imageUrl || !title || !price) {
                                        return null;
                                    }

                                    return (
                                        <li
                                            className="relative m-2 flex items-center border-b border-gray-200 dark:border-gray-600 justify-between"
                                            key={item.id}
                                        >
                                            <div className="flex">
                                                <img
                                                    src={`${process.env.REACT_APP_API_APP}${imageUrl}`}
                                                    alt={title}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div className="ml-2">
                                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">{title}</h3>
                                                    <p className="text-xs text-gray-700 dark:text-gray-300">Price: {price}$</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={() => navigate(`/product/${item.id}`)} type="button" className="w-28 inline-block rounded-s bg-primary-100 px-1 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400" data-twe-ripple-init data-twe-ripple-color="light"> Go to Checkout </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="text-center p-2">Your cart is empty</li>
                            )}

                            {cartItems.length > 0 && (
                                <div id='paypal-button' className="m-2">
                                    {/* PayPal button will be rendered here */}
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className="relative" data-twe-dropdown-ref data-twe-dropdown-alignment="end">
                        <a
                            className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                            href="#"
                            id="dropdownMenuButton2"
                            role="button"
                            data-twe-dropdown-toggle-ref
                            aria-expanded="false"
                        >
                            <img
                                src={user ? user.profilePicture : "https://via.placeholder.com/150"}
                                className="rounded-full"
                                style={{ height: '25px', width: '25px' }}
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                            aria-labelledby="dropdownMenuButton2"
                            data-twe-dropdown-menu-ref
                        >
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/register">
                                            <a
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                href="#"
                                                data-twe-dropdown-item-ref
                                            >
                                                Register
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login">
                                            <a
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                href="#"
                                                data-twe-dropdown-item-ref
                                            >
                                                Login
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/profile">
                                            <a
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                href="#"
                                                data-twe-dropdown-item-ref
                                            >
                                                Profile
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                            href="#"
                                            data-twe-dropdown-item-ref
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                    {role === 'admin' && (
                                        <li>
                                            <a
                                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                                href='http://localhost:1337/admin/'
                                                data-twe-dropdown-item-ref
                                                target='_blank'
                                            >
                                                Dashboard
                                            </a>

                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}