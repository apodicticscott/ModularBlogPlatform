import styles from "./homepage.module.css";
import Lander from "../components/lander/lander"
import DisplayTextComp from "../components/displayTextComp/displayTextComp";
import Header from "../components/textComponents/header1"
import CategoriesSection from "../components/categories/categories";
import Recent from "../components/recent/recent";
import UseUsAsASource from "../components/useUsAsASource/useUsAsASource.jsx";
import CanItemsScroll from "../components/canItems/canItemsScroll.jsx"

export default function Home() {
  return (
    <div className={`${styles.container} overflow-hidden`}>
        <Lander/>
        <CanItemsScroll/>
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
