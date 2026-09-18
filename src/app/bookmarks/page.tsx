import PublicLayout from "@/components/layout/PublicLayout";
import BookmarksList from "@/components/bookmarks/BookmarksList";

export const metadata = {
  title: "Saved Articles & Reading List - ThinkBharti",
  description: "Access your saved articles and reading list on ThinkBharti.",
};

export default function BookmarksPage() {
  return (
    <PublicLayout>
      <BookmarksList />
    </PublicLayout>
  );
}

