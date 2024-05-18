import { useState, useEffect, useRef } from "react";
import "./EditDelBtn.css";

function EditDelBtn(props) {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);
  const [postOwner, setPostOwner] = useState(false);
//  alert(props.ownerPost+ ""+ ""+props.userId);
  const isOwner = () => {
    if (props.ownerPost === props.userId) {
      setPostOwner(true);
    } else {
      setPostOwner(false);
    }
  };

  useEffect(() => {
    isOwner();

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.owner, props.userId]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    // Implement your edit functionality here
  };

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
    .catch(error => console.error('Error removing post:', error));
  };

  const handleHide = () => {
    console.log("Hide clicked");
    // Implement your hide functionality here
    
  };

  return (
    <div className="edit-container" ref={containerRef}>
      <div className="edit" onClick={toggleOptions}>
        <span className="material-icons-outlined">edit</span>
      </div>
      {showOptions && (
        <div className="edit-options">
          {postOwner ? (
            <>
              <div onClick={handleEdit}><span className="material-icons-outlined">edit</span> Edit</div>
              <div onClick={handleDelete}><span className="material-icons-outlined">delete</span> Delete</div>
            </>
          ) : (
            <div onClick={handleHide}><span className="material-icons-outlined">visibility_off</span> Hide</div>
          )}
        </div>
      )}
    </div>
  );
}

export default EditDelBtn;
