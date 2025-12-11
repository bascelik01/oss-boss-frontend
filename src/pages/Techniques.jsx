import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTechniques, deleteTechnique } from "../services/techniques.js";

function Techniques() {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    const fetchTechniques = async () => {
      const data = await getAllTechniques();
      setTechniques(data);
    };

    fetchTechniques();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this technique?")) {
      try {
        await deleteTechnique(id);
        setTechniques((prevTechniques) =>
          prevTechniques.filter((technique) => technique.id !== id)
        );
      } catch (error) {
        console.error("Failed to delete technique", error);
        alert("Failed to delete technique");
      }
    }
  };

  return (
    <div className="techniques-root">
      <div className="techniques-header">
        <h1>Techniques Arsenal</h1>
        <p className="techniques-subtitle">Master the collection of documented techniques</p>
      </div>
      <div className="techniques-container">
        {techniques.map((technique) => (
          <div key={technique.id} className="technique-card">
            <div className="technique-card-inner">
              <div className="technique-card-header">
                <h3>{technique.name}</h3>
                <span className="technique-category">{technique.category}</span>
              </div>
              <p className="technique-card-description">{technique.description}</p>
              <div className="technique-card-footer">
                <span className="technique-date">{formatDate(technique.created_at)}</span>
                <div className="technique-card-actions">
                  <Link to={`/techniques/${technique.id}`} className="view-details-btn">
                    View Details →
                  </Link>
                  <button 
                    onClick={() => handleDelete(technique.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Techniques;
