import {useState} from "react";

function StatusPicker(props) {
    const [status, setStatus] = useState(props.status)

    return (
        <select name="status" value={status} onChange={(e) => {
            setStatus(e.target.value)
            props.updateBook(e.target.value);
        }} required>

            <option value="read">Read</option>
            {props.status === "reading" || props.status === "not-read" ? <option value="reading">Reading</option> : <></>}
            {props.status === "not-read" ? <option value="not-read">Not Read</option> : <></>}
        </select>
    );
}

export default StatusPicker;