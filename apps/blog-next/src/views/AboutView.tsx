import { Anchor } from '@beomy/design-system-tailwind';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Ul, Li, H4 } from '@/atoms';
import { AboutHeader, AboutContents } from '@/organisms';

const AboutView = () => {
  return (
    <DefaultLayout>
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
            <b>인프라웨어 테크놀러지</b> (2015.01.05 ~ 2019.05.31)
          </Li>
          <Li>
            <b>위메프</b> (2019.06.03 ~ 2021.12.03)
          </Li>
          <Li>
            <b>야놀자</b> (2021.12.06 ~)
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
              href="https://search.shopping.naver.com/book/catalog/32505045623"
              target="_blank"
            >
              [비제이퍼블릭]ReactJS 이 정도는 알아야지 (2018.01.31)
            </Anchor>
          </Li>
          <Li>
            <Anchor
              href="https://search.shopping.naver.com/book/catalog/32492632526"
              target="_blank"
            >
              [비제이퍼블릭]Svelte로 맛보는 웹 애플리케이션 개발 (2021.09.30)
            </Anchor>
          </Li>
        </Ul>
        <H4>강의</H4>
        <Ul className="flex flex-wrap">
          <Li className="mb-[10px] mr-[10px] w-full xs:w-1/2 sm:w-1/4">
            <Anchor
              href="https://www.inflearn.com/course/스벨트-입문?inst=77d01d70"
              target="_blank"
            >
              <img
                src="/assets/images/svelte/inflearn-svelte.png"
                alt="Svelte For Beginner"
              />
            </Anchor>
          </Li>
          <Li className="mb-[10px] w-full xs:w-1/2 sm:w-1/4">
            <Anchor
              href="https://www.inflearn.com/course/스도쿠-실전-스도쿠실습?inst=2f7ebc2f"
              target="_blank"
            >
              <img
                src="/assets/images/svelte/inflearn-svelte-practice.jpeg"
                alt="Svelte For Practice"
              />
            </Anchor>
          </Li>
        </Ul>
      </AboutContents>
    </DefaultLayout>
  );
};

export default AboutView;
