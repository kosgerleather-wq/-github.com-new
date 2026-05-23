import { PRODUCT_FRAGMENT } from "../fragments";

export const GET_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query getProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      pageInfo { hasNextPage endCursor }
      edges { node { ...ProductFields } }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFields }
  }
`;

export const GET_COLLECTION_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query getCollectionProducts($handle: String!, $first: Int!, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        pageInfo { hasNextPage endCursor }
        edges { node { ...ProductFields } }
      }
    }
  }
`;
