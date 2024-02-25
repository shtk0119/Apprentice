<?php

namespace Tests\Unit\Http\Requests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreArticleRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_validation(): void
    {
        $response = $this->post('/article', ['title' => '', 'description' => '', 'body' => '']);

        $response->assertInvalid(['title', 'description', 'body']);
    }

    public function test_non_empty_validation(): void
    {
        $response = $this->post('/article', ['title' => 'Test Title', 'description' => 'Test Description', 'body' => 'Test Body']);

        $response->assertValid(['title', 'description', 'body']);
    }
}
