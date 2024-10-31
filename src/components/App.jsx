import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ArticleDisplay from "./ArticleDisplay";
import ArticleEntry from "./ArticleEntry";
import { useAuthentication } from "../services/authService";
import { fetchArticles, createArticle } from "../services/articleService";
import "./App.css";

import experimentalAircraftImg from "../assets/550577.jpg";
import spacecraftImg from "../assets/nasa-space-shuttle-take-off-moon-4k-wallpaper-uhdpaper.com-206@3@a.jpg";
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
  }, [user]);

  // Use a separate `useEffect` to handle background image changes based on selectedArticle
  useEffect(() => {
    if (selectedArticle && selectedArticle.category) {
      updateBackgroundImage(selectedArticle);
    } else {
      // Only set default if no article is selected
      document.body.style.backgroundImage = `url(${defaultBackgroundImg})`;
    }
  }, [selectedArticle]); // Dependency on `selectedArticle` only

  function addArticle(articleData) {
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
    document.body.style.backgroundImage = `url(${defaultBackgroundImg})`;
  }

  function updateBackgroundImage(article) {
    let backgroundImage;
    if (article.BackgroundImageUrl) {
      backgroundImage = `url(${article.BackgroundImageUrl})`;
      console.log("Using custom background image:", backgroundImage);
    } else {
      switch (article.category) {
        case "Experimental Aircraft":
          backgroundImage = `url(${experimentalAircraftImg})`;
          break;
        case "Spacecraft":
          backgroundImage = `url(${spacecraftImg})`;
          break;
        case "General Aviation":
          backgroundImage = `url(${generalAviationImg})`;
          break;
        default:
          backgroundImage = `url(${defaultBackgroundImg})`;
      }
      console.log("Using category-based background image:", backgroundImage);
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
            <p>Please sign in to view articles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
