import Image from "next/image"
import Link from "next/link";

export default function ArticlePreview({props}) {
    const {elements, system} = props
    const {title, summary, urlPattern, teaserImage} = elements
    const {codename} = system 
    return (
      <Link href={"/articles/" + codename}>
        <h3>{title.value}</h3>
        <p>{summary.value}</p>
        <Image src={teaserImage.value[0].url} alt="bruh" width={200} height={100}/>
      </Link>
    );
}