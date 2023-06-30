import Image from "next/image"

export default function ArticlePreview({props}) {
    const {title, summary, urlPattern, teaserImage} = props
    return (
      <div>
        <h3>{title.value}</h3>
        <p>{summary.value}</p>
        <Image src={teaserImage.value[0].url} alt="bruh" width={200} height={100}/>
        <p>{urlPattern.value}</p>
      </div>
    );
}