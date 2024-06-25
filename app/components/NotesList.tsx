import { Note } from "../utils/classModels";
import NoteCard from "./NoteCard";
import { useParams } from "next/navigation";

interface Props {
  currentNotesList: Note[];
  setNotesList: React.Dispatch<React.SetStateAction<Note[]>>;
  handlePageNavigation: (newPage: number) => void;
}

const NotesList = ({
  currentNotesList,
  setNotesList,
  handlePageNavigation,
}: Props) => {
  const { slug } = useParams();

  const pinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === true
  );
  const unpinnedNotesList = currentNotesList.filter(
    (note) => note.isPinned === false
  );

  function handleNoteDeleteNavigation() {
    const currentPage = Number(slug);
    if (currentNotesList.length <= 1 && currentPage !== 0 && !isNaN(currentPage)) {
      handlePageNavigation(currentPage - 1);
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24">
      {pinnedNotesList.length > 0 && (
        <div className="w-[80%] columns-1 sm:columns-2 md:columns-3 m-auto mb-10">
          {pinnedNotesList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              setNotesList={setNotesList}
              handleNoteDeleteNavigation={handleNoteDeleteNavigation}
            />
          ))}
        </div>
      )}
      {unpinnedNotesList.length > 0 && (
        <div className="w-[80%] columns-1 sm:columns-2 md:columns-3 m-auto">
          {unpinnedNotesList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              setNotesList={setNotesList}
              handleNoteDeleteNavigation={handleNoteDeleteNavigation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
