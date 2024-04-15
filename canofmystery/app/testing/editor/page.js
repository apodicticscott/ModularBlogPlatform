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

    const [user, setUser] = useState('');
    const [article, setArticle] = useState(null);

    

    return (
        <div className="w-full h-max dark:bg-base-100-dark pt-[67px] relative">
            <TextEditor testing={true}/>
        </div>
    );
}
