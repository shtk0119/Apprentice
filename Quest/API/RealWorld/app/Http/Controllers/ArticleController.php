<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use App\Models\Article;
use App\Http\Requests\Article\CreateRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleCollection;

class ArticleController extends Controller
{
    public function list()
    {
        $articles = Article::all();

        return new ArticleCollection($articles);
    }

    public function index(string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        return new ArticleResource($article);
    }

    public function create(CreateRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title'], '-');
        $tags = Arr::pull($validated, 'tagList');

        $article = Article::create($validated);

        if (is_array($tags)) {
            $article->syncTags($tags);
        }

        return new ArticleResource($article);
    }

    public function update(UpdateRequest $request, string $slug)
    {
        $validated = $request->validated();
        $tags = Arr::pull($validated, 'tagList');

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title'], '-');
        }

        $article = Article::where('slug', $slug)->firstOrFail();
        $article->update($validated);

        if (is_array($tags)) {
            $article->syncTags($tags);
        }

        return new ArticleResource($article);
    }

    public function delete(string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        $article->delete();

        return response('', 204);
    }
}
