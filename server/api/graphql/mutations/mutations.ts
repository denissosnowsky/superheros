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

          if (args.images.length > 0) {
            args.images.forEach(async (item: any) => {
              let { filename, createReadStream } = await item;
              let imageName = uuidv4() + filename;
              await new Promise((res) =>
                createReadStream()
                  .pipe(
                    ctx.googleBucket
                      .file(imageName as string)
                      .createWriteStream({
                        resumable: false,
                        gzip: true,
                      })
                  )
                  .on("finish", res)
              );

              const images = await ctx.prisma.images.create({
                data: {
                  name: imageName,
                  heroId: hero.id,
                },
              });
            });
          }
          return true;
        } catch (e) {
          return false;
        }
      },
    },
    changeHero: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nickname: { type: GraphQLString },
        real_name: { type: GraphQLString },
        origin_description: { type: GraphQLString },
        superpowers: { type: GraphQLString },
        catch_phrase: { type: GraphQLString },
        addImages: { type: GraphQLList(GraphQLUpload) },
        deleteImages: { type: GraphQLList(GraphQLID) },
      },
      async resolve(_parent, args, ctx: ApolloServerContext) {
        try {
          const hero = await ctx.prisma.hero.update({
            where: {
              id: +args.id,
            },
            data: {
              nickname: args.nickname,
              real_name: args.real_name,
              origin_description: args.origin_description,
              superpowers: args.superpowers,
              catch_phrase: args.catch_phrase,
            },
          });

          if (args.deleteImages.length > 0) {
            args.deleteImages.forEach(
              async (item: typeof GraphQLID, i: number) => {
                const imageName = await ctx.prisma.images.delete({
                  where: {
                    id: +item,
                  },
                });
                ctx.googleBucket.file(imageName.name) &&
                  (await ctx.googleBucket.file(imageName.name).delete());
              }
            );
          }

          if (args.addImages.length > 0) {
            args.addImages.forEach(async (item: any) => {
              let { filename, createReadStream } = await item;
              let imageName = uuidv4() + filename;
              await new Promise((res) =>
                createReadStream()
                  .pipe(
                    ctx.googleBucket
                      .file(imageName as string)
                      .createWriteStream({
                        resumable: false,
                        gzip: true,
                      })
                  )
                  .on("finish", res)
              );

              const images = await ctx.prisma.images.create({
                data: {
                  name: imageName,
                  heroId: hero.id,
                },
              });
            });
          }

          return true;
        } catch (e) {
          return false;
        }
      },
    },
    deleteHero: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_parent, { id }, ctx: ApolloServerContext) {
        const imagesNames = await ctx.prisma.images.findMany({
          where: {
            heroId: +id,
          },
        });

        if (imagesNames.length > 0) {
          imagesNames.forEach(async (item) => {
            ctx.googleBucket.file(item.name) &&
              (await ctx.googleBucket.file(item.name).delete());
          });
        }

        await ctx.prisma.images.deleteMany({
          where: {
            heroId: +id,
          },
        });

        await ctx.prisma.hero.delete({ where: { id: +id } });
      },
    },
  },
});
