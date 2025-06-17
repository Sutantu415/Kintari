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
  }, [searchParams]); // Include dependencies as per ESLint warning

  return (
    <PrivateRoute>
      <MainBackground>
        <Header />
        <div className="h-1/3 flex flex-col justify-center items-center">
          <Searchbar
            placeholder={"Find a story..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
          />
        </div>

        {/* Stories */}
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-full grid grid-cols-4 gap-15">
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
        </div>
      </MainBackground>
    </PrivateRoute>
  );
}
