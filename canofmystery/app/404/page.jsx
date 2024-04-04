import NeoButton from "../../components/TextComponents/NeoButton";
import Header from "../../components/TextComponents/Header1";
import Paragraph from "../../components/TextComponents/Paragraph";
import React from 'react'

const PageNotFound = () => {

    return(
        <div className='flex justify-center w-full h-[92vh] dark:bg-base-100-dark'>
            <div className="flex  flex-col h-full justify-center max-w-[650px] xl:px-14 2xl:px-14 px-7">
                <Header type="xl">
                    404
                </Header>
                <Header type="lg">UH OH! You are lost!</Header>
                <div className="flex flex-col gap-[15px] text-t-header-light dark:text-t-dark">
                    <Paragraph type="md">The page you are looking for does not exist.
                    How you got here is a mystery. But you can click the button below
                    to go back to the homepage.
                    </Paragraph>
                    <form action="/">
                        <NeoButton classes="bg-primary-dark"  role="link">
                            Home
                        </NeoButton>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default PageNotFound
