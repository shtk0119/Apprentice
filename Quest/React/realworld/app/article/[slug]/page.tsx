'use client';

import { useArticle } from '@/hooks/useArticle';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Article = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const { article, error, isLoading } = useArticle(segments[1]);

  const onArticleDeleteClick = async (slug: string) => {
    const response = await fetch(`http://localhost/api/articles/${slug}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      router.push('/');
    } else {
      return undefined;
    }
  }

  if (isLoading) {
    return (
      <div className="article-page">
        <div className="container">
          <p>...Loading</p>
        </div>
      </div>
    )
  }

  if (!article || error) {
    return (
      <div className="article-page">
        <div className="container">
          <h1>記事が見つかりません</h1>
          <p>お探しの記事は存在しないか、削除された可能性があります。</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <div className="article-meta">
              <Link href={`/editor/${article.slug}`}>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
              </Link>
              &nbsp;
              <button className="btn btn-sm btn-outline-danger" onClick={() => onArticleDeleteClick(article.slug)}>
                <i className="ion-trash-a"></i> Delete Article
              </button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>
                {article.description}
              </p>

              <p>{article.body}</p>
              <ul className="tag-list">
                {article.tagList.map((tag) =>
                  <li key={tag.name} className="tag-default tag-pill tag-outline">{tag.name}</li>
                )}
              </ul>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Article;
