'use client'
import { client } from "@/utils/kontent";
import { useEffect, useState } from "react";
import { createDeliveryClient, Elements } from "@kontent-ai/delivery-sdk";
import {
  isComponent,
  isLinkedItem,
  RichTextElement,
} from "@kontent-ai/react-components";
import { Element as DomHandlerElement } from "domhandler";


export default function Article({ params }) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    async function initArticle() {
      const myTimeout = setTimeout(5000);
      const response = await client
        .items()
        .equalsFilter('system.type', 'article')
        .equalsFilter("system.codename", params.slug)
        .toPromise();
      setArticle(response.data.items[0].elements);
    }
    initArticle();
  }, []);

  console.log("article", article)
  if (article.title) {
    return (
      <div>
        <h1>{article.title && article.title.value}</h1>
        {article.bodyCopy && (
          <RichTextElement
            richTextElement={
              article.bodyCopy
            }
            resolvers={{
              resolveLinkedItem: (linkedItem, { domElement, domToReact }) => {
                if (isComponent(domElement)) {
                  return (
                    <>
                      <h1>Component</h1>
                      <pre>{JSON.stringify(linkedItem, undefined, 2)}</pre>;
                    </>
                  );
                }
                if (isLinkedItem(domElement)) {
                  return (
                    <>
                      <h1>Linked item</h1>
                      <pre>{JSON.stringify(linkedItem, undefined, 2)}</pre>;
                    </>
                  );
                }
                throw new Error("Unknown type of the linked item's dom node");
              },
              resolveImage: (
                image,
                { domElement, domToReact }
              ): JSX.Element => (
                <img
                  src={image.url}
                  alt={image.description ? image.description : image.imageId}
                  width="200"
                />
              ),
              resolveLink: (link, { domElement, domToReact }): JSX.Element => (
                <a href={`/${link.type}/${link.urlSlug}`}>
                  {domToReact(domElement.children)}
                </a>
              ),
              resolveDomNode: ({ domNode, domToReact }) => {
                if (
                  domNode instanceof DomHandlerElement &&
                  domNode.name === "table"
                ) {
                  return (
                    <div className="table-wrapper">{domToReact([domNode])}</div>
                  );
                }
              },
            }}
          />
        )}
        {article.bodyCopy.value}
      </div>
    );
  } else {
    return (
      <div>loading</div>
    )
  }
}
