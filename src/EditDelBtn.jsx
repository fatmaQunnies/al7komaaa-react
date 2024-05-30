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
// alert(props.id);
  const isOwner = () => {
   
    if (props.ownerPost === props.userId) {
      setPostOwner(true);
    } else {
      setPostOwner(false);
    }
   
  };
// alert(props.token);
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

  const handleDelete = () => {
    console.log ("delete buttomj");
    if(props.type == "post"){
      console.log ("delete post");
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
  }
  else if (props.type == "comment"){
    console.log ("delete comment");
    fetch(`http://localhost:8080/post/comment/${props.id}`, {
    
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

  }

};

  const handleHide = () => {
    console.log("Hide clicked");
    // Implement your hide functionality here
  };

  const handleSave = async () => {
   
    console.log ("delete buttomj");
    if(props.type == "post"){
      console.log ("delete post");
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
    if(enableToDelete==true){
      const response = await fetch(`http://localhost:8080/post/deleteImage/${props.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + props.token,
      'Content-Type': 'application/json'
    },
   
  });
    }} else if (props.type == "comment"){
      console.log ("delete comment");




      try {
        const response = await fetch(`http://localhost:8080/post/${props.id}/comment/edit`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editContent )
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
      if(enableToDelete==true){
        const response = await fetch(`http://localhost:8080/post/commentImage/${props.id}`, {
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
              <div onClick={handleEdit}><span className="material-icons-outlined">edit</span> Edit</div>
              <div onClick={handleDelete}><span className="material-icons-outlined">delete</span> Delete</div>
            </>
          ) : (
            <div onClick={handleHide}><span className="material-icons-outlined">visibility_off</span> Hide</div>
          )}
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        
        <h2>Edit </h2>
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
    CName="editeimage"
    type="post/commentImage"
    userinfo={props.id}
    token={props.token}
  />
) : (
  <ImageWithToken
    CName="editeimage"
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
    </div>
  );
}

export default EditDelBtn;
