"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "../../../components/textEditor/TextEditor";
import PageNotFound from "../../not-found";
import { fetchArticle, fetchArticleUser, fetchPage } from "../../../firebase/articleUtils/articleUtils";
import Loader from "../../../components/loader/loader";
import firebase_app from '../../../firebase/config';
import { app } from "../../../app/firebase"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const firestore = getFirestore(app);


export default function Page({ params }) {
    const router = useRouter();

    const slug = params.slug;

    const [pageType, setPageType] = useState(slug && slug[0]);
    const [editorType, setEditorType] = useState(slug && slug[1]);
    const [articleId, setArticleId] = useState(slug && slug[2]);
    const [hasId, setHasId] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadReady, setLoadReady] = useState(false)
    const [exists, setExists] = useState(false);
    const [hideLoader, setHideLoader] = useState(false)
    // State to manage loader opacity
    const [loaderOpacity, setLoaderOpacity] = useState(1);

    const [isWriter, setIsWriter] = useState(true);
    const [hasPublished, setHasPublished] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);
    const [user, setUser] = useState('');
    const [articleUser, setArticleUser] = useState('');
    const [article, setArticle] = useState(null);

    

    useEffect(() => {
        console.log("here 23")
        if (hasId) {
            setLoading(true);
            if(pageType === "blog"){
                fetchArticle(articleId).then(response => {
                    if (response === null) {
                        // Ensure loader stays for 2 more seconds after loading is done
                        setTimeout(() => setLoading(false), 2000);
                        setTimeout(() => setHideLoader(true), 2500);
                        setExists(false);
                    } else {
                        // Ensure loader stays for 2 more seconds after loading is done
                        setLoadReady(true);
                        setTimeout(() => setLoading(false), 2000);
                        setTimeout(() => setHideLoader(true), 2500);
                        setExists(true);
                        setArticle(response)
                    }
                });
            }else if(pageType === "page"){
                
                fetchPage(articleId).then(response => {
                    if (response === null) {
                        // Ensure loader stays for 2 more seconds after loading is done
                        setTimeout(() => setLoading(false), 2000);
                        setTimeout(() => setHideLoader(true), 2500);
                        setExists(false);
                    } else {
                        // Ensure loader stays for 2 more seconds after loading is done
                        setLoadReady(true);
                        setTimeout(() => setLoading(false), 2000);
                        setTimeout(() => setHideLoader(true), 2500);
                        setExists(true);
                        setArticle(response)
                    }
                });
            }
        }
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try{
                    const docRef = doc(firestore, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setTimeout(() => setLoading(false), 2000);
                        setTimeout(() => setHideLoader(true), 2500);
                        setIsWriter(userData.studentWriter);
                        setIsAdmin(userData.adminPerm);
                        setHasPublished(userData.hasPublished);
                        setUser(userData);
                        
                    } else {
                        console.log("No such User");
                    }
                }catch(error){
                    console.log(error)
                }

            } else {
                router.push('/login'); 
            }
        });

        setTimeout(() => setHideLoader(true), 2500)
        return () => unsubscribe();
    }, [hasId]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = await fetchArticleUser(articleId);
                setArticleUser(userId); // Set articleUser state with the returned userId
            } catch (error) {
                console.error('Error fetching article user:', error);
            }
        };

        if(exists){
            fetchUser(); // Call fetchUser function when component mounts or articleId changes
        }
    }, [exists]);

    // Adjustments to handle editorType and articleId states
    useEffect(() => {
        if (editorType !== "new" && editorType !== undefined && articleId === undefined) {
            setArticleId(editorType);
            setHasId(true);
        }
    }, [editorType, articleId]);

    if (articleUser === user.uid && !isAdmin){
        //console.log("here7");
        return <PageNotFound />;
    }

    if (pageType !== "page" && pageType !== "blog") {
        //console.log("here1")
        return <PageNotFound />;
    }

    if(pageType === "page" && !isAdmin && !loading){
        //console.log("here2")
        return <PageNotFound />;
    }

    if(hasPublished && !isAdmin && !loading){
        //console.log("here3")
        return <PageNotFound />;
    }

    if(!isWriter && !isAdmin && !loading){
        //console.log("here6")
        return <PageNotFound />;
    }

    return (
        <div className="w-full h-max dark:bg-base-100-dark pt-[67px] relative">
            {
                ((pageType === "page" || pageType === "blog") &&  editorType !== undefined)
                ?
                <>
                    {
                        !hideLoader
                        &&
                        <div
                            className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-base-100 ${loading ? "opacity-100" : "opacity-0"} transition-all duration-500`}
                        >
                            <Loader className={`${loading ? "scale-100" : "scale-70"} transition duration-500`}/>
                        </div>
                    }

                    {
                        !loadReady && (
                            <></>
                        )
                    }
                    {
                        loadReady && (
                            <TextEditor pageType={pageType} editorType={editorType} articleId={articleId} article={article} user={user}/>
                        )
                    }
                </>
                :
                <PageNotFound />
            }


            
        </div>
    );
}
