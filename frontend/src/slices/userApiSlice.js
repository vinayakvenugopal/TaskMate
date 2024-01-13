import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users'


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/auth` ,
               method:'POST',
               body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
               url:`${USERS_URL}/logout` ,
               method:'POST',
            })
        }),
        register:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/` ,
               method:'POST',
               body:data
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/profile` ,
               method:'PUT',
               body:data
            })
        }),
        addTodo:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/addTodo/${data.userId}` ,
               method:'POST',
               body:data
            })
        }),
        getTodo:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/getTodo/${data.userId}` ,
               method:'GET',
            })
        }),
        changeStatus:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/changeStatus/${data.todoId}` ,
               method:'PATCH',
            })
        }),
        deleteTodo:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/deleteTodo/${data.todoId}` ,
               method:'DELETE',
            })
        }),
        updateTodo:builder.mutation({
            query:(data)=>({
               url:`${USERS_URL}/updateTodo/${data.todoId}` ,
               method:'PUT',
               body:data
            })
        })

    })
})


export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation,useAddTodoMutation,
    useGetTodoMutation,useChangeStatusMutation,useDeleteTodoMutation,useUpdateTodoMutation} = userApiSlice