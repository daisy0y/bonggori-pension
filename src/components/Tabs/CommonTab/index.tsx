import React, { ReactNode } from 'react';

import { Tabs, TabsProps } from 'antd';

import { MainRooms } from 'models/Rooms/rooms.model';

const { TabPane } = Tabs;

interface RoomTabProps extends TabsProps {
  tabList: MainRooms[];
  onChange: (tab) => void;
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
