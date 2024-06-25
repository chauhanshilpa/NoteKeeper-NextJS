"use client";
import { useEffect, useState } from "react";
import NotesPage from "./components/NotesPage";
import { Note } from "./utils/classModels";
import AddNoteCard from "./components/AddNoteCard";
import { getNotesList } from "./utils/api";
import Navbar from "./components/Navbar";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Home() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isAddNoteClicked, setIsAddNoteClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    (async function () {
      const response = await getNotesList();
      setNotesList(response.data.newNotesList);
    })();
  }, []);

  function handleAddNoteClick() {
    const page = Math.floor(notesList.length / 6);
    if (page > currentPage) {
      handlePageNavigation(page);
    }
  }

  function handlePageNavigation(newPage: number) {
    setCurrentPage(newPage);
    router.push(`/page/${newPage}`);
  }

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className={`${notesList.length > 0 ? "fixed right-0 p-2" : ""}`}>
        <Image
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/add-a-note.png"
          alt="add-note"
          width={notesList.length > 0 ? 40 : 240}
          height={notesList.length > 0 ? 40 : 240}
          className={`bg-[#8cc055] cursor-pointer mt-5 border rounded-lg shadow-lg hover:bg-[#7CB342] ${
            notesList.length > 0 ? "mr-5 ml-2" : "m-auto mt-10"
          }`}
          onClick={() => setIsAddNoteClicked(true)}
          data-tooltip-id="add-new-note"
          data-tooltip-content="Add note"
        />
      </div>
      {isAddNoteClicked && (
        <AddNoteCard
          setIsAddNoteClicked={setIsAddNoteClicked}
          setNotesList={setNotesList}
          handleAddNoteClick={handleAddNoteClick}
        />
      )}
      <NotesPage
        notesList={notesList}
        setNotesList={setNotesList}
        currentPage={currentPage}
        handlePageNavigation={handlePageNavigation}
      />
      <Tooltip id="add-new-note" className="tooltip" />
    </>
  );
}

export default Home;
