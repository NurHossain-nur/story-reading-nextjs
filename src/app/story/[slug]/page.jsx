// app/story/[slug]/page.js

import ChapterNavigator from "@/app/components/ChapterNavigator";
import dbConnect from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function StoryPage({ params }) {
  const { slug } = await params;

  const stories = await dbConnect("stories").find({ slug }).limit(1).toArray();

  const story = stories[0];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* If no story found */}
      {!story ? (
        <div className="text-center text-gray-600 py-20">
          <p className="text-lg">❌ কোনো story পাওয়া যায়নি।</p>
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm mt-4 inline-block"
          >
            ← হোমে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          {/* Title */}
          <h1 className="text-3xl font-bold my-4">{story.title}</h1>

          {/* Author & Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            {story.author?.profileImage && (
              <Image
                src={story.author.profileImage}
                alt={story.author.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
                style={{ width: 50, height: 50 }}
              />
            )}
            <div>
              <p className="text-sm font-semibold">{story.author?.name}</p>
              <p className="text-xs text-gray-500">{story.author?.bio}</p>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-6 relative w-full aspect-[2/1] rounded-lg overflow-hidden">
            <Image
              src={story.coverImage || "/default-cover.jpg"}
              alt={story.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority // optional: faster load for main image
            />
          </div>

          {/* Summary & Meta */}
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            <p>{story.content?.summary}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
              <span>📅 {new Date(story.createdAt).toLocaleDateString()}</span>
              <span>⏱ {story.content?.readTime || "N/A"}</span>
              <span>👁 {story.views?.toLocaleString() || 0}</span>
              <span>❤️ {story.likes?.toLocaleString() || 0}</span>
              <span>
                ⭐ {story.ratings?.average?.toFixed(1) || 0} (
                {story.ratings?.count || 0})
              </span>
            </div>
          </div>

          {/* Chapters or Full Body */}
          {story.chapters?.length > 0 ? (
            <ChapterNavigator chapters={story.chapters} />
          ) : story.content?.body ? (
            <section>
              <h2 className="text-xl font-semibold mb-2">
                গল্পের সম্পূর্ণ বর্ণনা
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {story.content.body}
              </p>
            </section>
          ) : (
            <p className="text-gray-500 italic">
              গল্পের কোনো কন্টেন্ট পাওয়া যায়নি।
            </p>
          )}

          {/* Back Link */}
          <div className="mt-10">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              ← হোমে ফিরে যান
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
