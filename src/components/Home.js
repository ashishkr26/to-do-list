import React, { useRef, useState } from "react";

const Home = () => {
  const notesRef = useRef(""); // Use ref to access the input value
  const [notes, setNotes] = useState([]); // State to store the list of notes
  const [editIndex, setEditIndex] = useState(null); // Track which note is being edited

  const handleSave = () => {
    const newNote = notesRef.current.value; // Get the value from the input field

    if (newNote.trim() === "") return; // Prevent saving empty notes

    if (editIndex !== null) {
      // If editing, update the specific note
      setNotes((prevNotes) =>
        prevNotes.map((note, index) => (index === editIndex ? newNote : note))
      );
      setEditIndex(null); // Reset edit mode
    } else {
      // Add the new note to the notes state
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    notesRef.current.value = ""; // Clear the input field
  };

  const editNotes = (note, index) => {
    notesRef.current.value = note; // Set the input value to the selected note
    setEditIndex(index); // Set the index of the note being edited
  };

  return (
    <>
      <h2 className="bg-lime-400 text-blue-700 font-semibold text-2xl text-center p-6">
        TO-DO-LIST-APP
      </h2>
      <div className="h-screen bg-gray-200 grid grid-cols-12">
        <div className="col-span-6">
          <h4 className="text-pink-600 text-xl p-4 font-semibold">
            Write Your Notes
          </h4>
          <textarea
            rows={10}
            className="border w-full border-black m-4"
            ref={notesRef}
            style={{ padding: "5px" }}
            type="text"
            placeholder="Write Here"
          />
          <div className="mt-2 flex justify-center">
            <button
              className="px-4 py-2 bg-amber-400 rounded-md font-semibold text-white"
              onClick={handleSave}
            >
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
  
        {/* Render the list of notes */}
        <div className="col-span-6 p-4">
          <h3 className="text-xl font-semibold text-red-800 px-8">
            Your Saved Notes
          </h3>
          <ul className="mx-8 my-8 p-2 rounded-md">
            {notes.map((note, index) => (
              <li
                
                className="bg-white p-2 m-2  hover:bg-gray-100 text-lg text-blue-500 font-serif"
                key={index}
              >
                <span className="text-orange-500">{index + 1}.</span> {note}
                <span className="absolute right-3">
                  <button onClick={() => editNotes(note, index)} className="bg-yellow-400 -mt-2 p-1 rounded-lg text-gray-100">
                    Edit
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
  
};

export default Home;
