import { useEffect, useState } from 'react';
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
  }, [props.info._links, props.token]);

  useEffect(() => {
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
  }, [reload, props.info._links, props.token]);

  useEffect(() => {
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
  }, [reload, props.info._links, props.token]);

  const fun = () => {
    setReloadLike(!reloadLike);
  };

  useEffect(() => {
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
  }, [reloadLike, props.info._links, props.token]);

  useEffect(() => {
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
  }, [reloadLike, props.info._links, props.token]);

  const handleLike = () => {
    return (
      <Like createLike={props.info._links["create like"].href} isLikee={myLiked} token={props.token} postId={props.id} userName={props.userName} reload={fun} />
    );
  };

  const showLike = () => {
    setShowLikesPopper(true);
  };

  const handleSend = async () => {
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
    try {
      const response = await fetch(props.info._links["createShare"].href, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shareContent )
      });

      if (response.ok) {
        console.log('Post shared successfully');
      } else {
        console.error('Error sharing post:', response.statusText);
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handReadMore = async () => {
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
        ) : props.type === "real" ? (
          <video src={`http://localhost:8080/post/getVideo/${props.id}`} alt=""></video>
        ) : null}
      </div>

      <div className="numberLikeComment">
        <div onClick={showLike}>{postLike.length} Likes </div>
        <div onClick={toggleComments}>{numberComment} Comments</div>
      </div>

      <div className="actions">
        <div>{handleLike()}</div>
        <div className="innn"><a href={`#${props.id}`}>Comment</a></div>
        <div onClick={handleShareClick}>Share</div>
      </div>

      <div className="addComment">
        {userInfo && (
          <ImageWithToken CName={"image"} type={"getImage"} userinfo={props.userId} token={props.token} />
        )}
        <input id={props.id} type="text" placeholder="Enter your comment" onChange={e => setInput(e.target.value)} />
        <button onClick={handleSend}>
          <span className="material-symbols-outlined">
            send
          </span>
        </button>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </div>

      <div id="comments">
        {showComments && handleComment()}
        {showComments && <a onClick={handReadMore}>Read More</a>}
      </div>

      {showLikesPopper && (
        <div className="likes-popper">
          <span className="close-button" onClick={() => setShowLikesPopper(false)}>&times;</span>
          <div className="likes-popper-content">
            {postLike.map((like) => (
              <ShowPostLikes key={like.id} userName={like.user} type={like.type} />
            ))}
          </div>
        </div>
      )}

      {showSharePopper && (
        <Share 
          onClose={() => setShowSharePopper(false)} 
          onShare={handleSharePost} 
        />
      )}
    </div>
  );
}

export default Post;
