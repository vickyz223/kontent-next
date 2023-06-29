import { getItems } from "@/utils/kontent"

// async function bruh() {
//   const items = await client
//     .items()
//     .toPromise();
//   console.log('items')
//   console.log(items)
// }

export default function Home() {
  getItems()
  return (
    <div>
      <h1>'ello mate</h1>
    </div>
  )
}