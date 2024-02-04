import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignUpEandP = () => {
    const [
        createUserWithEmailAndPassword,user,loading,error,] = useCreateUserWithEmailAndPassword(auth);
      const showToast= useShowToast();
      const loginUser= useAuthStore(state=>state.login);

    const signup= async(inputs)=>{
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullname)
        {   showToast('Error','Please enter all details','error')
            return
        }

        //fetching usernames from collection
        const userRef = collection(firestore, "users");
        //raised a query to check username is already exists.  
        const q = query(userRef, where("username", "==", inputs.username));
        const querySnapshot= await getDocs(q);

        if(!querySnapshot.empty){
            showToast('Error',"username already exits",'error');
            return
        }

        try {
            const newUser= await createUserWithEmailAndPassword(inputs.email , inputs.password)
            if(!newUser && error){
                showToast('Error',error.message,'error')
                return
            }
            if(newUser){
                const userDocs={
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullname:inputs.fullname,
                    bio:"",
                    profilePicUrl:"",
                    follower:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDocs);
                localStorage.setItem('user-info',JSON.stringify(userDocs));
                loginUser(userDocs);
            }
        } catch (error) {
            showToast('Error',error.message,'error');
            
        }
    }
  return {error,loading,signup}
}

export default useSignUpEandP
