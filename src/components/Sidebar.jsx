export default function Sidebar({ articles, onArticleSelect, user, hide }) {
    return (
      <div className={`sidebar ${hide ? "slide-out" : ""}`}>
        {user && (
          <div>
            <h3>Articles</h3>
            {articles.map((article) => (
              <div
                key={article.id}
                className="article-list-item"
                onClick={() => onArticleSelect(article)}
              >
                {article.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  