'use client'
import NeoButtonLink from "../TextComponents/NeoButtonLink";


const json_article_cards_array = [
    {title:"Bog Bodies",link:"../link/to/page"},
    {title:"Wiking Runestones In America",link:"../link/to/page"},
    {title:"Kolmanskop, Nambia",link:"../link/to/page"},
    {title:"Fiji Mermaid",link:"../link/to/page"},
    {title:"The Wawel Dragon",link:"../link/to/page"},
    {title:"Hill of Crosses, Lithuania",link:"../link/to/page"},
    {title:"Queen Mary, Long Beach, California",link:"../link/to/page"},
    {title:"Point Des Arts Bridge, Paris",link:"../link/to/page"},
    {title:"Kolmanskop, Namibia",link:"../link/to/page"},
    {title:"Shroud of Turin",link:"../link/to/page"}
];

const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = ['HTML', 'CSS', 'JavaScript', 'Typescript', 'Tailwind', 'React', 'Next.js', 'Gatsby', 'UI/UX', 'SVG', 'animation', 'webdev'];
const DURATION = 15000;
const ROWS = 5;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort( () => .5 - Math.random() );





const CanItemsScroll = () => {
    return (
        <>
            <div className={`h-[75px] lg:h-[100px] bg-primary-dark border-b-3 border-base-300 loop-slider overflow-hidden dark:bg-base-100-dark`} style={{
        '--duration': `${random(DURATION - 7000, DURATION + 7000)}ms`,
        '--direction': 'reverse'
      }}>
                <div className="snap-proximity snap-x flex gap-[40px] flex-nowrap  h-full items-center inner">
                    {
                        json_article_cards_array.map((tag, index) => (
                            <NeoButtonLink key={`${index}-${tag.title}`} className="tag" link={tag.link} style={"snap-center bg-base-100 p-2"}> {tag.title}</NeoButtonLink>
                        ))
                    }
                    {
                        json_article_cards_array.map((tag, index) => (
                            <NeoButtonLink key={`${index}-${tag.title}`} className="tag" link={tag.link} style={"snap-center bg-base-100 p-2"}>{tag.title}</NeoButtonLink> 
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default CanItemsScroll;