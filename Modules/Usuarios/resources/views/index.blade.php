@extends('usuarios::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('usuarios.name') !!}</p>
@endsection
