import { CalendarOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/Theme';

const StyledButton = styled(Button)`
    width: 18.75rem;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50% ,-5%);
    color: ${theme.white};
    background: rgba(255, 255, 255, 0.2);
    font-size: ${theme.size_18};
    font-weight: ${theme.weight_bold};
`;

export const ReservationButton = () => {
    const router = useRouter();
    const handleMoveToReservation = () => {
        router.push('/board')
    }

    return (
        <StyledButton
            icon={<CalendarOutlined />}
            shape="round"
            onClick={handleMoveToReservation}
            size='large'
        >
            실시간 예약
        </StyledButton>
    )
}
