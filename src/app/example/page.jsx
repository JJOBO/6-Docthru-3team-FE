import BtnText, { BtnRoundedWithIcon } from "@/components/btn/text/BtnText";
import Container from "@/components/container/PageContainer";

const themesTitle = "mb-1 font-[600]";
const page = () => {
  return (
    <Container>
      <div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnText</h2>
          <span>
            거의 모든 버튼이 BtnText.jsx에 포함되어 있으며 BtnText /
            BtnRoundedWithIcon 로 나뉘어져 있음, rounded-full 버튼 속성으로 인해
            분리함
          </span>
          <div>
            <div className={`${themesTitle}`}>
              theme = "tonal"
              <br />
              icon = "false" (default) - 입력하지 않으면 기본값
            </div>
            <BtnText theme="tonal">신청 거절</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>
              theme = "tonal" <br />
              icon = "true"
            </div>
            <BtnText theme="tonal" icon="true">
              포기
            </BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "outline"</div>
            <BtnText theme="outline">임시저장</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "link"</div>
            <BtnText theme="link">링크 열기</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "solidblack"</div>
            <BtnText theme="solidblack">승인하기</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "solidwhite"</div>
            <BtnText theme="solidwhite">승인하기</BtnText>
          </div>
        </div>
        <div className="m-10 mb-30 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnRoundedWithIcon</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>iconType = "goToMyWork"</div>
              <BtnRoundedWithIcon iconType="goToMyWork">
                내 작업물 보기
              </BtnRoundedWithIcon>
            </div>
            <div>
              <div className={`${themesTitle}`}>
                {" "}
                iconType = "continueChallenge" (default 설정)
              </div>
              <BtnRoundedWithIcon>도전 계속하기</BtnRoundedWithIcon>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
