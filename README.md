# 📖 사내 티켓관리 서비스 TaskFlow ReadME
![TaskFlow 소개 배너](https://github.com/user-attachments/assets/bc6041ad-f75e-41f4-ba0a-bbd3d68ec2c7)

**배포주소** : [🔗 Visit TaskFlow](https://taskflow.shop/)  

[<img src="https://img.shields.io/badge/프로젝트 기간-2025.01.06~2025.02.20-green?style=flat&logo=&logoColor=white" />]()

<br>

## 프로젝트 소개

### 다음과 같은 요구사항을 반영했습니다
- 효율적인 요청 처리 체계 구축
- 사용자와 담당자를 위한  **가시성있는 화면 제공**
- 티켓 추적을 위한 **알림 시스템**
- 부서 운영 위한 **업무 및 담당자 분석 통계 기능**
- 관리자의 카테고리 관리를 통한 **작업 관리**
  

<br>

## 팀원 구성
### CLAP의 FE팀원들
<div>

| **Chloe** | **Tony** | **Moya** |
| :------: |  :------: | :------: |
| [<img src="https://github.com/user-attachments/assets/796fc29d-a594-4201-9204-a1357121c7f6" height=160 width=140> <br/> @BaekJiyeon02](https://github.com/BaekJiyeon02) | [<img src="https://github.com/user-attachments/assets/780cc5ac-6af4-46e6-8c6a-65066e180437" height=160 width=160> <br/> @seorang42](https://github.com/seorang42) | [<img src="https://github.com/user-attachments/assets/b1d2ff17-2e46-4c4b-a29f-2e4c18920f7c" height=160 width=140> <br/> @Minkyu0424](https://github.com/Minkyu0424) | 


</div>

<br>

## 1. 개발 환경

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
             <td>
                  <p>Environment</p>
                 </td>
                         <td>
                 <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=ffffff">
                 <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff">
                 <img src="https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=ffffff">
            </td>
            </tr>
        <tr>
            <td>
                  <p>Development</p>
            </td>
            <td>
                  <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" >
                  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> 
                  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" /> 
                  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white" />
                  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white" /> 
                <img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" /> 
                <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> 
            </td>
        </tr>
        <tr>
            <td>
                <p>Communication</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=ffffff">
            </td>
        </tr>
    </tbody>

</table>
<br>

## 2.개발 기술

### Vue
- Vue는 다른 프레임워크 대비 가볍고 빠르기에 초기 로딩시간이 빠르다는 장점이 있습니다.
- 비교적 규모가 크지않고 SPA를 요하는 이번 프로젝트의 조건에 맞는 프레임워크라 생각이들어 채택했습니다.
- 커뮤니티도 크고, 활성화 되었기에 개발 중 우리팀이 잘 모르거나 필요한 정보들에 대해 보다 쉬운 접근 가능하다 생각했습니다.
    
### pinia
- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- Pinia를 채택한 이유
    - Pinia는 Vue 3의 Composition API를 기반으로 설계되어 코드가 간결하고 이해하기 쉬우며 팀원들이 알고있던 zustand 방식과 유사해 학습비용을 낮출 수 있었습니다.
    - Vuex라는 방법도 있었지만, vuex보다 더 단순한 구조로 이루어져있기에 pinia를 택했습니다.
    - Pinia는 TypeScript와 잘 통합되기에 타입정의도 비교적 간단한 장점들이 있었습니다.
    - Vue에서 제공하는 DevTools에서 기본지원되기에 상태 변화에 따른 시각적으로 확인이 가능하다는 점도 큰 장점으로 다가왔습니다.
- 로그인과 최초 프로필 설정 시 유저 정보를 store에 저장해 관리하는 방식으로 사용합니다.
- 작업 목록에 관한 필터링 시 필터링 params에 대한 요소들을 관리하는 방식으로 사용합니다.

### eslint, prettier
- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 기본 컨벤션을 사용하며, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### tailwind
- 사전 정의된 유틸리티 클래스들로 다양한 스타일을 빠르고 일관성있게 적용이 가능합니다.
- css파일을 따로 작성없이 코드내에 작성해 빠른 스타일링 및 디자인 시스템을 일관되게 유지하도록 했습니다.
- 커스텀 속성을 통해 지정된 스타일링 내에서 팀원들이 중복된 스타일 코드없이 사용하도록 했습니다.

### typescript
- 사전 정의된 유틸리티 클래스들로 다양한 스타일을 빠르고 일관성있게 적용이 가능합니다.
- css파일을 따로 작성없이 코드내에 작성해 빠른 스타일링 및 디자인 시스템을 일관되게 유지하도록 했습니다.
- 커스텀 속성을 통해 지정된 스타일링 내에서 팀원들이 중복된 스타일 코드없이 사용하도록 했습니다.

### Vite
- 번들링 후 서버를 띄우는 다른 번들링 도구와 다르게 **ES모듈 기반으로 동작해 빠른 로딩속도 제공**
- **빠른 HMR**(Hot Module Replacement)을 지원함 개발의 편리함 향상
  - Vite는 영향받는 모듈만 리로드해 성능이 유지됨
- **최적화된 빌드 제공(Rollup)**
   - 트리 쉐이킹, 코드 분한, 최적화 번들링이 자동 적용됨
  
## 3.브랜치 전략
- Git-flow 전략을 기반으로 release, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- release, develop, Feat 브랜치로 나누어 개발을 하였습니다.
-  새로운 기능을 분류하는 **feature** 브랜치
-  새로운 기능이 합쳐져 테스트와 QA가 이루어지는 **develop** 브랜치
-  검증된 코드들이 합쳐지는 **release** 브랜치로 분류
 
<br>
<br>

## 3. 프로젝트 구조

```
src/
├── api/                     # axios Instance를 통한 API 관련 로직
├── assets/                  # 정적 파일 (이미지, 폰트, 아이콘 등)
│   ├── fonts/               # 폰트 파일
│   └── icons/               # 아이콘 파일
├── components/              # 컴포넌트 파일 폴더
│   ├── api-logs/            # 관리자 API 로그 관련 컴포넌트
│   ├── charts/              # 차트 컴포넌트
│   ├── common/              # 공용 컴포넌트
│   ├── filters/             # 검색창 필터 관련 컴포넌트
│   ├── lists/               # 리스트 목록 관련 컴포넌트
│   ├── login-logs/          # 관리자 로그인 로그 관련 컴포넌트
│   ├── member-management/   # 관리자 멤버 관리 컴포넌트
│   ├── my-request/          # 내 요청 관리 컴포넌트
│   ├── my-task/             # 내 작업 관리 컴포넌트
│   ├── request-approve/     # 요청 승인 관련 컴포넌트
│   ├── request-history/     # 요청 히스토리 컴포넌트
│   ├── request-task/        # 작업 요청 관련 컴포넌트
│   ├── requested/           # 승인 대기중인 요청관련 컴포넌트
│   ├── statistics/          # 통계 관련 컴포넌트
│   ├── task-board/          # 작업 보드 컴포넌트
│   ├── task-detail/         # 작업 상세 정보 컴포넌트
│   ├── task-management/     # 관리자 작업 관리 컴포넌트
│   ├── team-board/          # 팀 보드 컴포넌트
│   ├── top-bar/             # 상단 바 컴포넌트
│   └── user-manage/         # 관리자 회원 관리 컴포넌트
├── constants/               # 상수 파일 정의
├── hooks/                   # Vue 커스텀 훅
├── layout/                  # Vue 페이지 레이아웃 컴포넌트
├── router/                  # 라우팅 관련 설정
├── stores/                  # Pinia 상태 관리
├── types/                   # TypeScript 타입 정의
├── utils/                   # 유틸리티 함수
└── views/                   # 주요 페이지 컴포넌트
```

<br>


## 4. 역할 분담

### Chloe(백지연)

- **기능**
    - **페이지** : 로그인, 비밀번호 재인증, 이메일 인증, 비밀번호 재설정, 내 정보수정
    - **공통 컴포넌트** : 알림, 프로필 모달, 권한 별 사이드 바, 헤더
<br>

### Tony(윤장호)

- **기능**
    - **페이지** : 내 요청, 승인 대기중인 요청, 전체 요청 기록, 내 작업, 작업보드, 팀 현황, 통계,  로그인 기록, 작업 기록 회원 관리
<br>

### Moya(최민규)
- **기능**
    - **페이지** : 작업 요청, 요청 승인, 요청 수정, 요청 세부정보, 새 회원 추가, 회원 정보 수정, 작업 관리
    - **공통 컴포넌트** : 아이콘
<br>

## 5. 시작가이드

### Requirements
- Node.js v22.13.0
- npm v10.9.2

### Installation
``` 
$ git clone https://github.com/TaskFlow-CLAP/TaskFlow-FE.git 

$ cd TaskFlow-FE
$ npm install
$ npm run dev
// 로컬로 실행하는 경우 http://localhost:5173 포트번호로 실행

// 프로젝트 최상단 폴더에 .env생성 후 다음을 기입
VITE_API_BASE_URL=http://210.109.14.132:9090/
```
## 6. 페이지별 기능

### [초기화면]
- 서비스 초기 접속화면 및 인증 인가
<table>
  <tr>
    <td align="center"><b>로그인 화면</b></td>
    <td align="center"><b>비밀번호 재설정 화면</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/9a1460ca-e4da-4711-a823-83920f5e0e8c" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/5c65b030-d34e-4801-a8ef-9788b5e97e7f" /></td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>내 정보 수정</b></td>
  </tr>
  <tr>
    <td><img width="1084" alt="image" src="https://github.com/user-attachments/assets/edc67aa7-9551-4a66-b66f-90a456312b3a" />
</td>
  </tr>
</table>
<br>

### [사용자 화면]
- 사용자 권한 화면
<table>
  <tr>
    <td align="center"><b>내 요청</b></td>
    <td align="center"><b>작업 요청</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/b21dc462-abb3-44d7-9496-6bbe85af291d" />

</td>
    <td>
<img width="620" alt="image" src="https://github.com/user-attachments/assets/c0e2edab-dd77-46a6-b324-c87416b035f5" />

</td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>요청 상세 조회</b></td>
    <td align="center"><b>요청 수정</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/3829ff9c-a76f-4a4a-b887-ed752c4b943e" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/0d54ea63-c96e-4cc7-908c-f8aa8c300f0e" /></td>
  </tr>
</table>
<br>

### [담당자 화면]
- 담당자 권한 화면
<table>
  <tr>
    <td align="center"><b>내 작업 </b></td>
    <td align="center"><b>작업 보드</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/4bad2842-3d26-4fd3-817d-601a27159c75" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/5cd84eba-c8c8-433f-8b70-d19e964421c1" /></td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>팀 작업 현황</b></td>
    <td align="center"><b>통계</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/92e4678e-a519-48f9-adb3-9c41fe7f7c2f" />
</td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/587352f6-26d5-48a2-a9d7-6e3b73bdeb6c" />
</td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>전체 요청 기록</b></td>
    <td align="center"><b>승인 대기 중인 요청</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/84293b2e-f259-4c0f-a02c-d5b63cbe23ad" />

</td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/30a1cfd5-b633-4884-9106-206d6d5286e0" />
</td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>요청 승인(승인 권한O)</b></td>
    <td align="center"><b>요청 반려(승인 권한O)</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/d23a8bfa-0ad9-455c-9197-765276d6e206" />

</td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/7b06ed0a-0b83-4276-970b-e2d1b5d19f3b" />

</td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>요청 상세 조회(담당자)</b></td>
  </tr>
  <tr>
    <td><img width="1080" alt="image" src="https://github.com/user-attachments/assets/87c8d276-093a-4a47-82ab-100294d0d8e8" /></td>
  </tr>
</table>

### [관리자 화면]
- 관리자 권한 화면
<table>
  <tr>
    <td align="center"><b>회원 관리</b></td>
    <td align="center"><b>작업 보드</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/dcd197fe-b4b9-4920-b129-24fc781e1ccb" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/8931371d-db4c-4145-9195-5fe9c2136403" /></td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>새 회원 추가</b></td>
    <td align="center"><b>회원 정보 수정</b></td>
  </tr>
  <tr>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/f50da900-f9fb-4e20-a572-9930a39ac0ee" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/ce14b69c-d66d-46eb-bf14-fbb099c21f24" />
</td>
  </tr>
</table>
<table>
  <tr>
    <td align="center"><b>1차 카테고리 추가</b></td>
    <td align="center"><b>2차 카테고리 추가</b></td>
  </tr>
  <tr>
    <td><img width="1292" alt="image" src="https://github.com/user-attachments/assets/e7496d2f-6ce7-4774-bf62-bb14a7d57a86" /></td>
    <td><img width="620" alt="image" src="https://github.com/user-attachments/assets/ce14b69c-d66d-46eb-bf14-fbb099c21f24" />
</td>
  </tr>
</table>
<br>



## 7. 트러블 슈팅

- [FE - 트러블 슈팅](https://north-spade-8fa.notion.site/1a004df233a58082ba65c72e7fbf248d?pvs=74)

<br>

