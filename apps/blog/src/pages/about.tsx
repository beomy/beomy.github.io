import { StaticImage } from 'gatsby-plugin-image';
import { Anchor } from '@beomy/design-system';
import Default from '@/templates/default';
import { Ul, Li, H4 } from '@/atoms';
import { Seo, AboutHeader, AboutContents } from '@/organisms';

const About = () => {
  return (
    <Default>
      <Seo title="About" path="/about/" />
      <AboutHeader />
      <AboutContents title="Technical Summary">
        <Ul>
          <Li>
            <b>Front-End</b>: Vue.js, React.js, Electron.js, Svelte
          </Li>
          <Li>
            <b>Back-End</b>:
            <Ul>
              <Li>
                <b>.Net</b>: ASP.NET MVC, .NET Core
              </Li>
              <Li>
                <b>Node.js</b>: Express.js
              </Li>
              <Li>
                <b>DataBase</b>: MSSQL, Mysql
              </Li>
            </Ul>
          </Li>
        </Ul>
      </AboutContents>
      <AboutContents title="Works">
        <Ul>
          <Li>
            <b>야놀자</b> (2021.12 ~)
          </Li>
          <Li>
            <b>위메프</b> (2019.06 ~ 2021.12)
          </Li>
          <Li>
            <b>인프라웨어 테크놀러지</b> (2015.01 ~ 2019.06)
          </Li>
        </Ul>
      </AboutContents>
      <AboutContents title="Libraries">
        <Ul>
          <Li>
            <b>
              <Anchor
                href="https://www.npmjs.com/package/vue-fast-scroll"
                target="_blank"
              >
                vue-fast-scroll
              </Anchor>
            </b>
            : 네이티브의 Fast Scroll과 같은 동작을 할 수 있도록 기능을 제공하는
            Vue Plugin
          </Li>
          <Li>
            <b>
              <Anchor
                href="https://www.npmjs.com/package/svelte-hammer"
                target="_blank"
              >
                svelte-hammer
              </Anchor>
            </b>
            : Hammer 기능을 Svelte의 디렉티브로 제공
          </Li>
          <Li>
            <b>
              <Anchor
                href="https://www.npmjs.com/package/svelte-swiper"
                target="_blank"
              >
                svelte-swiper
              </Anchor>
            </b>
            : swiper.js를 매핑한 Svelte 컴포넌트
          </Li>
        </Ul>
      </AboutContents>
      <AboutContents title="Activities">
        <H4>블로그</H4>
        <Ul>
          <Li>
            <Anchor href="https://beomy.tistory.com" target="_blank">
              https://beomy.tistory.com
            </Anchor>
          </Li>
          <Li>
            <Anchor href="https://beomy.github.io" target="_blank">
              https://beomy.github.io
            </Anchor>
          </Li>
        </Ul>
        <H4>출판</H4>
        <Ul>
          <Li>
            <Anchor
              href="https://search.shopping.naver.com/book/catalog/32505045623?query=ReactJS%20%EC%9D%B4%20%EC%A0%95%EB%8F%84%EB%8A%94%20%EC%95%8C%EC%95%84%EC%95%BC%EC%A7%80&NaPm=ct%3Dl82vyeb4%7Cci%3Dc1faf7af802915eef6ae938d962b330ac2f57243%7Ctr%3Dboksl%7Csn%3D95694%7Chk%3D07d7aa7d89394782bc13d8632a35c60339ac19f1"
              target="_blank"
            >
              [비제이퍼블릭]ReactJS 이 정도는 알아야지 (2018.01.31)
            </Anchor>
          </Li>
          <Li>
            <Anchor
              href="https://search.shopping.naver.com/book/catalog/32492632526?query=Svelte%EB%A1%9C%20%EB%A7%9B%EB%B3%B4%EB%8A%94%20%EC%9B%B9%20%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98%20%EA%B0%9C%EB%B0%9C&NaPm=ct%3Dl82vyva8%7Cci%3D97dc99386aaf831da6695033c79d297ea9ac9a4e%7Ctr%3Dboksl%7Csn%3D95694%7Chk%3Db8b0c2f5ae0a3029c21cfd8eb5a24d2092d00b61"
              target="_blank"
            >
              [비제이퍼블릭]Svelte로 맛보는 웹 애플리케이션 개발 (2021.09.30)
            </Anchor>
          </Li>
        </Ul>
        <H4>강의</H4>
        <Ul display="flex" flexWrap="wrap">
          <Li width={['100%', '50%', '25%']} mr="10px" mb="10px">
            <Anchor
              href="https://www.inflearn.com/course/스벨트-입문?inst=77d01d70"
              target="_blank"
            >
              <StaticImage
                src="../assets/images/svelte/inflearn-svelte.png"
                alt="Svelte For Beginner"
              />
            </Anchor>
          </Li>
          <Li width={['100%', '50%', '25%']} mb="10px">
            <Anchor
              href="https://www.inflearn.com/course/스도쿠-실전-스도쿠실습?inst=2f7ebc2f"
              target="_blank"
            >
              <StaticImage
                src="../assets/images/svelte/inflearn-svelte-practice.jpeg"
                alt="Svelte For Practice"
              />
            </Anchor>
          </Li>
        </Ul>
      </AboutContents>
    </Default>
  );
};

export default About;
