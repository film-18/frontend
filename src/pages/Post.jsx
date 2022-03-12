import axios from "axios";
import parse from 'html-react-parser';
import { Button } from "@vechaiui/react";

import { memo, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Post = memo(({ }) => {

    const [post, setPost] = useState(false)

    const params = useParams();

    useEffect(() => {
        axios.get(`posts/${params.postId}`)
            .then(res => {
                setPost(res.data)
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

                <div className="text-center">
                    <a href="/">
                        <Button variant="solid" color="primary" size="xl" className="my-3">Back</Button>
                    </a>
                </div>

                <div>
                    <p className="text-xl py-4">
                        Comment
                    </p>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Write here ..." />
                    <Button variant="solid" color="primary" size="xs" className="my-3">Submit</Button>
                </div>
            </div>

        </>

    else
        return <>
            <div className="text-center text-9xl px-20 py-60">
                Loading ....
            </div>

            {/* <button type="button" class="bg-indigo-500 ..." disabled>
                <svg class="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"><!-- ... --></svg>
                Loading ....
            </button> */}
        </>
})

export default Post;

