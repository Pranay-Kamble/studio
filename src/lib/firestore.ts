import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc
import app from './firebase'; // Import the initialized Firebase app

const db = getFirestore(app);

export const getQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    const questions: any[] = [];
    for (const questionDoc of querySnapshot.docs) {
      const questionData = questionDoc.data();
      const authorId = questionData.authorId;
      const subjectId = questionData.subjectId; // <--- Get subjectId
      let author: any = null;
      let subject: any = null; // <--- Initialize subject variable

      // Fetch author data (Existing logic)
      if (authorId) {
        const authorDoc = await getDoc(doc(db, 'users', authorId));
        if (authorDoc.exists()) {
          author = { id: authorDoc.id, ...authorDoc.data() };
        } else {
          console.warn(`Author with ID ${authorId} not found.`);
          author = { id: authorId, name: 'Unknown User', avatar: '' };
        }
      } else {
           console.warn(`Question with ID ${questionDoc.id} is missing authorId.`);
           author = { id: 'unknown', name: 'Unknown User', avatar: '' };
      }

      // --- Add the subject fetching logic here ---
      // Fetch subject data
      if (subjectId) { // <--- Check if subjectId exists
        const subjectDoc = await getDoc(doc(db, 'subjects', subjectId)); // <--- Fetch subject document
        if (subjectDoc.exists()) { // <--- Check if subject document exists
          subject = { id: subjectDoc.id, ...subjectDoc.data() }; // <--- Extract subject data
        } else {
          console.warn(`Subject with ID ${subjectId} not found.`); // <--- Handle not found case
          // Provide a default subject or handle this case
          subject = { id: subjectId, name: 'Unknown Subject', icon: '' }; // <--- Provide a default
        }
      } else { // <--- Handle case where subjectId is missing
          console.warn(`Question with ID ${questionDoc.id} is missing subjectId.`);
          // Provide a default subject for questions without subjectId
          subject = { id: 'unknown', name: 'Unknown Subject', icon: '' }; // <--- Provide a default
      }
      // --- End of subject fetching logic ---


      questions.push({ id: questionDoc.id, ...questionData, author, subject }); // <--- Attach both author and subject
    }
    console.log("Fetched questions with authors and subjects:", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};


export const addQuestion = async (questionData: {
  title: string;
  content: string;
  authorId: string;
  subjectId: string;
  tags: string[];
}) => {
  try {
    console.log("Attempting to add document to 'questions' collection...");
    console.log("Data being sent to Firestore:", questionData);

    const docRef = await addDoc(collection(db, 'questions'), {
      ...questionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      answerCount: 0,
      viewCount: 0,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error("Error adding document in firestore.ts: ", error);
    throw error;
  }
};

// Add function to get a user by ID
export const getUserById = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("Fetched user:", userDocSnap.data());
      return { id: userDocSnap.id, ...userDocSnap.data() };
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getSubjectById = async (subjectId: string) => {
  try {
    const subjectDocRef = doc(db, 'subjects', subjectId);
    const subjectDocSnap = await getDoc(subjectDocRef);

    if (subjectDocSnap.exists()) {
      console.log("Fetched subject:", subjectDocSnap.data());
      return { id: subjectDocSnap.id, ...subjectDocSnap.data() };
    } else {
      console.log("No such subject document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching subject:", error);
    throw error;
  }
};


// You will add other data fetching functions here (e.g., getQuestionById, getAnswersForQuestion, etc.)
