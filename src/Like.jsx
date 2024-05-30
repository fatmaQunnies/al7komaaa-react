
import React, { useState, useEffect } from 'react';
import './Like.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Like(props) {
  const [reaction, setReaction] = useState(null); 
  const [reactionVisible, setReactionVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeIdFromPost, setLikeIdFromPost] = useState(null);

  useEffect(() => {
    if (props.isLikee.length !== 0) {
      setIsLiked(true);
      setLikeIdFromPost(props.isLikee[0].likeId);  // Assuming isLikee contains like details
    }
  }, [props.isLikee]);

  const handleReaction = async (reactionType) => {
    setReaction(reactionType);
    setReactionVisible(false);

    try {
      const response = await fetch(props.createLike, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: reactionType })
      });

      if (response.ok) {
        const data = await response.json();
       
        setIsLiked(true); 
        setLikeIdFromPost(data.likeId);
        props.reload();
      } else {
        console.error('Error posting reaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUnReaction = async () => {
    setReaction(null);
    setReactionVisible(false);
    setIsLiked(false);
    
    try {
      const response = await fetch("http://localhost:8080/post/" + likeIdFromPost + "/like", {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        props.reload();
      } else {
        console.error('Error deleting reaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };    

  return (
    <>
      <div style={{ position: "relative" }}>
        {reactionVisible && (
          <div className="reaction-popup" style={{ position: "absolute", top: "-50px",}}>
             <button onClick={() => handleReaction('LIKE')}><i className="material-icons">thumb_up</i></button>
          <button onClick={() => handleReaction('LOVE')}><i className="material-icons">favorite</i></button>
          <button onClick={() => handleReaction('CARE')}><i className="material-icons">favorite_border</i></button>
          <button onClick={() => handleReaction('HAHAHA')}><i className="material-icons">mood</i></button>
          <button onClick={() => handleReaction('SAD')}><i className="material-icons">sentiment_very_dissatisfied</i></button>
          <button onClick={() => handleReaction('ANGRY')}><i className="material-icons">mood_bad</i></button>
          </div>
        )}
        <button
          onClick={() => {
            isLiked ? handleUnReaction() : setReactionVisible(!reactionVisible);
          }}
          className="like-button"
        >
          {reaction ? reaction : (isLiked ? 'Dislike' : 'Like')}
        </button>
      </div>
    </>
  );
}

export default Like;
