import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import DisplayTextComp from "@/components/displayTextComp/DisplayTextComp";


export default function Home() {
  return (
    <div className={styles.container}>
        <Lander/>
        <div className="w-full h-[500px]">

        </div>
        {/* <div className="h-max dark:bg-base-100-dark text-t-header-light bg-base-100">
          <DisplayTextComp />
        </div> */}
        {/* <Components /> */}
    </div>
  )
}
