import { getFirestore, collection, query, getDocs, where, doc, deleteDoc, updateDoc, getDoc, addDoc} from "firebase/firestore"
import  firebase_app  from "../config.js"

const db = getFirestore(firebase_app)

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
        var image = ""
        for(var key in doc.data().Content){
            var section = doc.data().Content[key]
            if(section.Type == "image"){
                image = section.Image
                break;
            }
        }
        articlesArray.push({ id: doc.id, image: image, ...doc.data() });
    });
    articlesArray.sort((a,b) => b.Time.toMillis()-a.Time.toMillis())
    
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


export const getRecent = async (sliceNumber) => {
    try {
      // Call the async function getApprovedArticles
      const articles = await getApprovedArticles();
    console.log(articles)
      // Sort articles from closest to the current date and time to the furthest
      const sortedArticles = articles.sort((a, b) => {
        // Parse the timestamps into JavaScript Date objects and compare
        const dateA = new Date(a.Time); // Assuming 'a.Time' is a string in the given format
        const dateB = new Date(b.Time); // Assuming 'b.Time' is a string in the given format
        return dateB - dateA; // Sort in descending order
      });
  
  
      // Return the specified slice of articles
      return sortedArticles.slice(0, sliceNumber);
    } catch (error) {
      // Handle errors, such as logging or re-throwing
      console.error('Error fetching or sorting articles:', error);
      throw error; // Re-throw the error after logging or handling it
    }
  }

  export const updateArticle = async (articleId, newContent) => {
    const articleRef = doc(db, "Articles", articleId);
    // Update the document
    await updateDoc(articleRef, newContent).then(() => {
        console.log("Article successfully updated");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
};

export const checkPageNameExists = async (pageName) => {
    const collectionRef = collection(db, "Pages");
    const q = query(collectionRef, where("PageName", "==", pageName));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    return !querySnapshot.empty;
};

export const updatePage = async (pageId, newContent) => {
    const articleRef = doc(db, "Pages", pageId);
    // Update the document
    await updateDoc(articleRef, newContent).then(() => {
        console.log("Page successfully updated");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
};

export const getApprovedArticles = async () => {
    const collectionRef = collection(db, "Articles");
    const q = query(collectionRef, where("Approved", "==", true));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    const pagesArray = [];
    querySnapshot.forEach((doc) => {
        var image = ""
        for(var key in doc.data().Content){
            var section = doc.data().Content[key]
            if(section.Type == "image"){
                image = section.Image
                break;
            }
        }
        pagesArray.push({ id: doc.id, image: image, ...doc.data() });
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

export const fetchPage = async (pageId) => {
    const docRef = doc(db, "Pages", pageId);
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
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
};

export const searchArticles = async (searchText = [], articles_list = [], search_provided_list = false, articles) => {
    var search_articles = articles
    if (search_provided_list) {
        search_articles = articles_list
    }
    let gradedArticles = [];
    if (searchText.length > 0) {
        if (search_articles.length > 0 || search_provided_list) {
            search_articles.forEach(article => {
                let titleWeight = 0.8; // Increased weight for title relevance
                let paragraphWeight = 0.2; // Weight for paragraph relevance
                let titleCharactersMatched = 0;
                // Removing spaces from title for character count
                let totalCharactersInTitle = article.Title.replace(/\s/g, '').length;
                let paragraphMatches = 0;
                let titleGrade, paragraphGrade = 0;

                // Calculate title character match likelihood, excluding spaces from search terms
                searchText.forEach(searchTerm => {
                    let searchLower = searchTerm.toLowerCase().replace(/\s/g, '');
                    if (article.Title.toLowerCase().includes(searchLower)) {
                        titleCharactersMatched += searchLower.length;
                    }
                    // Check for paragraph matches
                    article.Content.forEach(section => {
                        if (section.Type == "paragraph" && section.Content.toLowerCase().includes(searchLower)) {
                            paragraphMatches += 1;
                            return; // Count only the first match to avoid overrepresentation
                        }
                    });
                });

                // Normalizing the character matches in title to a scale of 0 to 1
                let characterMatchRatio = titleCharactersMatched / totalCharactersInTitle;
                titleGrade = Math.min(characterMatchRatio * titleWeight, titleWeight); // Ensuring title grade does not exceed its weight
                
                // Normalizing paragraph matches (assuming 1 match per search text is optimal)
                if (searchText.length > 0 && paragraphMatches > 0) {
                    paragraphGrade = Math.min((paragraphMatches / searchText.length) * paragraphWeight, paragraphWeight);
                }

                let articleGrade = titleGrade + paragraphGrade;

                // Ensuring total grade does not exceed 1
                articleGrade = Math.min(articleGrade, 1);

                if (articleGrade > 0) {
                    gradedArticles.push({ article, grade: articleGrade });
                }
            });

            // Sort the articles based on their grades, highest to lowest
            gradedArticles.sort((a, b) => b.grade - a.grade);

            // Return the sorted array of articles
            return gradedArticles.map(item => item.article);
        } else {
            throw new Error("No articles available for searching.");
        }
    } else {
        return search_articles;
    }
};

