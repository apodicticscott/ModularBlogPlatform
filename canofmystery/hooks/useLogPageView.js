import { useEffect } from 'react';
import { logPageView } from '../firebase/analitics/firebaseAnalytics';

const useLogPageView = () => {
  useEffect(() => {
    console.log("Page visitied")
    logPageView();
  }, []);
};

export default useLogPageView;