import { ArticleComment } from "../types"

export enum FETCH_STATUS {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILURE = 'failure'
}

// usersSlice

export interface UserPublicInfo {
    username: string,
    avatar: string
}

export interface UsersPendingState {
    status: FETCH_STATUS.PENDING
}

export interface UsersSuccessState {
    status: FETCH_STATUS.SUCCESS,
    users: UserPublicInfo[]
}

export interface UsersFailureState {
    status: FETCH_STATUS.FAILURE,
    reason: string
}

export type UsersState = UsersPendingState | UsersSuccessState | UsersFailureState

// userSlice

export enum USER_STATUS {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin'
}

export interface User {
    id: string,
    username: string,
    email: string,
    avatar: string,
    about: string,
    accessToken:string,
    roles: string[]
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
}

export interface UserGuestState {
    status: USER_STATUS.GUEST
}

export interface UserUserState {
    status: USER_STATUS.USER,
    user: User
}

export interface UserAdminState {
    status: USER_STATUS.ADMIN,
    user: User
}

export type UserState = UserGuestState | UserUserState | UserAdminState

export interface UserUpdateRequest {
    email?: string,
    avatar?: string,
    about?: string,
    password?: string
}

export interface UserUpdateResponse {
    email: string,
    avatar: string,
    about: string
}

// articlesSlice

export interface ArticleFull extends Article {
}

export interface ArticleBrief extends Article {
    comments: [],
    content: ''
}

export interface Article {
    id: string,
    author: { username: string, avatar: string },
    date: Date,
    title: string,
    description: string,
    tags: string[],
    content: string,
    comments: ArticleComment[]
}

export interface ArticlesPendingState {
    status: FETCH_STATUS.PENDING,
}

export interface ArticlesSuccessState {
    status: FETCH_STATUS.SUCCESS,
    articles: Article[]
}

export interface ArticlesFailureState {
    status: FETCH_STATUS.FAILURE,
    reason: string
}

export type ArticlesState = ArticlesPendingState | ArticlesSuccessState | ArticlesFailureState