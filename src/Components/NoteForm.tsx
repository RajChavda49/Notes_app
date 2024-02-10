import React, { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availabelTags,
  title = "",
  markDown = "",
  tags = [],
}: NoteFormProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markDown: titleRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-2 place-items-start gap-5 items-start"
    >
      <div className="space-y-2 w-full">
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          ref={titleRef}
          placeholder="Type here..."
          className="w-full outline-none border rounded-lg p-2 focus:ring-2 ring-offset-2 ring-green-500"
          required
          defaultValue={title}
        />
      </div>
      <div className="space-y-2 w-full">
        <label htmlFor="Title">Tags</label>
        <CreatableReactSelect
          onCreateOption={(label) => {
            const newTag = { id: uuidv4(), label };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
          required
          isMulti
          className="focus:ring-2 ring-offset-2 ring-green-500"
          value={selectedTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          options={availabelTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
        />
      </div>
      <div className="space-y-2 w-full col-span-2">
        <label htmlFor="Title">Body</label>
        <textarea
          ref={markDownRef}
          placeholder="Type here..."
          className="w-full outline-none border rounded-lg p-2 focus:ring-2 ring-offset-2 ring-green-500"
          required
          rows={10}
          cols={5}
          defaultValue={markDown}
        />{" "}
      </div>
      <div className="w-full col-span-2 flex items-center gap-2 justify-end">
        <button
          type="submit"
          className="w-1/6 bg-blue-500 p-2 active:scale-90 transition-all text-white text-center rounded-lg"
        >
          Save
        </button>
        <Link to=".." className="w-1/6">
          <button
            type="button"
            className="w-full bg-gray-300 p-2 active:scale-90 transition-all text-white text-center rounded-lg"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
