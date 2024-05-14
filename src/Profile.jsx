import { useState,useEffect } from "react"; 

function Profile(props){
    const [numberOfPosts,setNumberOfPosts]=useState(0);
    const [userPost,setUserPosts]=useState([]);
    useEffect(() => {
        console.log("USEEFFECT == " + props.userinfo.userid);
        fetch(`http://localhost:8080/post/number/post/${props.userinfo.userid}`, {
          headers: {
            'Authorization': 'Bearer ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
            setNumberOfPosts(data);
         
        })
        .catch(error => console.error('Error fetching data:', error));
      }, []);
    
      const fetchFriends = async () => {
        try {
            const response = await fetch("http://localhost:8080/post/friendPosts/"+props.userinfo.userid, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Await the JSON parsing
            setUserPosts(data._embedded.posts);
            console.log('datamai', data._embedded.posts);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };
    

    
    useEffect(() => {
        fetchFriends();
    }, []);


    return(
        <>
       

<p>{props.userinfo.username}</p>

        <div className="numberofpostsnumfriends" >
        <p>{numberOfPosts}</p>
        <p>{props.numoffriend}</p>
        <p>{props.userinfo.fullname}</p>
        <p>{props.userinfo.bio}</p>
        </div>
       
        
        </>
    ) ;



}
export default Profile;