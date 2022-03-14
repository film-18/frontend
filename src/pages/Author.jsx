import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "@vechaiui/react";

export const Author = memo(() => {

    const [authors, setAuthors] = useState(null)
    const [posts, setPosts] = useState([])
    const [categorys, setCategory] = useState([])
    
    useEffect(() => {
        axios.get('posts')
            .then(res => {
                setPosts(res.data)
            })
    }, [])



    useEffect(() => {
        axios.get(`users`)
            .then(res => {
                setAuthors(res.data)
            })
    }, [])

    useEffect(() => {
        axios.get(`categories`)
            .then(res => {
                setCategory(res.data)
            })
    }, [])

    // const incrementCount = () => {
    //     setCount(count + 1)
    // }

    return <>

        {/* <p className="text-center text-xl my-10">
            Author
        </p> */}
        {!authors && <>
            <div className="flex w-full h-screen p-8 justify-center">
                <Spinner size="xl" className="my-auto" />
            </div>
        </>}
        <div className="mt-12 mb-6 text-4xl bg-blue-800 rounded-lg px-8 py-8 h-24 w-1/2 mx-auto">
            <h1 className="text-gray-200 text-center">
                Author
            </h1>
        </div>


        <div className="flex justify-center gap-2">



            {authors?.map(author =>

                <>
                    <div className="py-5 mx-2 w-full md:w-1/3 bg-white rounded-lg border border-gray-200 shadow-md mx-auto hover:scale-105 duration-500">
                        <Link to={`/author/${author.id}`}>
                            <div className="flex flex-col items-center py-4">
                                <img className="my-3 w-40 h-40 rounded-full shadow-lg" src={author.avatar_urls['96']} alt="img" />
                                <h5 className="mb-1 mt-2 text-2xl font-medium text-gray-900 dark:text-white">{author.name}</h5>
                                <span className="text-xl  text-gray-500 dark:text-gray-400 pb-2">{author.slug}</span>

                                {/* <hr className="h-10 bg-blue-900" /> */}
                                <div className="pb-2">
                                    <Link to={`/author/${author.id}`}>
                    
                                        <span className="text-white-800 text-m font-medium mr-2 px-2.5 py-0.5  dark:bg-blue-200 dark:text-blue-800">
                                            {posts?.filter(post => post.author === author.id).length} Posts
                                        </span>
                            
                                    </Link>
                                </div>

                                <div className="flex flex-wrap">
                                        
                                    {[...new Set(posts?.filter(post => post.author === author.id).map(post => {
                                        return [...post.categories?.map(
                                            categoriesId => categorys?.map(category => {
                                                if (categoriesId === category.id) return category.name;
                                                return undefined;
                                            }).filter(e => e != null)[0]
                                        )]
                                    }).flat()
                                    )].map(category => {
                                        console.log(category);
                                        return <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                            {category}
                                        </span>
                                   
                                    })}

                                </div>

                                {/* {categorys?.map(category =>
                            
                                category.id === data && 
                                {category.name}
                            
                        )} */}


                                {/* <a href="#" class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300">Default</a> */}
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    </>
});