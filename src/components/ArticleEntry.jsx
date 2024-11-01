import { useState } from "react";
import { uploadImage } from "../services/imageService";

export default function ArticleEntry({ addArticle }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [error, setError] = useState(null);

  async function handleBackgroundImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setBackgroundImageUrl(url);
        console.log("Background image uploaded:", url);
      } catch (error) {
        console.error("Error uploading background image:", error);
        setError("Failed to upload the background image. Please try again.");
      }
    }
  }

  async function handleGalleryImagesUpload(e) {
    const files = Array.from(e.target.files);
    try {
      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      setGalleryUrls(urls);
      console.log("Gallery images uploaded:", urls);
    } catch (error) {
      console.error("Error uploading gallery images:", error);
      setError("Failed to upload one or more gallery images. Please try again.");
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !body.trim() || !category) {
      setError("Title, body, and category must be supplied");
    } else {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      const newArticle = {
        title,
        body,
        category,
        BackgroundImageUrl: backgroundImageUrl,
        Comments: [],
        Gallery: galleryUrls.map((url, index) => ({ title: `Image ${index + 1}`, url })),
        date: formattedDate,
      };

      try {
        await addArticle(newArticle);
        console.log("Article created successfully");
      } catch (error) {
        console.error("Error creating article:", error);
        setError("Failed to create the article. Please try again.");
      }
    }
  }

  return (
    <div className="article-entry">
      <h2>Create New Article</h2>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
        />

        <label>Body</label>
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter article body"
        ></textarea>

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>Select Category</option>
          <option value="Experimental Aircraft">Experimental Aircraft</option>
          <option value="Spacecraft">Spacecraft</option>
          <option value="General Aviation">General Aviation</option>
        </select>

        <button
          type="button"
          className="button"
          onClick={() => document.getElementById('background-upload').click()}
        >
          Choose Background Image
        </button>
        <input
          id="background-upload"
          type="file"
          onChange={handleBackgroundImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <button
          type="button"
          className="button"
          onClick={() => document.getElementById('gallery-upload').click()}
        >
          Choose Gallery Images
        </button>
        <input
          id="gallery-upload"
          type="file"
          onChange={handleGalleryImagesUpload}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />

        <button className="button" type="submit">Create</button>
      </form>
    </div>
  );
}
