"use client";

import { useState, useEffect } from "react";

export interface BookmarkedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  author: string;
  readTime: string;
  imageUrl: string;
  savedAt: number;
}

const STORAGE_KEY = "thinkbharti_bookmarks";

export function getStoredBookmarks(): BookmarkedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read bookmarks", err);
    return [];
  }
}

export function saveBookmark(article: Omit<BookmarkedArticle, "savedAt">): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getStoredBookmarks();
    if (current.some((b) => b.slug === article.slug)) {
      return false; // Already bookmarked
    }
    const updated = [{ ...article, savedAt: Date.now() }, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("thinkbharti_bookmarks_updated"));
    return true;
  } catch (err) {
    console.error("Failed to save bookmark", err);
    return false;
  }
}

export function removeBookmark(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getStoredBookmarks();
    const updated = current.filter((b) => b.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("thinkbharti_bookmarks_updated"));
    return true;
  } catch (err) {
    console.error("Failed to remove bookmark", err);
    return false;
  }
}

export function isBookmarked(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getStoredBookmarks();
  return current.some((b) => b.slug === slug);
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
    setIsReady(true);

    const handleUpdate = () => {
      setBookmarks(getStoredBookmarks());
    };

    window.addEventListener("thinkbharti_bookmarks_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("thinkbharti_bookmarks_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggle = (article: Omit<BookmarkedArticle, "savedAt">) => {
    if (bookmarks.some((b) => b.slug === article.slug)) {
      removeBookmark(article.slug);
    } else {
      saveBookmark(article);
    }
  };

  return {
    bookmarks,
    isReady,
    toggle,
    isBookmarked: (slug: string) => bookmarks.some((b) => b.slug === slug),
  };
}
