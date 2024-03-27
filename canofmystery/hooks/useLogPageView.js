import { logPageView } from '../firebase/analitics/firebaseAnalytics';

const useLogPageView = (pagePath) => {
    logPageView(pagePath);
}

export default useLogPageView;