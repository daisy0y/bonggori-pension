import { firestore } from "./initFirebase";

const getUsers = async () => {
    const snapshot = await firestore.collection("user").get();
    snapshot.docs.forEach(doc => console.log(doc));
};

export { getUsers };
