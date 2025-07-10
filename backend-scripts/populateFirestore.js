const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://YOUR_PROJECT_ID.firebaseio.com` // Replace with your project ID
});

const db = admin.firestore();

const populateFirestore = async () => {
  try {
    // Add Subjects
    const subjectsRef = db.collection('subjects');
    const initialSubjects = [
      { id: 'literature', name: 'Literature', icon: 'Book' },
      { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical' },
      { id: 'computerscience', name: 'Computer Science', icon: 'Code' },
      { id: 'mathematics', name: 'Mathematics', icon: 'Sigma' },
      { id: 'history', name: 'History', icon: 'History' },
      { id: 'music', name: 'Music', icon: 'Music' },
      { id: 'art', name: 'Art', icon: 'Brush' },
      { id: 'geography', name: 'Geography', icon: 'Globe' },
      { id: 'psychology', name: 'Psychology', icon: 'Brain' },
      { id: 'biology', name: 'Biology', icon: 'Dna' },
      { id: 'economics', name: 'Economics', icon: 'HandHelping' },
      { id: 'custom', name: 'Custom Subject', icon: 'HelpCircle' },
    ];

    for (const subject of initialSubjects) {
      await subjectsRef.doc(subject.id).set(subject);
      console.log(`Added subject: ${subject.name}`);
    }

    // Add Tags
    const tagsRef = db.collection('tags');
    const initialTags = [
      { id: 'calculus', name: 'calculus' },
      { id: 'react', name: 'react' },
      { id: 'shakespeare', name: 'shakespeare' },
      { id: 'organic-chemistry', name: 'organic-chemistry' },
      { id: 'data-structures', name: 'data-structures' },
      { id: 'world-war-2', name: 'world-war-2' },
    ];

    for (const tag of initialTags) {
      await tagsRef.doc(tag.id).set(tag);
      console.log(`Added tag: ${tag.name}`);
    }

    console.log('Firestore populated successfully!');

  } catch (error) {
    console.error('Error populating Firestore:', error);
  }
};

populateFirestore();
