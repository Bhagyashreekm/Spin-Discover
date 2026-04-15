'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Activity, Smile, Quote, Dog } from 'lucide-react';
import type { DiscoveryType } from '@/hooks/use-discovery';
import { cn } from '@/lib/utils';

const CATEGORIES: { id: DiscoveryType; label: string; icon: React.ElementType }[] =
  [
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'joke', label: 'Dad Joke', icon: Smile },
    { id: 'quote', label: 'Quote', icon: Quote },
    { id: 'dog', label: 'Dog Pic', icon: Dog },
  ];

interface DiscoveryWheelProps {
  selectedCategory: DiscoveryType | null;
  onSelectCategory: (category: DiscoveryType) => void;
  onSpin: () => void;
  hasSelection: boolean;
}

export function DiscoveryWheel({
  selectedCategory,
  onSelectCategory,
  onSpin,
  hasSelection,
}: DiscoveryWheelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-muted-foreground">
          What do you want to discover?
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={selectedCategory === id ? 'default' : 'outline'}
            size="lg"
            onClick={() => onSelectCategory(id)}
            className={cn(
              'transition-all',
              selectedCategory === id && 'ring-2 ring-primary ring-offset-2'
            )}
          >
            <Icon className="mr-2 h-5 w-5" />
            {label}
          </Button>
        ))}
      </div>
      <Button
        size="lg"
        className="mx-auto min-w-[200px] text-lg"
        onClick={onSpin}
        disabled={!hasSelection}
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Spin & Discover
      </Button>
    </div>
  );
}
