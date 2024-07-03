import type { ElementItem } from '@/types';
import React, { forwardRef } from 'react';

interface ElementListProps {
  category: string,
  elements: ElementItem[],
}

/* bg-[#9333EA] */
const ElementList = forwardRef<HTMLDivElement, ElementListProps>(({ category, elements }, ref) => {
  return (
    <div ref={ref}>
      <div className="flex items-center mt-4 mb-4">
        <span className="bg-red-500 w-1 h-4 inline-block rounded mr-2"></span>
        <h3 className='text-lg'>{category}</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {elements.map((element, index) => (
          <div key={index} className={`${index === elements.length - 1 ? 'mb-10' : ''
            }`}>
            <a
              href={`${element.href}`}
              className="animated-underline p-1"
              {...(element.href?.includes('/works/') ? {'data-astro-reload': ''} : {})}
            >
              {element.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ElementList;
