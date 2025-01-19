/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from 'next/navigation';
"use client";
import axios from 'axios';
import React, { Suspense, useEffect } from 'react'
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { Link, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    // const [id, setId] = React.useState<string | null>(null);
    const [blog, setBlog] = React.useState<any | null>(null);
    const [transcriptionText, setTranscriptionText] = React.useState<string | null>(null);
    useEffect(() => {

        (async () => {
            const { id } = await params;
            await axios.get(`/api/blog/${id}`).then(async (res) => {
                setBlog(res.data.blog);
                if (res.data.blog) {
                    const response = await axios.post('/api/transcribe', {
                        audioUrl: `https://res.cloudinary.com/dncd4kbqw/video/upload/${res.data.blog.videoPublicId}.mp3`
                    });
                    setTranscriptionText(response.data);
                    console.log(response.data);
                }
            }).catch((err) => {
                console.error(err);
            });
            // const transcriptionText = response.data;
        })()


    }, [params]);



    return (
        <Suspense fallback={<div>Loading...</div>} >
            <div className='container mx-auto p-4 md:w-5/6 w-full'>
                <h1 className='text-center text-6xl my-4 font-bold italic'>{blog?.title}</h1>
                <p className='text-2xl my-2'>{blog?.content}</p>
                {/* <p>{blog?.videoPublicId}</p> */}
                {blog?.videoPublicId && (
                    <div className='w-full flex gap-4'>
                        <div className='w-1/2 mx-auto'>
                            <CldVideoPlayer
                                width="1920"
                                height="1080"
                                src={blog.videoPublicId}
                            />
                        </div>
                        {/* <audio
                            controls
                            className="w-full mt-4"
                            src={`https://res.cloudinary.com/dncd4kbqw/video/upload/${blog.videoPublicId}.mp3`}
                        >
                            Your browser does not support the audio element.
                        </audio> */}
                        <div className='mt-8 w-1/2 mx-auto'>
                            {
                                !transcriptionText ? (
                                    <div className='flex justify-center items-center'><Loader2 /></div>
                                ) : (
                                    <p className='text-lg my-8'>{transcriptionText}</p>
                                )
                            }
                        </div>
                    </div>
                )}
                <div className='other-lang my-10'>
                    <h2 className='text-3xl font-bold text-center'>See this post in other regional languages</h2>
                    <div className='flex gap-4'>
                        <div className='lang-card flex gap-4 justify-center items-center flex-wrap w-full my-4'>
                            <Link href={`/blog/${blog?._id}/blog-title-marathi`}><Button>मराठी</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-bengali`}><Button>বাংলা</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-tamil`}><Button>தமிழ்</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-telugu`}><Button>తెలుగు</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-kannada`}><Button>ಕನ್ನಡ</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-malayalam`}><Button>മലയാളം</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-punjabi`}><Button>ਪੰਜਾਬੀ</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-gujarati`}><Button>ગુજરાતી</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-odia`}><Button>ଓଡ଼ିଆ</Button></Link>
                            <Link href={`/blog/${blog?._id}/blog-title-urdu`}><Button>اردو</Button></Link>
                            <Link href={`/blog/${blog?._id}/`}><Button>English</Button></Link>
                        </div>

                    </div>
                </div>
            </div>


        </Suspense>


    )
}

export default Page