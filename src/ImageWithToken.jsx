import React, { useEffect, useState } from 'react';

function ImageWithToken(props) {
    const [imageSrc, setImageSrc] = useState('');
// alert(props.userinfo);
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
                    console.error('Error fetching image:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [props.userinfo.userid, props.token]);

    return (
        <img className={props.CName} src={imageSrc} alt="centered" />
    );
}

export default ImageWithToken;
