import { gql } from '@apollo/client';

export const FETCH_CATEGORIES = gql`
  query FetchCategories {
    categories {
      name
    }
  }
`;

export const FETCH_PRODUCTS_BY_CATEGORY = gql`
  query FetchProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        name
        brand
        inStock
        description
        gallery
        category
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        id
        prices {
          amount
          currency{
            symbol
            label
          }
        }
      }
    }
  }
`;

export const FETCH_CURRENCIES = gql`
  query FetchCurrencies {
    currencies{
      symbol
      label
    }
  }
`;

export const FETCH_PRODUCT_BY_ID = gql`
  query FetchProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      brand
      gallery
      description
      attributes {
        name
        id
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
    }
  }
`;
