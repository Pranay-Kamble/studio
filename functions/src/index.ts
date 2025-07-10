import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (already done if you used init functions)
// admin.initializeApp();

const db = admin.firestore();

// Cloud Function to increment answerCount on question when an answer is created
export const incrementAnswerCount = functions.firestore
  .document('questions/{questionId}/answers/{answerId}')
  .onCreate(async (snapshot, context) => {
    const questionId = context.params.questionId;
    const questionRef = db.collection('questions').doc(questionId);

    try {
      await db.runTransaction(async (transaction) => {
        const questionDoc = await transaction.get(questionRef);

        if (!questionDoc.exists) {
          console.warn(`Question with ID ${questionId} does not exist.`);
          return; // Exit if the question document doesn't exist
        }

        const currentAnswerCount = questionDoc.data()?.answerCount || 0;
        const newAnswerCount = currentAnswerCount + 1;

        transaction.update(questionRef, { answerCount: newAnswerCount });

        console.log(`Incremented answerCount for question ${questionId} to ${newAnswerCount}`);
      });

      return null; // Indicate success
    } catch (error) {
      console.error(`Error incrementing answerCount for question ${questionId}:`, error);
      return null; // Indicate failure (or handle error as needed)
    }
  });
