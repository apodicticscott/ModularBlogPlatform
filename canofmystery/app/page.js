import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"


export default function Home() {
  return (
    <div className={styles.container}>
        <Lander/>
        {/* <Components /> */}
    </div>
  )
}
