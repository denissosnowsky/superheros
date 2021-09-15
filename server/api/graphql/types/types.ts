import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { ApolloServerContext } from "../../types/ApolloServerContext";

export const HeroType: GraphQLObjectType = new GraphQLObjectType({
  name: "Hero",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    createdAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: new GraphQLNonNull(GraphQLDateTime) },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    real_name: { type: new GraphQLNonNull(GraphQLString) },
    origin_description: { type: new GraphQLNonNull(GraphQLString) },
    superpowers: { type: new GraphQLNonNull(GraphQLString) },
    catch_phrase: { type: new GraphQLNonNull(GraphQLString) },
    images: {
      type: GraphQLList(ImageType),
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.images.findMany({ where: { heroId: +parent.id } });
      },
    },
  }),
});

export const ImageType: GraphQLObjectType = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    hero: {
      type: HeroType,
      resolve(parent, _args, ctx: ApolloServerContext) {
        return ctx.prisma.hero.findUnique({ where: { id: +parent.heroId } });
      },
    },
  }),
});
