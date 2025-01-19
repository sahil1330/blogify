/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


const blogFormSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.string().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    videoFile: z.instanceof(File).refine((file) => file.size < 100000000, {
        message: "File size must be less than 100MB.",
    }).optional(),
});
function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [blog, setBlog] = useState<any | null>(null);
    const userId = React.useRef<string | undefined>(undefined);
    const form = useForm<z.infer<typeof blogFormSchema>>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: "",
            videoFile: undefined,
            category: "",
        },
    })
    useEffect(() => {

        (async () => {
            const { id } = params;
            const response = await axios.get('/api/user');
            userId.current = response.data;
            console.log(userId.current);
            await axios.get(`/api/blog?id=${id}`).then(
                res => {
                    setBlog(res.data.blog);
                    form.setValue('title', res.data.blog.title);
                    form.setValue('content', res.data.blog.content);
                    form.setValue('tags', res.data.blog.tags.join(','));
                    form.setValue('category', res.data.blog.category);
                }
            ).catch((err) => {
                console.error(err);
            }
            )
        })()
    }, [form, params])
    async function onSubmit(values: z.infer<typeof blogFormSchema>) {
        // const user = getCurrentUser();
        // console.log(user)
        // // console.log(userId)
        const { id } = await  params;
        setIsSubmitting(true);
        try {
            const tags = (values.tags || "").split(",");
            const formData = new FormData();
            formData.append("title", values.title || "");
            formData.append("content", values.content || "");
            if (values.videoFile) {
                formData.append("videoFile", values.videoFile);
            }
            formData.append("tags", JSON.stringify(tags));
            formData.append("category", values.category || "");
            if (userId) {
                formData.append("author", userId.current || '');
            }
            const response = await axios.post(`/api/edit-blog?id=${id}`, formData);
            toast({
                title: response.data.message,
            });
            router.push('/')
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message;
            toast({
                title: errorMessage,
                variant: "destructive",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    }
    const { toast } = useToast();


    return (
        <div>
            <h1 className='text-4xl font-bold text-center'>Edit Blog</h1>
            <div className="flex items-center justify-center w-full">
                {blog ? (<Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Blog Title" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="message">Blog Content</Label>
                                        <Textarea placeholder="Enter your Blog Content here." {...field} value={field.value || ""} id="message" />
                                    </div>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="videoFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Import Video File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                field.onChange(e.target.files?.[0]);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isSubmitting ? (
                            <Button type="submit" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Edit Blog
                            </Button>
                        ) : (
                            <Button type="submit">Edit Blog</Button>
                        )}
                    </form>
                </Form>) : (<div className='flex justify-center items-center'><Loader2 className="animate-spin 4s" /></div>)}
            </div>
        </div>
    )
}

export default Page