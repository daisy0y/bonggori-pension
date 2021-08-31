import { Input } from 'antd';

export const JoinForm = () => {
  return (
    <div>
      <p>JOIN</p>
      <div>
        <div>
          NAME
          <Input />
        </div>
        <div>
          ID
          <Input />
        </div>
        <div>
          PW
          <Input />
        </div>
        <div>
          CPW
          <Input />
        </div>
      </div>
    </div>
  );
};
