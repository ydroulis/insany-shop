import MainCategory from '@/components/MainCategory';
import React from 'react';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id: pageId } = await params
    return (
        <MainCategory pageId={pageId} />
    )
}