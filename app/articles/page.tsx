'use client'
import { client } from "@/utils/kontent"
import { useState, useEffect } from "react"

import ArticlePreview from "./article_preview"

export default function Articles() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        async function initializeArticles() {
            const initial = await client.items().type("article").toPromise()
            setArticles(initial.data.items);
        }
        initializeArticles()
    }, [])

    return (
        <div>
            {articles.map((article) => (<ArticlePreview  key={Math.random()} props={article.elements} />))}
        </div>
    )
}