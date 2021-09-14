import { Tabs, TabsProps } from 'antd';
import { MainRoomsList } from 'models/Rooms/rooms.model';
import React, { HTMLAttributes, ReactNode } from 'react';

const { TabPane } = Tabs;

interface RoomTabProps extends TabsProps {
  tabList: MainRoomsList[];
  onChange: (e) => void;
  roomContent: ReactNode;
}

export const CommonTab = (props: RoomTabProps) => {
  const { roomContent, tabList, onChange, ...rest } = props;
  return (
    <Tabs onChange={onChange} {...rest}>
      {tabList.map(tab => {
        return (
          <TabPane tab={tab.roomTypeName} key={tab.roomTypeName}>
            {roomContent}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
