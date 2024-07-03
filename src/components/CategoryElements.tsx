import React, { useState, useRef, useEffect } from 'react';
import CategoryList from '@/components/CategoryList';
import ElementList from '@/components/ElementList';
import type { CategoryItem, ElementsByCategoryItem } from '@/types';

interface CategoryElementsProps {
    categories: CategoryItem[],
    elementsByCategory: ElementsByCategoryItem[],
}

const CategoryElements: React.FC<CategoryElementsProps> = ({ categories, elementsByCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const elementRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

    useEffect(() => {
        categories.forEach(category => {
            if (!elementRefs.current[category.name]) {
                elementRefs.current[category.name] = React.createRef();
            }
        });
    }, [categories]);

    useEffect(() => {
        const elementRef = elementRefs.current[selectedCategory];
        if (elementRef && elementRef.current) {
            const offsetTop = elementRef.current.offsetTop;
            const offset = 98;
            window.scrollTo({
                top: offsetTop - offset,
                behavior: 'smooth',
            });
        } else {
            console.log('Element not found:', elementRef);
        }
    }, [selectedCategory]);

    const handleSelectCategory = (category: string) => {
        console.log('Selected category:', category);
        setSelectedCategory(category);
    };

    return (
        <div className="mx-auto flex flex-col md:flex-row md:gap-10">
            <div className="mt-10 md:w-1/6 md:mt-14">
                <CategoryList onSelectCategory={handleSelectCategory}
                    categories={categories} />
            </div>
            <div className="mt-10 md:w-5/6 md:mt-10">
                {elementsByCategory.map((item) => (
                    <ElementList key={item.kind.name} ref={elementRefs.current[item.kind.name]}
                        category={item.kind.name} elements={item.items} />
                ))}
            </div>
        </div>
    );
};

export default CategoryElements;
