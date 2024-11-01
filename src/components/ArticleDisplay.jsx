import React, { useState, useEffect, useRef } from "react";
import { addCommentToArticle } from "../services/articleService";
import { useAuthentication } from "../services/authService";

export default function ArticleDisplay({ article, onBack }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const user = useAuthentication();
  const commentInputRef = useRef(null);

  useEffect(() => {
    setComments(article.Comments || []);
  }, [article]);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      username: user ? user.displayName : "Anonymous",
      date: new Date().toISOString(),
    };

    try {
      const updatedComments = await addCommentToArticle(article.id, commentData);
      setComments(updatedComments);
      setNewComment("");
      if (commentInputRef.current) {
        commentInputRef.current.style.width = "auto";
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  function handleInputChange(e) {
    setNewComment(e.target.value);
    if (commentInputRef.current) {
      commentInputRef.current.style.width = `${Math.min(
        Math.max(200, e.target.value.length * 8),
        commentInputRef.current.parentElement.clientWidth
      )}px`;
    }
  }

  return (
    <div className="article-display">
      <button className="back-button" onClick={onBack}>
        Back to Articles
      </button>

      <div className="article-content-container">
        <div className="article-content">
          <h2 className="article-title">{article.title}</h2>
          <p className="article-meta">
            <span>Published on: {article.date || "Unknown Date"}</span>
            <br />
            <span>By: {article.author || "Unknown Author"}</span>
          </p>

          {article.Gallery && article.Gallery.length > 0 && (
            <div className="article-gallery">
              {article.Gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.title || `Gallery Image ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          )}

          {article.body && (
            <div className="article-body">
              <p>{article.body}</p>
            </div>
          )}
        </div>
      </div>

      <div className="comments-container">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>
                  <strong>{comment.username}:</strong> {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            ref={commentInputRef}
            rows="1"
            value={newComment}
            onChange={handleInputChange}
            placeholder="Add your comment here..."
            className="comment-input"
          ></textarea>
          <button type="submit" className="button comment-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
