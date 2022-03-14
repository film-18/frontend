import axios from "axios";
import parse from 'html-react-parser';

import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import Categoryy from "../components/Post/Category";
import { Avatar } from "@vechaiui/react";
import { Spinner } from "@vechaiui/react";

import Author from "../components/Post/Author";
import Tags from "../components/Post/Tag";
import moment from "moment";

const AuthorId = memo(() => {
    const [author, setAuthor] = useState(null)
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    const params = useParams();
    useEffect(() => {
        axios.get(`users/${params.authorId}`)
            .then(res => {
                setAuthor(res.data)
            })
    }, [params.authorId])

    useEffect(() => {
        axios.get(`posts?per_page=100`)
            .then(res => {
                setPost(res.data)
            })
    }, [])

    useEffect(() => {
        // https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${postId}
        axios.get(`comments?per_page=100`)
            .then(res => {
                setComments(res.data)
            })
    }, [])


    if (author)
        return <>
            <div className="px-8 py-8 flex justify-center hover:scale-105 duration-200 ">
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={author.avatar_urls['96']} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{author.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{author.description}
                            <br />
                            {parse(author.link)}
                            <br />
                            {post?.filter(post => post.author === author.id).length} posts
                        </p>
                    </div>
                </div>
            </div>




            <div className="grid grid-cols-2 gap-8 px-8 py-8">

                {post?.map(e => {
                    if (e.author === author.id) return <>
                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:scale-105 duration-500 hover:bg-white-500">

                            {/* <a href="#"> */}
                            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {e.title?.rendered} </h4>
                            <h5>
                                by <Author authorId={e.author} showOnlyName={true} />
                            </h5>


                            <span className="text-xs font-bold tracking-tight text-gray-500 dark:text-white">{moment(e.date).format("LLL")}</span>
                            <span className="inline-flex items-center p-1 ml-3 mr-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                            <p className="text-xs inline-flex text-green-800">{e.status}</p>


                            <br />
                            <div className="pt-2">
                                {e.categories?.map(category => {
                                    return <Categoryy categoryId={category} />
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
                    return undefined
                })}
            </div>

            <div className="flex justify-center py-2">
                <Link to={`/Author`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300 focus:ring-4 focus:ring-blue-300 hover:scale-105">

                    Back

                </Link>
            </div>




        </>

    else
        return <>
            <div className="flex w-full h-screen p-8 justify-center">
                <Spinner size="xl" className="my-auto" />
            </div>
        </>

})

export default AuthorId;
