import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User, Post, Task } from '../types'

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['User', 'Post', 'Task'],
    endpoints: (builder) => ({
		getUsers: builder.query<User[], string>({
			query: () => `users`,
			transformResponse: (response: User[]) => 
				response
					.map(user => ({
						...user,
						email: user.email.toLowerCase(),
					}))
					.sort((a, b) => a.name.localeCompare(b.name)),
			providesTags: (result) =>
				result
					? [
						...result.map(({ id }) => ({ type: 'User' as const, id })),
						{ type: 'User', id: 'LIST' },
					]
					: [{ type: 'User', id: 'LIST' }],
		}),
		getUser: builder.query<User, string>({
			query: (userId) => `users/${userId}`,
			transformResponse: (response: User) => ({
				...response,
				email: response.email.toLowerCase(),
			}),
			providesTags: (result, error, userId) => [{ type: 'User', id: Number(userId) }],
		}),
		updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
			query: ({ id, ...patch }) => ({
				url: `users/${id}`,
				method: 'PUT',
				body: patch,
			}),
			// Optimistic update
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const listPatchResult = dispatch(
					apiService.util.updateQueryData('getUsers', '', (draft) => {
						const userIndex = draft.findIndex(user => user.id === id);
						if (userIndex !== -1) {
							Object.assign(draft[userIndex], patch);
						}
					})
				);

			const userPatchResult = dispatch(
				apiService.util.updateQueryData('getUser', String(id), (draft) => {
					Object.assign(draft, patch);
				})
			);

			try {
				await queryFulfilled;
			} catch {
				listPatchResult.undo();
				userPatchResult.undo();
			}
			},
		}),
		getUserPosts: builder.query<Post[], string>({
			query: (userId) => `posts?userId=${userId}`,
			providesTags: (result, error, userId) =>
			result
				? [
					...result.map(({ id }) => ({ type: 'Post' as const, id })),
					{ type: 'Post', id: `USER_${userId}` },
				]
				: [{ type: 'Post', id: `USER_${userId}` }],
		}),
		updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
			query: ({ id, ...patch }) => ({
				url: `posts/${id}`,
				method: 'PUT',
				body: patch,
			}),
			// Optimistic update
			async onQueryStarted({ id, userId, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiService.util.updateQueryData('getUserPosts', String(userId), (draft) => {
						const postIndex = draft.findIndex(post => post.id === id);
						if (postIndex !== -1) {
							Object.assign(draft[postIndex], patch);
						}
					})
				);

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
		deletePost: builder.mutation<void, { id: number; userId: number }>({
			query: ({ id }) => ({
				url: `posts/${id}`,
				method: 'DELETE',
			}),
			// Optimistic update
			async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
			const patchResult = dispatch(
				apiService.util.updateQueryData('getUserPosts', String(userId), (draft) => {
				const postIndex = draft.findIndex(post => post.id === id);
				if (postIndex !== -1) {
					draft.splice(postIndex, 1);
				}
				})
			);

			try {
				await queryFulfilled;
			} catch {
				patchResult.undo();
			}
			},
		}),
		getTasks: builder.query<Task[], void>({
			query: () => `todos`,
			providesTags: (result) =>
			result
				? [
					...result.map(({ id }) => ({ type: 'Task' as const, id })),
					{ type: 'Task', id: 'LIST' },
				]
				: [{ type: 'Task', id: 'LIST' }],
		}),
		updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
			query: ({ id, ...patch }) => ({
				url: `todos/${id}`,
				method: 'PUT',
				body: patch,
			}),
			// Optimistic update
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
			const patchResult = dispatch(
				apiService.util.updateQueryData('getTasks', undefined, (draft) => {
					const taskIndex = draft.findIndex(task => task.id === id);
					if (taskIndex !== -1) {
						Object.assign(draft[taskIndex], patch);
					}
				})
			);

			try {
				await queryFulfilled;
			} catch {
				patchResult.undo();
			}
			},
		}),
		getUserMap: builder.query<Record<number, string>, void>({
			query: () => `users`,
			transformResponse: (response: User[]) => 
			response.reduce((map, user) => {
				map[user.id] = user.name;
				return map;
			}, {} as Record<number, string>),
			providesTags: [{ type: 'User', id: 'MAP' }],
		}),
    }),
})


export const { 
    useGetUsersQuery, 
    useGetUserQuery,
    useUpdateUserMutation, 
    useGetUserPostsQuery, 
    useUpdatePostMutation, 
    useDeletePostMutation,
    useGetTasksQuery,
    useUpdateTaskMutation,
    useGetUserMapQuery
} = apiService
