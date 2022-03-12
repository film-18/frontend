import { memo, useEffect, useContext, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@vechaiui/react";
import moment from "moment";
import parse from 'html-react-parser';


export const Home = memo(() => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])

    return <>
        <div className="px-8 py-8 bg-gray-200">

            <div className="grid grid-cols-2 gap-8">

                {posts?.map(e =>
                    <>

                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:scale-105 hover:bg-white-500">
                            {/* <a href="#"> */}
                            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {e.title?.rendered} </h4>
                            <h6 className="mb-1 text-xs font-bold tracking-tight text-gray-500 dark:text-white">{moment(e.date).format("LLL")}</h6>
                            <Button variant="solid" color="primary" size="xs" className="my-3">{e.status}</Button>
                            {/* </a> */}
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {/* {e.excerpt?.rendered?.length > 50 ? e.excerpt?.rendered.slice(3, 20) + "..." : e.excerpt?.rendered} */}
                                {parse(e.excerpt?.rendered)}
                            </p>


                            <Link to={`/posts/${e.id}`}>
                                <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 hover:scale-105">
                                    Read more
                                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </Link>
                        </div>

                    </>
                )}
            </div>
        </div>


    </>

});