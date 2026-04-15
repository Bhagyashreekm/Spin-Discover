'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  BoredActivity,
  DadJoke,
  QuotableQuote,
  DogImage,
} from '@/lib/api-types';
import { DiscoveryWheel } from '@/components/discovery-wheel';
import { DiscoveryResult } from '@/components/discovery-result';
import { FavoritesList } from '@/components/favorites-list';
import { useDiscovery, type DiscoveryType } from '@/hooks/use-discovery';
import type { DiscoveryItem } from '@/lib/api-types';

function mapQueryToItem(
  type: DiscoveryType,
  data: unknown
): DiscoveryItem | null {
  if (!data) return null;
  switch (type) {
    case 'activity':
      return { type: 'activity', data: data as BoredActivity };
    case 'joke':
      return { type: 'joke', data: data as DadJoke };
    case 'quote':
      return { type: 'quote', data: data as QuotableQuote };
    case 'dog':
      return { type: 'dog', data: data as DogImage };
    default:
      return null;
  }
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<DiscoveryType | null>(
    null
  );
  const [hasSpun, setHasSpun] = useState(false);

  const query = useDiscovery(
    selectedCategory,
    hasSpun && selectedCategory !== null
  );

  const discoveryItem = hasSpun && selectedCategory && query.data
    ? mapQueryToItem(selectedCategory, query.data)
    : null;

  const handleSpin = () => {
    setHasSpun(true);
    if (selectedCategory) {
      query.refetch();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Spin & Discover
          </h1>
          <p className="mt-3 text-muted-foreground">
            Feeling indecisive? Pick a category and spin for a random treat.
          </p>
        </header>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-8">
            <DiscoveryWheel
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setHasSpun(false);
              }}
              onSpin={handleSpin}
              hasSelection={selectedCategory !== null}
            />

            <div className="flex justify-center">
              <DiscoveryResult
                item={discoveryItem}
                isLoading={query.isLoading ?? false}
                isError={query.isError ?? false}
                onRefetch={() => query.refetch()}
              />
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 font-semibold">Saved Items</h3>
              <FavoritesList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
