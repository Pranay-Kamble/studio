import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, getDoc , query, orderBy } from 'firebase/firestore'; // Ensure doc and getDoc are imported
import app from './firebase'; // Import the initialized Firebase app

export const db = getFirestore(app);

export const getQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    const questions: any[] = [];
    for (const questionDoc of querySnapshot.docs) {
      const questionData = questionDoc.data();
      const authorId = questionData.authorId;
      const subjectId = questionData.subjectId;
      let author: any = null;
      let subject: any = null;

      // Fetch author data
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

      // Fetch subject data
      if (subjectId) {
        const subjectDoc = await getDoc(doc(db, 'subjects', subjectId));
        if (subjectDoc.exists()) {
          subject = { id: subjectDoc.id, ...subjectDoc.data() };
        } else {
          console.warn(`Subject with ID ${subjectId} not found.`);
          subject = { id: subjectId, name: 'Unknown Subject', icon: '' };
        }
      } else {
           console.warn(`Question with ID ${questionDoc.id} is missing subjectId.`);
           subject = { id: 'unknown', name: 'Unknown Subject', icon: '' };
      }


      questions.push({ id: questionDoc.id, ...questionData, author, subject });
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
  } catch (error) {
    console.error("Error adding document in firestore.ts: ", error);
    throw error;
  }
};

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

export const getQuestionById = async (questionId: string) => {
  try {
    const questionDocRef = doc(db, 'questions', questionId);
    const questionDocSnap = await getDoc(questionDocRef);

    if (questionDocSnap.exists()) {
      const questionData: any = { id: questionDocSnap.id, ...questionDocSnap.data() };

      // Fetch author data (Existing logic)
      let author: any = null;
      if (questionData.authorId) {
        const authorDoc = await getDoc(doc(db, 'users', questionData.authorId));
        if (authorDoc.exists()) {
          author = { id: authorDoc.id, ...authorDoc.data() };
        } else {
          console.warn(`Author with ID ${questionData.authorId} not found for question ${questionId}.`);
          author = { id: questionData.authorId, name: 'Unknown User', avatar: '' };
        }
      } else {
          console.warn(`Question with ID ${questionId} is missing authorId.`);
          author = { id: 'unknown', name: 'Unknown User', avatar: '' };
      }

      // Fetch subject data (Existing logic)
      let subject: any = null;
      if (questionData.subjectId) {
         const subjectDoc = await getDoc(doc(db, 'subjects', questionData.subjectId));
         if (subjectDoc.exists()) {
           subject = { id: subjectDoc.id, ...subjectDoc.data() };
         } else {
            console.warn(`Subject with ID ${questionData.subjectId} not found for question ${questionId}.`);
            subject = { id: questionData.subjectId, name: 'Unknown Subject', icon: '' };
         }
      } else {
           console.warn(`Question with ID ${questionId} is missing subjectId.`);
           subject = { id: 'unknown', name: 'Unknown Subject', icon: '' };
      }

      // **Fetch answers subcollection (New logic)**
      const answersCollectionRef = collection(db, 'questions', questionId, 'answers');
      // Optional: Order answers by createdAt
      const q = query(answersCollectionRef, orderBy('createdAt', 'asc'));
      const answersSnapshot = await getDocs(q);

      const answers: any[] = [];
      for (const answerDoc of answersSnapshot.docs) { // Changed loop variable name
          const answerData = answerDoc.data(); // Use the new variable name
          // You might also want to fetch the author data for each answer here
          // Similar to how we fetch author for questions
          let answerAuthor: any = null;
          if (answerData.authorId) {
              const answerAuthorDoc = await getDoc(doc(db, 'users', answerData.authorId)); // Correctly using imported doc function
              if (answerAuthorDoc.exists()) {
                 answerAuthor = { id: answerAuthorDoc.id, ...answerAuthorDoc.data() };
              } else {
                 console.warn(`Author with ID ${answerData.authorId} not found for answer ${answerDoc.id}.`); // Use new variable name
                 answerAuthor = { id: answerData.authorId, name: 'Unknown User', avatar: '' };
              }
          } else {
             console.warn(`Answer with ID ${answerDoc.id} is missing authorId.`); // Use new variable name
             answerAuthor = { id: 'unknown', name: 'Unknown User', avatar: '' };
          }

          answers.push({ id: answerDoc.id, ...answerData, createdAt: answerData.createdAt.toDate(), author: answerAuthor });

      }
      console.log("Fetched answers for question:", answers);
      // **End of answers fetching logic**


      console.log("Fetched single question with author, subject, and answers:", { ...questionData, author, subject, answers });
      return { ...questionData, author, subject, answers }; // Return question with author, subject, AND answers
    } else {
      console.log("No such question document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

export const addAnswer = async (questionId: string, answerData: {
  content: string;
  authorId: string;
}) => {
  try {
    console.log(`Attempting to add answer to question ${questionId}...`);
    console.log("Answer data being sent to Firestore:", answerData);

    const answersCollectionRef = collection(db, 'questions', questionId, 'answers');
    const docRef = await addDoc(answersCollectionRef, {
      ...answerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      upvoteCount: 0,
    });
    console.log(`Answer document written with ID: ${docRef.id} for question ${questionId}`);

    // Optional: Implement logic here or in a Cloud Function to increment answerCount on the parent question document

    return docRef.id;
  } catch (error) {
    console.error("Error adding answer in firestore.ts: ", error);
    throw error;
  }
};
