import { useEffect, useState } from "react";
import './Post.css';
import Comment from './Comment.jsx';
import Like from './Like.jsx';

function Post(props){
  const [userInfo, setUserInfo] = useState({username:'',id:0});
  const [dufImage, setDufImage] = useState('49e40f05-46ad-42b6-a2f3-6270d67cb6df_download.jpeg');
  const [postLike, setPostLike] = useState([]);
  const [postComment, setPostComment] = useState([]);
  const [input,setinput]=useState('');
  const [showComments, setShowComments] = useState(false);
  const [readMore, setReadMore] = useState();
  const [allCommint, setAllCommint] = useState();
  const [reload, setReload] = useState(false);
  const [reloadLike, setReloadLike] = useState(false);
  const [numberComment, setNumberComment] = useState(0);
  const [myLiked,setMyLiked]=useState([]);

  useEffect(() => {
    console.log("USEEFFECT == the post owner"  ) ;
    fetch(props.info._links["the post owner"].href, {
      headers: {
          'Authorization': 'Bearer ' +  props.token
      }
    })
    .then(response => response.json()) 
    .then(data => {
      setUserInfo(data);
      console.log(userInfo .image +"ddd");
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);
// alert(props.info._links["the post's comment"].href);
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
            // console.log("READ MORE COMMENT", data._embedded ? data._embedded.comments : []);
      setReadMore(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
   
  fetchComments();
}, [reload]);
useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await fetch(props.info._links["number of comment"].href, {
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      }); 

      if (!response.ok) {
        throw new Error(`Error fetching post comments: ${response.statusText}`);
      }

      const data = await response.json();
    
      setNumberComment(data)
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }; 
   
  fetchComments();
}, [reload]);
const fun=(()=>{
setReloadLike(!reload);
});
 
  useEffect(() => {
    fetch(props.info._links["the post's likes"].href, {
      headers: {
          'Authorization': 'Bearer ' +  props.token
      }
    })
    .then(response => response.json()) 
    .then(data => {
      if (data.length > 0) {
        setPostLike(()=>data); 
       
        console.log(postLike); 
      } else {
        setPostLike([]);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  },[reloadLike]);
  
 
    useEffect(() => {
    fetch(props.info._links["If User Liked Post"].href, {
      headers: {
          'Authorization': 'Bearer ' +  props.token
      }
    })
    .then(response => response.json()) 
    .then(data => {
        setMyLiked(data[0]==undefined ? null :data[0]); 
     
    })
    .catch(error => console.error('Error fetching data:', error));
  },[reloadLike]);


  const handleLike = () => {
    return (
      <Like  createLike={props.info._links["create like"].href} isLikee={myLiked} token={props.token } postId={props.id}  userName={props.userName} reload={ fun}></Like>
    );
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
        console.log( "celina");
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  const handleComment = () => {
    return (
      <>
       
        {postComment.map(comment => (
          <Comment key={comment.id} comment={comment} info={userInfo} input={input}  />
        ))}
      </>
    );
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
       <img  src={`http://localhost:8080/getImage/${userInfo.userid}`}alt="" /> 
        <div><a className="userNameAnchor" href="/Profile">{userInfo.username}</a>
          <p className="postDate"> {props.info.timestamp}</p></div>
      </div>

      <div className="postContent">
  {props.info.content}
  
  {props.type === "post" ? (
  props.info.image == null ? (
    <div></div>
  ) : (
    <img src={`http://localhost:8080/post/postImage/${props.info.id}`} alt="" />
  )
) : props.type === "real" ? (
  

  <video src={`http://localhost:8080/post/getVideo/${props.info.id}`} alt="" ></video>
  //   <source src={"http://localhost:8080/post/getVideo/"+props.info.id } type="video/mp4" />
  //   Your browser does not support the video tag.
   
) : null}

</div>


      <div className="numberLikeComment">
        <div > {postLike.length} Likes </div>
        <div onClick={toggleComments}> {postComment.length} Comment </div>
      </div>

      <div className="actions">
      <div> {handleLike()}</div>
      <div  className="innn" >  <a href={`#${props.id}`}>Comment</a></div>
        <div onClick={handleComment}> Share</div>
      </div>

      <div className="addComment">
      <img  src={`http://localhost:8080/getImage/${userInfo.userid}`}alt="" /> 
        <input id={props.id} type="text" placeholder="    enter your comment" onChange={e => setinput(e.target.value)}></input>
        <button onClick={handleSend}>
          <span className="material-symbols-outlined">
            send
          </span>
        </button>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </div>

      <div id="comments" >
        {showComments && handleComment() }
        {showComments &&   <a onClick={handReadMore}>Read More</a>}
      </div>
    </div>
  );
}

export default Post;