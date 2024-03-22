import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc, addDoc} from "firebase/firestore"
import { firebase_app } from "../config"

const db = getFirestore(firebase_app)

export const searchArticles = async (searchText) => {
    const collectionRef = collection(db, "Articles");
    const snapshot = await getDocs(collectionRef);
    const articlesArray = [];

    snapshot.forEach(doc => {
        const data = doc.data();
        const searchContent = JSON.stringify(data).toLowerCase();
        if (searchContent.includes(searchText.toLowerCase())) {
            articlesArray.push({ id: doc.id, ...data });
        }
    });
    return articlesArray;
}

export const addDocument = async (collectionName, docData) => {
    const colRef = collection(db, collectionName);
    const response = await addDoc(colRef, docData);
    return response;
}

export const getPageByName = async (pageName) => {
    const collectionRef = collection(db, "Pages");
    const q = query(collectionRef, where("PageName", "==", pageName));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
    return result;
};

export const fetchArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const querySnapshot = await getDocs(collectionRef);

    const articlesArray = [];
    querySnapshot.forEach((doc) => {
        articlesArray.push({ id: doc.id, ...doc.data() });
    });

    return articlesArray;
};

export const fetchPages = async () => {
    const collectionRef = collection(db, "Pages");
    const querySnapshot = await getDocs(collectionRef);

    const pagesArray = [];
    querySnapshot.forEach((doc) => {
        pagesArray.push({ id: doc.id, ...doc.data() });
    });

    return pagesArray;
};

export const deleteArticles = async (selectedArticles) => {
    await Promise.all(selectedArticles.map(async (id) => {
        const docRef = doc(db, "Articles", id);
        await deleteDoc(docRef);
    }));
}


export const deletePages = async (selectedPages) => {
    await Promise.all(selectedPages.map(async (id) => {
        const docRef = doc(db, "Pages", id);
        await deleteDoc(docRef);
    }));
}


export const getTotalUnapprovedArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const q = query(collectionRef, where("Approved", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
}

export const getTotalUnapprovedPages = async () => {
    const collectionRef = collection(db, "Pages");
    const q = query(collectionRef, where("Approved", "==", false));
    const querySnapshot = await getDocs(q);
    console.log("here!!! lol")
    return querySnapshot.docs.length;
}

export const setPagesApproval = async (pageIds, boolean) => {
    await Promise.all(pageIds.map(async (id) => {
        const docRef = doc(db, "Pages", id);
        await updateDoc(docRef, { Approved: boolean});
    }));
}

export const setArticlesApproval = async (articleIds, boolean) => {
    await Promise.all(articleIds.map(async (id) => {
        const docRef = doc(db, "Articles", id);
        await updateDoc(docRef, { Approved: boolean});
    }));
}

export const fetchCitationGuide = async () => {
    const docRef = doc(db, "CitationGuide", "V9LQ0H3UixafSHZ3eJwK");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
};

export const fetchArticle = async (articleId) => {
    const docRef = doc(db, "Articles", articleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null
    }
};

export const fetchOurProject = async () => {
    const docRef = doc(db, "OurProject", "P3R6qkjBjHnyg2CPOo2Z");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
};
