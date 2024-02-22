@extends('layouts.default')

@section('title', 'Edit ー Conduit')
@section('content')
    @include('layouts.form', ['action' => route('article.update', ['id' => $article->id]), 'method' => 'PUT', 'title' => $article->title, 'description' => $article->description, 'body' => $article->body]);
@endsection