import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Hero = {
  __typename?: 'Hero';
  catch_phrase: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  nickname: Scalars['String'];
  origin_description: Scalars['String'];
  real_name: Scalars['String'];
  superpowers: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Image = {
  __typename?: 'Image';
  hero?: Maybe<Hero>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHero?: Maybe<Scalars['Boolean']>;
  changeHero?: Maybe<Scalars['Boolean']>;
  deleteHero?: Maybe<Scalars['Boolean']>;
};


export type MutationAddHeroArgs = {
  catch_phrase: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  nickname: Scalars['String'];
  origin_description: Scalars['String'];
  real_name: Scalars['String'];
  superpowers: Scalars['String'];
};


export type MutationChangeHeroArgs = {
  addImages?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  catch_phrase?: Maybe<Scalars['String']>;
  deleteImages?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id: Scalars['ID'];
  nickname?: Maybe<Scalars['String']>;
  origin_description?: Maybe<Scalars['String']>;
  real_name?: Maybe<Scalars['String']>;
  superpowers?: Maybe<Scalars['String']>;
};


export type MutationDeleteHeroArgs = {
  id: Scalars['ID'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  countHeros?: Maybe<Scalars['Int']>;
  hero?: Maybe<Hero>;
  heros?: Maybe<Array<Maybe<Hero>>>;
};


export type RootQueryTypeHeroArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeHerosArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type AddHeroMutationVariables = Exact<{
  nickname: Scalars['String'];
  realName: Scalars['String'];
  originDescription: Scalars['String'];
  superPowers: Scalars['String'];
  catchPhrase: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['Upload']>> | Maybe<Scalars['Upload']>>;
}>;


export type AddHeroMutation = { __typename?: 'Mutation', addHero?: Maybe<boolean> };

export type ChangeHeroMutationVariables = Exact<{
  id: Scalars['ID'];
  nickname?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  originDescription?: Maybe<Scalars['String']>;
  superPowers?: Maybe<Scalars['String']>;
  catchPhrase?: Maybe<Scalars['String']>;
  addImages?: Maybe<Array<Maybe<Scalars['Upload']>> | Maybe<Scalars['Upload']>>;
  deleteImages?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
}>;


export type ChangeHeroMutation = { __typename?: 'Mutation', changeHero?: Maybe<boolean> };

export type DeleteHeroMutationVariables = Exact<{
  deleteHeroId: Scalars['ID'];
}>;


export type DeleteHeroMutation = { __typename?: 'Mutation', deleteHero?: Maybe<boolean> };

export type CountHerosQueryVariables = Exact<{ [key: string]: never; }>;


export type CountHerosQuery = { __typename?: 'RootQueryType', countHeros?: Maybe<number> };

export type HeroQueryVariables = Exact<{
  heroId: Scalars['ID'];
}>;


export type HeroQuery = { __typename?: 'RootQueryType', hero?: Maybe<{ __typename?: 'Hero', id: string, createdAt: any, updatedAt: any, nickname: string, real_name: string, origin_description: string, superpowers: string, catch_phrase: string, images?: Maybe<Array<Maybe<{ __typename?: 'Image', id: string, name: string }>>> }> };

export type HerosQueryVariables = Exact<{
  herosSkip: Scalars['Int'];
  herosTake: Scalars['Int'];
}>;


export type HerosQuery = { __typename?: 'RootQueryType', heros?: Maybe<Array<Maybe<{ __typename?: 'Hero', id: string, createdAt: any, updatedAt: any, nickname: string, real_name: string, origin_description: string, superpowers: string, catch_phrase: string, images?: Maybe<Array<Maybe<{ __typename?: 'Image', id: string, name: string }>>> }>>> };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Hero: ResolverTypeWrapper<Hero>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  RootQueryType: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Hero: Hero;
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  RootQueryType: {};
  String: Scalars['String'];
  Upload: Scalars['Upload'];
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type HeroResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hero'] = ResolversParentTypes['Hero']> = ResolversObject<{
  catch_phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin_description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  real_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  superpowers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  hero?: Resolver<Maybe<ResolversTypes['Hero']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addHero?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddHeroArgs, 'catch_phrase' | 'nickname' | 'origin_description' | 'real_name' | 'superpowers'>>;
  changeHero?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeHeroArgs, 'id'>>;
  deleteHero?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteHeroArgs, 'id'>>;
}>;

export type RootQueryTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQueryType'] = ResolversParentTypes['RootQueryType']> = ResolversObject<{
  countHeros?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hero?: Resolver<Maybe<ResolversTypes['Hero']>, ParentType, ContextType, RequireFields<RootQueryTypeHeroArgs, 'id'>>;
  heros?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hero']>>>, ParentType, ContextType, RequireFields<RootQueryTypeHerosArgs, 'skip' | 'take'>>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Hero?: HeroResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  RootQueryType?: RootQueryTypeResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;



export const AddHeroDocument = gql`
    mutation AddHero($nickname: String!, $realName: String!, $originDescription: String!, $superPowers: String!, $catchPhrase: String!, $images: [Upload]) {
  addHero(
    nickname: $nickname
    real_name: $realName
    origin_description: $originDescription
    superpowers: $superPowers
    catch_phrase: $catchPhrase
    images: $images
  )
}
    `;
export type AddHeroMutationFn = Apollo.MutationFunction<AddHeroMutation, AddHeroMutationVariables>;

/**
 * __useAddHeroMutation__
 *
 * To run a mutation, you first call `useAddHeroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHeroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHeroMutation, { data, loading, error }] = useAddHeroMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      realName: // value for 'realName'
 *      originDescription: // value for 'originDescription'
 *      superPowers: // value for 'superPowers'
 *      catchPhrase: // value for 'catchPhrase'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useAddHeroMutation(baseOptions?: Apollo.MutationHookOptions<AddHeroMutation, AddHeroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHeroMutation, AddHeroMutationVariables>(AddHeroDocument, options);
      }
export type AddHeroMutationHookResult = ReturnType<typeof useAddHeroMutation>;
export type AddHeroMutationResult = Apollo.MutationResult<AddHeroMutation>;
export type AddHeroMutationOptions = Apollo.BaseMutationOptions<AddHeroMutation, AddHeroMutationVariables>;
export const ChangeHeroDocument = gql`
    mutation ChangeHero($id: ID!, $nickname: String, $realName: String, $originDescription: String, $superPowers: String, $catchPhrase: String, $addImages: [Upload], $deleteImages: [ID]) {
  changeHero(
    id: $id
    nickname: $nickname
    real_name: $realName
    origin_description: $originDescription
    superpowers: $superPowers
    catch_phrase: $catchPhrase
    addImages: $addImages
    deleteImages: $deleteImages
  )
}
    `;
export type ChangeHeroMutationFn = Apollo.MutationFunction<ChangeHeroMutation, ChangeHeroMutationVariables>;

/**
 * __useChangeHeroMutation__
 *
 * To run a mutation, you first call `useChangeHeroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeHeroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeHeroMutation, { data, loading, error }] = useChangeHeroMutation({
 *   variables: {
 *      id: // value for 'id'
 *      nickname: // value for 'nickname'
 *      realName: // value for 'realName'
 *      originDescription: // value for 'originDescription'
 *      superPowers: // value for 'superPowers'
 *      catchPhrase: // value for 'catchPhrase'
 *      addImages: // value for 'addImages'
 *      deleteImages: // value for 'deleteImages'
 *   },
 * });
 */
export function useChangeHeroMutation(baseOptions?: Apollo.MutationHookOptions<ChangeHeroMutation, ChangeHeroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeHeroMutation, ChangeHeroMutationVariables>(ChangeHeroDocument, options);
      }
export type ChangeHeroMutationHookResult = ReturnType<typeof useChangeHeroMutation>;
export type ChangeHeroMutationResult = Apollo.MutationResult<ChangeHeroMutation>;
export type ChangeHeroMutationOptions = Apollo.BaseMutationOptions<ChangeHeroMutation, ChangeHeroMutationVariables>;
export const DeleteHeroDocument = gql`
    mutation DeleteHero($deleteHeroId: ID!) {
  deleteHero(id: $deleteHeroId)
}
    `;
export type DeleteHeroMutationFn = Apollo.MutationFunction<DeleteHeroMutation, DeleteHeroMutationVariables>;

/**
 * __useDeleteHeroMutation__
 *
 * To run a mutation, you first call `useDeleteHeroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHeroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHeroMutation, { data, loading, error }] = useDeleteHeroMutation({
 *   variables: {
 *      deleteHeroId: // value for 'deleteHeroId'
 *   },
 * });
 */
export function useDeleteHeroMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHeroMutation, DeleteHeroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHeroMutation, DeleteHeroMutationVariables>(DeleteHeroDocument, options);
      }
