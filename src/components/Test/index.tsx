import Link from 'next/link';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Button } from 'antd';

// import { testState, testValue } from 'recoil/test';
import { testState } from 'recoil/test';


import { useEffect } from 'react';
import { getUsers } from 'utils/users';

const ThemeTest = styled.div`
  color: ${props => props.theme.testColor};
`;

export const Test = () => {
  // const testValueComponent = useRecoilValue(testValue);
  const [recoiltest, setRecoilTest] = useRecoilState(testState);

  const [test, setTest] = useRecoilState(testState);

  const [value, loading, error] = useCollection(firebase.firestore().collection('imform'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleState = () => {
    setRecoilTest('바꼇당!!!');
  };

  useEffect(() => {
    getUsers();
  }, []);



  // console.log(testValueComponent, 'TVC');

  return (
    <div>
      <button onClick={handleState}>버튼이에오</button>
      {loading && <div>로딩중이다</div>}
      <Link href="/sample">
        <a>샘플페이지 이동</a>
      </Link>

      {value?.docs.map(e => console.log(e.data()))}
      <Button>개미 버튼</Button>
      <ThemeTest>THEME PROVIDER TEST</ThemeTest>
    </div>
  );
};
