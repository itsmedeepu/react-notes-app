import { useEffect, useState } from "react";
import "../components/AddNote.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleClick = (event) => {
    if (note.title === "" || note.description === "") {
      toast.warn(" Do not leave Blank", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const newNote = { ...note, id: new Date().getTime().toString() };

    if (localStorage.getItem("notes") == undefined) {
      const firstnote = [newNote];
      localStorage.setItem("notes", JSON.stringify(firstnote));
      setAllNotes(JSON.parse(localStorage.getItem("notes")));
    } else {
      const getNote = JSON.parse(localStorage.getItem("notes"));
      getNote.unshift(newNote);
      localStorage.setItem("notes", JSON.stringify(getNote));
      setAllNotes(JSON.parse(localStorage.getItem("notes")));
    }
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNote({ ...note, [name]: value });
  };

  const [allnotes, setAllNotes] = useState([]);

  const getAllNotes = () => {
    const localNote = JSON.parse(localStorage.getItem("notes"));
    setAllNotes(localNote);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const deleteNote = (event) => {
    const conf = window.confirm("Are u sure u wanna delete this note");
    if (conf) {
      toast.success(`Note id ${event.target.value} Deleted Sucessfully!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const deletnotes = JSON.parse(localStorage.getItem("notes"));

      const filteredNotes = deletnotes.filter(
        (e) => e.id !== event.target.value
      );

      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      const localNote = JSON.parse(localStorage.getItem("notes"));
      setAllNotes(localNote);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-lg-4">
            <div className="card-header text-center">
              <h2>Add Note</h2>
            </div>
            <div className="card-body">
              <form className="form-control cl-lg-4 m-auto">
                <div className="input-control">
                  <label className="">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={note.title}
                    id="title"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="input-control">
                  <label className="">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={note.description}
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <div className="input-control">
                  <button
                    className="btn btn-sm btn-success"
                    type="button"
                    onClick={handleClick}
                  >
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          {allnotes === null ? (
            <p>No notes Found</p>
          ) : (
            allnotes.map((e) => (
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{e.title}</h5>
                    <p className="card-text">{e.description}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-sm btn-danger float-end"
                      value={e.id}
                      onClick={deleteNote}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default AddNote;