export type DeleteHeroMutationHookResult = ReturnType<typeof useDeleteHeroMutation>;
export type DeleteHeroMutationResult = Apollo.MutationResult<DeleteHeroMutation>;
export type DeleteHeroMutationOptions = Apollo.BaseMutationOptions<DeleteHeroMutation, DeleteHeroMutationVariables>;
export const CountHerosDocument = gql`
    query CountHeros {
  countHeros
}
    `;

/**
 * __useCountHerosQuery__
 *
 * To run a query within a React component, call `useCountHerosQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountHerosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountHerosQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountHerosQuery(baseOptions?: Apollo.QueryHookOptions<CountHerosQuery, CountHerosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountHerosQuery, CountHerosQueryVariables>(CountHerosDocument, options);
      }
export function useCountHerosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountHerosQuery, CountHerosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountHerosQuery, CountHerosQueryVariables>(CountHerosDocument, options);
        }
export type CountHerosQueryHookResult = ReturnType<typeof useCountHerosQuery>;
export type CountHerosLazyQueryHookResult = ReturnType<typeof useCountHerosLazyQuery>;
export type CountHerosQueryResult = Apollo.QueryResult<CountHerosQuery, CountHerosQueryVariables>;
export const HeroDocument = gql`
    query Hero($heroId: ID!) {
  hero(id: $heroId) {
    id
    createdAt
    updatedAt
    nickname
    real_name
    origin_description
    superpowers
    catch_phrase
    images {
      id
      name
    }
  }
}
    `;

/**
 * __useHeroQuery__
 *
 * To run a query within a React component, call `useHeroQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeroQuery({
 *   variables: {
 *      heroId: // value for 'heroId'
 *   },
 * });
 */
