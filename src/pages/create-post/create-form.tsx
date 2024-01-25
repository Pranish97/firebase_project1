import {useForm} from "react-hook-form"
import * as yup  from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {db , auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";


interface CreateFormData {
    title:string;
    description:string;
}

export const CreateFrom = () =>{
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description:  yup.string().required("You must add a description"),
    });

    const {register, handleSubmit , formState :{errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db,"posts")

    const onCreatePost = async (data:CreateFormData) =>{
        await addDoc(postsRef,{
            ...data,
            username : user?.displayName,
            userId: user?.uid,
        })
    }
    return (
        <div className="createPost">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <p className="postTitle">Create Post</p>
                <input className="title" placeholder="Title..." {...register("title")} />
                <p style={{color:"red"}}>{errors.title?.message}</p>
                <textarea className="desc" placeholder="Description...." {...register("description")}/>
                <p style={{color:"red"}}>{errors.description?.message}</p>
                <input className="submit" type="submit"/>
            </form>
        </div>
        
    )
}