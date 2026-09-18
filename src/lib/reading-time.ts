/**
 * Calculates estimated reading time for given HTML or plain text content.
 * Average reading speed: 200 words per minute.
 */
export function calculateReadTime(content?: string | null, wordsPerMinute = 200): string {
  if (!content) return "1 min";

  // Strip HTML tags and normalize whitespace
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText.length > 0 ? plainText.split(" ").length : 0;

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${Math.max(1, minutes)} min`;
}
