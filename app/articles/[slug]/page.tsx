'use client'
import { client } from "@/utils/kontent";
import { useEffect, useState } from "react";

export default function Article({params}) {
    const [article, setArticle] = useState([])
    useEffect(() => {
        async function initArticle() {
          const response = await client
            .items()
            .equalsFilter("elements.title", params.slug)
            .toPromise();
            setArticle(response.data);
            console.log(response);
        }
        initArticle()
    }, [])
    
    return (
        <div>
            <h1>glizzyyyy</h1>
            <p></p>
        </div>
    )
}