import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { testState } from "../states";
import Link from "next/link";
import { Button } from "antd";

import firebase from "../utils/initFirebase";
import { useCollection } from "react-firebase-hooks/firestore";
const ThemeTest = styled.div`
    color: ${props => props.theme.testColor};
`;
export default function Home() {
    const [test, setTest] = useRecoilState(testState);

    const [value, loading, error] = useCollection(firebase.firestore().collection("imform"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const handleState = () => {
        setTest("바꼇당!!!");
    };

    return (
        <div className={styles.container}>
            <button onClick={handleState}>버튼이에오</button>
            {loading && <div>로딩중이다</div>}
            <Link href='/sample'>
                <a>샘플페이지 이동</a>
            </Link>

            {value?.docs.map(e => console.log(e.data()))}
            <Button>개미 버튼</Button>
            <ThemeTest>THEME PROVIDER TEST</ThemeTest>
        </div>
    );
}
