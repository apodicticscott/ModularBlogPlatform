import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc, addDoc, toDate} from "firebase/firestore"
import { firebase_app } from "../config"

const db = getFirestore(firebase_app)

//by https://github.com/DerekZiemba on github. MIT License:
const dziemba_levenshtein = (a, b) => {
	var tmp;
	if (a.length === 0) { return b.length; }
	if (b.length === 0) { return a.length; }
	if (a.length > b.length) { tmp = a; a = b; b = tmp; }

	var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
	for (i = 0; i <= alen; i++) { row[i] = i; }

	for (i = 1; i <= blen; i++) {
		res = i;
		for (j = 1; j <= alen; j++) {
			tmp = row[j - 1];
			row[j - 1] = res;
			res = Math.min(tmp + (b[i - 1] !== a[j - 1]), res + 1, row[j] + 1);
		}
		row[j - 1] = res;
	}
	return res;
}

export const addDocument = async (collectionName, docData) => {
    const colRef = collection(db, collectionName);
    const response = await addDoc(colRef, docData);
    return response;
}

export const setHasPublished = async(collectionName, userId) => {
    const userDoc = doc(db, 'users', userId);
          await updateDoc(userDoc, {
            hasPublished: true,
          });
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


export const getRecent = async (num) => {
    const articles = await getApprovedArticles();

    const sortedarticles = articles.toSorted((a,b) => a.Time.toMillis()-b.Time.toMillis());
    if(num == -1){
        console.log(sortedarticles)
        return sortedarticles;
    }
    else{
        console.log(sortedarticles)
        return sortedarticles.slice(0, num);
    }
}

export const getApprovedArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const q = query(collectionRef, where("Approved", "==", true));
    const querySnapshot = await getDocs(q);
    const pagesArray = [];
    querySnapshot.forEach((doc) => {
        pagesArray.push({ id: doc.id, ...doc.data() });
    });

    return pagesArray;
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
export const fetchArticleUser = async (articleId) => {
    const docRef = doc(db, "Articles", articleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const articleData = docSnap.data();
      const articleId = articleData.UserId;
      return articleId;
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
export var articles = null

fetchArticles().then((value) => {articles = value}, (value) => {articles = value});


export const searchArticles = async (searchText = [], articles_list = [], search_provided_list=false) => {
    var search_articles = articles
    if(search_provided_list){
        search_articles = articles_list
    }
    if(searchText.length > 0){
        if(search_articles.length > 0 || search_provided_list){
            var found_articles = []
            //this is kinda inefficient, but aren't all algorithims like this are? - @989onan
            //I wish I could search like you can in python, but this is probably the best idk feel free to optimize.
            search_articles.forEach(
                (word,index) => {
                    var stop_searching_cur = false
                    var found_image = false
                    var image = ""
                    for(var index1 in searchText){
                        var search = searchText[index1] //why u not like python whyyy!?
                        for(var key in word.Content){
                            var section = word.Content[key]
                            if(section.Type == "paragraph" && !stop_searching_cur){
                                var words = section.Content.split(" ")
                                for(var indexg in words){
                                    
                                    var word1 = words[indexg] //why u not like python whyyy!?
                                    var result = dziemba_levenshtein(word1.toLowerCase(), search.toLowerCase())
                                    if(result < 3){
                                        stop_searching_cur = true
                                        break;
                                    }
                                }
                            }
                            if(stop_searching_cur){
                                break;
                            }
                        }
                        
                    }
                    for(var key in word.Content){
                        var section = word.Content[key]
                        if(section.Type == "image" && !found_image){
                            image = section.Image
                            found_image = true
                            break;
                        }
                    }
                    if(stop_searching_cur){
                        found_articles.push({id: word.id, author: word.Author, tags: word.Tags, Title: word.Title, Approved: word.Approved, first_image: image});
                    }
                }
            );
            return found_articles;
        }
        else{
            throw new Error("Articles not loaded yet!")
        }
    }
    else{
        return search_articles;
    }
    
    
    
}


export const searchByTag = async (searchtags = [], articles_list = [], search_provided_list=false) => {
    
    var search_articles = articles
    if(search_provided_list){
        search_articles = articles_list
    }
    if(searchtags.length > 0){
        if(search_articles.length > 0 || search_provided_list){
            var found_articles = []
            
            //this is kinda inefficient, but aren't all algorithims like this are? - @989onan
            //I wish I could search like you can in python, but this is probably the best idk feel free to optimize.
            search_articles.forEach(
                (word,index) => {
                    var found_image = false
                    var image = ""
                    var stop_searching_cur = false
                    for(var index1 in searchtags){
                        
                        var search = searchtags[index1] //why u not like python whyyy!?
                        for(var key in word.Tags){
                            var tag = word.Tags[key]
                            var tag = tag.Text
                            if(tag == search){
                                stop_searching_cur = true
                                break;
                            }
                        }
                        if(stop_searching_cur){
                            break;
                        }
                    }
                    for(var key in word.Content){
                        var section = word.Content[key]
                        if(section.Type == "image" && !found_image){
                            image = section.Image
                            found_image = true
                            break;
                        }
                    }
                    if(stop_searching_cur){
                        found_articles.push({id: word.id, author: word.Author, tags: word.Tags, Title: word.Title, Approved: word.Approved, first_image: image});
                    }
                    
                }
            );
            return found_articles;
        }
        else{
            throw new Error("Articles not loaded yet!")
        }
    }
    else{
        return search_articles;
    }
}
