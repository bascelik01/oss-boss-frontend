import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTechniqueById, updateTechnique } from "../services/techniques.js";

function EditTechnique() {
  const { techniqueId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    isError: false,
    errorMsg: "",
  });

  useEffect(() => {
    const fetchTechnique = async () => {
      const data = await getTechniqueById(techniqueId);
      setForm({
        name: data.name,
        description: data.description,
        isError: false,
        errorMsg: "",
      });
    };

    fetchTechnique();
  }, [techniqueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateTechnique(techniqueId, form);
      navigate(`/techniques/${techniqueId}`);
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Failed to update technique",
      }));
    }
  };

  const renderError = () => (
    <>
      <button type="submit" className={form.isError ? "danger" : ""}>
        Update Technique
      </button>
      {form.isError && <p className="form-error">{form.errorMsg}</p>}
    </>
  );

  return (
    <div className="edit-technique-root">
      <div className="edit-technique-heading">
        <h2>Edit Technique</h2>
      </div>
      <form className="edit-technique-form" onSubmit={handleSubmit}>
        <label className="input-label" htmlFor="name">Technique Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          placeholder="e.g. Cross-Examination"
          onChange={handleChange}
          required
        />

        <label className="input-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          placeholder="Describe the technique..."
          onChange={handleChange}
          required
        />

        {renderError()}
      </form>
    </div>
  );
}

export default EditTechnique;
