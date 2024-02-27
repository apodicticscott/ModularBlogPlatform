import styles from "./postPage.module.css" 

// const [compArray, setCompArray] = useState([    
//     { type: "paragraph", size: "md", style: [], id: "paragraph-1", isTagged: false, content: 'For years, people in Kentucky have been talking about the peculiar and eccentric weather phenomenon known as the "Kentucky Meat Rain." Locals are left scratching their heads in astonishment and awe at this strange phenomenon where chunks of raw flesh fall from the sky. The Kentucky Meat Rain is still a mysterious and intriguing natural phenomenon, despite a plethora of theories and ideas regarding its cause.'},
//     { type: "image", size: "", style: [], id: "image-2", content: "" },
//     { type: "paragraph", size: "md", style: [], id: "paragraph-3", isTagged: false, content: 'The first Kentucky Meat Rain was observed by the nice people of Olympia Springs, Kentucky, in 1876. This is where our voyage into the world of meaty precipitation began. People were in complete disbelief as various types of meat, including venison and steak, appeared to fall from the sky. The tale quickly became viral, igniting a flurry of interest and ideas about the meaty downpour.'},
//     { type: "paragraph", size: "md", style: [], id: "paragraph-4", isTagged: false, content: 'Meat showers persisted in appearing in different locations around Kentucky in the late 19th and early 20th centuries. Even more, a report from the 1876 incident said that the meat parts were "large irregularly shaped flakes, one of which was 6 by 8 inches in size.'},
//     { type: "paragraph", size: "md", style: [], id: "paragraph-5", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
//     { type: "paragraph", size: "md", style: [], id: "paragraph-6", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
//     { type: "header", size: "sm", style: [], id: "paragraph-7", isTagged: true, content: 'Work Cited'},
//     { type: "resource", size: "md", style: [], id: "resource-8", isTagged: false, content: 'Duckworth, Matthew, “‘Kentucky Shower of Flesh’: The ‘Great Kentucky Meat Shower’ fell 147 years ago” Fox56News. Mar. 2023 https://fox56news.com/news/kentucky/the-great-kentucky-meat-shower-147-years-passed-since-the-kentucky-shower-of-flesh/ Accessed Oct. 2023.'},
//     { type: "resource", size: "md", style: [], id: "resource-9", isTagged: false, content: 'McManus, Melanie, “10 Times It Has Rained Something Other Than Water” HowStuffWorks. https://science.howstuffworks.com/nature/climate-weather/storms/10-times-it-rained-something-other-than-water.htm. Accessed Oct. 2023.'},
//     { type: "resource", size: "md", style: [], id: "resource-10", isTagged: false, content: '“Kentucky meat shower”, https://en.wikipedia.org/wiki/Kentucky_meat_shower, Wikipedia. Nov. 2023.'},

// ]);

// const [title, setTitle] = useState("Kentucky Meat Rain")
// const [author, setAuthor] = useState("Name or Pseudonym")
// const [tags, setTags] = useState([["Text Here", "#f1fd66"]])
// const [category, setCategory] = useState("Example Category")

const PostPage = () => {
    return (
        <div className={styles.container}>
            <div>
                <h1>Kentucky Meat Rain</h1>
                <h2>Name</h2>
                <a href="">Tag Here </a>
                <a href="">Category Here</a>
                <p>For years, people in Kentucky have been talking about the peculiar and eccentric weather phenomenon known as the Kentucky Meat Rain. Locals are left scratching their heads in astonishment and awe at this strange phenomenon where chunks of raw flesh fall from the sky. 
                    The Kentucky Meat Rain is still a mysterious and intriguing natural phenomenon, despite a plethora of theories and ideas regarding its cause.
                </p>
                <a className="p-5" href="">IMAGE REF</a>
                <p>
                    The first Kentucky Meat Rain was observed by the nice people of Olympia Springs, Kentucky, in 1876. 
                    This is where our voyage into the world of meaty precipitation began. People were in complete disbelief as various types of meat, including venison and steak, appeared to fall from the sky. The tale quickly became viral, igniting a flurry of interest and ideas about the meaty downpour.
                </p>
            </div>
        </div>
    )
  }
  
  export default PostPage