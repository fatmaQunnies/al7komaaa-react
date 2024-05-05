import React, { useState, useEffect } from 'react';
import './Like.css'; 

function Like(props) {
  const [reaction, setReaction] = useState(null); 
  const [reactionVisible, setReactionVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(props.likeIdFromPost);
  const [likeIdFromPost,setLikeIdFromPost]= useState(0);

useEffect(() => {
  console.log("USEEFFECTjjjj");
  fetch(props.isLikee, {
    headers: {
      'Authorization': 'Bearer ' + props.token
    }
  })
  .then(response => response.json()) 
  .then(data => {
    const likeByUser = data.find(like => like.user === props.userName && like.postId === props.postId);
    console.log("likeByUser:", likeByUser); 
    setIsLiked(likeByUser !== undefined); 
    if (likeByUser) {
      setLikeIdFromPost(likeByUser.likeId);
      console.log("ككككك" + likeIdFromPost);
    }
  })
  .catch(error => console.error('Error fetching data:', error));
}, [props.isLikee, props.token, props.userName, props.postId]); 

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
        setLikeId(data.likeId);
        setIsLiked(true); 
        setLikeIdFromPost(data.likeId);
        console.log(data);
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
    <>
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
    </>
  );
}

export default Like;