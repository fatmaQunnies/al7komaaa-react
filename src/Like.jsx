import React, { useState, useEffect } from 'react';
import './Like.css'; 

function Like(props) {
  const [reaction, setReaction] = useState(null); 
  const [reactionVisible, setReactionVisible] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likeIdFromPost,setLikeIdFromPost]= useState();
// alert(props.isLikee[0].likeId);


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
        console.log(data);
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
    setIsLiked(false)
    const resp = await fetch("http://localhost:8080/post/"+likeIdFromPost+"/like", {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + props.token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json()) 
    .then(data => {
      console.log(data +"ssssssssssddsdssssssssssss");
    })
    .catch(error => console.error('Error fetching data:', error));
  }    
  return (
    <div style={{width:"100%"}}>
      <button
        onClick={() => {
          isLiked ? handleUnReaction() : setReactionVisible(!reactionVisible);
        }}
        className="like-button"
      >
        {reaction ? reaction : (isLiked ? 'Dislike' : 'Like')}
      </button>

      {reactionVisible && (
        <div className="reaction-popup">
          <button onClick={() => handleReaction('LIKE')}>LIKE</button>
          <button onClick={() => handleReaction('LOVE')}>LOVE</button>
          <button onClick={() => handleReaction('CARE')}>CARE</button>
          <button onClick={() => handleReaction('HAHAHA')}>HAHAHA</button>
          <button onClick={() => handleReaction('SAD')}>SAD</button>
          <button onClick={() => handleReaction('ANGRY')}>ANGRY</button>
        </div>
      )}
    </div>
  );
}

export default Like;