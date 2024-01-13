import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import Components from "@/components/DisplayComp/Components";

export default function Home() {
  return (
    <div className={styles.container}>
        <Lander/>
        {/* <Components /> */}
    </div>
  )
}
