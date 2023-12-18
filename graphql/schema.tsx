// import { buildSchema } from "graphql";

// export const graphqlSchema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// export const graphqlRoot = {
//   hello: () => {
//     return "Hello world!"
//   },
// }

import { GraphQLSchema, buildSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLEnumType, GRAPHQL_MIN_INT, GraphQLInt, GraphQLList } from 'graphql';

buildSchema(`
  type RootQuery {
    books: [BookType!]

  },
  type RootMutation {
    createBook(title: String): BookType
  },
  schema {
    query: RootQuery,
    mutation: RootMutation,
  }
`)
/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   firstName: String
 * }
 */
// export const graphqlSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'world',
//       },
//     },
//   }),
// });

// const BookSchema = new GraphQLSchema({
  const BookType =  new GraphQLObjectType({
    name: 'Book',
    fields: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      authorId: { type: GraphQLID },
      description: { type: GraphQLString },
      isAvailable: { type: GraphQLBoolean },
      bookColor: {
        type: GraphQLEnumType,
        values: {
          RED: { value: 0},
          GREEN: { value: 1},
          BLUE: { value: 2},
          YELLO: { value: 3},
        }
      },
      reference: { type: GraphQLInt },
    }
  });

// const AuthorSchema = new GraphQLSchema({
  const AuthorType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString }
    }
  });
// });

export const graphqlSchema = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      book: {
          type: BookType,
          args: {
              id: {
                  type: GraphQLID
              }
          },
          resolve(parent, args){
            return {}
              // return User.findById(args.id);
          }
      },
      books: {
          type: new GraphQLList(BookType),
          resolve(parent, args){
            return []
              // return User.find({})
          }
      },

      author: {
        type: AuthorType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args){
          return {}
            // return User.findById(args.id);
        }
    },
  }
})

// console.log('ccccc', graphqlSchema)



// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// type Book {
//   title: String
//   author: String
// }

// # The "Query" type is special: it lists all of the available queries that
// # clients can execute, along with the return type for each. In this
// # case, the "books" query returns an array of zero or more Books (defined above).
// type Query {
//   books: [Book]
// }
// `;