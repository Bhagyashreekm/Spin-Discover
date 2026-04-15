// API types from Public APIs (publicapi.dev)

export interface BoredActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link?: string;
  key: string;
  accessibility: number;
}

export interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

export interface QuotableQuote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface DogImage {
  message: string;
  status: string;
}

// Union type for favorite items
export type DiscoveryItem =
  | { type: 'activity'; data: BoredActivity }
  | { type: 'joke'; data: DadJoke }
  | { type: 'quote'; data: QuotableQuote }
  | { type: 'dog'; data: DogImage };
