import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/useProfileStore';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useGetFeedPost = () => {
  const [isLoading,setIsLoading]=useState(true);
  const {posts,setPosts}=usePostStore();
  const authUser= useAuthStore(state=>state.user)
  const {setUserProfile}=useUserProfileStore();
  const showToast=useShowToast();

  useEffect(() => {
    const getFeedPosts=async()=>{
        setIsLoading(true)
        if(authUser.following.length===0){
            setIsLoading(false)
            setPosts([])
            return
        }
        const q=query(collection(firestore,'posts'),where('createdBy',"in",authUser.following));
        try {
            const querySnapshot= await getDocs(q);
            const feedPosts=[]
            querySnapshot.forEach((doc)=>{
                feedPosts.push({id:doc.id,...doc.data()})
            })
            feedPosts.sort((a,b)=>b.createdAt - a.createdAt)
            setPosts(feedPosts);
        } catch (error) {
            showToast('Error',error.message,'error')
        }
        finally{
            setIsLoading(false)
        }
    }
    if(authUser) getFeedPosts();
  }, [showToast,authUser,setPosts,setUserProfile])
  
  return {posts,isLoading}
}

export default useGetFeedPost
