import axios from "axios";
import { type Note, type NewNoteData } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<NoteResponse> {
  const res = await axios.get<NoteResponse>("/notes", {
    params: { page, perPage, ...(search ? { search } : {}) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  console.log(res.data);

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
  };
}

export const createNote = async (noteData: NewNoteData) => {
  const res = await axios.post<Note>("/notes/", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNote = async (id: number) => {
  const res = await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
