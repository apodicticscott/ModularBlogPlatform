import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import DisplayTextComp from "@/components/displayTextComp/DisplayTextComp";
import CategoriesSection from "../components/categories/categories";

export default function Home() {
  return (
    <div className={styles.container}>
        <Lander/>
        <CategoriesSection/>
        {/* <div className="h-max dark:bg-base-100-dark text-t-header-light bg-base-100">
          <DisplayTextComp />
        
        </div> */}
        {/* <Components /> */}
    </div>
  )
}
