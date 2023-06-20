"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "@utils/Loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    //https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    /*
    Debouncing is a technique used to filter out noise or rapid changes in a signal, typically in input devices like buttons or switches. The debounce method ensures that the event triggered by the input device is only registered after a stable state has been reached.
    Here's an example JavaScript debounce method:

    function debounce(func, delay) {
        let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
     };
    }

    This debounce function takes two parameters: func which is the function to be debounced, and delay which is the time in milliseconds to wait for the input device to settle before triggering the event.

    The returned function uses setTimeout to wait for the specified delay before calling the original function passed as func. If another input event is triggered during this waiting period, the timeoutId is cleared and the timer starts again.

     In this way, the debounce function ensures that the original function is only called once, after a certain period of stability.
     */
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <Loading />
      ) : searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
