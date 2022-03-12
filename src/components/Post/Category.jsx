import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Button } from "@vechaiui/react";

const Categorys = memo(({ categoryId }) => {

    // TODO: สร้าง State สำหรับเก็บ Author
    const [category, setCategory] = useState(null)


    // TODO: Fetch author จาก Id
    useEffect(() => {
        axios.get(`categories/${categoryId}`)
            .then(res => {
                setCategory(res.data)
            })
    }, [categoryId])

    if (!category)
        return <>
            
        </>

    // if(showOnlyName)
    //     return author.name

    return <>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{category.name}</span>
    </>
})

export default Categorys;
