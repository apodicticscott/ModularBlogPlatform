"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "../../../components/textEditor/TextEditor";
import PageNotFound from "../../not-found";
import { fetchArticle } from "../../../firebase/articleUtils/articleUtils";
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

    const [isWriter, setIsWriter] = useState(false);

    useEffect(() => {
        if (hasId) {
            setLoading(true);

            fetchArticle(articleId).then((exists) => {
                if (exists === null) {
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
                }
                console.log(exists);
            });
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setIsWriter(userData.studentWriter === true || userData.adminPerm === true);
                } else {
                    console.log("No such User");
                }
            } else {
                router.push('/login'); 
            }
        });

        return () => unsubscribe();
    }, [hasId]);

    // Adjustments to handle editorType and articleId states
    useEffect(() => {
        if (editorType !== "new" && editorType !== undefined && articleId === undefined) {
            setArticleId(editorType);
            setHasId(true);
        }
    }, [editorType, articleId]);

    if (pageType !== "page" && pageType !== "blog") {
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
                            <TextEditor pageType={pageType} editorType={editorType} />
                        )
                    }
                    {
                        loadReady && (
                            <TextEditor pageType={pageType} editorType={editorType} articleId={articleId}/>
                        )
                    }
                </>
                :
                <PageNotFound />
            }


            
        </div>
    );
}
