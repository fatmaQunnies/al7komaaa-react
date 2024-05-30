import { useLayoutEffect, useState } from "react";

// دالة للتحقق مما إذا كان الجهاز هو جهاز محمول
export const useIsMobile = () => {
  const [size, setSize] = useState([0, 0]);
  
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  return size[0] < 820;
};
