import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTechnique } from "../services/techniques.js";
import { getAllCategories } from "../services/categories.js";
import { verifyUser } from "../services/users.js";

function CreateTechnique() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    url: "",
    category: "",
    isError: false,
    errorMsg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await verifyUser();
        setUser(userData);

        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "User not authenticated",
      }));
      return;
    }

    const formData = {
      ...form,
      user: user.id,
    };

    try {
      await createTechnique(formData);
      navigate("/techniques");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Failed to create technique",
      }));
    }
  };

  const renderError = () => (
    <>
      <button type="submit" className={form.isError ? "danger" : ""}>
        Create Technique
      </button>
      {form.isError && <p className="form-error">{form.errorMsg}</p>}
    </>
  );

  return (
    <div className="create-technique-shell">
      <div className="create-technique-card">
        <div className="technique-brand-chip">OSS BOSS</div>
        <h1>Create a Technique</h1>
        <p className="technique-subcopy">Document a new technique to share with your arsenal.</p>

        <form className="technique-form" onSubmit={handleSubmit}>
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

          <label className="input-label" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="technique-select"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label className="input-label" htmlFor="url">Reference URL</label>
          <input
            id="url"
            type="url"
            name="url"
            value={form.url}
            placeholder="e.g. https://example.com/technique"
            onChange={handleChange}
            required
          />

          <label className="input-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            placeholder="Describe the technique, its purpose, and how to execute it..."
            onChange={handleChange}
            required
            className="technique-textarea"
          />

          {renderError()}
        </form>
      </div>
    </div>
  );
}

export default CreateTechnique;
