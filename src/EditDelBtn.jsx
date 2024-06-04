import { useState, useEffect, useRef } from "react";
import "./EditDelBtn.css";
import Modal from './Modal';
import ImageWithToken from "./ImageWithToken";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function EditDelBtn(props) {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);
  const [postOwner, setPostOwner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editContent, setEditContent] = useState(props.info.content);
  const [enableToDelete, setEnableToDelete] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
  }, [props.ownerPost, props.userId]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    setEditContent(props.info.content);
    setShowModal(true);
    setShowOptions(false);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(true);
    setShowOptions(false);
  };

const handleDelete = async () => {
  if (props.type === "post") {
    console.log("delete post");
    try {
      const response = await fetch(`http://localhost:8080/post/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      });
      if (response.ok) {
        props.renderFunction();
        setMessage('Post deleted successfully.');
      }
    } catch (error) {
      console.error('Error removing post:', error);
    }
  } else if (props.type === "comment") {
    console.log("delete comment");
    try {
      const response = await fetch(`http://localhost:8080/post/comment/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      });
      if (response.ok) {
        props.renderFunction();
        setMessage('Comment deleted successfully.');
      }
    } catch (error) {
      console.error('Error removing post:', error);
    }
  }
  setShowDeleteConfirmation(false); // تأكد من وجود هذا السطر هنا
};


  const handleSave = async () => {
    if (props.type === "post") {
      try {
        const response = await fetch(`http://localhost:8080/post/${props.id}/editPost`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: editContent })
        });

        if (response.ok) {
          const data = await response.text();
          console.log("Content updated:", data);
          setShowModal(false);
          props.renderFunction(); // Re-render the parent component
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating content:', error);
      }
      if (enableToDelete) {
        await fetch(`http://localhost:8080/post/deleteImage/${props.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
        });
      }
    } else if (props.type === "comment") {
      try {
        const response = await fetch(`http://localhost:8080/post/${props.id}/comment/edit`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: editContent })
        });

        if (response.ok) {
          const data = await response.text();
          console.log("Content updated:", data);
          setShowModal(false);
          props.renderFunction();
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating content:', error);
      }
      if (enableToDelete) {
        await fetch(`http://localhost:8080/post/commentImage/${props.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
        });
      }
    }
  };

  const handleEnableToDelete = () => {
    setEnableToDelete(true);
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
              <div onClick={handleEdit}><span className="material-icons-outlined"></span> Edit</div>
              <div onClick={confirmDelete}><span className="material-icons-outlined"></span> Delete </div>
            </>
           ) : (
            <div><span className="material-icons-outlined"></span> you're not the owner</div>
          )}
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Edit</h2>
        <textarea
          placeholder={props.info.content}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows="5"
          cols="50"
        />
        <div style={{ position: 'relative' }}>
          {props.type === "comment" ? (
            <ImageWithToken
              CName="editimage"
              type="post/commentImage"
              userinfo={props.id}
              token={props.token}
            />
          ) : (
            <ImageWithToken
              CName="editimage"
              type="post/postImage"
              userinfo={props.info.id}
              token={props.token}
            />
          )}
          <button className="close-btn" onClick={handleEnableToDelete}>X</button>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditDelBtn;
