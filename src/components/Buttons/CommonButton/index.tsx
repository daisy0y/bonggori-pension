import { Button, ButtonProps } from 'antd';

interface CommonButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const CommonButton = (props: CommonButtonProps) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
};
