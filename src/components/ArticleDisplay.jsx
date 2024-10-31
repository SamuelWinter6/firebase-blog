import React from "react";

export default function ArticleDisplay({ article, onBack }) {
  return (
    <div className="article-display">
      <button className="back-button" onClick={onBack}>
        Back to Articles
      </button>
      
      {/* Title */}
      <h2>{article.title}</h2>
      
      {/* Body */}
      {article.body && <p>{article.body}</p>}
      
      {/* Background Image */}
      {article.BackgroundImageUrl && (
        <div className="background-image">
          <img
            src={article.BackgroundImageUrl}
            alt="Background"
            style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        </div>
      )}
      
      {/* Gallery Images */}
      {article.Gallery && article.Gallery.length > 0 && (
        <div className="gallery">
          <h3>Gallery</h3>
          <div className="gallery-images">
            {article.Gallery.map((image, index) => (
              <div key={index} className="gallery-image">
                <img
                  src={image.url}
                  alt={image.title || `Gallery Image ${index + 1}`}
                  style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "10px" }}
                />
                <p>{image.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Comments */}
      {article.Comments && (
        <div className="comments">
          <h3>Comments</h3>
          <p>{article.Comments.content}</p>
          <p><strong>— {article.Comments.username}</strong></p>
        </div>
      )}
    </div>
  );
}
