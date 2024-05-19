import React, { useState, useEffect } from 'react';
import './Post.css';
import Comment from './Comment.jsx';
import Like from './Like.jsx';
import ImageWithToken from './ImageWithToken.jsx';
import EditDelBtn from './EditDelBtn';
import ShowPostLikes from './ShowPostLikes.jsx';
import Share from './Share.jsx';

function Post(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [dufImage, setDufImage] = useState('49e40f05-46ad-42b6-a2f3-6270d67cb6df_download.jpeg');
  const [postLike, setPostLike] = useState([]);
  const [postComment, setPostComment] = useState([]);
  const [input, setInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [readMore, setReadMore] = useState(null);
  const [reload, setReload] = useState(false);
  const [reloadLike, setReloadLike] = useState(false);
  const [numberComment, setNumberComment] = useState(0);
  const [myLiked, setMyLiked] = useState([]);
  const [showLikesPopper, setShowLikesPopper] = useState(false);
  const [showSharePopper, setShowSharePopper] = useState(false);

  useEffect(() => {
    if (props.info && props.info._links && props.info._links["the post owner"]) {
      fetch(props.info._links["the post owner"].href, {
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(response => response.json())
        .then(data => {
          setUserInfo(data);
          console.log(data.userid + " owner");
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [props.info, props.token]);

  useEffect(() => {
    if (props.info && props.info._links && props.info._links["the post's comment"]) {
      const fetchComments = async () => {
        try {
          const response = await fetch(props.info._links["the post's comment"].href, {
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          });

          if (!response.ok) {
            throw new Error(`Error fetching post comments: ${response.statusText}`);
          }

          const data = await response.json();

          const comments = data._embedded && data._embedded.comments ? data._embedded.comments : [];
          setPostComment(comments);
          setReadMore(data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }
  }, [reload, props.info, props.token]);

  useEffect(() => {
    if (props.info && props.info._links && props.info._links["number of comment"]) {
      const fetchNumberOfComments = async () => {
        try {
          const response = await fetch(props.info._links["number of comment"].href, {
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          });

          if (!response.ok) {
            throw new Error(`Error fetching number of comments: ${response.statusText}`);
          }

          const data = await response.json();
          setNumberComment(data);
        } catch (error) {
          console.error('Error fetching number of comments:', error);
        }
      };

      fetchNumberOfComments();
    }
  }, [reload, props.info, props.token]);

  const fun = () => {
    setReloadLike(!reloadLike);
  };

  useEffect(() => {
    if (props.info && props.info._links && props.info._links["the post's likes"]) {
      fetch(props.info._links["the post's likes"].href, {
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(response => response.json())
        .then(data => {
          setPostLike(data.length > 0 ? data : []);
          console.log(postLike);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [reloadLike, props.info, props.token]);

  useEffect(() => {
    if (props.info && props.info._links && props.info._links["If User Liked Post"]) {
      fetch(props.info._links["If User Liked Post"].href, {
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(response => response.json())
        .then(data => {
          setMyLiked(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [reloadLike, props.info, props.token]);

  const handleLike = () => {
    if (props.info && props.info._links && props.info._links["create like"]) {
      return (
        <Like createLike={props.info._links["create like"].href} isLikee={myLiked} token={props.token} postId={props.id} userName={props.userName} reload={fun} />
      );
    }
    return null;
  };

  const showLike = () => {
    setShowLikesPopper(true);
  };

  const handleSend = async () => {
    if (props.info && props.info._links && props.info._links["createComment"]) {
      try {
        const response = await fetch(props.info._links["createComment"].href, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: input })
        });

        if (response.ok) {
          setReload(!reload);
          console.log("Comment sent");
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };

  const handleComment = () => {
    return (
      <>
        {postComment.map(comment => (
          <Comment key={comment.id} comment={comment} info={userInfo} input={input} />
        ))}
      </>
    );
  };

  const handleShareClick = () => {
    setShowSharePopper(true);
  };

  const handleSharePost = async (shareContent) => {
    if (props.info && props.info._links && props.info._links["createShare"]) {
      try {
        const response = await fetch(props.info._links["createShare"].href, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shareContent)
        });

        if (response.ok) {
          console.log('Post shared successfully');
        } else {
          console.error('Error sharing post:', response.statusText);
        }
      } catch (error) {
        console.error('Error sharing post:', error);
      }
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handReadMore = async () => {
    if (readMore && readMore._links && readMore._links["Read more"]) {
      try {
        const response = await fetch(readMore._links["Read more"].href, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
        console.log(responseData._embedded.commments, "READ MORE");
        if (response.ok) {
          const newPosts = responseData._embedded.comments.filter(newPost => {
            return !postComment.some(oldPost => oldPost.id === newPost.id);
          });
          setPostComment([...postComment, ...newPosts]);
          console.log("READ MORE");
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="post">
      <div className="userNameImage">
        {userInfo && (
          <ImageWithToken CName={"image"} type={"getImage"} userinfo={userInfo.userid} token={props.token} />
        )}
        <div>
          <a className="userNameAnchor" href="/Profile">{userInfo?.username}</a>
          <p className="postDate">{props.info.timestamp}</p>
        </div>
        <div className="edit-del-btn">
          {userInfo && (
            <EditDelBtn token={props.token} id={props.id} renderFunction={props.renderFunction} ownerPost={userInfo.userid} userId={props.userId} info={props.info}/>
          )}
        </div>
      </div>

      <div className="postContent">
        {props.info.content}
        {props.type === "post" ? (
          props.info.image == null ? (
            <div></div>
          ) : (
            <ImageWithToken CName={"centered-image"} type={"post/postImage"} userinfo={props.id} token={props.token}></ImageWithToken>
          )
        ) : (
          <div className="video-container">
            <video controls>
              <source src={"http://localhost:8080/post/video/" + props.info.video} type="video/mp4"/>
            </video>
          </div>
        )}
      </div>

      <div className="post-actions">
        {handleLike()}
        <span className="commenticon" onClick={toggleComments}></span>
        <span className="shareicon" onClick={handleShareClick}></span>
      </div>

      <div>
        {showLikesPopper && (
          <ShowPostLikes 
            token={props.token}
            id={props.id}
            setShowLikesPopper={setShowLikesPopper}
          />
        )}
      </div>

      {showComments && (
        <div className="post-comments">
          <div className="post-comment-section">
            <ImageWithToken CName={"commentImage"} type={"getImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
            <input className="commentInput" type="text" onChange={event => setInput(event.target.value)}/>
            <button className="commentButton" onClick={handleSend}>send</button>
          </div>
          {handleComment()}
          {readMore && readMore._links && readMore._links["Read more"] && (
            <button className="readMoreButton" onClick={handReadMore}>Read more</button>
          )}
        </div>
      )}

      {showSharePopper && (
        <Share 
          token={props.token} 
          postId={props.id} 
          userName={props.userName}
          setShowSharePopper={setShowSharePopper}
          handleSharePost={handleSharePost}
        />
      )}
    </div>
  );
}

export default Post;
