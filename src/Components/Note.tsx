import React from "react";
import { useNote } from "../Pages/NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkDown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();

  const navigate = useNavigate();
  return (
    <div className="space-y-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-black">{note.title}</h1>
          <div className="flex items-center flex-wrap gap-3">
            {note.tags.length > 0 &&
              note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="w-auto bg-blue-500 p-1 active:scale-90 transition-all text-white text-center rounded-lg"
                >
                  {tag.label}
                </span>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/${note.id}/edit`}>
            <button className="w-auto bg-blue-500 p-2 active:scale-90 transition-all text-white text-center rounded-lg">
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("..");
            }}
            className="w-auto border p-2 active:scale-90 transition-all text-red-500 text-center rounded-lg"
          >
            Delete
          </button>
          <Link to="..">
            <button className="w-auto border p-2 active:scale-90 transition-all text-black text-center rounded-lg">
              Back
            </button>
          </Link>
        </div>
      </div>

      {/* <ReactMarkDown>{note.markDown}</ReactMarkDown> */}
      <div>{note.markDown}</div>
      {/* <div className="w-full"></div> */}

      {/* <div className="w-full flex justify-between items-center gap-3">
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
      </div> */}
    </div>
  );
};

export default Note;
