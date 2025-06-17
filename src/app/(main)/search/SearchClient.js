'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStories } from "SupabaseClient";
import StoryCard from "@/components/cards/StoryCard";
import PrivateRoute from "@/components/PrivateRoute";
import Header from "@/ui/Header";
import MainBackground from "@/ui/MainBackground";
import Searchbar from "@/ui/Searchbar";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("term") || "");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const stories = await getStories(search);
      setData(stories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchParams.get("term")) {
      handleSearch();
    }
  }, [searchParams]);

  return (
    <PrivateRoute>
      <MainBackground>
        <Header />

        {/* Searchbar section */}
        <div className="pt-12 flex flex-col items-center">
          <Searchbar
            placeholder="Search Story by Country or Moral"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>

        {/* Results section */}
        <div className="w-full flex justify-center mt-12 px-6">
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.map((story) => (
                <StoryCard
                  key={story.id}
                  title={story.name}
                  color={story.color}
                  image={story.image}
                  country={story.Countries.name}
                  theme={story.Themes.name}
                />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-semibold mt-16">
              No results found.
            </h2>
          )}
        </div>
      </MainBackground>
    </PrivateRoute>
  );
}
