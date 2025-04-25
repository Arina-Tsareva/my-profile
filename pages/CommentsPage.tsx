import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios"; //используется для выполнения HTTP-запросов
import styles from "../styles/CommentsPage.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Интерфейс Comment
interface Comment {
  id: string;
  author: string;
  email: string;
  image?: string;
  text: string;
  rating: number;
  createdAt: string;
  replies: Comment[]; 
  parentId?: string | null;
  liked?: boolean;
  disliked?: boolean;
}

export default function CommentsPage() {
  const { data: session } = useSession(); //содержит информацию о текущей сессии пользователя, полученную через next-auth
  const [comments, setComments] = useState<Comment[]>([]); //состояние для хранения всех комментариев
  const [newComment, setNewComment] = useState(""); //состояние для хранения текста нового комментария
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({}); //объект, где ключами являются ID комментариев, а значениями — тексты ответов на эти комментарии


  // Загрузка комментариев
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/comments");
        const normalized = res.data.map((comment: Comment) => ({
          ...comment,
          replies: Array.isArray(comment.replies) ? comment.replies : [],
        }));
        setComments(normalized);
      } catch (error) {
        console.error("Ошибка загрузки комментариев:", error);
      }
    };

    fetchComments();
  }, []);

  // Отправка нового комментария
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post("/api/comments", {
        text: newComment,
        rating: 0,
      });
      setComments([
        ...comments,
        {
          ...res.data,
          replies: [],
          liked: false,
          disliked: false,
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    }
  };

  // Ответы на комментарии
  const handleReply = async (parentId: string) => {
    const text = replyText[parentId];
    if (!text?.trim()) return;

    try {
      const res = await axios.post("/api/comments/reply", {
        parentId,
        text,
        rating: 0,
      });

      const newReply = {
        ...res.data,
        replies: [],
        liked: false,
        disliked: false,
      };

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );
      setReplyText((prev) => ({ ...prev, [parentId]: "" }));
    } catch (error) {
      console.error("Ошибка при отправке ответа:", error);
    }
  };

  // Реакции (лайки/дизлайки)
  const handleReaction = async (commentId: string, type: "like" | "dislike") => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: type === "like",
              disliked: type === "dislike",
              rating: comment.rating + (type === "like" ? 1 : -1),
            }
          : comment
      )
    );

    try {
      await axios.post("/api/comments/like-dislike", {
        commentId,
        type,
      });
    } catch (error) {
      console.error("Ошибка при отправке лайка/дизлайка:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.greeting}>
        Привет! Здесь ты можешь оставить свой комментарий, ответить на чужой и оценить мнения других 💬
      </div>
      <h1 className={styles.title}>Комментарии</h1>

      <textarea
        className={styles.textarea}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Напиши свой комментарий..."
      />
      <button className={styles.submitButton} onClick={handleCommentSubmit}>
        Отправить
      </button>

      <div className={styles.commentsList}>
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                {comment.author}{" "}
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <div className={styles.commentText}>{comment.text}</div>
              <div className={styles.reactions}>
                <button
                  onClick={() => handleReaction(comment.id, "like")}
                  disabled={comment.liked || comment.disliked}
                >
                  <FaThumbsUp /> {comment.rating >= 0 ? comment.rating : 0}
                </button>
                <button
                  onClick={() => handleReaction(comment.id, "dislike")}
                  disabled={comment.liked || comment.disliked}
                >
                  <FaThumbsDown /> {comment.rating < 0 ? Math.abs(comment.rating) : 0}
                </button>
              </div>
              <div className={styles.replies}>
                {Array.isArray(comment.replies) &&
                  comment.replies.map((reply) => (
                    <div key={reply.id} className={styles.reply}>
                      <div className={styles.replyAuthor}>{reply.author}</div>
                      <div>{reply.text}</div>
                    </div>
                  ))}

                <div className={styles.replyForm}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Ответить..."
                    value={replyText[comment.id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className={styles.submitButton}
                    onClick={() => handleReply(comment.id)}
                  >
                    Ответить
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
