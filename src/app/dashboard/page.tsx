"use client";
import { BlogCard } from "@/components/blogCard"
import axios from "axios";
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function Page() {
  interface Blog {
    _id: string;
    title: string;
    content: string;
    tags: Array<string>;
    videoUrl: string;
    videoPublicId: string;
    author: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  }

  const [blogs, setBlogs] = useState<Blog[]>([])
  const { toast } = useToast()
  useEffect(() => {
    axios.get("/api/get-blogs").then((res) => {
      setBlogs(res.data.blogs)
    }).catch((err) => {
      console.error(err)
      toast({
        title: err.message,
        variant: "destructive"
      })
    })
  }, [toast])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 mx-auto p-4">
      <h1 className="text-center text-4xl font-bold py-4">Explore</h1>
      <div className="flex flex-wrap justify-around gap-8 w-6/6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-6xl">
          <CarouselContent className="-ml-1 md:-ml-4">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>
    </div>
  )
}

export default Page