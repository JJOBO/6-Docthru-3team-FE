"use client";

import { useState } from "react";
import BtnText, { BtnRoundedWithIcon } from "@/components/btn/text/BtnText";
import Container from "@/components/container/PageContainer";
import DeclineModal from "@/components/modal/DeclineModal";
import DeleteModal from "@/components/modal/ConfirmActionModal";
import FilterModal from "@/components/modal/FilterModal";
import NotificationModal from "@/components/modal/NotificationModal";
// import SignupModal from "@/components/modal/SignupModal";
import TemporaryStorage from "@/components/modal/DraftModal";
import Sort from "@/components/sort/Sort";
import RankingListItem from "@/components/list/RankingListItem";
import Reply from "@/components/reply/Reply";
import IconPasswordVisible from "@/components/btn/icon/BtnIcon";
import BtnCheckbox from "@/components/btn/form/BtnCheckbox";
import BtnRadio from "@/components/btn/form/BtnRadio";
import Pagination from "@/components/pagination/Pagination";
import ChallengeContainer from "../(user)/challenges/_components/ChallengeContainer";
import SearchInput from "@/components/input/SearchInput";
import Profile from "@/components/dropDown/Profile";
import ApplyChallenge from "../(user)/challenges/_components/ApplyChallenge";

import Input from "../(user)/challenges/create/_components/Input";

const themesTitle = "mb-1 font-[600]";
const MODAL_COMPONENTS = {
  // signup: SignupModal,
  decline: DeclineModal,
  delete: DeleteModal,
  notification: NotificationModal,
  filter: FilterModal,
  temp: TemporaryStorage
};

