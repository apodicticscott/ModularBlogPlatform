'use effect'

import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import CategoriesSection from "../components/categories/categories";
import Recent from "../components/recent/recent";
import UseUsAsASource from "../components/useUsAsASource/useUsAsASource.jsx";
import CanItemsScroll from "../components/canItems/canItemsScroll.jsx"

export default function Home() {



  return (
    <div className={`${styles.container} overflow-hidden`} style={{WebkitMaskImage: "-webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"}}>
        <Lander/>

        <CanItemsScroll/>
        <Recent/>
        <UseUsAsASource/>
        <CategoriesSection/>;
        
        {/* <div className="h-max dark:bg-base-100-dark text-t-header-light bg-base-100">
          <DisplayTextComp />
        
        </div> */}
        {/* <Components /> */}
    </div>
  )
}
