const AboutHeader = () => {
  return (
    <div className="flex items-center">
      <div className="mr-[20px] min-w-[100px]">
        <img
          src="/assets/img/brand/beomy-icon.png"
          alt="Beomy"
          width={300}
          height={300}
        />
      </div>
      <div>
        <h1>이효범 (Beomy)</h1>
        <div>beomyhlee@gmail.com</div>
        <p>
          프론트엔드 개발자로 활동하고 있습니다. 최신 웹 프레임워크 트랜드에
          관심을 많이 가지고 있습니다. 계속 변화하고 있는 웹 트랜드에 뒤쳐지지
          않고, 배움을 게을리하지 않는 개발자가 되기 위해 웹 개발 관련 기술을
          포스팅하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default AboutHeader;
