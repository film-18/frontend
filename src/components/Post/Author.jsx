import axios from "axios";
import { memo, useEffect, useState } from "react";

const Author = memo(({ authorId, showOnlyName = false }) => {

    // TODO: สร้าง State สำหรับเก็บ Author
    const [author, setAuthor] = useState(null)



    // TODO: Fetch author จาก Id
    useEffect(() => {
        axios.get(`users/${authorId}`)
            .then(res => {
                setAuthor(res.data)
            })
    }, [authorId])

    if (!author)
        return <>
            Loading...
        </>

    if(showOnlyName)
        return author.name

    return <>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto">
            <div className="flex flex-col items-center py-4">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={author.avatar_urls['96']} alt="img" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{author.name}</h5>
            </div>
        </div>

    </>
})

export default Author;
