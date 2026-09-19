import { Link } from "react-router";
import "./index.less";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}
