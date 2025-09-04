import MainCategory from '@/components/MainCategory';
import React from 'react';

const CategoryPage: React.FC<{ params: { id: string } }> = ({ params }) => {
    const pageId = params.id

    return (
        <MainCategory id={pageId} />
    );
}

export default CategoryPage;