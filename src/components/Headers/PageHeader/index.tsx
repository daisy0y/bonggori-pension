import { useRouter } from 'next/router';

import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';

import { pageHeaderTitle } from 'lib/constants';

const StyledPageHeader = styled(Title)`
  @media screen and (max-width: 750px) {
    padding: 0 40px;
  }
`;

export const PageHeader = () => {
  const router = useRouter();
  const path = router?.pathname;

  return <StyledPageHeader>{pageHeaderTitle[path].title}</StyledPageHeader>;
};
