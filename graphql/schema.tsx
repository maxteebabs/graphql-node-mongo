import { GraphQLSchema, 
  buildSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLBoolean, 
  GraphQLEnumType, 
  GraphQLInt, 
  GraphQLList } from 'graphql';
import { Book, Author } from '../database/models/index';


const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    address: { type: GraphQLString },
    gender: { type: GraphQLString },
    // gender: {
    //   type: new GraphQLEnumType({
    //     name: 'gender',
    //     values: { 
    //       male: {value: 0 },
    //       female: {value: 1 }
    //     }
    //   })
    // }
  }
});

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
    description: { type: GraphQLID },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    authorId: { type: GraphQLInt },
  }
});

export const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'hello world'
      },
      author: {
        type: authorType,
        args: {
          id: {
              type: GraphQLID
          }
        },
        resolve: async (parent, {id}) => {
          const author = await Author.findOne({_id: id}).populate('books').exec();
          return author;
        }
      },
      authors: {
        type: new GraphQLList(authorType),
        resolve: async () => {
          const authors = await Author.find({}).populate('books').exec();
          return authors;
        },
      },
      book: {
        type: bookType,
        args: {
          id: {
              type: GraphQLID
          }
        },
        resolve: async (parent, {id}) => {
          const book = await Book.findOne({_id: id}).exec();
          if(book) {
            book.id = book._id
          }
          return book;
        }
      },
      books: {
        type: new GraphQLList(bookType),
        resolve: async () => {
          const books = await Book.find({}).populate('author').exec();
          return books;
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      addAuthor: {
        type: authorType,
        args: {
          fullname: { type: GraphQLString },
          email: { type: GraphQLString },
          mobile: { type: GraphQLString },
          address: { type: GraphQLString },
          gender: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
          const author = await Author.create({...args})
          if(author) {
            author.id = author._id;
          }
          return author;
        }
      }
    } 
  })
});
