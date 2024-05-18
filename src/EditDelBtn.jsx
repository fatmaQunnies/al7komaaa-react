import { useState, useEffect, useRef } from "react";
import "./EditDelBtn.css";

function EditDelBtn(props) {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    // Implement your edit functionality here
    console.log("Edit clicked");
  };
// alert(props.id);
  const handleDelete = () => {
    fetch(`http://localhost:8080/post/${props.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    })
    .then(response => {
        if (response.ok) {
            props.renderFunction();
        }
     
    })
    .catch(error => console.error('Error removing friend:', error));
};


  return (
    <div className="edit-container" ref={containerRef}>
      <div className="edit" onClick={toggleOptions}>
        <span className="material-icons-outlined">edit</span>
      </div>
      {showOptions && (
        <div className="edit-options">
          <div onClick={handleEdit}><span className="material-icons-outlined">edit</span> Edit</div>
          <div onClick={handleDelete}><span className="material-icons-outlined">delete</span> Delete</div>
        </div>
      )}
    </div>
  );
}

export default EditDelBtn;
