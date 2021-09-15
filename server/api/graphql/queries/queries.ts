import { ApolloServerContext } from "../../types/ApolloServerContext";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { HeroType } from "../types/types";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hero: {
      type: HeroType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_parent, { id }, ctx: ApolloServerContext) {
        return ctx.prisma.hero.findUnique({ where: { id: +id } });
      },
    },
    heros: {
      type: GraphQLList(HeroType),
      args: {
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        take: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_parent, { skip, take }, ctx: ApolloServerContext) {
        return ctx.prisma.hero.findMany({
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    },
  },
});
