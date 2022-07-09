import React from "react";
import { nanoid } from "nanoid";
import "../../App.css";
import data from "../../articles-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Table = () => {
  const { useState } = React;

  const [articles, setArticles] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: "",
    languages: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    languages: "",
    description: "",
  });

  const [editArticleId, setEditArticleId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newArticle = {
      id: nanoid(),
      title: addFormData.title,
      languages: addFormData.languages,
      description: addFormData.description,
    };

    const newArticles = [...articles, newArticle];
    setArticles(newArticles);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedArticle = {
      id: editArticleId,
      title: editFormData.title,
      languages: editFormData.languages,
      description: editFormData.description,
    };

    const newArticles = [...articles];

    const index = articles.findIndex((article) => article.id === editArticleId);

    newArticles[index] = editedArticle;

    setArticles(newArticles);
    setEditArticleId(null);
  };

  const handleEditClick = (event, { id, title, languages, description }) => {
    event.preventDefault();
    setEditArticleId(id);

    const formValues = {
      title: title,
      languages: languages,
      description: description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditArticleId(null);
  };

  const handleDeleteClick = (articleId) => {
    const newArticles = [...articles];

    const index = articles.findIndex((article) => article.id === articleId);

    newArticles.splice(index, 1);

    setArticles(newArticles);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>languages</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, key) => (
              <React.Fragment key={key}>
                {editArticleId === article.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    article={article}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an Article</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Enter a title..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="languages"
          required="required"
          placeholder="Enter a language..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="description"
          required="required"
          placeholder="Enter a description..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Table;
