import { LargeHeader, NeoButton, XLHeader } from '@/components/TextComponents';
import React from 'react'

const PageNotFound = () => {

    return(
        <div className='flex justify-center w-full h-[92vh] dark:bg-base-100-dark'>
            <div className="flex  flex-col h-full justify-center max-w-[650px] xl:px-14 2xl:px-14 px-7">
                <XLHeader style="text-7xl md:text-7xl lg:text-7xl  ">
                    404
                </XLHeader>
                <LargeHeader>UH OH! You're lost.</LargeHeader>
                <div className="flex flex-col gap-[15px] text-t-header-light dark:text-t-dark">
                    <p>The page you are looking for does not exist.
                    How you got here is a mystery. But you can click the button below
                    to go back to the homepage.
                    </p>
                    <form action="/">
                        <NeoButton style="w-[94px] dark:text-base-300"  role="link">
                            Home
                        </NeoButton>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default PageNotFound
