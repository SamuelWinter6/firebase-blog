import { SignIn, SignOut } from "./Auth";

export default function Header({ user, onNewArticle, showNewArticleButton }) {
  return (
    <header className="fade-in fade-in-delay-1">
      <div className="header-left">
        <h1>Aerospace / Aviation Blog</h1>
        {user && showNewArticleButton && (
          <button className="button" onClick={onNewArticle}>
            New Article
          </button>
        )}
      </div>
      <div className="auth-controls">
        {user ? <SignOut className="button" /> : <SignIn className="button" />}
      </div>
    </header>
  );
}
