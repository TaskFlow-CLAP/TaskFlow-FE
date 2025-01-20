# 📖 사내 티켓관리 서비스 TaskFlow ReadME
![LogoTF](https://github.com/user-attachments/assets/d1b949f0-d45e-443a-8d23-3e8d83a744f4)


- 배포 URL : 

<br>

## 프로젝트 소개

- TMS

<br>

## 팀원 구성

<div align="center">

| **Chloe** | **Tony** | **Moya** |
| :------: |  :------: | :------: |
| [<img src="https://github.com/user-attachments/assets/8d30dae3-77cb-442b-ade3-a03bb1d3d7f0" height=150 width=150> <br/> @BaekJiyeon02](https://github.com/BaekJiyeon02) | [<img src="https://github.com/user-attachments/assets/780cc5ac-6af4-46e6-8c6a-65066e180437" height=150 width=150> <br/> @seorang42](https://github.com/seorang42) | [<img src="https://github.com/user-attachments/assets/ff7197a0-85e4-41e7-a49c-3e03bf3c2a7c" height=150 width=150> <br/> @Minkyu0424](https://github.com/Minkyu0424) | 


</div>

<br>

## 1. 개발 환경

- Front : Vue, typescript, tanstack-query, pinia, axios, tailwind
- 버전 및 이슈관리 : Github
- 협업 툴 : Slack, Notion, Jira
- 서비스 배포 환경 : 
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### Vue

- Vue
    - Vue는 다른 프레임워크 대비 가볍고 빠르기에 초기 로딩시간이 빠르다는 장점이 있습니다.
    - 비교적 규모가 크지않고 SPA를 요하는 이번 프로젝트의 조건에 맞는 프레임워크라 생각이들어 채택했습니다.
    
### pinia

- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- Pinia를 채택한 이유
    - Pinia는 Vue 3의 Composition API를 기반으로 설계되어 코드가 간결하고 이해하기 쉬우며 팀원들이 알고있던 zustand 방식과 유사해 학습비용을 낮출 수 있었습니다.
    - Vuex라는 방법도 있었지만, vuex보다 더 단순한 구조로 이루어져있기에 pinia를 택했습니다.
    - Pinia는 TypeScript와 잘 통합되기에 타입정의도 비교적 간단한 장점들이 있었습니다.
    - Vue에서 제공하는 DevTools에서 기본지원되기에 상태 변화에 따른 시각적으로 확인이 가능하다는 점도 큰 장점으로 다가왔습니다.
- 로그인과 최초 프로필 설정 시 유저 정보를 store에 저장해 관리하는 방식으로 사용합니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 기본 컨벤션을 사용하며, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### tailwind

- 사전 정의된 유틸리티 클래스들로 다양한 스타일을 빠르고 일관성있게 적용이 가능합니다.
- css파일을 따로 작성없이 코드내에 작성해 빠른 스타일링 및 디자인 시스템을 일관되게 유지하도록 했습니다.
- 커스텀 속성을 통해 지정된 스타일링 내에서 팀원들이 중복된 스타일 코드없이 사용하도록 했습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.
 
<br>

## 3. 프로젝트 구조

```
.
├── .github/
├── .vscode/
├── cypress/
├── node_modules/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── views/
│   │   └── App.vue
│   ├── main.ts
│   └── labels.json
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── .editorconfig
├── .prettierrc.json
├── eslint.config.js
├── postcss.config.js
├── print-folder-structure.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

```

<br>

## 4. 역할 분담

### Chloe(백지연)

- **UI**
    - 페이지 : 로그인, 내 정보수정, 이메일 인증 카테고리 생성
    - 공통 컴포넌트 : 알림, 프로필 모달, 권한 별 사이드 바
- **기능**
    - 

<br>

### Tony(윤장호)

- **UI**
    - 페이지 : 내 요청, 승인 대기중인 요청, 전체 요청 기록, 내 작업, 작업보드 통계, 로그인 기록, 회원 관리
    - 공통 컴포넌트 : 
- **기능**
    - 

<br>

### Moya(최민규)

- **UI**
    - 페이지 : 작업 요청, 요청 승인, 새 회원 추가, 회원 정보 수정, 작업 관리
    - 공통 컴포넌트 : 요청 세부정보
- **기능**
    - 

<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2025-01-20~
- UI 구현 : 2025-01-20~
- 기능 구현 : 

<br>

### 작업 관리

- GitHub issue, commit PR 컨벤션을 통해 각자의 작업에 대한 진행상황을 공유하고 팀원간 코드리뷰를 주고 받습니다
- 수요일, 금요일 각자의 작업 현황과 향후 주간 일정에 대해서 이야기하는 시간을 갖습니다.
- 

<br>

## 6. 신경 쓴 부분

<br>

## 7. 페이지별 기능

### [초기화면]
- 서비스 초기 접속화면

| 초기화면 |
|----------|

<br>

## 8. 트러블 슈팅

- 노션링크
<br>

## 9. 개선 목표

- API 모듈화 : API를 불러오는 코드의 반복이 많아 모듈화할 예정
    
- **25-01-20 성능 개선 내용 (예시)**

    
<br>

## 10. 프로젝트 후기

### Chloe(백지연)

<br>

### Tony(윤장호)

<br>

### Moya(최민규

<br>

