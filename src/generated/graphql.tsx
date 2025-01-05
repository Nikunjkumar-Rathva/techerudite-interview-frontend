import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type IAuthUser = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ICreateUser = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isAdmin: Scalars['Boolean']['input'];
  isCustomer: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type IStatusResponse = {
  __typename?: 'IStatusResponse';
  data: Scalars['String']['output'];
  msg: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authAdminUser: IStatusResponse;
  authCustomerUser: IStatusResponse;
  confirmUser: IStatusResponse;
  createUser: IStatusResponse;
};


export type MutationAuthAdminUserArgs = {
  data: IAuthUser;
};


export type MutationAuthCustomerUserArgs = {
  data: IAuthUser;
};


export type MutationConfirmUserArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationCreateUserArgs = {
  data: ICreateUser;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type CreateUserMutationMutationVariables = Exact<{
  data: ICreateUser;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type ConfirmUserMutationMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type ConfirmUserMutationMutation = { __typename?: 'Mutation', confirmUser: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AuthAdminUserMutationVariables = Exact<{
  data: IAuthUser;
}>;


export type AuthAdminUserMutation = { __typename?: 'Mutation', authAdminUser: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };


export const CreateUserMutationDocument = gql`
    mutation CreateUserMutation($data: ICreateUser!) {
  createUser(data: $data) {
    success
    msg
    data
  }
}
    `;
export type CreateUserMutationMutationFn = Apollo.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, options);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = Apollo.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export const ConfirmUserMutationDocument = gql`
    mutation ConfirmUserMutation($userId: Float!) {
  confirmUser(userId: $userId) {
    success
    msg
    data
  }
}
    `;
export type ConfirmUserMutationMutationFn = Apollo.MutationFunction<ConfirmUserMutationMutation, ConfirmUserMutationMutationVariables>;

/**
 * __useConfirmUserMutationMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutationMutation, { data, loading, error }] = useConfirmUserMutationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useConfirmUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutationMutation, ConfirmUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutationMutation, ConfirmUserMutationMutationVariables>(ConfirmUserMutationDocument, options);
      }
export type ConfirmUserMutationMutationHookResult = ReturnType<typeof useConfirmUserMutationMutation>;
export type ConfirmUserMutationMutationResult = Apollo.MutationResult<ConfirmUserMutationMutation>;
export type ConfirmUserMutationMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutationMutation, ConfirmUserMutationMutationVariables>;
export const AuthAdminUserDocument = gql`
    mutation AuthAdminUser($data: IAuthUser!) {
  authAdminUser(data: $data) {
    success
    msg
    data
  }
}
    `;
export type AuthAdminUserMutationFn = Apollo.MutationFunction<AuthAdminUserMutation, AuthAdminUserMutationVariables>;

/**
 * __useAuthAdminUserMutation__
 *
 * To run a mutation, you first call `useAuthAdminUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthAdminUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authAdminUserMutation, { data, loading, error }] = useAuthAdminUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthAdminUserMutation(baseOptions?: Apollo.MutationHookOptions<AuthAdminUserMutation, AuthAdminUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthAdminUserMutation, AuthAdminUserMutationVariables>(AuthAdminUserDocument, options);
      }
export type AuthAdminUserMutationHookResult = ReturnType<typeof useAuthAdminUserMutation>;
export type AuthAdminUserMutationResult = Apollo.MutationResult<AuthAdminUserMutation>;
export type AuthAdminUserMutationOptions = Apollo.BaseMutationOptions<AuthAdminUserMutation, AuthAdminUserMutationVariables>;