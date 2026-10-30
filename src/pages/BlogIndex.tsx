import { Link } from "react-router-dom";
import { content } from "../content";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogIndexPage() {
  const blog = content.blog;
  return (
    <div className="cosmic page-top-offset">
      <Navbar />
      <main className="section" style={{ paddingTop: "2rem" }}>
        <div className="section-head">
          <span className="eyebrow liquid-glass">Fresh from the Ministry</span>
          <h1 className="section-title" style={{ maxWidth: "44rem" }}>
            {blog.title}
          </h1>
          <p className="section-sub">{blog.intro}</p>
        </div>

        <div className="blog-list">
          {blog.posts.map((post) => (
            <article key={post.slug} className="blog-item liquid-glass">
              <Link to={"/blog/" + post.slug} className="blog-thumb">
                <img src={post.image} alt={post.title} loading="lazy" />
              </Link>
              <div>
                <div className="blog-meta">
                  {post.category} · {post.date}
                </div>
                <h2>
                  <Link to={"/blog/" + post.slug}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Link
                  to={"/blog/" + post.slug}
                  className="cta-primary liquid-glass-strong"
                >
                  {blog.readMore}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
