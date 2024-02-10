import React from "react";
import NoteForm from "../Components/NoteForm";
import { NoteData, Tag } from "../App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availabelTags }: NewNoteProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-black text-left mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availabelTags={availabelTags} />
    </>
  );
};

export default NewNote;
