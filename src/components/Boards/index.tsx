import { Table, TableColumnsType } from 'antd';
import styled from 'styled-components';

import { AnswerItem } from 'components';

interface BoardProps {
  columns: TableColumnsType;
  isPc: boolean;
  dataSource: any;
}

const StyledBoards = styled(Table)<{ isPc: boolean }>`
  .board-content .ant-table-cell {
    padding: 40px 0 40px 102px;
  }
  @media screen and (max-width: 750px) {
    padding: 0 40px;
  }
`;

export const Boards = (props: BoardProps) => {
  const { columns, dataSource, isPc } = props;

  return (
    <StyledBoards
      isPc={isPc}
      columns={columns}
      dataSource={dataSource}
      pagination={{ position: ['bottomCenter'] }}
      expandable={{
        expandedRowRender: (record: any) => (
          <>
            <section>
              {record?.boardContent.split('\n').map((text: string, index: number) => (
                <p key={index}>{text}</p>
              ))}
            </section>
            {record?.answer ? <AnswerItem answer={record?.answer} /> : <></>}
          </>
        ),
        rowExpandable: (record: any) => record?.boardContent !== 'Not Expandable',
        expandedRowClassName: () => 'board-content',
      }}
    />
  );
};
