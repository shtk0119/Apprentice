<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge($this->get('article'));
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required_without_all:body,description'],
            'description' => ['required_without_all:title,body'],
            'body' => ['required_without_all:title,description'],
            'tagList' => ['sometimes', 'array'],
            'tagList.*' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
