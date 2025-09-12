import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, postApi } from "../utils/api";

export const usePosts = ()=>{
    const api = useApiClient();
    const queryClient = useQueryClient();

    const {
        data : postData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey:["posts"],
        queryFn:()=> postApi.getPosts(api),
        select:(response)=> response.data.posts
    });

    const likePostMutaion = useMutation({
        mutationFn:(postId:string) => postApi.likPosts(api,postId),
        onSuccess:()=>{ 
            queryClient.invalidateQueries({ queryKey:["posts"]})
            console.log("post is liked");
    }
    
})
const deletePostMutaion = useMutation({
    mutationFn:(postId:string) => postApi.deletePost(api , postId),
    onSuccess:()=>{ 
        queryClient.invalidateQueries({
            queryKey:["posts"]
        })
        queryClient.invalidateQueries({ queryKey:["userPosts"]})
        console.log("post is liked");
}
})

const checkIsLiked = (postLikes:string[] , currentUser:any)=>{
    const isLiked = currentUser && postLikes.includes(currentUser._id);
    return isLiked;
};

return {
    posts: postData || [],
    isLoading,
    error,
    refetch,
    checkIsLiked,
    toggleLike :(postId:string)=>likePostMutaion.mutate(postId),
    deletePost: (postId:string)=>deletePostMutaion.mutate(postId)
};

}