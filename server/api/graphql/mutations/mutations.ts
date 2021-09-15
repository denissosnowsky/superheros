import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ApolloServerContext } from "../../types/ApolloServerContext";
import { GraphQLUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";
import GraphQLJSON from "graphql-type-json";
import { HeroType } from "../types/types";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addHero: {
      type: GraphQLBoolean,
      args: {
        nickname: { type: new GraphQLNonNull(GraphQLString) },
        real_name: { type: new GraphQLNonNull(GraphQLString) },
        origin_description: { type: new GraphQLNonNull(GraphQLString) },
        superpowers: { type: new GraphQLNonNull(GraphQLString) },
        catch_phrase: { type: new GraphQLNonNull(GraphQLString) },
        images: { type: GraphQLList(GraphQLUpload) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        try {
          const hero = await ctx.prisma.hero.create({
            data: {
              nickname: args.nickname,
              real_name: args.real_name,
              origin_description: args.origin_description,
              superpowers: args.superpowers,
              catch_phrase: args.catch_phrase,
            },
          });

          let imageName: string | undefined;

          if (args.image > 0) {
            const { filename, createReadStream } = await args.image;
            const imageName = uuidv4() + filename;

            await new Promise((res) =>
              createReadStream()
                .pipe(
                  ctx.googleBucket.file(imageName).createWriteStream({
                    resumable: false,
                    gzip: true,
                  })
                )
                .on("finish", res)
            );

            const images = await ctx.prisma.images.createMany({
              data: [
                {
                  name: imageName,
                  heroId: hero.id,
                },
              ],
            });
          }
          return true;
        } catch (e) {
          return false;
        }
      },
    },
    /*     changeHero: {
        type: GraphQLBoolean,
        args: {
          nickname: { type: new GraphQLNonNull(GraphQLString) },
          real_name: { type: new GraphQLNonNull(GraphQLString) },
          origin_description: { type: new GraphQLNonNull(GraphQLString) },
          superpowers: { type: new GraphQLNonNull(GraphQLString) },
          catch_phrase: { type: new GraphQLNonNull(GraphQLString) },
          images: { type: GraphQLList(GraphQLUpload) },
        },
        async resolve(_parent, args, ctx: ApolloServerContext) {
          try {
            const { filename, createReadStream } = await args.image;
            const imageName = uuidv4() + filename;

            return true;
          }catch(e){
              return false;
          }
        }
    },
    deleteHero: {}, */
  },
});
