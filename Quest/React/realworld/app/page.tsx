'use client';

import { useArticles } from '@/hooks/useArticles';

const Home = () => {
  const { articles, error } = useArticles();

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link" href="">Your Feed</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">Global Feed</a>
                  </li>
                </ul>
              </div>

              {articles.map((article) =>
                <div key={article.slug} className="article-preview">
                  <a href={`article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {article.tagList.map((tag) =>
                        <li key={tag.name} className="tag-default tag-pill tag-outline">{tag.name}</li>
                      )}
                    </ul>
                  </a>
                </div>
              )}

              <ul className="pagination">
                <li className="page-item active">
                  <a className="page-link" href="">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="">2</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">programming</a>
                  <a href="" className="tag-pill tag-default">javascript</a>
                  <a href="" className="tag-pill tag-default">emberjs</a>
                  <a href="" className="tag-pill tag-default">angularjs</a>
                  <a href="" className="tag-pill tag-default">react</a>
                  <a href="" className="tag-pill tag-default">mean</a>
                  <a href="" className="tag-pill tag-default">node</a>
                  <a href="" className="tag-pill tag-default">rails</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;