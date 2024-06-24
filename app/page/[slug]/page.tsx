"use client";

import { useEffect, useState } from "react";
import NotesPage from "../../components/NotesPage";
import { Note } from "../../utils/classModels";
import AddNoteCard from "../../components/AddNoteCard";
import { getNotesList } from "../../utils/api";
import Navbar from "../../components/Navbar";
import { Tooltip } from "react-tooltip";
import { useRouter, useParams } from "next/navigation";

function NewDynamicPage() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isAddNoteClicked, setIsAddNoteClicked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const router = useRouter();
  const {slug} = useParams();
  const page = Number(slug);

    useEffect(() => {
      setCurrentPage(page);
      (async function () {
        const response = await getNotesList();
        setNotesList(response.data.newNotesList);
      })();
      // eslint-disable-next-line
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
        <img
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/add-a-note.png"
          alt="add-note"
          className={`bg-[#8cc055] cursor-pointer mt-5 border rounded-lg shadow-lg hover:bg-[#7CB342] ${
            notesList.length > 0 ? "mr-5 h-10 w-10 ml-2" : "h-60 m-auto mt-10"
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

export default NewDynamicPage;
