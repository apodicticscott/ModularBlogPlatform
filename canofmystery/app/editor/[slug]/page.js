'use client'
import React, { useState, useEffect } from "react";
import TextEditor from "../../../components/textEditor/TextEditor";
import { useRouter } from 'next/navigation';
import firebase_app from '/firebase/config';
import { app } from "../../../app/firebase"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const firestore = getFirestore(app);

export default function Page({params}) {
    const articleId = params.slug;
    const router = useRouter();
    const [isWriter, setIsWriter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setIsWriter(userData.studentWriter === true || userData.adminPerm === true);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                router.push('/');
                console.log("No such document!");
            }
        } else {
            setIsLoading(true);
            router.push('/login'); 
        }
        });

        return () => unsubscribe();
    }, []);


    if (isLoading) {
        return (
            <>
                <div className="w-full h-[100vh] flex items-center justify-center dark:text-base-100 dark:bg-base-100-dark pt-[67px]">
                    <div className="font-bold">Loading..</div>
                </div>
            </>
        )
    }

    if (!isWriter) {
        return (
            <>
                <div className="w-full h-[100vh] flex items-center justify-center dark:text-base-100 dark:bg-base-100-dark pt-[67px]">
                    <div className="font-bold">Unauthorized Access</div>
                </div>
            </>
        )
    }
    return(
        <>
            <div className="w-full h-max dark:bg-base-100-dark pt-[67px]">
                <TextEditor articleId={articleId}/>
            </div>
        </>
    )

}
