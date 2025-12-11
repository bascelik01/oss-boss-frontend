import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTechniqueById, updateTechnique } from "../services/techniques.js";
import { getAllCategories } from "../services/categories.js";

function TechniqueDetail() {
  const { techniqueId } = useParams();
  const navigate = useNavigate();
  const [technique, setTechnique] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnique = async () => {
      const data = await getTechniqueById(techniqueId);
      setTechnique(data);
      setEditData(data);
    };

    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchTechnique();
    fetchCategories();
  }, [techniqueId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const youtubeId = technique ? extractYouTubeId(technique.url) : null;

  const handleEditClick = () => {
    setIsEditMode(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditData(technique);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.description.trim() || !editData.url.trim()) {
      setError("All fields are required");
      return;
    }

    setIsSaving(true);
    try {
      const categoryObj = categories.find(cat => cat.id === parseInt(editData.category));
      const updatePayload = {
        name: editData.name,
        description: editData.description,
        url: editData.url,
        category: editData.category
      };
      
      const updated = await updateTechnique(techniqueId, updatePayload);
      setTechnique(updated);
      setEditData(updated);
      setIsEditMode(false);
      setError(null);
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!technique) return <div>Loading...</div>;

  return (
    <div className="technique-detail-root">
      <div className="technique-detail-top-bar">
        <button onClick={() => navigate('/techniques')} className="back-button">
          ← Back
        </button>
        {!isEditMode && (
          <button onClick={handleEditClick} className="edit-button-top">
            Edit Technique
          </button>
        )}
      </div>

      <div className="technique-detail-layout">
        <div className="technique-detail-left">
          {isEditMode ? (
            <div className="technique-edit-form">
              <h2>Edit Technique</h2>
              {error && <div className="form-error">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editData.name || ''}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={editData.category || ''}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                  id="url"
                  type="text"
                  name="url"
                  value={editData.url || ''}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editData.description || ''}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  rows="6"
                />
              </div>

              <div className="edit-form-actions">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="edit-save-btn"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="edit-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="technique-detail-header">
                <h2>{technique.name}</h2>
                <span className="detail-category-badge">{categories.find(cat => cat.id === technique.category)?.name || technique.category}</span>
              </div>
              <p className="technique-description">{technique.description}</p>
              {!youtubeId && (
                <div className="technique-url-section">
                  <a href={technique.url} target="_blank" rel="noopener noreferrer" className="technique-url-link">
                    View Reference → {technique.url}
                  </a>
                </div>
              )}
              <div className="technique-detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span>{formatDate(technique.created_at)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Updated:</span>
                  <span>{formatDate(technique.updated_at)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {youtubeId && (
          <div className="technique-detail-right">
            <div className="technique-video-section">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={technique.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="technique-video-frame"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechniqueDetail;
