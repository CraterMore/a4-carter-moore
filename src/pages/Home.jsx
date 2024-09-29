import AddBook from "../components/AddBook.jsx";
import {useEffect, useState} from "react";
import BookTable from "../components/BookTable.jsx";

function Home() {

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [userData, setUserData] = useState();
  const [booksRead, setBooksRead] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);

  const updateTable = async function () {
    console.log("add to table now");
      const books = await fetch( `${import.meta.env.VITE_REACT_APP_SERVER_API_URL}/get`, {
          method:'GET'
      })
          .then((data) => data.json())
          .catch((error) => console.error(error));

      setUserData(books);

      let booksRead = 0;
      let pagesRead = 0;
      for (let book of books) {
          if (book.status === "read") {
              booksRead++;
              pagesRead += Number(book.pages);
          }
      }
      setBooksRead(booksRead > 12 ? 12 : booksRead)
      setPagesRead(pagesRead)
  }

  const openBookForm = function() {
    setAddFormVisible(true);
  }

  const closeBookForm = function() {
    setAddFormVisible(false);
  }

  useEffect(() => {
    updateTable();
  }, [window])

  return (
    <div className="container">
<header>
      <div className="header-row">
          <h1 style={{margin: "auto 0"}}>
            Book Tracker
          </h1>
          <div className="goal-tracker">
            <progress id="status-bar" value={booksRead} max="12" className="status-bar"> </progress>
            <div>
              <div style={{textAlign: "right"}}>
                <strong><span id="books-read">{booksRead}</span> / <span>12</span> books </strong> read this year
              </div>
              <div style={{textAlign: "right"}}>
                <strong><span id="pages-read">{pagesRead}</span> pages</strong> read this year
              </div>
            </div>
          </div>
          
        </div>
      
    </header>

    <main>
      <BookTable data={userData} updateTable={updateTable}/>
      <button id="add-book" onClick={(event) => {openBookForm()}}>Add Book</button>
      <a role="button" href={import.meta.env.VITE_REACT_APP_SERVER_API_URL + "/logout"} className="outline secondary">Logout</a>
    </main>

      {addFormVisible ? <AddBook closeForm={closeBookForm} updateTable={updateTable}/> : <></>}

    </div>
  );
}

export default Home;
