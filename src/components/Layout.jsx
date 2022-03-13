import { Outlet } from "react-router-dom";



const { memo } = require("react");

const Layout = memo(() => {


    return <>

        {/* Navbar */}
        <nav className="bg-white border-gray-200 px-8 py-8 sm:px-4 py-2.5 rounded dark:bg-gray-800 fixed w-screen z-50 shadow-lg">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <img src="https://avatars.githubusercontent.com/u/56312158?v=4" className="mr-3 h-6 sm:h-10" alt="" />
                    <span className="self-center text-2xl whitespace-nowrap text-gray-700 dark:text-white">62070011 Kanlaya Pootsupha</span>
                </a>

                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
        
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium">
                        <li>
                            <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                        </li>

                        <li>
                            <a href="/category" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Category</a>
                        </li>
                        <li>
                            <a href="/author" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Author</a>
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
