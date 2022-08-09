import { StaticImage } from 'gatsby-plugin-image';
import Default from '@/templates/default';
import { Ul, Li, A, H4 } from '@/atoms';
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
              <A
                href="https://www.npmjs.com/package/vue-fast-scroll"
                target="_blank"
              >
                vue-fast-scroll
              </A>
            </b>
            : 네이티브의 Fast Scroll과 같은 동작을 할 수 있도록 기능을 제공하는
            Vue Plugin
          </Li>
          <Li>
            <b>
              <A
                href="https://www.npmjs.com/package/svelte-hammer"
                target="_blank"
              >
                svelte-hammer
              </A>
            </b>
            : Hammer 기능을 Svelte의 디렉티브로 제공
          </Li>
          <Li>
            <b>
              <A
                href="https://www.npmjs.com/package/svelte-swiper"
                target="_blank"
              >
                svelte-swiper
              </A>
            </b>
            : swiper.js를 매핑한 Svelte 컴포넌트
          </Li>
        </Ul>
      </AboutContents>
      <AboutContents title="Activities">
        <H4>블로그</H4>
        <Ul>
          <Li>
            <A href="https://beomy.tistory.com" target="_blank">
              https://beomy.tistory.com
            </A>
          </Li>
          <Li>
            <A href="https://beomy.github.io" target="_blank">
              https://beomy.github.io
            </A>
          </Li>
        </Ul>
        <H4>출판</H4>
        <Ul>
          <Li>
            <A
              href="https://book.naver.com/bookdb/book_detail.nhn?bid=13193284"
              target="_blank"
            >
              [비제이퍼블릭]ReactJS 이 정도는 알아야지 (2018.01.31)
            </A>
          </Li>
          <Li>
            <A
              href="https://book.naver.com/bookdb/book_detail.naver?bid=20941596"
              target="_blank"
            >
              [비제이퍼블릭]Svelte로 맛보는 웹 애플리케이션 개발 (2021.09.30)
            </A>
          </Li>
        </Ul>
        <H4>강의</H4>
        <Ul display="flex" flexWrap="wrap">
          <Li width={['100%', '50%', '25%']} mr="10px" mb="10px">
            <A
              href="https://www.inflearn.com/course/스벨트-입문?inst=77d01d70"
              target="_blank"
            >
              <StaticImage
                src="../assets/images/svelte/inflearn-svelte.png"
                alt="Svelte For Beginner"
              />
            </A>
          </Li>
          <Li width={['100%', '50%', '25%']} mb="10px">
            <A
              href="https://www.inflearn.com/course/스도쿠-실전-스도쿠실습?inst=2f7ebc2f"
              target="_blank"
            >
              <StaticImage
                src="../assets/images/svelte/inflearn-svelte-practice.jpeg"
                alt="Svelte For Practice"
              />
            </A>
          </Li>
        </Ul>
      </AboutContents>
    </Default>
  );
};

export default About;
