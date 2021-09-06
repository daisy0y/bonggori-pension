import { Chat, Test } from 'components';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import styles from 'styles/Home.module.css';
export default function Home() {


  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <Test />
      <Chat />
    </div>
  );
}
