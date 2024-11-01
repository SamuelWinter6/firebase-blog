import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ArticleDisplay from "./ArticleDisplay";
import ArticleEntry from "./ArticleEntry";
import { useAuthentication } from "../services/authService";
import { fetchArticles, createArticle } from "../services/articleService";
import "./App.css";

import experimentalAircraftImg from "../assets/550577.jpg";
import spacecraftImg from "../assets/24663-2880x1800-desktop-hd-space-shuttle-wallpaper-photo.jpg";
import generalAviationImg from "../assets/e742kp1k2vl51.png";
import defaultBackgroundImg from "../assets/nasa-space-shuttle-take-off-moon-4k-wallpaper-uhdpaper.com-206@3@a.jpg";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const user = useAuthentication();

  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles);
    }

    if (selectedArticle) {
      document.body.classList.add("article-selected");
      updateBackgroundImage(selectedArticle);
    } else {
      document.body.classList.remove("article-selected");
      document.body.style.backgroundImage = `url(${defaultBackgroundImg})`;
    }

    return () => document.body.classList.remove("article-selected");
  }, [user, selectedArticle]);

  function addArticle(articleData) {
    if (user) {
      articleData.author = user.displayName || "Anonymous";
    }

    createArticle(articleData).then((newArticle) => {
      setArticles([newArticle, ...articles]);
      setSelectedArticle(newArticle);
      setWriting(false);
      updateBackgroundImage(newArticle);
    });
  }

  function handleArticleSelect(article) {
    setSelectedArticle(article);
    setWriting(false);
    updateBackgroundImage(article);
  }

  function handleBack() {
    setSelectedArticle(null);
    setWriting(false);
    document.body.classList.remove("article-selected");
    document.body.style.backgroundImage = `url(${defaultBackgroundImg})`;
  }

  function updateBackgroundImage(article) {
    let backgroundImage;
    switch (article.category) {
      case "Experimental Aircraft":
        backgroundImage = `url(${defaultBackgroundImg})`;
        break;
      case "Spacecraft":
        backgroundImage = `url(${defaultBackgroundImg})`;
        break;
      case "General Aviation":
        backgroundImage = `url(${defaultBackgroundImg})`;
        break;
      default:
        backgroundImage = `url(${defaultBackgroundImg})`;
    }
    document.body.style.backgroundImage = backgroundImage;
  }

  return (
    <div className="App fade-in">
      <Header
        user={user}
        onNewArticle={() => setWriting(true)}
        showNewArticleButton={!selectedArticle && !writing}
      />

      <div className={`main-content ${writing ? "hide-sidebar" : ""}`}>
        <Sidebar
          articles={articles}
          onArticleSelect={handleArticleSelect}
          user={user}
          hide={writing}
        />

        <div className="article-area">
          {user ? (
            writing ? (
              <>
                <button className="back-button" onClick={handleBack}>
                  Back to Articles
                </button>
                <ArticleEntry addArticle={addArticle} />
              </>
            ) : selectedArticle ? (
              <ArticleDisplay article={selectedArticle} onBack={handleBack} />
            ) : (
              <p>Please select an article to view or create a new one.</p>
            )
          ) : (
            <p>Please sign in to view and create articles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
