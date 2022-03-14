import axios from "axios";
import parse from 'html-react-parser';
import { Button } from "@vechaiui/react";

import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Author from "../components/Post/Author";
import { Spinner } from "@vechaiui/react";

import moment from "moment";


const Post = memo(() => {

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)


    const [writingComment, setWritingComment] = useState("")
    const [writingUser, setWritingUser] = useState(localStorage.getItem('comment_name') || '')

    const params = useParams();

    useEffect(() => {
        axios.get(`posts/${params.postId}`)
            .then(res => {
                setPost(res.data)
            })
    }, [params.postId])

    useEffect(() => {
        // https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${postId}
        axios.get(`comments?post=${params.postId}&orderby=date&per_page=100`)
            .then(res => {
                setComments(res.data)
            })
    }, [params.postId])

    if (post)
        return <>

            <div className="px-8 py-8">

                <div className="px-8 py-8 container mx-auto bg-gray-50 rounded-lg">
                    <div className="text-4xl p-5 font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        {post.title?.rendered}
                    </div>
                    {parse(post.content.rendered)}
                </div>

                <Author authorId={post.author} />

                <div className="flex justify-center py-5">
                    <Link to={`/`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300 focus:ring-4 focus:ring-blue-300 hover:scale-105">
                
                        Back
              
                    </Link>
                </div>


                <div>
                    <div className="max-w-m bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto">
                        <div className="px-8 py-5">

                            <label for="name" className="block mb-2 text-m font-medium text-gray-900 dark:text-gray-300 ">Your name</label>
                            <input type="text" id="name"
                                value={writingUser}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name..." required
                                onChange={(e) => setWritingUser(e.target.value)} />

                            <label for="message" className="block mb-2 mt-2 text-m font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Add a comment..."
                                onChange={(e) => setWritingComment(e.target.value)}></textarea>

                            {/* <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Name ..."
                                onChange={(e) => setWritingUser(e.target.value)}
                            /> */}

                            {/* <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Write here ..."
                                onChange={(e) => setWritingComment(e.target.value)}
                            /> */}

                            <Button variant="solid" color="primary" size="xs" className="my-3" onClick={() => {
                                axios.post('https://fswd-wp.devnss.com/wp-json/wp/v2/comments', {
                                    "post": post.id,
                                    "author_name": writingUser,
                                    "date": moment(),
                                    "content": writingComment,
                                })
                                    .then(() => {
                                        axios.get(`comments?post=${params.postId}&orderby=date`)
                                            .then(res => {
                                                setComments(res.data)
                                                document.getElementById('message').value = ''
                                                localStorage.setItem('comment_name', writingUser)
                                            })
                                    })
                                // .then(res => )
                            }}>
                                Submit
                            </Button>
                        </div>

                        {/* </div> */}

                        <br />

                        <div className="mx-8 text-xl">
                            {comments?.filter(comment => comment.post === post.id).length >= 100 ? 'latest ' : ''}
                            {comments?.filter(comment => comment.post === post.id).length} Comments
                        </div>
                        <ol className="mt-3 mx-3 divide-y divider-gray-200 dark:divide-gray-700">
                            {comments?.map((comment) => <>
                                {/* {comment.author_name} : {parse(comment.content?.rendered)}<br /> */}
                                <li>
                                    <div className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <img className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0" src={comment.author_avatar_urls['96']} alt="user img" />
                                        <div className="text-gray-600 dark:text-gray-400">
                                            <div className="text-base font-normal">
                                                <span className="font-medium text-gray-900 dark:text-white">{comment.author_name}</span>
                                                <span className="text-xs">  {moment(comment.date).format("LLL")}</span>
                                            </div>
                                            <div className="text-sm font-normal">{parse(comment.content?.rendered)}</div>
                                        </div>
                                    </div>
                                </li>

                            </>
                            )}
                        </ol>
                    </div>

                </div>
            </div>



        </>

    else
        return <>
            <div className="flex w-full h-screen p-8 justify-center">
                <Spinner size="xl" className="my-auto" />
            </div>
        </>
})

export default Post;

