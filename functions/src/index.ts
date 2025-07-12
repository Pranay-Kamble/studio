import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();


export const incrementAnswerCount =
onDocumentCreated(
  "questions/{questionId}/answers/{answerId}",
  async (event) => {
    // const snapshot = event.data;
    // event.params.answerId is available but not used in this function
    const questionId = event.params.questionId;
    const questionRef = db.collection("questions").doc(questionId);

    try {
      await db.runTransaction(async (transaction) => {
        const questionDoc = await transaction.get(questionRef);

        if (!questionDoc.exists) {
          console.warn(
            `Question with ID ${questionId} does not exist.`
          );
          return;
        }

        const currentAnswerCount = questionDoc.data()?.answerCount || 0;
        const newAnswerCount = currentAnswerCount + 1;

        transaction.update(questionRef, {
          answerCount: newAnswerCount, // Added trailing comma
        });

        console.log(
          `Incremented answerCount for question ${questionId}`+
          `to ${newAnswerCount}`
        );
      });

      return null;
    } catch (error) {
      console.error(
        `Error incrementing answerCount for question ${questionId}:`,
        error, // Added trailing comma
      );
      return null;
    }
  }
);
