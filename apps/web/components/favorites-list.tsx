'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
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

export function FavoritesList() {
  const { items, removeFavorite } = useFavoritesStore();

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No favorites yet. Spin and save something you like!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const id = getItemId(item);
        return (
          <li key={id}>
            <Card>
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">
                  {item.type === 'activity' && (
                    <>
                      <Badge variant="secondary" className="mb-1 text-xs">
                        Activity
                      </Badge>
                      <p className="text-sm">{item.data.activity}</p>
                    </>
                  )}
                  {item.type === 'joke' && (
                    <>
                      <Badge variant="secondary" className="mb-1 text-xs">
                        Joke
                      </Badge>
                      <p className="text-sm">{item.data.joke}</p>
                    </>
                  )}
                  {item.type === 'quote' && (
                    <>
                      <Badge variant="secondary" className="mb-1 text-xs">
                        Quote
                      </Badge>
                      <p className="text-sm italic">&ldquo;{item.data.content}&rdquo;</p>
                      <p className="text-xs text-muted-foreground">
                        — {item.data.author}
                      </p>
                    </>
                  )}
                  {item.type === 'dog' && (
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={item.data.message}
                          alt="Saved dog"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <Badge variant="secondary">Dog Pic</Badge>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFavorite(id)}
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
