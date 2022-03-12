import axios from "axios";
import parse from 'html-react-parser';
import { Button } from "@vechaiui/react";

import { memo, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Author from "../components/Post/Author";

import moment from "moment";


const Post = memo(({ }) => {

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)

    const [writingComment, setWritingComment] = useState("")
    const [writingUser, setWritingUser] = useState("")

    const params = useParams();

    useEffect(() => {
        axios.get(`posts/${params.postId}`)
            .then(res => {
                setPost(res.data)
            })
    }, [params.postId])

    useEffect(() => {
        // https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${postId}
        axios.get(`comments?post=${params.postId}`)
            .then(res => {
                setComments(res.data)
            })
    }, [params.postId])


    if (post)
        return <>

            <div className="px-8 py-8 bg-gray-200">
                <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {post.title?.rendered}
                </div>

                <div className="px-8 py-8 text-xl">
                    {parse(post.content.rendered)}
                </div>

                <Author authorId={post.author} />

                <div className="text-center">
                    <a href="/">
                        <Button variant="solid" color="primary" size="xl" className="my-3">Back</Button>
                    </a>
                </div>


                <div>
                    <p className="text-xl py-4">
                        Comment
                    </p>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" placeholder="Name ..."
                        onChange={(e) => setWritingUser(e.target.value)}
                    />

                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" placeholder="Write here ..."
                        onChange={(e) => setWritingComment(e.target.value)}
                    />
                    
                    <Button variant="solid" color="primary" size="xs" className="my-3" onClick={() => {
                        axios.post('https://fswd-wp.devnss.com/wp-json/wp/v2/comments', {
                            "post": post.id,
                            "author_name": writingUser,
                            "date": moment(),
                            "content": writingComment,
                        })
                        .then(() => {
                            axios.get(`comments?post=${params.postId}`)
                            .then(res => {
                                setComments(res.data)
                            })
                        })
                        // .then(res => )
                    }}>
                        Submit
                    </Button>
                    
                    {comments?.map((comment) => <>
                    
                        {comment.author_name} : {parse(comment.content?.rendered) }<br/>

                    </>
                    )}
                    
            </div>
        </div>

    

        </>

    else
        return <>
            <div className="text-center text-9xl px-20 py-60">
                Loading ....
            </div>

            {/* <button type="button" className="bg-indigo-500 ..." disabled>
                <svg className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"><!-- ... --></svg>
                Loading ....
            </button> */}
        </>
})

export default Post;

