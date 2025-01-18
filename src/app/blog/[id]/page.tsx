// import { useParams } from 'next/navigation';
import React from 'react'

async function page({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return (
        <div>{id}</div>
    )
}

export default page