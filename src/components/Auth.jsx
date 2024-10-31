import { login, logout, loggedInUserDisplayName } from "../services/authService";

export function SignIn({ className }) {
    return <button onClick={login} className={className}>Sign In</button>;
}

export function SignOut({ className }) {
    return (
        <div className="auth-controls">
            Hello, {loggedInUserDisplayName()}
            <button onClick={logout} className={className}>Sign Out</button>
        </div>
    );
}
