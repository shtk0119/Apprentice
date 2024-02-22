<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return view('home', ['articles' => $articles]);
    }

    public function create()
    {
        return view('create');
    }

    public function store(StoreArticleRequest $request)
    {
        $article = new Article($request->validated());
        $article->save();
        return redirect()->route('article.index');
    }

    public function show(string $id)
    {
        $article = Article::find($id);
        return view('article', ['article' => $article]);
    }

    public function edit(string $id)
    {
        $article = Article::find($id);
        return view('edit', ['article' => $article]);
    }

    public function update(UpdateArticleRequest $request, string $id)
    {
        $article = Article::findOrFail($id);
        $updateData = $request->validated();
        $article->update($updateData);
        return redirect()->route('article.index');
    }

    public function destroy(string $id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return redirect()->route('article.index');
    }
}
