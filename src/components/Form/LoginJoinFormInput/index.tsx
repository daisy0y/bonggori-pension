import { Form, FormItemProps, Input, InputProps } from 'antd';
import styled from 'styled-components';

const StyledLoginJoinFormInput = styled(Form.Item)`
  border-bottom: 1px solid black;
  height: 100px;
  align-items: center;
  margin-bottom: 24px !important;
  .ant-form-item-label {
    width: 100px;
    text-align: left;
  }
  .ant-form-item-label > label {
    font-size: 30px;
    font-weight: bold;
  }

  .ant-form-item-label > label::after {
    content: '';
  }

  .ant-input {
    height: 90px;
    font-size: 30px;
  }

  .ant-form-item-explain.ant-form-item-explain-error {
    text-align: left;
    position: absolute;
    top: 100px;
  }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    content: '';
  }
`;

interface LoginJoinFormInputProps extends FormItemProps {
  inputProps?: InputProps;
}

export const LoginJoinFormInput = (props: LoginJoinFormInputProps) => {
  const { inputProps, ...rest } = props;
  return (
    <StyledLoginJoinFormInput {...rest}>
      <Input {...inputProps} bordered={false} />
    </StyledLoginJoinFormInput>
  );
};
