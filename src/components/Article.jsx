export default function Article({ article }) {
  if (!article) {
    return <p>No article selected</p>;
  }

  const { title, date, body, gallery, comments } = article;
  
  return (
    <article>
      <section>
        <h2>{title}</h2>
        <p className="date">{`Posted: ${date}`}</p>
        <p className="body">{body}</p>
      </section>

      {gallery && gallery.length > 0 && (
        <section className="gallery">
          <h3>Gallery</h3>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.url} alt={image.title || "Gallery Image"} />
                {image.title && <p>{image.title}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {comments && comments.length > 0 && (
        <section className="comments-section">
          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.Username}</strong>
              <span> ({new Date(comment.timestamp).toLocaleDateString()})</span>
              <p>{comment.content}</p>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
