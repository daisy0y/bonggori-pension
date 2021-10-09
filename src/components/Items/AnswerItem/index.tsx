import React from 'react';
import styled from 'styled-components';

interface AnswerItemProps {
  writer: string;
  created: {
    seconds: number;
    nanoseconds: number;
  };
  answerContent: string;
}

const StyledAnswerItem = styled.div`
  background: #faf9f5;
  margin-top: 20px;
  padding: 20px;
  .answer-writer {
    font-weight: bold;
    margin-right: 20px;
  }
`;

export const AnswerItem = (props: any) => {
  const { answer } = props;

  return (
    <StyledAnswerItem>
      <div>
        <span className="answer-writer">{answer.writer}</span>
        <span>{new Date(answer.created.seconds).toISOString().split('T')[0]}</span>
      </div>
      <section>
        {answer.answerContent.split('\n').map((text: string, index: number) => (
          <p key={index}>{text}</p>
        ))}
      </section>
    </StyledAnswerItem>
  );
};
