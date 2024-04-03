import React, {useEffect, useState} from "react";

const useDocumentClassChange = () => {
    const [className, setClassName] = useState(document.querySelector('html').classList.value);
  
    useEffect(() => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setClassName(document.querySelector('html').classList.value);
          }
        });
      });
  
      observer.observe(document.querySelector('html'), { attributes: true, attributeFilter: ['class'] });
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    return className;
};

export default useDocumentClassChange;