import { Link, useParams } from "react-router-dom";
import { content } from "../content";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = content.blog;
  const post = blog.posts.find((p) => p.slug === slug);

  return (
    <div className="cosmic page-top-offset">
      <Navbar />
      <main className="section" style={{ paddingTop: "2rem" }}>
        <div className="blog-article">
          <div style={{ marginBottom: "2rem" }}>
            <Link to="/blog" className="eyebrow liquid-glass">
              ← {blog.backToIndex}
            </Link>
          </div>

          {post ? (
            <article className="liquid-glass" style={{ padding: "2.5rem 2rem", borderRadius: "1.75rem" }}>
              <div className="blog-meta">
                {post.category} · {post.date}
              </div>
              <h1 className="section-title" style={{ maxWidth: "100%", marginTop: "0.5rem" }}>
                {post.title}
              </h1>

              <div className="blog-article-hero liquid-glass">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="blog-article-body">
                {post.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {post.gallery && post.gallery.length > 0 && (
                <div className="blog-gallery">
                  {post.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="blog-gallery-item liquid-glass">
                      <img
                        src={imgUrl}
                        alt={`${post.title} illustration ${idx + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ) : (
            <div className="section-head">
              <h1 className="section-title">{blog.missingTitle}</h1>
              <p className="section-sub">{blog.missingBody}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
