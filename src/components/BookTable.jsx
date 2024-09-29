import StatusPicker from "./StatusPicker.jsx";
import TrashIcon from "../assets/delete.svg"

function BookTable(props) {
    const deleteBook = async function( bookId ) {
        const body = JSON.stringify({_id: bookId});

        // ?book-id=${bookId}
        const response = await fetch( `${import.meta.env.VITE_REACT_APP_SERVER_API_URL}/remove`, {
            headers: { 'Content-Type': 'application/json' },
            method:'POST',
            body
        })

        const serverData = await response.json();
        console.log( 'response:', JSON.stringify(serverData) )
        props.updateTable();
    }

    const updateBook = async function(bookId, key, value ) {

        const input = {
            '_id': bookId,
            'key': key,
            'value': value,
        };

        let body = JSON.stringify( input )

        const response = await fetch( `${import.meta.env.VITE_REACT_APP_SERVER_API_URL}/update`, {
            headers: { 'Content-Type': 'application/json' },
            method:'POST',
            body
        })

        const serverData = await response.json();
        console.log( 'response:', JSON.stringify(serverData) )
        props.updateTable();
    }

    return (
        <table id="book-table">
            <thead>
            <tr>
                <th id="head-title">Title</th>
                <th id="head-author">Author</th>
                <th id="head-pages">Pages</th>
                <th id="head-started">Started</th>
                <th id="head-finished">Finished</th>
                <th id="head-average">Average Pages/Day</th>
                <th id="head-status">Status</th>
                <th id="head-delete"></th>
            </tr>
            </thead>
            <tbody>
            {props.data && props.data.map((book) => {
                if (book.finished !== "") {
                    let finishDate = new Date(book.finished);
                    book['finished'] =  finishDate.toLocaleDateString("en-us", {year: "numeric", month: "2-digit", day: "2-digit"});
                }

                return (
                    <tr id={book["_id"]}>
                        <td>{book["title"]}</td>
                        <td>{book["author"]}</td>
                        <td>{book["pages"]}</td>
                        <td>{book["started"]}</td>
                        <td>{book["finished"]}</td>
                        <td>{book["avg-pages"] | ""}</td>
                        <td>
                            {book["status"] === "read" ? "Read" :
                                <StatusPicker status={book["status"]} updateBook={(newStatus) => {
                                    updateBook(book["_id"], "status", newStatus)
                                }}/>}
                        </td>
                        <td>
                            <button type="image" className="delete-img-wrapper"
                                    onClick={() => deleteBook(book["_id"])}>
                                <img src={TrashIcon} alt="Delete Book"/>
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default BookTable;