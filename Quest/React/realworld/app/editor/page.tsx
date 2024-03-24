'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import axios from 'axios';

const Create = () => {
  const router = useRouter();
  const [article, setArticle] = useState({ title: '', description: '', body: '', tagList: ['test'] });

  const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  const createArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      article
    };

    console.log(requestBody);

    http.post("/api/articles", requestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(()=>{
      router.push('/');
    });
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              <li>That title is required</li>
            </ul>

            <form onSubmit={(e) => createArticle(e)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={article.description}
                    onChange={(e) => setArticle({ ...article, description: e.target.value })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={article.body}
                    onChange={(e) => setArticle({ ...article, body: e.target.value })}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={article.tagList}
                    onChange={(e) => setArticle({ ...article, tagList: [...article.tagList, e.target.value] })}
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

export default Create