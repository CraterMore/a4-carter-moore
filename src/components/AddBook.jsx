function AddBook(props) {
    const submit = async function( event ) {
        // stop form submission from trying to load
        // a new .html page for displaying results...
        // this was the original browser behavior and still
        // remains to this day
        event.preventDefault()

        props.closeForm();
        const formData = new FormData(event.target);

        const input = {
            'title': formData.get('title'),
            'author': formData.get('author'),
            "pages": formData.get('pages'),
            "started": formData.get('started'),
            "finished": formData.get('finished'),
            "status": formData.get('status')
        };

        let body = JSON.stringify( input )

        const response = await fetch( `${import.meta.env.VITE_REACT_APP_SERVER_API_URL}/submit`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })

        const serverData = await response.json();
        console.log( 'response:', JSON.stringify(serverData) )

        props.updateTable();
    }

    return (
    <dialog id="book-form-dialog" open>
        <article>
            <header>
                <h3>
                    <strong>Add New Book</strong>
                </h3>
            </header>
            <form id="new-book-form" onSubmit={submit}>

                <fieldset>

                    <label>Title
                        <input type="text" id="title" name="title" required/>
                    </label>
                    <div className="grid">
                        <label>Author
                            <input type="text" id="author" name="author" required/>
                        </label>
                        <label>Pages
                            <input type="number" id="pages" name="pages" required/>
                        </label>
                    </div>
                    <div className="grid">
                        <label>Started
                            <input type="date" id="started" name="started"/>
                        </label>
                        <label>Finished
                            <input type="date" id="finished" name="finished"/>
                        </label>
                    </div>
                    <div className="form-row">
                        <label form="status">Status</label>
                        <select id="status" name="status" defaultValue={"read"} required>
                            <option value="read" >Read</option>
                            <option value="reading">Reading</option>
                            <option value="not-read">Not Read</option>
                        </select>
                    </div>
                    <div className="grid">
                        <button onClick={props.closeForm} id="cancel-button" className="secondary">Cancel</button>
                        <input type="submit" value="Add Book" className="submit-button"/>
                    </div>

                </fieldset>
            </form>
        </article>


    </dialog>
    );
}

export default AddBook;