export function useHeroQuery(baseOptions: Apollo.QueryHookOptions<HeroQuery, HeroQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeroQuery, HeroQueryVariables>(HeroDocument, options);
      }
export function useHeroLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeroQuery, HeroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeroQuery, HeroQueryVariables>(HeroDocument, options);
        }
export type HeroQueryHookResult = ReturnType<typeof useHeroQuery>;
export type HeroLazyQueryHookResult = ReturnType<typeof useHeroLazyQuery>;
export type HeroQueryResult = Apollo.QueryResult<HeroQuery, HeroQueryVariables>;
export const HerosDocument = gql`
    query Heros($herosSkip: Int!, $herosTake: Int!) {
  heros(skip: $herosSkip, take: $herosTake) {
    id
    createdAt
    updatedAt
    nickname
    real_name
    origin_description
    superpowers
    catch_phrase
    images {
      id
      name
    }
  }
}
    `;

/**
 * __useHerosQuery__
 *
 * To run a query within a React component, call `useHerosQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerosQuery({
 *   variables: {
 *      herosSkip: // value for 'herosSkip'
 *      herosTake: // value for 'herosTake'
 *   },
 * });
 */
export function useHerosQuery(baseOptions: Apollo.QueryHookOptions<HerosQuery, HerosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HerosQuery, HerosQueryVariables>(HerosDocument, options);
      }
export function useHerosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HerosQuery, HerosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HerosQuery, HerosQueryVariables>(HerosDocument, options);
        }
export type HerosQueryHookResult = ReturnType<typeof useHerosQuery>;
export type HerosLazyQueryHookResult = ReturnType<typeof useHerosLazyQuery>;
export type HerosQueryResult = Apollo.QueryResult<HerosQuery, HerosQueryVariables>;