const page = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selected, setSelected] = useState("option1");
  const [page, setPage] = useState(1);

  const handleOpen = (modalName) => setOpenModal(modalName);
  const handleClose = () => setOpenModal(null);

  const ModalComponent = openModal ? MODAL_COMPONENTS[openModal] : null;
  return (
    <Container>
      <div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnText</h2>
          <span>
            거의 모든 버튼이 BtnText.jsx에 포함되어 있으며 BtnText / BtnRoundedWithIcon 로 나뉘어져 있음, rounded-full
            버튼 속성으로 인해 분리함
          </span>
          <div>
            <div className={`${themesTitle}`}>theme = "tonal"</div>
            <BtnText theme="tonal">신청 거절</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>
              theme = "tonal" <br />
              icon = &#123;true&#125; 아이콘 노출
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
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnRoundedWithIcon</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>iconType = "goToMyWork"</div>
              <BtnRoundedWithIcon iconType="goToMyWork">내 작업물 보기</BtnRoundedWithIcon>
            </div>
            <div>
              <div className={`${themesTitle}`}> iconType = "continueChallenge" (default 설정)</div>
              <BtnRoundedWithIcon>도전 계속하기</BtnRoundedWithIcon>
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnIcon</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>비밀번호 보기/숨기기 토글 버튼</div>
              <IconPasswordVisible />
              <IconPasswordVisible on={true} />
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnCheckbox</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
                checked={true} - 체크된 상태 / checked={false} - 체크되지 않은 상태
              </div>
              <BtnCheckbox isChecked={true}>테스트</BtnCheckbox>
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnRadio</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
                clicked={true} - 선택된 상태 / clicked={false} - 선택되지 않은 상태
              </div>
              <div>
                <h2 className="mb-4 text-lg font-semibold">옵션 선택</h2>

                <BtnRadio value="option1" checked={selected === "option1"} onChange={setSelected}>
                  옵션 1
                </BtnRadio>

                <BtnRadio value="option2" checked={selected === "option2"} onChange={setSelected}>
                  옵션 2
                </BtnRadio>
              </div>
            </div>
          </div>
        </div>

        {/* Sort 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">Sort</h2>
          <div className={themesTitle}>
            isAdminStatus: true - 승인대기 / false - 필터
            <br />
            isFiltered: true - 검은배경, 필터링 갯수(count)
            <br />
            onClick: params로 넘겨주시면 됩니다
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Sort isAdminStatus={true} />
            </div>
            <div>
              <Sort />
            </div>
            <div>
              <Sort isFiltered={true} count={3} />
            </div>
          </div>
        </div>

        {/* RankingListItem 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">RankingListItem</h2>
          <div className={themesTitle}>
            좋아요 수 기준으로 유저를 정렬한 랭킹 리스트 항목 UI
            <br />
            - 하트 아이콘 클릭 시 애니메이션 효과
            <br />
            - 1등인 경우 왕관 아이콘 표시
            <br />- 좋아요 수가 10000 이상인 경우 "9999+" 로 표시
          </div>
          <div className="flex flex-col gap-2">
            <RankingListItem
              item={{
                rank: 1,
                userName: "홍길동",
                userRole: "프로그래머",
                likes: 10000,
                isLiked: false,
                workId: 1
              }}
              toggleLike={() => {}}
            />
            <RankingListItem
              item={{
                rank: 2,
                userName: "김코딩",
                userRole: "디자이너",
                likes: 8500,
                isLiked: true,
                workId: 2
              }}
              toggleLike={() => {}}
            />
          </div>
        </div>

        {/* Reply 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">Reply</h2>
          <div className={themesTitle}>
            댓글 컴포넌트
            <br />
            - 수정/삭제 버튼 클릭 시 모달 오픈 (기능은 콜백함수로 구현)
            <br />
            - 프로필 이미지, 작성자 이름, 작성 시간 표시
            <br />
            - 수정 모드에서 TextBox 컴포넌트 사용
            <br />- Enter로 제출, Shift + Enter로 줄바꿈
          </div>
          <div className="flex flex-col gap-2">
            <Reply
              userName="홍길동"
              timestamp="방금 전"
              content="이것은 예시 댓글입니다."
              onEdit={() => {}}
              onDelete={() => {}}
            />
            <Reply
              userName="김코딩"
              timestamp="1시간 전"
              content="여러 줄 작성이 가능한\n댓글 예시입니다."
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        </div>

        {/* Modal 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">Modal</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("signup")}
            >
              회원가입
            </button>
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("decline")}
            >
              거절 사유
            </button>
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("delete")}
            >
              삭제
            </button>
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("notification")}
            >
              알림
            </button>
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("filter")}
            >
              필터
            </button>
            <button
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
              onClick={() => handleOpen("temp")}
            >
              임시저장
            </button>
          </div>
        </div>
      </div>
      {ModalComponent && <ModalComponent onClose={handleClose} />}

      {/* Pagination 컴포넌트 설명 */}
      <div className="m-10 flex flex-col gap-8 bg-white p-4">
        <h2 className="text-3xl font-bold">Pagination</h2>
        <Pagination totalCount={183} currentPage={page} onPageChange={(newPage) => setPage(newPage)} />
      </div>

      {/* Challenge container 컴포넌트*/}
      <div className="m-10 flex flex-col gap-8 bg-white p-4">
        <h2 className="text-3xl font-bold">challenge container</h2>
        <ChallengeContainer height={"h-[176px]"} type={""} />
        <ChallengeContainer height={"h-[104px]"} type={"slim"} />
      </div>

      {/* SearchInput 컴포넌트
      value와 onChange는 state를 생성하면서 설정하면 됨. 아래 예시
      value={kwyword}
      onChange={(e)=>setKeyword(e.target.value)}*/}
      <div className="m-10 flex flex-col gap-8 bg-white p-4">
        <h2 className="text-3xl font-bold">Search Input</h2>
        <SearchInput text={"text-[14px]"} />
      </div>

      {/* Dropdown Profile 컴포넌트
      DB랑 연동 시 유저의 등급으로 이미지 분기 처리 필요
      라우터 경로 확인 필요*/}
      <div className="m-10 flex flex-col gap-8 bg-[var(--color-gray-50)]">
        <h2 className="text-3xl font-bold">Dropdown Profile</h2>
        <Profile />
      </div>

      {/* 신청하기 컴포넌트*/}
      <div className="m-10 flex flex-col gap-8 bg-white p-4">
        <h2 className="text-3xl font-bold">신청하기(공통X)</h2>
        <ApplyChallenge />
      </div>

      {/* Input 컴포넌트
     value와 onChange는 state를 생성하면서 설정하면 됨. 아래 예시
        value={originUrl}
          onChange={(e) => setOriginUrl(e.target.value)}*/}
      <div className="m-10 flex flex-col gap-8 bg-white p-4">
        <h2 className="text-3xl font-bold">정보입력(공통X)</h2>
        <Input title={"제목"} placeholder={"제목을 입력해주세요"} height={"h-[48px]"} />
      </div>
    </Container>
  );
};

export default page;
