import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  GraphQLLimitedString
} from 'graphql-custom-types';

// import { getPosts, getAuthor, getAuthors, getComments, createPost } from './dynamo';
import { findItemsByName } from './dynamo';

const  Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});



const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: Date }
  },
});


const Query = new GraphQLObjectType({
  name: 'Reservation',
  description: "Root of the Reservation System Schema",
  fields: () => ({
    items: {
      type: new GraphQLList(ItemType),
      description: "List of items for reservation",
      args: {
        name: {
          type: graphql.GraphQLString,
        }
      },
      resolve(_, args, ast) { // eslint-disable-line no-unused-vars
        return findItemsByName(args.name);
      }
    }
  })
});


/*
const Author = new GraphQLObjectType({
  name: "Author",
  description: "Author of the blog post",
  fields: () => ({
      id: {type: GraphQLString},
      name: {type: GraphQLString}
    })
});

const Comment = new GraphQLObjectType({
  name: "Comment",
  description: "Comment on the blog post",
  fields: () => ({
      id: {type: GraphQLString},
      content: {type: GraphQLString},
      author: {
        type: Author,
        resolve: function({author}) {
          return getAuthor(author);
        }
      }
    })
});

const Post = new GraphQLObjectType({
  name: "Post",
  description: "Blog post content",
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    bodyContent: {type: GraphQLString},
    author: {
      type: Author,
      resolve: function({author}) {
        return getAuthor(author);
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve: function(post) {
        return getComments();
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: "Root of the Blog Schema",
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      description: "List of posts in the blog",
      resolve: function(source, {category}) {
        return getPosts();
      }
    },
    authors: {
      type: new GraphQLList(Author),
      description: "List of Authors",
      resolve: function() {
        return getAuthors();
      }
    },
    author: {
      type: Author,
      description: "Get Author by id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {id}) {
        return getAuthor(author);
      }
    }
  })
});

const Mutuation = new GraphQLObjectType({
  name: 'BlogMutations',
  fields: {
    createPost: {
      type: Post,
      description: "Create blog post",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLLimitedString(10, 30)},
        bodyContent: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString), description: "Id of the author"}
      },
      resolve: function(source, args) {
        return createPost(args);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutuation
});
 */

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
