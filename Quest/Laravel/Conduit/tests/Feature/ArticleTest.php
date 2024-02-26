<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Article;

class ArticleTest extends TestCase
{   
    use RefreshDatabase;

    public function test_root_returns_a_successful_response(): void
    {
        $response = $this->get(route('article.index'));

        $response->assertSuccessful();
    }

    public function test_create_returns_a_successful_response(): void
    {
        $response = $this->get(route('article.create'));

        $response->assertSuccessful();
    }

    public function test_show_returns_a_successful_response(): void
    {
        $article = Article::factory()->create();

        $response = $this->get(route('article.show', ['id' => $article->id]));

        $response->assertSuccessful();
    }

    public function test_edit_returns_a_successful_response(): void
    {
        $article = Article::factory()->create();

        $response = $this->get(route('article.show', ['id' => $article->id]));

        $response->assertSuccessful();
    }
}
