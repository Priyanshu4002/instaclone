import { useState } from 'react'
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/useProfileStore';

    const useGetPosts = () => {
    const [isLoading,setIsLoading]= useState(true);
    const {posts,setPosts}= usePostStore();
    const showToast= useShowToast();
    const userProfile = useUserProfileStore((state)=>state.userProfile);
    
    useEffect(()=>{
        const getPosts=async()=>{
            if(!userProfile) return
            setIsLoading(true)
            setPosts([])
            try {
                const q=query(collection(firestore,'posts'),where("createdBy",'==',userProfile.uid))
                const querySnapshot= await getDocs(q);

                const posts=[]
                querySnapshot.forEach((doc)=>{
                    posts.push({
                        ...doc.data(),id:doc.id
                    })
                })
                posts.sort((a,b)=> b.createdAt-a.createdAt)
                setPosts(posts);
            } catch (error) {
                showToast('Error',error.message,'error');
            }
            finally{
                setIsLoading(false)
            }
        }
        getPosts();
    },[userProfile,showToast,setPosts])

    return {isLoading,posts}
}
export default useGetPosts
