<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('post/index', [
            'posts' => Post::with('user')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('post/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required',
            'photos' => ['nullable', 'array'],
        ]);

        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('posts');
                $photoPaths[] = $path;
            }
        }

        $validated['photos'] = $photoPaths;

        // $validated['user_id'] = Auth::id();
        // Post::create($validated);
        // <OR>
        Auth::user()->posts()->create($validated);
        return redirect()->route('posts.index')->with('success', "Post Created Successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('post/show', [
            'post' => $post->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('post/create', [
            'post' => $post->load('user')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'body' => 'required',
            'photos' => ['nullable', 'array'],
        ]);

        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('posts');
                $photoPaths[] = $path;
            }
            $validated['photos'] = $photoPaths;
        }

        $post->update($validated);

        return redirect()->route('posts.index')->with('success', "Post Updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
