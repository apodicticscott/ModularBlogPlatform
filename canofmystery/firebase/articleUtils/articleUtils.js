import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"
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

export const addDoc = async (collection, doc) => {
    // Reference to the 'Articles' collection
    const articleColRef = collection(db, collection);
    const response = await addDoc(articleColRef, doc)

    return response;
}

export const addPage = async (page) => {
    // Reference to the 'Articles' collection
    const pageColRef = collection(db, 'Pages');
    const response = await addDoc(pageColRef, page)

    return response;
}

export const fetchArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const querySnapshot = await getDocs(collectionRef);

    const articlesArray = [];
    querySnapshot.forEach((doc) => {
        articlesArray.push({ id: doc.id, ...doc.data() });
    });

    return articlesArray;
};

export const deleteArticles = async (selectedArticles) => {
    await Promise.all(selectedArticles.map(async (id) => {
        const docRef = doc(db, "Articles", id);
        await deleteDoc(docRef);
    }));
}

export const getTotalUnapprovedArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const q = query(collectionRef, where("Approved", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
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
