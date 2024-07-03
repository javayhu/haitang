import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, HeartOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteButtonProps {
    works_id: number;
    works_title: string;
    works_author: string;
    works_dynasty: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ works_id, works_title, works_author, works_dynasty }) => {
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('sb-access-token='));
            if (!hasToken) {
                console.log('checkFavorite, no token');
                setIsFavorite(false);
                return;
            }

            setIsLoading(true);
            console.log('checkFavorite, works_id:', works_id);
            const response = await fetch(`/api/favorite?works_id=${works_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('checkFavorite, fail:', await response.text());
            } else {
                const data = await response.json();
                console.log('checkFavorite, success:', data);
                if (data.length > 0) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            }
            setIsLoading(false);
        };
        checkFavoriteStatus();
    }, [works_id]);

    const toggleFavorite = async () => {
        setIsLoading(true);
        if (isFavorite) {
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('sb-access-token='));
            if (!hasToken) {
                console.log('removeFavorite, no token');
                window.location.href = '/signin';
                return;
            }

            console.log('removeFavorite, works_id:', works_id);
            const response = await fetch('/api/favorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ works_id }),
            });

            if (!response.ok) {
                toast.error('操作失败，请稍后再试');
                console.error('removeFavorite, fail:', await response.text());
            } else {
                toast.success('已取消收藏！');
                setIsFavorite(!isFavorite);
                console.log('removeFavorite, success:', await response.json());
            }
        } else {
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('sb-access-token='));
            if (!hasToken) {
                console.log('addFavorite, no token');
                window.location.href = '/signin';
                return;
            }

            console.log('addFavorite, works_id:', works_id, ', works_title:', works_title);
            const response = await fetch('/api/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ works_id, works_title, works_author, works_dynasty }),
            });

            if (!response.ok) {
                toast.error('操作失败，请稍后再试');
                console.error('addFavorite, fail:', await response.text());
            } else {
                toast.success('收藏成功！');
                setIsFavorite(!isFavorite);
                console.log('addFavorite, success:', await response.json());
            }
        }
        setIsLoading(false);
    };

    return (
        <Button variant="outline" size="sm" disabled={isLoading} onClick={toggleFavorite}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : isFavorite ? (
                <>
                    <HeartOff className="mr-2 h-4 w-4" />
                    取消收藏
                </>
            ) : (
                <>
                    <Heart className="mr-2 h-4 w-4" />
                    收藏
                </>
            )}
        </Button>
    );
};

export default FavoriteButton;
