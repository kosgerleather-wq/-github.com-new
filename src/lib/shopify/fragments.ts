export const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

export const MONEY_FRAGMENT = /* GraphQL */ `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    productType
    tags
    images(first: 8) {
      edges { node { ...ImageFields } }
    }
    priceRange {
      minVariantPrice { ...MoneyFields }
    }
    variants(first: 1) {
      edges {
        node {
          id
          availableForSale
          selectedOptions { name value }
          price { ...MoneyFields }
          compareAtPrice { ...MoneyFields }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "material" }
    ]) {
      key
      value
    }
  }
`;

export const CART_LINE_FRAGMENT = /* GraphQL */ `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment CartLineFields on CartLine {
    id
    quantity
    cost {
      totalAmount { ...MoneyFields }
    }
    merchandise {
      ... on ProductVariant {
        id
        title
        selectedOptions { name value }
        image { ...ImageFields }
        product {
          id
          handle
          title
        }
        price { ...MoneyFields }
      }
    }
  }
`;

export const CART_FRAGMENT = /* GraphQL */ `
  ${CART_LINE_FRAGMENT}
  ${MONEY_FRAGMENT}
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { ...MoneyFields }
      totalAmount    { ...MoneyFields }
    }
    lines(first: 100) {
      edges { node { ...CartLineFields } }
    }
  }
`;
