import axios from "axios";
import { type Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  page: number,
  search?: string
): Promise<NoteResponse> {
  const res = await axios.get<NoteResponse>("/notes", {
    params: { page, perPage: 12, ...(search ? { search } : {}) },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
  };
}

export async function createNote(noteData: {
  title: string;
  content?: string;
  tag: string;
}) {
  const res = await axios.post<Note>("/notes/", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteNote(id: number) {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
