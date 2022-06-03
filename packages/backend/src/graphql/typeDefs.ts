import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Whitelist {
    _id: ID!
    address: String!
    confirmed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    whitelists: [Whitelist!]!
  }
`;
