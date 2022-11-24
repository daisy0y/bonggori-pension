import { useEffect, useState } from 'react';
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteSession, generateString, setSession, getSession } from 'lib/storage';
import { Carousel } from 'antd';
import styled from 'styled-components';
import Head from 'next/head';
import { theme } from 'styles/Theme';
import spring from '../../public/image/main/spring.jpg'
import summer from '../../public/image/main/summer.jpg'
import autumn from '../../public/image/main/autumn.jpg'
import winter from '../../public/image/main/winter.jpg'
import { ReservationButton } from 'components';
import { getAuth } from 'firebase/auth';

type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'

const Container = styled.div`
  width: 100%;
  max-width: ${theme.maxWidth};
  height:100vh;
`
const StyledCarousel = styled(Carousel)`
  height:100vh;
  .slick-list .slick-track{
    height: 100vh !important;
  }    
`;

const SlideWrap = styled.div`
  width: 100%;
  max-width: ${theme.maxWidth};
  height:100vh;
  position: relative;
`;

const StyledImage = styled(Image)`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%) !important;
`;

const StyledDivImage = styled.div<{ url: string }>`
  width: 100%;
  height: 100vh;
  background:linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%), url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledTextContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -15%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export default function Home(props: any) {
  const [mainImage, setMainImage] = useState([])
  const [season, setSeason] = useState<Season>('Spring')

  const mainImages = [
    {
      key: 'Spring',
      url: spring
    },
    {
      key: 'Summer',
      url: summer
    },
    {
      key: 'Autumn',
      url: autumn
    },
    {
      key: 'Winter',
      url: winter
    }]

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    beforeChange: function (currentSlide, nextSlide) {
      setSeason(mainImages[nextSlide].key as Season)
    },
    afterChange: function (currentSlide) {
      // console.log("after change", currentSlide);
    }
  };

  return (
    <Container>
      <Head><title>홈</title></Head>

      <StyledCarousel {...settings} effect="fade">

        {mainImages.map((image) => {
          return (
            <SlideWrap key={image.key}>
              <StyledDivImage url={image.url.src || ''} />
              {/* Image태그에 그라데이션 넣는 방법? */}
              {/* <StyledImage
                src={image.url}
                alt='main page image'
                layout='fill'
                objectFit='cover'
                width='100%'
                height='100%'
                unoptimized
              /> */}
              <StyledTextContainer >
                <div>
                  <h1 style={{ fontSize: theme.size_38, color: theme.white, fontWeight: theme.weight_thin, textAlign: 'center', whiteSpace: 'nowrap', lineHeight: '40px' }}>BONGHWA IMGI</h1>
                  <h1 style={{ fontSize: theme.size_38, color: theme.white, fontWeight: theme.weight_bold, textAlign: 'center', whiteSpace: 'nowrap', lineHeight: '40px' }}>FAMILY HOUSE</h1>
                </div>

                <p style={{ color: theme.white, fontSize: theme.size_38, fontWeight: theme.weight_thin }}>{season}</p>
              </StyledTextContainer>
            </SlideWrap>
          )
        })}
      </StyledCarousel>

      <ReservationButton />
    </Container >
  )
}

export async function getServerSideProps() {
  console.log("SSR");
  // const products = await client.product.findMany({});
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    props: {
      hello: 'hello'
      // products: JSON.parse(JSON.stringify(products)),
    },
  };
}