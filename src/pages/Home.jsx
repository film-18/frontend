import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from 'html-react-parser';

import Author from "../components/Post/Author";
import Category from "../components/Post/Category";
import { Avatar } from "@vechaiui/react"
import Tags from "../components/Post/Tag";
import { Radio } from "@vechaiui/react"
import { Spinner } from "@vechaiui/react";

export const Home = memo(() => {

    const [posts, setPosts] = useState(null)
    const [comments, setComments] = useState([])

    const [sortBy, setSortBy] = useState('date')
    const [search, setSearch] = useState('')


    // const params = useParams();

    useEffect(() => {
        axios.get(`posts?per_page=100&orderby=${sortBy}&search=${search}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [sortBy, search])

    useEffect(() => {
        // https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${postId}
        axios.get(`comments?per_page=100`)
            .then(res => {
                setComments(res.data)
            })
    }, [])



    return <>


        <div className="flex flex-wrap w-full pt-8 pb-4 px-8 space-x-4 justify-between">
            <div className="pt-3">
                Sort by : 
                <Radio.Group
                    defaultValue="date"
                    className="space-x-4"
                    inline
                    size="xl"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setSortBy(e.target.value)
                        // axios.get('posts?per_page=100&orderby=' + e.target.value)
                        //     .then(res => {
                        //         setPosts(res.data)
                        //     })
                    }}
                >
                    <Radio value="date">Date</Radio>
                    <Radio value="author">Author</Radio>
                    <Radio value="title">Title</Radio>
                </Radio.Group>
            </div>
            <div className="mt-auto">
                <div class="relative mt-1 pl-3">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        onChange={(e) => {
                            console.log(e.target.value)
                            setSearch(e.target.value)
                        }}
                    />
                </div>
            </div>

        </div>


        {!posts && <>

            <div className="flex w-full h-screen p-8 justify-center">
                <Spinner size="xl" className="my-auto" />
            </div>
        </>}
        <div className="px-8 py-8">

            <div className="grid grid-cols-2 gap-8">


                {posts?.map(e =>
                    <>

                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:scale-105 duration-500 hover:bg-white-500">

                            {/* <a href="#"> */}
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {e.title?.rendered} </h4>
                            <h5>
                                by <Author authorId={e.author} showOnlyName={true} />
                            </h5>


                            <span className="text-xs font-bold tracking-tight text-gray-500 dark:text-white">{moment(e.date).format("LLL")}</span>
                            <span class="inline-flex items-center p-1 ml-3 mr-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                            <p className="text-xs inline-flex text-green-800">{e.status}</p>

                            <br />
                            <div className="pt-2 flex flex-wrap">
                                {e.categories?.map(category => {
                                    return <Category categoryId={category} />
                                })}

                                {e.tags?.map(tagId => {
                                    return <Tags tagId={tagId} />
                                })}
                            </div>



                            {/* </a> */}
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-2">
                                {/* {e.excerpt?.rendered?.length > 50 ? e.excerpt?.rendered.slice(3, 20) + "..." : e.excerpt?.rendered} */}
                                {parse(e.excerpt?.rendered)}
                            </p>

                            {/* <div>

                                {comments?.filter(comment => comment.post === e.id).length}
                            </div> */}



                            <div className="flex justify-between">
                                <div>
                                    <Link to={`/posts/${e.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300 focus:ring-4 focus:ring-blue-300 hover:scale-105">
                
                                        Read more
                                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    
                                    </Link>
                                </div>
                                <div>
                                    <div className="flex flex-wrap w-full space-x-4 ">
                                        <Avatar.Group size="lg" max={2}>
                                            {comments?.filter(comment => comment.post === e.id).map(comment => <>
                                                <Avatar name={comment.author_name} src={comment.author_avatar_urls['24']} />
                                            </>
                                            )}
                                        </Avatar.Group>

                                        {/* <p>+ {comments?.filter(comment => comment.post === e.id).length} others </p> */}
                                    </div>
                                </div>


                            </div>



                        </div>

                    </>
                )}
            </div>
        </div>


    </>

});