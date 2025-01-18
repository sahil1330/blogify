"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary"
import dayjs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { CarouselItem } from "./ui/carousel";
interface BlogCardProps {
    blog: {
        title: string;
        content: string;
        tags: Array<string>;
        videoUrl: string;
        videoPublicId: string;
        category: string;
        author: string
        createdAt: Date;
        updatedAt: Date;
    };
}

export function BlogCard({ blog }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);
    const getThumbnailUrl = useCallback((public_id: string) => {
        return getCldImageUrl({
            src: public_id,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video",
        });
    }, []);
    const getFullVideoUrl = useCallback((public_id: string) => {
        return getCldVideoUrl({
            src: public_id,
            width: 1920,
            height: 1080,
        });
    }, []);
    const getPreviewVideoUrl = useCallback((public_id: string) => {
        return getCldVideoUrl({
            src: public_id,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
        });
    }, []);

    const formatSize = useCallback((size: number) => {
        return filesize(size);
    }, []);

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }, []);

    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);

    const handlePreviewError = () => {
        setPreviewError(true);
    };
    return (
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {blog.title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {blog.content}
                    </CardItem>
                    <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4"
                    >
                        <Image
                            src={getThumbnailUrl(blog.videoPublicId)}
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                </CardBody>
            </CardContainer>
        </CarouselItem>
    );
}
