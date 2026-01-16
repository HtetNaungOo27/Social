import AppLayout from "@/layouts/app-layout";

export default function Show({ post }) {
    return (
        <AppLayout>
            <div className="p-5">
                <p className="text-sm text-gray-500 my-3">{post.user.name}</p>
                <p className="my-5">{post.body}</p>
                {post.photos?.map((path,index) => (
                    <img key={index} src={`/storage/${path}`} alt="" className="h-30"/>
                ))}
            </div>
        </AppLayout>
    )
}
