// components/ChapterNavigator.js
"use client";

import { useState } from "react";

export default function ChapterNavigator({ chapters }) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const totalChapters = chapters.length;
  const chapter = chapters[currentChapter];

  return (
    <section>
      {/* Chapter Content */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold mb-2">
          অধ্যায় {chapter.chapterNumber}: {chapter.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {chapter.content}
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between items-center gap-4">
        <button
          onClick={() => setCurrentChapter((prev) => Math.max(prev - 1, 0))}
          disabled={currentChapter === 0}
          className="text-sm px-4 py-2 border rounded disabled:opacity-30"
        >
          ← পূর্ববর্তী অধ্যায়
        </button>

        <span className="text-xs text-gray-500">
          {currentChapter + 1} / {totalChapters}
        </span>

        <button
          onClick={() =>
            setCurrentChapter((prev) => Math.min(prev + 1, totalChapters - 1))
          }
          disabled={currentChapter === totalChapters - 1}
          className="text-sm px-4 py-2 border rounded disabled:opacity-30"
        >
          পরবর্তী অধ্যায় →
        </button>
      </div>
    </section>
  );
}
