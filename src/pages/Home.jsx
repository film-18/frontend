import { memo, useEffect, useContext, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@vechaiui/react";
import moment from "moment";
import parse from 'html-react-parser';

import Author from "../components/Post/Author";
import Category from "../components/Post/Category";


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

                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:scale-105 duration-500 hover:bg-white-500">
                            <Author authorId={e.author} showOnlyName={true} />
                            {/* <a href="#"> */}
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {e.title?.rendered} </h4>
                    

                            <span className="text-xs font-bold tracking-tight text-gray-500 dark:text-white">{moment(e.date).format("LLL")}</span>                     
                            <span class="inline-flex items-center p-1 ml-3 mr-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                            <p className="text-xs inline-flex text-green-800">{e.status}</p>
                        
                            <br />
                            <div className="pt-2">
                                {e.categories?.map(category => {
                                    return <Category categoryId={category} />
                                })}
                            </div>

                            {/* </a> */}
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-2">
                                {/* {e.excerpt?.rendered?.length > 50 ? e.excerpt?.rendered.slice(3, 20) + "..." : e.excerpt?.rendered} */}
                                {parse(e.excerpt?.rendered)}
                            </p>


                            <Link to={`/posts/${e.id}`}>
                                <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300 focus:ring-4 focus:ring-blue-300 hover:scale-105">
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