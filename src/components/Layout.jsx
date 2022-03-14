import { Outlet } from "react-router-dom";



const { memo } = require("react");

const Layout = memo(() => {


    return <>

        {/* Navbar */}
        <nav className="bg-white border-gray-200 px-8 py-8 sm:px-4 py-2.5 rounded dark:bg-gray-800 fixed w-screen z-50 shadow-lg">
            <div className="container flex flex-wrap justify-between items-center mx-auto ">
                <a href="/" className="flex items-center">
                    {/* <img src="https://avatars.githubusercontent.com/u/56312158?v=4" className="mr-3 h-6 sm:h-10" alt="" /> */}
                    <span className="self-center text-2xl whitespace-nowrap text-gray-700 dark:text-white pr-2">BLOGGER </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </a>

                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">

                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium">
                        <li>

                            <a href="/" className="inline-flex block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">

                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>

                                Home

                            </a>

                        </li>

                        <li>
                            <a href="/category" className="inline-flex block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">

                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                Category
                            </a>
                        </li>
                        <li>
                            <a href="/author" className="inline-flex block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                Author

                            </a>
                        </li>
                        <li>
                            <a href="/aboutme" className="inline-flex block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                </svg> */}
                                🐱
                                About Me
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>

        <div className="h-12"></div>

        <Outlet />

        {/* Footer */}

    </>

})

export default Layout;
