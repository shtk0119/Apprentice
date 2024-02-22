@extends('layouts.default')

@section('title', 'Create ー Conduit')
@section('content')
    @include('layouts.form', ['action' => route('article.store')])
@endsection