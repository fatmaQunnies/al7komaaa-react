import { useEffect, useState } from "react";



function Post(props){
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTQ1ODI4NzQsImV4cCI6MTcxNDY2OTI3NH0.YjRKp00mEIr90fa6pez42CiZwc-V8M-B_Wmm9VhC2M8');
  const [userInfo, setUserInfo] = useState({username:'',image:''});

  useEffect(() => {
    console.log("USEEFFECT == profii" ) ;
    fetch(props.info._links["the post owner"].href, {
      headers: {
          'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json()) // تحويل البيانات إلى JSON
    .then(data => {
      setUserInfo(data);
      console.log(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);// لازم نغير الديبيندنسي 

    return <>
    
<div style={{ display: 'flex' }}>
{userInfo.image == null ? <></> : <img src={require(`C:/Users/fatim/Desktop/SOA-AdvWEB/project-al7komaaa/${userInfo.image}`)} alt="" />}
{/* هاي بدنا نرجع نعملها ب الراوت */}
  <a href="/Profile">{userInfo.username}</a> 
 
  </div>     
     <div> {props.info.content}</div>
     {props.info.image == null ? <></> : <img src={require(`C:/Users/fatim/Desktop/SOA-AdvWEB/project-al7komaaa/${props.info.image}`)} alt="" />}
     {/* {props.postVideoUrl==null? <></>: <img src={props.postVideoUrl} alt="" />} */}

    

    </>
 }
 export default Post;