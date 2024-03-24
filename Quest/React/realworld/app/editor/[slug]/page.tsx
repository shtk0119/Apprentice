'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useArticle } from '@/hooks/useArticle'
import axios from 'axios';

const Edit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const { article, error, isLoading } = useArticle(segments[1]);
  const [newArticle, setNewArticle] = useState({ title: '', description: '', body: '', tagList: ['test'] });

  useEffect(() => {
    if (article) {
      setNewArticle({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: ['test']
      });
    }
  }, [article]);

  const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  const editArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      article: newArticle
    };

    console.log(requestBody);

    http.put(`/api/articles/${article?.slug}`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(()=>{
      router.push('/');
    });
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
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                <li>That title is required</li>
              </ul>
              <form onSubmit={(e) => editArticle(e)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value})}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={newArticle.description}
                      onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value})}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      value={newArticle.body}
                      onChange={(e) => setNewArticle({ ...newArticle, body: e.target.value})}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                    />
                    <div className="tag-list">
                      <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Edit