import { Link } from "react-router-dom";
import { content } from "../content";

export default function LegalBar() {
  return (
    <div className="w-full px-6 py-5 text-center text-xs opacity-55">
      <Link to="/privacy" className="underline underline-offset-4">{content.legal.privacy.title}</Link>
      <span className="mx-3">·</span>
      <Link to="/terms" className="underline underline-offset-4">{content.legal.terms.title}</Link>
    </div>
  );
}
