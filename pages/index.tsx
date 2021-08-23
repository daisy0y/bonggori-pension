import styles from "../styles/Home.module.css";
import styled from "styled-components";
// import { useRecoilState } from "recoil";
// import { testState } from "../states";
import Link from "next/link";
import { Button } from "antd";

const ThemeTest = styled.div`
    color: ${props => props.theme.testColor};
`;
export default function Home() {
    // const [test, setTest] = useRecoilState(testState);
    // console.log(test);

    // const handleState = () => {
    //     setTest("바꼇당!!!");
    // };
    return (
        <div className={styles.container}>
            {/* <button onClick={handleState}>버튼이에오</button> */}
            <Link href='/sample'>
                <a>샘플페이지 이동</a>
            </Link>
            <Button>개미 버튼</Button>
            <ThemeTest>THEME PROVIDER TEST</ThemeTest>
        </div>
    );
}
