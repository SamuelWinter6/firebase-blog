import React from "react";

export default function ArticleDisplay({ article, onBack }) {
  return (
    <div className="article-display">
      <button className="back-button" onClick={onBack}>
        Back to Articles
      </button>

      {/* Title */}
      <h2 className="article-title">{article.title}</h2>

      {/* Timestamp and Author */}
      <p className="article-meta">
        <span>Published on: {new Date(article.timestamp).toLocaleDateString()}</span>
        <br />
        <span>By: {article.author || "Unknown Author"}</span>
      </p>

      {/* Gallery Images */}
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

      {/* Body */}
      {article.body && (
        <div className="article-body">
          <p>{article.body}</p>
        </div>
      )}

      {/* Comments */}
      {article.Comments && (
        <div className="article-comments">
          <h3>Comments</h3>
          <p>{article.Comments.content}</p>
          <p><strong>— {article.Comments.username}</strong></p>
        </div>
      )}
    </div>
  );
}
