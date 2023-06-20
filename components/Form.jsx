import Link from "next/link";
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [tag, setTags] = useState(["coding"]);

  const handleTagInput = (newTags) => {
    setTags(newTags);
    const formattedTags = newTags.map((tag) => ({ text: tag }));
    setPost({ ...post, tag: formattedTags });
    //console.log("updated post:", post);
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type}
          {` `}Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 w-full max-w-2xl flex flex-col gap-7"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{` `}
            <span className="font-normal">
              {` `}#product,webdevelopment,idea
            </span>
          </span>
          <TagsInput
            value={tag}
            onChange={handleTagInput}
            name="tags"
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
