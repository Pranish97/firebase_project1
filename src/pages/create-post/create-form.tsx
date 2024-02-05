import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateFrom = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    try {
      // Ensure that the user is authenticated
      if (user) {
        // Fetch user details to get the username
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const username = userDoc.data()?.username;

          // Add post with username to the posts collection
          const newPostRef = await addDoc(postsRef, {
            ...data,
            username: username,
            userId: user.uid,
            createdAt: new Date(), // You may want to add a timestamp
          });

          console.log("Post added with ID: ", newPostRef.id);

          navigate("/");
        } else {
          console.error("User document not found for UID:", user.uid);
        }
      } else {
        console.error("User not authenticated");
      }
    } catch (error: any) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="createPost">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <p className="postTitle">Create Post</p>
        <input className="title" placeholder="Title..." {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea className="desc" placeholder="Description...." {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
