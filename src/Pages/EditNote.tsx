import React from "react";
import NoteForm from "../Components/NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availabelTags }: EditNoteProps) => {
  const note = useNote();

  return (
    <>
      <h1 className="text-4xl font-bold text-black text-left mb-4">New Note</h1>
      <NoteForm
        title={note.title}
        markDown={note.markDown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availabelTags={availabelTags}
      />
    </>
  );
};

export default EditNote;
