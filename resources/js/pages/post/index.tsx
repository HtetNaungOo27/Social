import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { Pencil, View } from 'lucide-react';

export default function Index({ posts }) {
    return (
        <AppLayout>
            <div className="p-5">
                {posts.map((post) => (
                    <div key={post.id} className="relative my-5 rounded-2xl p-5 shadow">
                        <p className="text-sm text-gray-500">{post.user.name}</p>
                        <p className="my-3">{post.body}</p>
                        {post.photos?.map((path, index) => <img src={`storage/${path}`} alt="" className="inline-block h-20" key={index}/>)}
                        <div className='absolute right-5 top-5'>
                            <Link href={route('posts.show', post)} className='inline-block mr-3'>
                                <View></View>
                            </Link>
                            <Link href={route('posts.edit', post)} className='inline-block mr-3'>
                                <Pencil></Pencil>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
