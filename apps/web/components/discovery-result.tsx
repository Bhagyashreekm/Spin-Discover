'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';
import type { DiscoveryItem } from '@/lib/api-types';
import { useFavoritesStore } from '@/store/favorites-store';

function getItemId(item: DiscoveryItem): string {
  switch (item.type) {
    case 'activity':
      return `activity-${item.data.key}`;
    case 'joke':
      return `joke-${item.data.id}`;
    case 'quote':
      return `quote-${item.data._id}`;
    case 'dog':
      return `dog-${item.data.message.split('/').pop() ?? ''}`;
  }
}

interface DiscoveryResultProps {
  item: DiscoveryItem | null;
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
}

export function DiscoveryResult({
  item,
  isLoading,
  isError,
  onRefetch,
}: DiscoveryResultProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md animate-bounce-in">
        <CardContent className="pt-6">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="mt-4 h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md border-destructive/50">
        <CardContent className="pt-6">
          <p className="text-destructive">
            Oops! Failed to fetch. Try spinning again.
          </p>
          <Button onClick={onRefetch} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!item) return null;

  const id = getItemId(item);
  const favorited = isFavorite(id);

  const handleToggleFavorite = () => {
    if (favorited) removeFavorite(id);
    else addFavorite(item);
  };

  return (
    <Card className="w-full max-w-md animate-bounce-in">
      <CardContent className="pt-6">
        {item.type === 'activity' && (
          <div>
            <Badge variant="secondary" className="mb-2">
              {item.data.type}
            </Badge>
            <p className="text-lg font-medium">{item.data.activity}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              For {item.data.participants} participant
              {item.data.participants > 1 ? 's' : ''} •{' '}
              {item.data.price === 0 ? 'Free' : 'Paid'}
            </p>
          </div>
        )}
        {item.type === 'joke' && (
          <div>
            <Badge variant="secondary" className="mb-2">
              Dad Joke
            </Badge>
            <p className="text-lg">{item.data.joke}</p>
          </div>
        )}
        {item.type === 'quote' && (
          <div>
            <Badge variant="secondary" className="mb-2">
              Quote
            </Badge>
            <p className="text-lg italic">&ldquo;{item.data.content}&rdquo;</p>
            <p className="mt-2 text-sm text-muted-foreground">
              — {item.data.author}
            </p>
          </div>
        )}
        {item.type === 'dog' && (
          <div className="overflow-hidden rounded-lg">
            <Badge variant="secondary" className="mb-2">
              Dog Pic
            </Badge>
            <div className="relative aspect-square w-full">
              <Image
                src={item.data.message}
                alt="Random dog"
                fill
                className="rounded-lg object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant={favorited ? 'default' : 'outline'}
          size="sm"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${favorited ? 'fill-current' : ''}`}
          />
          {favorited ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outline" size="sm" onClick={onRefetch}>
          Spin Again
        </Button>
      </CardFooter>
    </Card>
  );
}
