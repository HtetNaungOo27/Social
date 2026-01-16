import AppLayout from '@/layouts/app-layout';
import { router, useForm } from '@inertiajs/react';

export default function Create({ post }) {
    const { data, setData, errors } = useForm({
        body: post?.body || '',
        photos: post?.photos || null,
    });

    function submit(e) {
        e.preventDefault();
        if(post) {
            // update
            router.post(route('posts.update', post), {
                _method: "PUT",
                body: data.body,
                photos: data.photos
            })
        } else {
            // store
            router.post(route('posts.store', post), {
                body: data.body,
                photos: data.photos
            })
        }
    }

    return (
        <AppLayout>
            <div className="p-5">
                <h1>{post ? "Editing Your Post" : "Let's Create New Post!"}</h1>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="body">Your Text:</label>
                        <textarea
                            name="body"
                            id="body"
                            rows={5}
                            placeholder="Enter Detail Here ... "
                            onChange={(e) => setData('body', e.target.value)}
                            value={data.body}
                            autoFocus
                        ></textarea>
                        <small>{errors.body}</small>
                    </div>
                    <div>
                        <input
                            type="file"
                            name="photos"
                            id="photos"
                            onChange={(e) => setData('photos', e.target.files ? e.target.files : null)}
                            multiple
                        />
                        {post?.photos?.map((path,index) => (
                            <img src={`/storage/${path}`} alt="" className='h-20' key={{ index }}/>
                        ))}
                        <small>{errors.photos}</small>
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
