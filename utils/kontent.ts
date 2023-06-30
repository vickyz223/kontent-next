import {
  createDeliveryClient,
  camelCasePropertyNameResolver,
} from '@kontent-ai/delivery-sdk';

export const client = createDeliveryClient({
  environmentId: '06614114-3fa0-0083-4ff8-363ed202ac05',
  propertyNameResolver: camelCasePropertyNameResolver,
});
