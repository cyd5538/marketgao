"use client";


import { User } from "@prisma/client";  
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentProps {
  currentUser?: User | null;
  id: string | undefined
  comments: {
    id: string;
    content: string;
    createdAt: string;
    name: string;
    profileImage: string;
    userId: string;
    postId: string;
  }[];
}

const Comment: React.FC<CommentProps> = ({ currentUser, id, comments }) => {

  return (
    <div className="mt-6 mb-6">
      <CommentForm currentUser={currentUser} id={id}/>
      <div className="mt-4 flex flex-col gap-4">
        {comments?.map((comment) => (
          <CommentList
            key={comment.id}
            id={comment.id}
            content={comment.content}
            name={comment.name}
            profileImage={comment.profileImage}
            userId={comment.userId}
            postId={comment.postId}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export default Comment
