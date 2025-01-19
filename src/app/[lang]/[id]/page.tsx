/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CldVideoPlayer } from "next-cloudinary";
import { Loader2 } from "lucide-react";
function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const [blog, setBlog] = useState<any | null>(null);
    const [translated, setTranslated] = useState<{ title: string; content: string; transcription?: string } | null>(null);
    const [unwrappedParams, setUnwrappedParams] = useState<{ lang: string; id: string } | null>(null);

    useEffect(() => {
        params.then(setUnwrappedParams);
    }, [params]);

    useEffect(() => {
        if (!unwrappedParams) return;

        // Fetch blog data based on slug
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/${unwrappedParams.id}`);
                const blogData = response.data.blog;
                setBlog(blogData);

                // Transcribe the video if it has a videoPublicId
                if (blogData.videoPublicId) {
                    const transcriptionResponse = await axios.post("/api/transcribe", {
                        videoPublicId: blogData.videoPublicId,
                    });
                    blogData.transcription = transcriptionResponse.data.transcription;
                }
                // Translate title, content, and transcription
                
                const translation = await axios.post("/api/translate", {
                    title: blogData.title,
                    content: blogData.content,
                    transcription: blogData.transcription || "",
                    lang: unwrappedParams.lang,
                });

                setTranslated(translation.data);
            } catch (error) {
                console.error("Error fetching or translating blog:", error);
            }
        };

        fetchBlog();
    }, [unwrappedParams]);
    return (
        <Suspense fallback={<div>Loading...</div>} >
            <div className='container mx-auto p-4 md:w-5/6 w-full'>
                <h1 className='text-center text-6xl my-4 font-bold italic'>{translated?.title}</h1>
                <p className='text-2xl my-2'>{translated?.content}</p>
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
                                !translated ? (
                                    <div className='flex justify-center items-center'><Loader2 /></div>
                                ) : (
                                    <div className='text-lg my-8'>
                                        {translated.transcription && <p>{translated.transcription}</p>}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                <div className='other-lang my-10'>
                    <h2 className='text-3xl font-bold text-center'>See this post in other regional languages</h2>
                    <div className='flex gap-4'>
                        <div className='lang-card flex gap-4 justify-center items-center flex-wrap w-full my-4'>
                            {blog && <Link href={`/hi/${blog._id}`}>
                                <Button>हिन्दी</Button>
                            </Link>}
                            {blog && <Link href={`/mr/${blog._id}`}>
                                <Button>मराठी</Button>
                            </Link>}
                            {blog && <Link href={`/bn/${blog._id}`}>
                                <Button>বাংলা</Button>
                            </Link>}
                            {blog && <Link href={`/ta/${blog._id}`}>
                                <Button>தமிழ்</Button>
                            </Link>}
                            {blog && <Link href={`/te/${blog._id}`}>
                                <Button>తెలుగు</Button>
                            </Link>}
                            {blog && <Link href={`/kn/${blog._id}`}>
                                <Button>ಕನ್ನಡ</Button>
                            </Link>}
                            {blog && <Link href={`/ml/${blog._id}`}>
                                <Button>മലയാളം</Button>
                            </Link>}
                            {blog && <Link href={`/pa/${blog._id}`}>
                                <Button>ਪੰਜਾਬੀ</Button>
                            </Link>}
                            {blog && <Link href={`/gu/${blog._id}`}>
                                <Button>ગુજરાતી</Button>
                            </Link>}
                            {blog && <Link href={`/or/${blog._id}`}>
                                <Button>ଓଡ଼ିଆ</Button>
                            </Link>}
                            {blog && <Link href={`/ur/${blog._id}`}>
                                <Button>اردو</Button>
                            </Link>}
                            {blog && <Link href={`/en/${blog._id}`}>
                                <Button>English</Button>
                            </Link>}
                        
                        </div>

                    </div>
                </div>
            </div>


        </Suspense>
    )
}

export default Page