import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tag } from "../App";

type SimplifiedNotes = {
  tags: Tag[];
  title: string;
  id: string;
};
type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="space-y-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-black">Notes</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/new">
            <button className="w-auto bg-blue-500 p-2 active:scale-90 transition-all text-white text-center rounded-lg">
              Create
            </button>
          </Link>
          {/* <button className="w-auto border p-2 active:scale-90 transition-all text-black text-center rounded-lg">
            Edit Tags
          </button> */}
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-3">
        <div className="space-y-2 w-1/2">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full outline-none border rounded-lg p-2 focus:ring-2 ring-offset-2 ring-green-500"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2 w-1/2">
          <label htmlFor="Title">Tags</label>
          <ReactSelect
            // onCreateOption={(label) => {
            //   const newTag = { id: uuidv4(), label };
            //   onAddTag(newTag);
            //   setSelectedTags((prev) => [...prev, newTag]);
            // }}
            required
            isMulti
            className="focus:ring-2 ring-offset-2 ring-green-500"
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
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
      </div>
      <div className="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start items-start gap-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>
    </div>
  );
};

function NoteCard({ id, title, tags }: SimplifiedNotes) {
  return (
    <Link
      to={`/${id}`}
      className={`h-full text-black rounded-lg w-full border hover:-translate-y-3 hover:shadow-lg transition-all duration-100 p-3 ease-in-out`}
    >
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <p className="text-3xl font-semibold">{title}</p>
        <div className="flex items-center gap-3 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-500 rounded-lg p-1 text-white"
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default NoteList;
