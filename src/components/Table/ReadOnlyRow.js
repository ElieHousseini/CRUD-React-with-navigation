import React from "react";
import { Link } from "react-router-dom";

const ReadOnlyRow = ({ article, handleEditClick, handleDeleteClick }) => {
  const { id, title, languages, description } = article;

  return (
    <tr>
      <td>{title}</td>
      <td>{languages}</td>
      <td>{description}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, article)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(id)}>
          Delete
        </button>
        <Link
          to="/view"
          state={{
            title,
            languages,
            description,
          }}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
