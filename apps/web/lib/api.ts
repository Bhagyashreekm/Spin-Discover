import type {
  BoredActivity,
  DadJoke,
  QuotableQuote,
  DogImage,
} from './api-types';

const BORED_API = 'https://www.boredapi.com/api/activity/';
const DAD_JOKE_API = 'https://icanhazdadjoke.com/';
const QUOTABLE_API = 'https://api.quotable.io/random';
const DOG_CEO_API = 'https://dog.ceo/api/breeds/image/random';

export async function fetchRandomActivity(): Promise<BoredActivity> {
  const res = await fetch(BORED_API);
  if (!res.ok) throw new Error('Failed to fetch activity');
  return res.json();
}

export async function fetchRandomJoke(): Promise<DadJoke> {
  const res = await fetch(DAD_JOKE_API, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch joke');
  return res.json();
}

export async function fetchRandomQuote(): Promise<QuotableQuote> {
  const res = await fetch(QUOTABLE_API);
  if (!res.ok) throw new Error('Failed to fetch quote');
  return res.json();
}

export async function fetchRandomDog(): Promise<DogImage> {
  const res = await fetch(DOG_CEO_API);
  if (!res.ok) throw new Error('Failed to fetch dog image');
  return res.json();
}
