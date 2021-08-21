import { useRecoilState } from "recoil";
import { testState } from "../../states";

export default function sample() {
    const [test, setTest] = useRecoilState(testState);

    return <div>{test}</div>;
}
