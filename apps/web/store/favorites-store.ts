import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiscoveryItem } from '@/lib/api-types';

interface FavoritesState {
  items: DiscoveryItem[];
  addFavorite: (item: DiscoveryItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

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

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (item) =>
        set((state) => {
          const id = getItemId(item);
          if (state.items.some((i) => getItemId(i) === id)) return state;
          return { items: [...state.items, item] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          items: state.items.filter((i) => getItemId(i) !== id),
        })),

      isFavorite: (id) =>
        get().items.some((item) => getItemId(item) === id),
    }),
    { name: 'spin-discover-favorites' }
  )
);
