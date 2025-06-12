import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [page, setPage] = useState(1);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const perPage = 12;

  const [debouncedSearchText] = useDebounce(SearchText, 300);

  const trimmedSearch = debouncedSearchText.trim();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", page, perPage, trimmedSearch],
    queryFn: () => fetchNotes(page, perPage, trimmedSearch),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {data && !isLoading && <NoteList notes={data.notes} />}
        <SearchBox
          value={SearchText}
          onChange={(value: string) => {
            setSearchText(value);
          }}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
        {IsModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      </header>
    </div>
  );
}
