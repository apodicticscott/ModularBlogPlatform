import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import DisplayTextComp from "../components/displayTextComp/DisplayTextComp";
import Header from "../components/TextComponents/Header1"
import CategoriesSection from "../components/categories/categories";
import Recent from "../components/recent/recent";
import UseUsAsASource from "../components/UseUsAsASource/useusasasource.jsx";
export default function Home() {



  return (
    <div className={styles.container}>
        <Lander/>
        <Recent/>
        <UseUsAsASource/>
        <CategoriesSection/>
        
        {/* <div className="h-max dark:bg-base-100-dark text-t-header-light bg-base-100">
          <DisplayTextComp />
        
        </div> */}
        {/* <Components /> */}
    </div>
  )
}
