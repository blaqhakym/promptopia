"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PostListCard = ({ posts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
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
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      // console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   const debounce = setInterval(() => {
  //     if (searchText) {
  //       console.log(filteredPrompts(searchText))
  //       setPosts(filteredPrompts(searchText))
  //     }
  //   }, 500);
  //   clearInterval(debounce);
  // }, [searchText]);

  // const filteredPrompts = (searchTerm) => posts.filter(
  //     (post) => post.prompt.includes(searchTerm) || post.tag === searchTerm
  //   );

  // const handleSearchChange = (e) => {
  //   e.preventDefault()
  //   setSearchText(e.target.value);
  // };

  // const handleTagClick = (tag) => {
  //   setSearchText(tag);

  //   // const searchResult = filterPrompts(tagName);
  //   // setSearchedResults(searchResult);
  // };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
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
      {searchText ? (
        <PostListCard 
        posts={searchedResults}
        handleTagClick={handleTagClick}
        />
      ) : (
        <PostListCard posts={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
