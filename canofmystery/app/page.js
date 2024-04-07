'use client'

import { useState, useEffect } from 'react'
import styles from "./homepage.module.css";
import Lander from "../components/lander/Lander"
import CategoriesSection from "../components/categories/categories";
import Recent from "../components/recent/recent";
import UseUsAsASource from "../components/useUs/useUs"
import CanItemsScroll from "../components/CanItems/CanItemsScroll"
import Link from "../components/TextComponents/Link";
import { FaAngleDown } from "react-icons/fa";
import {motion} from "framer-motion"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesSmall, setCategoriesSmall] = useState(null);
  const [categoriesLarge, setCategoriesLarge] = useState(null);

  const mysteriousArray = [
    "Bog Bodies",
    "Point Des Arts Bridge, Paris",
    "Kolmanskop, Namibia",
    "The Wawel Dragon",
    "Viking Runestones in America",
    "Hill of Crosses, Lithuania",
    "Queen Mary, Long Beach, California",
    "Fiji Mermaid",
    "Shroud of Turin",
    "St. Bernadette of Lourdes",
    "King Solomon’s Mines",
    "Oak Island Money Pit",
    "The Lost Dutchman Mine",
    "Giant Skeletons (of humans) in America",
    "Curse of King Tutankhamen",
    "Catacombs of Paris",
    "Catacombs of Rome",
    "Vlad the Impaler",
    "Lady Elizabeth Bathory, Blood Countess",
    "Lucky Number 7",
    "Unlucky Number 13",
    "El Dorado",
    "The Beale Treasure/Beale Papers",
    "Fountain of Youth",
    "Hollow Earth Theory",
    "Flat Earth Theory",
    "Loch Ness Monster",
    "Lake Champlain Monster",
    "Big Foot",
    "Wendigo",
    "Shapeshifters",
    "The Beast of Gévaudan",
    "Mothman",
    "Chupacabra",
    "Sedlec Ossuary, Kutna Hora",
    "Issie, Lake Ikeda, Japan",
    "Mokele-mbembe",
    "The Jersey Devil",
    "The Bray Road Beast",
    "The Vampire Beast of Bladenboro",
    "Mayan Prophecy, December 21, 2012",
    "The Brown Mountain Lights",
    "The Marfa Lights",
    "The Maco Light",
    "Bingham Light",
    "Lands End Light",
    "Crystal Skulls",
    "Bermuda Triangle",
    "The Lost Civilization of Lemura/Mu",
    "Bimini Road/Bimini Wall (Atlantis)",
    "Zombies (Voodoo ones)",
    "Nazca Lines",
    "Stonehenge",
    "Taj Mahal",
    "Alice of the Hermitage",
    "Gray Man of Pawley’s Island",
    "The Bell Witch",
    "Old Ford’s Glowing Cross",
    "Messie, Lake Murray Monster",
    "Lizardman of Scape Ore Swamp",
    "Edinburg Vaults",
    "Yonaguni Monument, Japan",
    "Coral Castle, Florida",
    "The Ideal Palace, Hauterives, France",
    "Glastonbury Abbey (Grail/Camelot)",
    "Georgia Guidestones",
    "Machu Picchu",
    "Reptilians/Lizard People",
    "The Illuminati",
    "The Knights Templar",
    "The Voynich Manuscript",
    "Codas Gigas (The Devil’s Bible)",
    "The 23 Enigma",
    "Zé Arigó",
    "Chemtrail Conspiracy",
    "Kidney Heist",
    "Crocodiles in the Sewers",
    "Vanishing Hitchhiker/Resurrection Mary",
    "Bloody Mary (game/ghost story)",
    "The Hookman",
    "Cry Baby Bridge",
    "The Grey Lady, Willard Library, Evansville, IN",
    "Stull Cemetery",
    "The Winchester Mystery House",
    "Suicidal Roommate/Straight A Semester",
    "Killer in the Backseat",
    "The Haunted Railroad Crossing",
    "Ghostly Athens (Athens, OH)",
    "Shanghai Tunnels (Portland, OR)",
    "Greyfriars Cemetery",
    "Dock Street Theater (Charleston, SC)",
    "La Isla De Las Munecas, Mexico",
    "Waverly Hills Sanatorium",
    "Saint Louis Cemetery #1, New Orleans",
    "Marie Laveau",
    "The Fox Sisters",
    "Edgar Cayce",
    "Slenderman",
    "The Mary Celeste",
    "Dyatlov Pass incident",
    "D.B. Cooper",
    "Elisa Lam"
  ];
  
  
  const formatCategories = () => {
    const formatLarge = () => {
      const part1Length = Math.ceil(mysteriousArray.length / 3);
      const part2Length = Math.ceil((mysteriousArray.length - part1Length) / 2);
      const part1 = mysteriousArray.slice(0, part1Length);
      const part2 = mysteriousArray.slice(part1Length, part1Length + part2Length);
      const part3 = mysteriousArray.slice(part1Length + part2Length);  
      
      return [part1, part2, part3]
    }

    const formatSmall = () => {
      const part1Length = Math.ceil(mysteriousArray.length / 2)
      const  part1 = mysteriousArray.slice(0, part1Length);
      const part2 = mysteriousArray.slice(part1Length, mysteriousArray.length)
      console.log([part1, part2])
      return [part1, part2]
    }

    
    if(!categoriesSmall){
      setCategoriesSmall(formatSmall())
    }
    if(!categoriesLarge){
      setCategoriesLarge(formatLarge())
    }

  }

  const variants = {
    open: {
      opacity: 1,
      scale: [1, 1.5, 2], // Scales up to 2 times its size
      x: ["0%", "-50%"], // Moves to the center from its current position
      y: ["0%", "-50%"],
      transition: { duration: 0.5, ease: "easeInOut" },
      position: "fixed",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "100vh",
      width: "100vw",
      zIndex: 10,
    },
    closed: {
      opacity: 1,
      scale: 1,
      x: "0%",
      y: "0%",
      transition: { duration: 0.5, ease: "easeInOut" },
      position: "relative",
      height: "auto",
      width: "auto",
      zIndex: "auto",
    }
  };

  return (
    <div className={`${styles.container} overflow-y-hidden overflow-hidden`}>
      <Lander/>
      <CanItemsScroll/>
      <Recent/>
      <UseUsAsASource/>
      {/* <CategoriesSection/>
      <div className={`transition-all duration-700 ease-in-out flex items-center ${isOpen ? "fixed w-screen h-screen inset-0 z-50 delay-100" : "top-[relative w-full h-[300px]"} overflow-hidden`}>
        <div className={`transition-all delay-200 duration-1000  ease-in-out bg-base-300 flex flex-col items-center overflow-y-scroll  ${isOpen ? "w-full h-full" : "w-full h-[350px]"}`}>
          <div className={`w-full min-h-[70px] relative flex justify-center top-[230px] bg-base-300 z-10 ${isOpen && "hidden"}`}>
            <div className="relative w-[50px] rounded-t-md bg-base-100">
              <button onClick={() => setIsOpen(true)} className="w-[50px] h-[35px] flex items-center justify-center hover:rotate-[180deg] transition duration-100">
                <FaAngleDown className={"text-3xl"}/>
              </button>
            </div>
          </div>
          <AnimatePresence>
            <motion.div 
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={variants}
              className={`px-[50px] overflow-y-scroll w-full ${isOpen ? "py-[50px]" : "h-max top-0"}`}
            >
            {
              categoriesLarge && categoriesLarge.map((categoriePart, index) => (
                <div key={index} className="h-max flex flex-col gap-[15px] justify-center">
                  {
                    categoriePart.map((categoriePartItem, itemIndex) => (
                      <Link key={itemIndex} hover={true} classes={"text-base-100 dark:font-thin"}>
                        {categoriePartItem}
                      </Link>
                    ))
                  }
                </div>
              ))
            }
                {/* The rest of your component 
            </motion.div>
          </div>
        </div> */}
    </div>
  )
}