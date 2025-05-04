"use client";
import { useEffect, useState } from "react";

const QUOTES_BASE_URL = process.env.NEXT_PUBLIC_QUOTES_BASE_URL;

export type RandomQuoteResponse = {
  _id: string;
  content: string;
  author: string;
  tags: Array<string>;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

const useQuotes = () => {
  const [quote, setQuote] = useState<RandomQuoteResponse | null>(null);

  const fetchRandomQuote = async () => {
    const res = await fetch(`${QUOTES_BASE_URL}/random`);
    const data: RandomQuoteResponse = await res.json();
    setQuote(data);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return {
    quote,
  };
};

export default useQuotes;
