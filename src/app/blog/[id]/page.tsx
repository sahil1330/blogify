/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from 'next/navigation';
"use client";
import axios from 'axios';
import React, { Suspense, useEffect } from 'react'
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    // const [id, setId] = React.useState<string | null>(null);
    const [blog, setBlog] = React.useState<any | null>(null);
    useEffect(() => {

        (async () => {
            const { id } = await params;
            await axios.get(`/api/blog/${id}`).then((res) => {
                setBlog(res.data.blog);
            }).catch((err) => {
                console.error(err);
            });
        })()

    }, [params]);



    return (
        <Suspense fallback={<div>Loading...</div>} >
            <div className='container mx-auto p-4 md:w-5/6 w-full'>
                <h1 className='text-center text-6xl my-4 font-bold italic'>{blog?.title}</h1>
                <p className='text-2xl my-2'>{blog?.content}</p>
                {/* <p>{blog?.videoPublicId}</p> */}
                {blog?.videoPublicId && (
                    <div>
                        <CldVideoPlayer
                            width="1920"
                            height="1080"
                            src={blog.videoPublicId}
                        />
                        <audio
                        controls
                        className="w-full mt-4"
                        src={`https://res.cloudinary.com/dncd4kbqw/video/upload/${blog.videoPublicId}.mp3`}
                    >
                        Your browser does not support the audio element.
                    </audio>
                    </div>
                )}

            </div>
        </Suspense>
    )
}

export default Page