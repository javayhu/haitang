import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Favorite {
    id: number;
    works_id: number;
    works_title: string;
    works_author: string;
    works_dynasty: string;
}

const FavoriteList = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // 添加loading状态

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/favorite');
                if (!response.ok) {
                    console.error('Network response was not ok');
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />加载中...</div>;
    }

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {
                favorites.map((favorite, index) => (
                    <div key={favorite.id}>
                        <a data-astro-reload
                            href={`/works/${favorite.works_id}`}
                            title={favorite.works_title}
                            className="text-sm cursor-pointer"
                        >
                            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                                <CardHeader>
                                    <CardTitle className="text-sm line-clamp-1">{favorite.works_title}</CardTitle>
                                    <CardDescription className="pt-2 text-sm line-clamp-1">
                                        {favorite.works_dynasty} - {favorite.works_author}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </a>
                    </div>
                ))
            }
        </div>
    );
};

export default FavoriteList;
