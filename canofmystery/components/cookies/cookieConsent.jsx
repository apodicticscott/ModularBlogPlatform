import React, {useState} from 'react';
import { motion } from 'framer-motion';
import NeoButton from '../TextComponents/NeoButton';
import Paragraph from '../TextComponents/Paragraph';
import Header from '../TextComponents/Header1';
import { Divider } from '@material-ui/core';

const variants = {
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    hidden: { y: 100, opacity: 0, transition: { duration: 1 } }
};

const CookieConsent = ({ setCookieConsent, classes, cookieConsent }) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <motion.div 
            className={`fixed w-[100vw] bottom-0 bg-base-100 border-t-3 flex justify-center py-7 z-[20] shadow px-7 ${classes}`} 
            variants={variants} 
            initial="hidden" 
            animate={cookieConsent ? "hidden" : isHidden ? "hidden" : "visible"}
        >
            <div className="flex flex-col xl:flex-row w-full lg:w-max  items-start lg:items-center gap-[25px] xl:gap-0">
                <div className='flex flex-col w-full lg:w-max items-start xl:flex-row xl:items-center transition-all duration-200'>
                    <Header type="sm" classes="w-full lg:w-max pb-[15px] xl:pb-0">
                        This site uses cookies.
                    </Header>
                    <Divider className="w-full flex xl:hidden" />
                    <Divider orientation="vertical" variant="middle" className="hidden xl:flex" flexItem />
                    <Paragraph type="md" classes="w-full lg:w-max pb-0 xl:pb-[15px]">
                        We collect cookies to analyze our website traffic and performance; we never collect any personal data.
                    </Paragraph>
                </div>
                <Divider orientation="vertical" variant="middle" className="hidden xl:flex" flexItem />
                <div className='flex justify-between h-max w-full items-center xl:w-max xl:gap-[15px] mt-[15px] lg:mt-0'>
                    <NeoButton classes="h-max w-max bg-primary-dark " onClick={() => setCookieConsent(true)}>
                        I Consent
                    </NeoButton>
                    <button className='w-max h-max hover:underline' onClick={() => setIsHidden(true)}>
                        Hide
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

export default CookieConsent;
