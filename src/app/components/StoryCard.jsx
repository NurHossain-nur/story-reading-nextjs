import Link from "next/link";
import { readingTime } from "@/lib/utils";

export default function StoryCard({ story }) {
  return (
    <Link
      href={`/story/${story.slug}`}
      className="block bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      {/* Cover Image */}
      <img
        src={story.coverImage || "/default-cover.jpg"}
        alt={story.title || "Story cover"}
        className="w-full h-48 object-cover"
      />

      {/* Story Info */}
      <div className="p-4">
        <p className="text-sm text-pink-600 mb-1">{story.category}</p>
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
          {story.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {story.content?.summary?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <span>✍️ {story.author?.name || "Unknown Author"}</span>
          <span>⏱ {story.content?.readTime} মিনিট</span>
        </div>
        {/* Views, Likes, Ratings */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>👁 {story.views?.toLocaleString() || 0}</span>
          <span>❤️ {story.likes?.toLocaleString() || 0}</span>
          <span>⭐ {story.ratings?.average?.toFixed(1) || "0.0"} ({story.ratings?.count || 0})</span>
        </div>
      </div>
    </Link>
  );
}
