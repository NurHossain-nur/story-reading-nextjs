// import FeaturedSlider from "@/components/FeaturedSlider";
// import StoryCard from "@/components/StoryCard";
import dbConnect, { connectDB } from "@/lib/db";
// import Story from "@/models/Story";
import StoryCard from "./components/StoryCard";

export const revalidate = 60; // ISR: refresh every 60s

// Fetch stories from DB

export default async function HomePage() {
  const stories = await dbConnect("stories")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const featuredStories = stories.filter((s) => s.featured);
  const latestStories = stories.slice(0, 12);

  // console.log(latestStories);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Featured Slider */}
      {featuredStories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🌟 নির্বাচিত গল্প
          </h2>
          {/* <FeaturedSlider stories={featuredStories} /> */}
        </section>
      )}

      {/* Latest Stories */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">📖 সর্বশেষ গল্প</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </section>
    </main>
  );
}
