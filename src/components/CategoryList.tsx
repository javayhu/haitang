import React from 'react';
import type { CategoryItem } from '@/types';

interface CategoryListProps {
    categories: CategoryItem[],
    onSelectCategory: (category: string) => void,
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory }) => {
    return (
        <div className="sticky top-[98px] overflow-y-auto max-h-[90vh] pl-0 md:pb-14">
            <div className='flex flex-row flex-wrap md:flex-grow md:flex-col gap-2'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="cursor-pointer text-center font-semibold
                    text-dark dark:text-darkmode-dark
                    hover:bg-gray-100 dark:hover:bg-gray-800 
                    transition duration-150 ease-in-out
                    px-4 py-2 md:px-0 md:py-2
                    border rounded border-border dark:border-darkmode-border"
                        onClick={() => onSelectCategory(category.name)}
                    >
                        {/* {category.id} -  */}{category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
