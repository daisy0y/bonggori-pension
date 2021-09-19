import firebase from "firebase";

export interface firestoreData {
    data: firebase.firestore.DocumentData[];
    loading: boolean;
    error: firebase.firestore.FirestoreError;
}
