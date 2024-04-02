'use client'

import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import CategoriesSection from "../components/categories/categories";
import Recent from "../components/recent/recent";
import UseUsAsASource from "../components/useUs/useUs"
import CanItemsScroll from "../components/CanItems/CanItemsScroll"

export default function Home() {



  return (
    <div className={`${styles.container} overflow-y-hidden overflow-hidden`}>
        <Lander/>
        <CanItemsScroll/>
        <Recent/>
        <UseUsAsASource/>
        <CategoriesSection/>;
    </div>
  )
}
