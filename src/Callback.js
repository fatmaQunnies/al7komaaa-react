// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Callback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const code = searchParams.get('code');

//     if (code) {
//       // هنا يمكنك التعامل مع الكود، مثل تبادله مع توكنات
//       console.log('OAuth code:', code);
//       // قم بتنفيذ المنطق لتبادل الكود هنا
//       // بعد المعالجة، يمكنك إعادة التوجيه للصفحة المطلوبة
//       navigate('/');
//     } else {
//       // التعامل مع الخطأ في حال لم يتم العثور على الكود
//       console.log('No code found in the URL');
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Callback</h1>
//       <p>Processing authentication...</p>
//     </div>
//   );
// };

// export default Callback;
