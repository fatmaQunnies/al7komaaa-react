import React, { useEffect, useState,useRef } from 'react';

function ImageWithToken(props) {
    const [imageSrc, setImageSrc] = useState('');
    const videoRef = useRef(null);
        useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/${props.type}/${props.userinfo}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${props.token}`
                      }
                    });
            
                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setImageSrc(imageUrl);
                    } else {
                        console.log('Failed to fetch the image');
                    }
                } catch (error) {
                    console.log("An error occurred:", error);
                }}

        fetchImage();
    }, []);



  useEffect(() => {
    const fetchVideo = async () => {
       try{
      const response = await fetch(`http://localhost:8080/${props.type}/${props.userinfo}`, {
        headers: {
          'Authorization': `Bearer ${props.token}` 
        }
      });    const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (videoRef.current) { 
        videoRef.current.src = url;
      }    
    fetchVideo();
    } catch (error) {
    }};

  
  }, [props.type, props.userinfo, props.token]);

// alert(`http://localhost:8080/${props.type}/${props.userinfo}`);
    return (
        // <img className={props.CName} src={imageSrc} alt="centered" />
        <>
        {props.type === 'post/postImage' ? (
            <img className={props.CName} src={imageSrc} alt="centered" />
        ) : props.type === 'post/getVideo' ? (
//             <video controls width="600">
// <source src={`http://localhost:8080/${props.type}/${props.userinfo}`} type="video/mp4">
//               </source>
//           </video>
           
<video controls className="video" ref={videoRef}>
Your browser does not support the video tag.
</video>
           
        ) :   <img className={props.CName} src={imageSrc} alt="centered" />
    }
    </>

    );
}

export default ImageWithToken;
