import {
  createDeliveryClient,
  camelCasePropertyNameResolver,
} from "@kontent-ai/delivery-sdk";

const sourceTrackingHeaderName = "X-KC-SOURCE";

const client = createDeliveryClient({
  environmentId: "06614114-3fa0-0083-4ff8-363ed202ac05",
  propertyNameResolver: camelCasePropertyNameResolver,
});

export async function getItems() {
  const items = await client.items().toPromise();
  console.log(items);
  return items; 
}

export default client;
