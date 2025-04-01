/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import blogFormSchema from "@/schema/blogFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {  useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import { Loader2 } from "lucide-react"
import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"



function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    // const user = getCurrentUser();
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
    async function onSubmit(values: z.infer<typeof blogFormSchema>) {
        // const user = getCurrentUser();
        // console.log(user)
        // // console.log(userId)
        setIsSubmitting(true);
        try {
            axios.get("/api/user").then((res) => {
                userId.current = res.data;
            })
            const tags = values.tags.split(",");
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("content", values.content);
            if (values.videoFile) {
                formData.append("videoFile", values.videoFile);
            }
            formData.append("tags", JSON.stringify(tags));
            formData.append("category", values.category);
            if (userId.current) {
                formData.append("author", userId.current);
            }
            const response = await axios.post("/api/upload-blog", formData);
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
        <div className="p-8 justify-center items-center  w-full">
            <h1 className="text-center text-3xl ">Upload Blog</h1>
            <div className="flex items-center justify-center w-full">
                <Form {...form} >
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
                                        <Input placeholder="Tags" {...field} value={field.value || ""} />
                                    </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isSubmitting ? (
                            <Button type="submit" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Upload Blog
                            </Button>
                        ) : (
                            <Button type="submit">Upload Blog</Button>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page