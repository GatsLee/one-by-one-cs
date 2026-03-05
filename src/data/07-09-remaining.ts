import type { QuizDataMap } from "./types";

export const remainingQuizzes: QuizDataMap = {
  "07-infra/01-linux-shell": {
    quizzes: [
      {
        question: "리눅스에서 파일 권한 표기 'rwxr-x---'의 의미를 설명하시오.",
        answer: "소유자(user)는 읽기/쓰기/실행(rwx), 그룹(group)은 읽기/실행(r-x), 기타 사용자(others)는 권한 없음(---)을 의미한다. 8진수로는 750이다.",
      },
      {
        question: "grep과 find 명령어의 차이와 각각의 사용 사례는?",
        answer: "grep은 파일 내용에서 패턴(텍스트)을 검색하고, find는 파일 시스템에서 파일명, 크기, 수정 시간 등의 조건으로 파일을 검색한다.",
      },
      {
        question: "파이프(|)와 리다이렉션(>, >>)의 차이는?",
        answer: "파이프는 한 명령의 stdout을 다음 명령의 stdin으로 전달한다. 리다이렉션은 stdout을 파일로 보내며, >는 덮어쓰기, >>는 추가(append) 모드이다.",
      },
      {
        question: "awk와 sed의 주요 차이점은 무엇인가?",
        answer: "awk는 필드 기반 텍스트 처리에 강하며 프로그래밍 언어적 기능(변수, 조건, 루프)을 제공한다. sed는 스트림 편집기로 줄 단위 텍스트 치환/삭제/삽입에 특화되어 있다.",
      },
      {
        question: "프로세스를 관리하는 ps, top, kill 명령어의 역할은?",
        answer: "ps는 현재 프로세스 목록을 스냅샷으로 보여주고, top은 실시간으로 프로세스 상태와 시스템 자원 사용량을 모니터링하며, kill은 프로세스에 시그널을 보내 종료하거나 제어한다.",
      },
      {
        question: "셸 스크립트에서 $?, $#, $@의 의미는 각각 무엇인가?",
        answer: "$?는 직전 명령의 종료 코드(0이면 성공), $#는 전달된 인자의 개수, $@는 모든 인자를 개별 문자열로 전달한다.",
      },
      {
        question: "cron 표현식 '30 2 * * 1'의 의미를 해석하시오.",
        answer: "매주 월요일(1) 오전 2시 30분에 실행된다. 형식은 '분 시 일 월 요일'이다.",
      },
      {
        question: "환경변수와 셸 변수의 차이는 무엇인가?",
        answer: "셸 변수는 현재 셸 세션에서만 유효하고, 환경변수는 export로 설정되어 자식 프로세스에도 상속된다.",
      },
      {
        question: "SSH 공개키 인증의 동작 원리를 설명하시오.",
        answer: "클라이언트의 공개키를 서버의 ~/.ssh/authorized_keys에 등록한다. 접속 시 서버가 공개키로 암호화한 챌린지를 보내고, 클라이언트가 개인키로 복호화하여 인증한다.",
      },
      {
        question: "chmod 755와 chmod u+x의 차이를 설명하시오.",
        answer: "chmod 755는 절대 모드로 소유자 rwx(7), 그룹 r-x(5), 기타 r-x(5)를 설정한다. chmod u+x는 상대 모드로 소유자(u)에게 실행(x) 권한만 추가하며 나머지 권한은 변경하지 않는다.",
      },
      {
        question: "stdin, stdout, stderr의 파일 디스크립터 번호와 역할은?",
        answer: "stdin(0)은 표준 입력, stdout(1)은 표준 출력, stderr(2)은 표준 에러이다. 예를 들어 2>&1은 stderr를 stdout으로 리다이렉션한다.",
      },
      {
        question: "chown과 chmod의 차이는 무엇인가?",
        answer: "chown은 파일의 소유자(owner)와 그룹을 변경하고, chmod는 파일의 접근 권한(읽기/쓰기/실행)을 변경한다.",
      },
      {
        question: "백그라운드 프로세스 실행과 nohup의 역할은?",
        answer: "명령 뒤에 &를 붙이면 백그라운드로 실행된다. nohup은 터미널 세션이 종료되어도 SIGHUP 시그널을 무시하여 프로세스가 계속 실행되게 한다.",
      },
      {
        question: "리눅스에서 하드 링크와 심볼릭 링크의 차이는?",
        answer: "하드 링크는 같은 inode를 가리켜 원본 삭제 후에도 접근 가능하고, 심볼릭 링크는 경로를 가리키는 별도 파일로 원본 삭제 시 깨진다. 심볼릭 링크는 디렉토리와 다른 파일 시스템도 가리킬 수 있다.",
      },
      {
        question: "셸 스크립트의 shebang(#!)의 역할은 무엇인가?",
        answer: "스크립트 첫 줄의 #!/bin/bash 같은 지시자로, 커널에게 이 스크립트를 실행할 인터프리터 경로를 알려준다.",
      },
    ],
    flashcards: [
      {
        question: "grep 명령어란?",
        answer: "파일 내용에서 정규표현식 패턴과 일치하는 줄을 검색하여 출력하는 명령어.",
      },
      {
        question: "find 명령어란?",
        answer: "파일 시스템에서 이름, 크기, 수정 시간 등 조건으로 파일/디렉토리를 검색하는 명령어.",
      },
      {
        question: "awk란?",
        answer: "필드 기반 텍스트 처리 도구. 패턴 매칭과 프로그래밍 기능을 제공한다.",
      },
      {
        question: "sed란?",
        answer: "스트림 편집기. 줄 단위로 텍스트를 치환, 삭제, 삽입하는 데 특화되어 있다.",
      },
      {
        question: "파이프(|)란?",
        answer: "한 명령의 표준 출력을 다음 명령의 표준 입력으로 연결하는 셸 연산자.",
      },
      {
        question: "리다이렉션(>, >>)이란?",
        answer: ">는 stdout을 파일로 덮어쓰기, >>는 파일에 추가(append). 2>는 stderr 리다이렉션.",
      },
      {
        question: "chmod란?",
        answer: "파일/디렉토리의 접근 권한(rwx)을 변경하는 명령어. 8진수(755) 또는 기호(u+x) 방식 사용.",
      },
      {
        question: "chown이란?",
        answer: "파일/디렉토리의 소유자와 그룹을 변경하는 명령어. chown user:group file 형식.",
      },
      {
        question: "cron이란?",
        answer: "지정된 시간에 명령을 자동 실행하는 스케줄러. crontab으로 작업을 등록/관리한다.",
      },
      {
        question: "환경변수란?",
        answer: "export로 설정되어 자식 프로세스에도 상속되는 변수. PATH, HOME 등이 대표적이다.",
      },
      {
        question: "SSH란?",
        answer: "Secure Shell. 암호화된 채널로 원격 서버에 안전하게 접속하는 프로토콜.",
      },
      {
        question: "ps 명령어란?",
        answer: "현재 실행 중인 프로세스의 스냅샷 목록을 출력하는 명령어. ps aux로 전체 프로세스 확인.",
      },
      {
        question: "kill 명령어란?",
        answer: "프로세스에 시그널을 전송하는 명령어. kill -9 PID는 강제 종료(SIGKILL)를 보낸다.",
      },
      {
        question: "셸 스크립트란?",
        answer: "셸 명령어들을 파일에 작성하여 순차적/조건적으로 실행할 수 있게 한 스크립트 프로그램.",
      },
      {
        question: "심볼릭 링크(Symbolic Link)란?",
        answer: "다른 파일/디렉토리의 경로를 가리키는 특수 파일. ln -s로 생성하며 원본 삭제 시 깨진다.",
      },
    ],
  },

  "07-infra/02-docker-containers": {
    quizzes: [
      {
        question: "컨테이너와 가상 머신(VM)의 핵심 차이점은 무엇인가?",
        answer: "VM은 하이퍼바이저 위에 게스트 OS를 포함하여 무겁고 부팅이 느리다. 컨테이너는 호스트 OS 커널을 공유하며 프로세스 수준으로 격리되어 가볍고 빠르게 시작된다.",
      },
      {
        question: "Docker 이미지와 컨테이너의 관계를 설명하시오.",
        answer: "이미지는 애플리케이션과 의존성을 포함하는 읽기 전용 템플릿이고, 컨테이너는 이미지를 기반으로 실행된 인스턴스로 쓰기 가능한 레이어가 추가된다.",
      },
      {
        question: "Dockerfile에서 COPY와 ADD의 차이는?",
        answer: "COPY는 로컬 파일을 이미지로 복사하는 단순한 기능이고, ADD는 추가로 URL 다운로드와 tar 자동 압축 해제를 지원한다. 명확성을 위해 일반적으로 COPY 사용이 권장된다.",
      },
      {
        question: "Docker 레이어 캐싱이 빌드 속도를 높이는 원리는?",
        answer: "Dockerfile의 각 명령이 레이어를 생성하며, 변경되지 않은 레이어는 캐시에서 재사용된다. 자주 변경되는 명령을 뒤에 배치하면 캐시 히트율이 높아진다.",
      },
      {
        question: "Docker 볼륨(Volume)과 바인드 마운트(Bind Mount)의 차이는?",
        answer: "볼륨은 Docker가 관리하는 저장소로 컨테이너 간 공유와 백업이 용이하다. 바인드 마운트는 호스트의 특정 경로를 직접 마운트하여 개발 시 소스코드 공유에 주로 사용된다.",
      },
      {
        question: "Docker 네트워크 모드 중 bridge와 host의 차이는?",
        answer: "bridge는 격리된 가상 네트워크에서 컨테이너 간 통신하며 포트 매핑이 필요하다. host는 호스트의 네트워크를 직접 사용하여 포트 매핑 없이 동작하지만 격리성이 떨어진다.",
      },
      {
        question: "docker-compose의 역할과 주요 기능은?",
        answer: "여러 컨테이너로 구성된 애플리케이션을 YAML 파일 하나로 정의하고 관리한다. 서비스 간 의존성, 네트워크, 볼륨, 환경변수를 선언적으로 설정하고 docker compose up으로 일괄 실행한다.",
      },
      {
        question: "멀티스테이지 빌드(Multi-stage Build)의 장점은?",
        answer: "빌드에 필요한 도구와 의존성을 첫 번째 스테이지에서 사용하고, 최종 이미지에는 빌드 결과물만 복사하여 이미지 크기를 대폭 줄일 수 있다.",
      },
      {
        question: "Dockerfile에서 CMD와 ENTRYPOINT의 차이는?",
        answer: "CMD는 컨테이너 실행 시 기본 명령을 지정하며 docker run 인자로 덮어쓸 수 있다. ENTRYPOINT는 항상 실행되는 명령을 지정하며 CMD는 그 인자가 된다.",
      },
      {
        question: "Docker 레지스트리(Registry)의 역할은 무엇인가?",
        answer: "Docker 이미지를 저장하고 배포하는 서비스이다. Docker Hub가 대표적인 퍼블릭 레지스트리이며, 프라이빗 레지스트리를 구축하여 내부 이미지를 관리할 수도 있다.",
      },
      {
        question: "컨테이너의 격리를 구현하는 리눅스 기술 두 가지는?",
        answer: "Namespace는 프로세스, 네트워크, 파일 시스템 등을 격리하고, cgroup(Control Group)은 CPU, 메모리 등 자원 사용량을 제한한다.",
      },
      {
        question: "Dockerfile에서 RUN, CMD, ENTRYPOINT의 exec 형식과 shell 형식의 차이는?",
        answer: "exec 형식([\"cmd\", \"arg\"])은 셸을 거치지 않고 직접 실행되어 시그널을 제대로 받는다. shell 형식(cmd arg)은 /bin/sh -c로 실행되어 셸 기능(변수 확장 등)을 사용할 수 있다.",
      },
      {
        question: ".dockerignore 파일의 역할은 무엇인가?",
        answer: "빌드 컨텍스트에서 제외할 파일/디렉토리를 지정한다. node_modules, .git 등을 제외하면 빌드 컨텍스트 크기가 줄어 빌드 속도가 향상되고 불필요한 파일이 이미지에 포함되지 않는다.",
      },
      {
        question: "Docker에서 컨테이너 로그를 확인하는 방법은?",
        answer: "docker logs <container> 명령으로 컨테이너의 stdout/stderr 출력을 확인한다. -f 옵션으로 실시간 스트리밍, --tail N으로 마지막 N줄만 볼 수 있다.",
      },
      {
        question: "Docker 이미지를 경량화하는 주요 전략 3가지는?",
        answer: "1) alpine 등 경량 베이스 이미지 사용. 2) 멀티스테이지 빌드로 빌드 도구 제외. 3) 레이어 수 최소화(RUN 명령 통합, 불필요한 파일 삭제).",
      },
    ],
    flashcards: [
      {
        question: "컨테이너(Container)란?",
        answer: "호스트 OS 커널을 공유하며 프로세스 수준으로 격리된 경량 실행 환경. VM보다 가볍고 빠르다.",
      },
      {
        question: "Docker 이미지(Image)란?",
        answer: "애플리케이션과 의존성을 포함하는 읽기 전용 레이어의 집합. 컨테이너 실행의 템플릿이다.",
      },
      {
        question: "Dockerfile이란?",
        answer: "Docker 이미지를 빌드하기 위한 명령어를 순차적으로 기술한 텍스트 파일.",
      },
      {
        question: "Docker 레이어(Layer)란?",
        answer: "Dockerfile의 각 명령이 생성하는 파일 시스템 변경 단위. 캐싱을 통해 빌드 효율성을 높인다.",
      },
      {
        question: "Docker 볼륨(Volume)이란?",
        answer: "Docker가 관리하는 영구 데이터 저장소. 컨테이너 삭제 후에도 데이터가 유지된다.",
      },
      {
        question: "Docker 네트워크란?",
        answer: "컨테이너 간 통신을 위한 가상 네트워크. bridge, host, overlay 등의 드라이버가 있다.",
      },
      {
        question: "docker-compose란?",
        answer: "YAML 파일로 멀티 컨테이너 애플리케이션을 정의하고 일괄 관리하는 도구.",
      },
      {
        question: "멀티스테이지 빌드란?",
        answer: "Dockerfile에서 여러 FROM을 사용해 빌드 단계와 실행 단계를 분리하여 최종 이미지를 경량화하는 기법.",
      },
      {
        question: "Docker Registry란?",
        answer: "Docker 이미지를 저장하고 배포하는 서비스. Docker Hub가 대표적인 퍼블릭 레지스트리.",
      },
      {
        question: "CMD vs ENTRYPOINT?",
        answer: "CMD: 기본 실행 명령(덮어쓰기 가능). ENTRYPOINT: 항상 실행되는 명령(CMD가 인자가 됨).",
      },
      {
        question: "Namespace란?",
        answer: "리눅스 커널 기능으로 프로세스, 네트워크, 파일 시스템 등을 격리하여 컨테이너 환경을 제공한다.",
      },
      {
        question: "cgroup이란?",
        answer: "Control Group. 프로세스 그룹의 CPU, 메모리, I/O 등 자원 사용량을 제한하는 리눅스 커널 기능.",
      },
      {
        question: "바인드 마운트(Bind Mount)란?",
        answer: "호스트의 특정 디렉토리를 컨테이너에 직접 마운트하는 방식. 개발 시 소스 코드 공유에 활용.",
      },
      {
        question: ".dockerignore란?",
        answer: "빌드 컨텍스트에서 제외할 파일 패턴을 지정하는 파일. 빌드 속도와 이미지 크기 개선에 기여.",
      },
      {
        question: "Docker Hub란?",
        answer: "Docker의 기본 퍼블릭 이미지 레지스트리. 공식/커뮤니티 이미지를 검색하고 공유할 수 있다.",
      },
    ],
  },

  "07-infra/03-cicd": {
    quizzes: [
      {
        question: "CI(Continuous Integration)와 CD(Continuous Delivery/Deployment)의 차이는?",
        answer: "CI는 코드 변경을 자주 통합하고 자동 빌드/테스트하는 것이고, Continuous Delivery는 배포 가능 상태까지 자동화하되 배포는 수동 승인이며, Continuous Deployment는 배포까지 완전 자동화한다.",
      },
      {
        question: "GitHub Actions의 workflow, job, step의 관계를 설명하시오.",
        answer: "Workflow는 YAML로 정의된 자동화 파이프라인이고, 하나 이상의 Job으로 구성된다. Job은 독립적인 실행 단위로 병렬/순차 실행이 가능하며, 각 Job은 여러 Step으로 이루어진다.",
      },
      {
        question: "블루-그린 배포(Blue-Green Deployment)의 동작 방식과 장점은?",
        answer: "현재 운영(Blue)과 동일한 새 환경(Green)에 새 버전을 배포한 후 트래픽을 전환한다. 문제 시 즉시 Blue로 롤백 가능하며 다운타임이 거의 없다.",
      },
      {
        question: "카나리 배포(Canary Deployment)란 무엇인가?",
        answer: "새 버전을 소수의 사용자에게 먼저 배포하고 모니터링한 후 문제가 없으면 점진적으로 전체로 확대하는 방식이다. 위험을 최소화할 수 있다.",
      },
      {
        question: "롤링 배포(Rolling Deployment)의 특징은?",
        answer: "기존 인스턴스를 하나씩(또는 배치 단위로) 새 버전으로 교체한다. 추가 인프라가 필요 없지만 배포 중 구/신 버전이 공존하며 롤백이 느릴 수 있다.",
      },
      {
        question: "빌드 아티팩트(Artifact)란 무엇이며 CI/CD에서 어떻게 활용되는가?",
        answer: "빌드 과정의 산출물(JAR, Docker 이미지, 번들 등)이다. CI에서 생성된 아티팩트를 저장소에 보관하고 CD 단계에서 동일한 아티팩트를 배포하여 빌드 재현성을 보장한다.",
      },
      {
        question: "환경 분리(dev/staging/production)가 필요한 이유는?",
        answer: "개발(dev)에서 자유롭게 실험하고, 스테이징(staging)에서 프로덕션과 유사한 환경에서 검증한 후, 프로덕션(production)에 안전하게 배포하기 위해 단계별 환경을 분리한다.",
      },
      {
        question: "CI 파이프라인에서 자동화 테스트의 일반적인 실행 순서는?",
        answer: "단위 테스트(Unit Test) → 통합 테스트(Integration Test) → E2E 테스트 순으로 실행한다. 빠른 테스트를 먼저 실행하여 빠른 피드백을 제공한다.",
      },
      {
        question: "GitHub Actions에서 secrets를 사용하는 이유와 방법은?",
        answer: "API 키, 비밀번호 등 민감 정보를 코드에 노출하지 않기 위해 사용한다. Repository Settings에서 등록하고 workflow에서 ${{ secrets.SECRET_NAME }}으로 참조한다.",
      },
      {
        question: "CI/CD 파이프라인에서 '실패 시 빠른 피드백(Fail Fast)'의 원칙이란?",
        answer: "오류를 가능한 빨리 감지하여 개발자에게 알리는 원칙이다. 린터 → 단위 테스트 → 빌드 → 통합 테스트 순으로 빠른 검사를 먼저 실행하여 불필요한 대기 시간을 줄인다.",
      },
      {
        question: "GitHub Actions에서 on 트리거의 주요 이벤트 타입 3가지를 설명하시오.",
        answer: "push: 코드 푸시 시 실행. pull_request: PR 생성/업데이트 시 실행. schedule: cron 표현식으로 주기적 실행. 이 외에도 workflow_dispatch(수동)가 있다.",
      },
      {
        question: "배포 롤백(Rollback)이란 무엇이며 왜 중요한가?",
        answer: "새 배포에 문제가 발생했을 때 이전 안정 버전으로 되돌리는 것이다. 서비스 장애 시간을 최소화하고 사용자 영향을 줄이기 위해 빠른 롤백 전략이 필수적이다.",
      },
      {
        question: "모노레포(Monorepo)에서 CI/CD를 효율적으로 운영하는 방법은?",
        answer: "변경된 경로를 감지하여 영향받는 서비스/패키지만 빌드/테스트/배포한다. GitHub Actions에서는 paths 필터나 변경 감지 액션을 활용한다.",
      },
      {
        question: "GitOps란 무엇인가?",
        answer: "Git 저장소를 배포 상태의 단일 소스(Single Source of Truth)로 사용하는 운영 방식이다. 인프라/배포 설정을 Git에 선언하고, 변경 시 자동으로 클러스터에 반영한다.",
      },
      {
        question: "CI/CD에서 캐싱(Caching)이 중요한 이유와 적용 예시는?",
        answer: "의존성 다운로드와 빌드 시간을 단축한다. 예: npm/pip 캐시로 패키지 재다운로드 방지, Docker 레이어 캐시로 이미지 빌드 가속, 빌드 결과물 캐시로 재컴파일 방지.",
      },
    ],
    flashcards: [
      {
        question: "CI(Continuous Integration)란?",
        answer: "코드 변경을 자주 메인 브랜치에 통합하고 자동으로 빌드와 테스트를 실행하는 개발 관행.",
      },
      {
        question: "CD(Continuous Delivery)란?",
        answer: "CI를 확장하여 코드가 항상 배포 가능한 상태를 유지하도록 자동화하는 것. 배포 자체는 수동 승인.",
      },
      {
        question: "Continuous Deployment란?",
        answer: "모든 변경이 자동 테스트를 통과하면 프로덕션까지 자동으로 배포되는 것. CD의 완전 자동화 형태.",
      },
      {
        question: "GitHub Actions란?",
        answer: "GitHub에서 제공하는 CI/CD 플랫폼. YAML 파일로 워크플로우를 정의하여 빌드/테스트/배포를 자동화.",
      },
      {
        question: "블루-그린 배포란?",
        answer: "두 개의 동일한 환경(Blue/Green) 사이에서 트래픽을 전환하는 무중단 배포 방식.",
      },
      {
        question: "카나리 배포란?",
        answer: "새 버전을 소수 사용자에게 먼저 배포하여 검증 후 점진적으로 확대하는 배포 전략.",
      },
      {
        question: "롤링 배포란?",
        answer: "인스턴스를 하나씩 순차적으로 새 버전으로 교체하는 배포 방식. 추가 인프라 불필요.",
      },
      {
        question: "빌드 아티팩트(Artifact)란?",
        answer: "빌드 과정의 산출물(JAR, Docker 이미지, 번들 등). 배포 단계에서 동일한 아티팩트를 사용.",
      },
      {
        question: "환경 분리(Environment Separation)란?",
        answer: "dev, staging, production 등 용도별로 환경을 분리하여 안전한 개발과 배포를 보장하는 전략.",
      },
      {
        question: "롤백(Rollback)이란?",
        answer: "배포 후 문제 발생 시 이전 안정 버전으로 되돌리는 과정.",
      },
      {
        question: "GitOps란?",
        answer: "Git 저장소를 인프라/배포의 단일 소스로 사용하여 선언적으로 관리하는 운영 방식.",
      },
      {
        question: "파이프라인 캐싱이란?",
        answer: "CI/CD에서 의존성, 빌드 결과 등을 캐시하여 반복 실행 시 시간을 단축하는 기법.",
      },
      {
        question: "Fail Fast 원칙이란?",
        answer: "빠른 검사(린터, 단위 테스트)를 먼저 실행해 오류를 조기에 감지하고 피드백하는 CI 원칙.",
      },
      {
        question: "Workflow dispatch란?",
        answer: "GitHub Actions에서 수동으로 워크플로우를 트리거할 수 있는 이벤트 타입.",
      },
      {
        question: "Self-hosted runner란?",
        answer: "GitHub Actions에서 자체 서버를 실행 환경으로 사용하는 것. 특수 하드웨어나 보안 요구에 활용.",
      },
    ],
  },

  "07-infra/04-cloud-k8s": {
    quizzes: [
      {
        question: "IaaS, PaaS, SaaS의 차이를 사용자 관리 범위 기준으로 설명하시오.",
        answer: "IaaS는 인프라(서버/네트워크)만 제공하고 OS부터 사용자가 관리한다. PaaS는 런타임까지 제공하여 코드만 배포하면 된다. SaaS는 완성된 소프트웨어를 서비스로 제공하여 사용자는 이용만 한다.",
      },
      {
        question: "AWS EC2와 Lambda의 차이를 설명하시오.",
        answer: "EC2는 가상 서버(IaaS)로 직접 OS와 런타임을 관리하며 항상 실행된다. Lambda는 서버리스 함수로 이벤트 발생 시에만 실행되며 사용한 만큼만 과금되고 인프라 관리가 불필요하다.",
      },
      {
        question: "Kubernetes의 Pod, Service, Deployment의 역할을 각각 설명하시오.",
        answer: "Pod는 하나 이상의 컨테이너를 포함하는 최소 배포 단위이다. Service는 Pod 집합에 안정적인 네트워크 접근점을 제공한다. Deployment는 Pod의 선언적 배포와 롤링 업데이트/롤백을 관리한다.",
      },
      {
        question: "Kubernetes Ingress의 역할은 무엇인가?",
        answer: "클러스터 외부에서 내부 Service로의 HTTP/HTTPS 트래픽 라우팅을 관리한다. 호스트명/경로 기반 라우팅, TLS 종료, 로드 밸런싱 등을 제공한다.",
      },
      {
        question: "오토스케일링(Auto Scaling)의 수평 확장과 수직 확장의 차이는?",
        answer: "수평 확장(Scale Out)은 인스턴스 수를 늘려 부하를 분산하고, 수직 확장(Scale Up)은 단일 인스턴스의 CPU/메모리 등 자원을 증가시킨다. 수평 확장이 가용성과 탄력성 면에서 클라우드에 더 적합하다.",
      },
      {
        question: "서버리스(Serverless)의 장단점을 설명하시오.",
        answer: "장점: 서버 관리 불필요, 자동 스케일링, 사용량 기반 과금. 단점: 콜드 스타트 지연, 실행 시간 제한, 상태 유지 어려움, 벤더 종속성.",
      },
      {
        question: "AWS S3의 특징과 주요 사용 사례는?",
        answer: "무한 확장 가능한 객체 스토리지 서비스이다. 높은 내구성(99.999999999%)을 제공하며 정적 웹사이트 호스팅, 데이터 백업, 미디어 저장, 데이터 레이크 등에 사용된다.",
      },
      {
        question: "AWS RDS와 직접 EC2에 DB를 설치하는 것의 차이는?",
        answer: "RDS는 관리형 서비스로 자동 백업, 패치, 복제, 장애 복구를 제공하여 운영 부담을 줄인다. EC2에 직접 설치하면 모든 관리를 수동으로 해야 하지만 커스터마이징 자유도가 높다.",
      },
      {
        question: "Kubernetes에서 ReplicaSet의 역할은 무엇인가?",
        answer: "지정된 수의 동일한 Pod 복제본이 항상 실행되도록 보장한다. Pod가 죽으면 자동으로 새 Pod를 생성한다. 보통 Deployment를 통해 간접적으로 관리된다.",
      },
      {
        question: "Kubernetes의 선언적(Declarative) 관리 방식이란?",
        answer: "원하는 최종 상태(desired state)를 YAML/JSON으로 정의하면 쿠버네티스 컨트롤러가 현재 상태를 지속적으로 원하는 상태로 맞추는 방식이다. 명령적 방식과 달리 일관성과 재현성이 높다.",
      },
      {
        question: "클라우드 리전(Region)과 가용 영역(AZ)의 관계를 설명하시오.",
        answer: "리전은 지리적으로 분리된 데이터센터 클러스터이고, 각 리전은 2개 이상의 가용 영역으로 구성된다. 가용 영역은 독립된 전원/네트워크를 가져 한 AZ 장애가 다른 AZ에 영향을 주지 않는다.",
      },
      {
        question: "Kubernetes ConfigMap과 Secret의 차이는?",
        answer: "ConfigMap은 환경 설정 등 비민감 데이터를 키-값으로 저장한다. Secret은 비밀번호, 토큰 등 민감 데이터를 base64 인코딩하여 저장하며 접근 제어가 더 엄격하다.",
      },
      {
        question: "로드 밸런서(Load Balancer)의 역할과 종류를 설명하시오.",
        answer: "트래픽을 여러 서버에 분산하여 가용성과 성능을 높인다. L4(TCP/UDP 기반, 빠름)와 L7(HTTP 기반, 콘텐츠 기반 라우팅 가능)로 나뉜다.",
      },
      {
        question: "CDN(Content Delivery Network)의 동작 원리와 장점은?",
        answer: "전 세계 엣지 서버에 콘텐츠를 캐싱하여 사용자와 가까운 서버에서 응답한다. 지연 시간 감소, 원본 서버 부하 감소, 대역폭 절약, DDoS 완화 등의 장점이 있다.",
      },
      {
        question: "IAM(Identity and Access Management)의 핵심 개념은?",
        answer: "사용자/역할(Role)에게 최소 권한 원칙에 따라 리소스 접근 권한을 부여하는 서비스이다. 정책(Policy)으로 허용/거부할 작업과 리소스를 정의한다.",
      },
    ],
    flashcards: [
      {
        question: "IaaS란?",
        answer: "Infrastructure as a Service. 서버, 네트워크, 스토리지 등 인프라를 클라우드로 제공. 예: AWS EC2.",
      },
      {
        question: "PaaS란?",
        answer: "Platform as a Service. 런타임과 미들웨어까지 제공하여 코드만 배포. 예: Heroku, AWS Elastic Beanstalk.",
      },
      {
        question: "SaaS란?",
        answer: "Software as a Service. 완성된 애플리케이션을 서비스로 제공. 예: Gmail, Notion.",
      },
      {
        question: "AWS EC2란?",
        answer: "Elastic Compute Cloud. 가상 서버를 제공하는 AWS의 핵심 IaaS 서비스.",
      },
      {
        question: "AWS S3란?",
        answer: "Simple Storage Service. 무한 확장 가능한 객체 스토리지. 99.999999999% 내구성.",
      },
      {
        question: "AWS Lambda란?",
        answer: "이벤트 기반 서버리스 함수 실행 서비스. 사용한 만큼만 과금되며 서버 관리 불필요.",
      },
      {
        question: "Kubernetes(K8s)란?",
        answer: "컨테이너 오케스트레이션 플랫폼. 컨테이너의 배포, 스케일링, 관리를 자동화한다.",
      },
      {
        question: "Pod란?",
        answer: "Kubernetes의 최소 배포 단위. 하나 이상의 컨테이너를 포함하며 네트워크/스토리지를 공유.",
      },
      {
        question: "Service(K8s)란?",
        answer: "Pod 집합에 대한 안정적인 네트워크 엔드포인트를 제공하는 추상화 계층.",
      },
      {
        question: "Deployment(K8s)란?",
        answer: "Pod의 선언적 배포, 롤링 업데이트, 롤백을 관리하는 컨트롤러.",
      },
      {
        question: "Ingress(K8s)란?",
        answer: "클러스터 외부 HTTP(S) 트래픽을 내부 Service로 라우팅하는 리소스.",
      },
      {
        question: "오토스케일링이란?",
        answer: "부하에 따라 인스턴스 수(수평) 또는 자원(수직)을 자동으로 조절하는 기능.",
      },
      {
        question: "서버리스(Serverless)란?",
        answer: "서버 관리 없이 코드를 실행하는 클라우드 모델. 이벤트 기반, 사용량 과금, 자동 스케일링.",
      },
      {
        question: "AWS RDS란?",
        answer: "Relational Database Service. 관리형 관계형 데이터베이스. 자동 백업, 패치, 복제 제공.",
      },
      {
        question: "CDN이란?",
        answer: "Content Delivery Network. 전 세계 엣지 서버에 콘텐츠를 캐싱하여 빠르게 전달하는 네트워크.",
      },
    ],
  },

  "08-ai-agent/01-agent-fundamentals": {
    quizzes: [
      {
        question: "AI 에이전트의 정의와 일반 챗봇과의 핵심 차이는?",
        answer: "AI 에이전트는 목표를 달성하기 위해 자율적으로 추론하고 도구를 사용하여 행동하는 시스템이다. 일반 챗봇은 입력에 대한 응답만 생성하지만 에이전트는 계획, 도구 호출, 결과 관찰, 반복 실행의 루프를 수행한다.",
      },
      {
        question: "ReAct(Reasoning + Acting) 패턴의 동작 방식을 설명하시오.",
        answer: "Thought(추론) → Action(도구 호출) → Observation(결과 관찰)을 반복하는 패턴이다. LLM이 먼저 현재 상황을 추론하고, 필요한 도구를 선택하여 실행한 후, 결과를 관찰하여 다음 단계를 결정한다.",
      },
      {
        question: "에이전트에서 도구 사용(Tool Use)이 중요한 이유와 예시를 들시오.",
        answer: "LLM의 한계(최신 정보 부재, 계산 능력 제한, 외부 시스템 접근 불가)를 도구로 보완한다. 예: 웹 검색(최신 정보), 계산기(정확한 연산), API 호출(외부 서비스), 코드 실행(복잡한 로직).",
      },
      {
        question: "추론-행동 루프(Reasoning-Action Loop)의 종료 조건은 무엇인가?",
        answer: "에이전트가 목표를 달성했다고 판단하거나, 충분한 정보를 수집하여 최종 답변을 생성할 수 있을 때 루프를 종료한다. 또한 최대 반복 횟수 초과나 오류 시에도 종료된다.",
      },
      {
        question: "에이전트의 단기 메모리와 장기 메모리의 차이를 설명하시오.",
        answer: "단기 메모리는 현재 대화/작업의 컨텍스트(대화 히스토리, 중간 결과)로 컨텍스트 윈도우에 유지된다. 장기 메모리는 벡터 DB나 외부 저장소에 과거 경험과 지식을 영구 저장하여 세션 간에 활용한다.",
      },
      {
        question: "에이전트의 계획(Planning) 능력이란 무엇인가?",
        answer: "복잡한 목표를 하위 태스크로 분해하고 실행 순서를 결정하는 능력이다. 목표 분해, 우선순위 결정, 의존관계 파악, 필요한 도구 선택 등을 포함한다.",
      },
      {
        question: "에이전트에서 자기 반성(Self-Reflection)이란 무엇이며 왜 중요한가?",
        answer: "에이전트가 자신의 행동 결과를 평가하고 오류를 인식하여 전략을 수정하는 능력이다. 잘못된 도구 선택이나 오류 발생 시 대안을 찾아 목표 달성 확률을 높인다.",
      },
      {
        question: "에이전트와 단순 RAG 파이프라인의 차이는 무엇인가?",
        answer: "RAG는 검색 → 생성의 단방향 흐름이지만 에이전트는 검색 결과를 평가하고 부족하면 추가 검색/도구 사용을 자율적으로 결정할 수 있는 반복적이고 동적인 흐름을 가진다.",
      },
      {
        question: "에이전트의 환각(Hallucination) 문제를 완화하는 전략은?",
        answer: "도구 호출로 사실 검증, 검색 기반 정보 활용, 구조화된 출력 형식 강제, 자기 반성 단계 추가, 불확실할 때 추가 정보 수집을 유도하는 프롬프트 설계 등이 있다.",
      },
      {
        question: "에이전트에서 관찰(Observation)의 역할은 무엇인가?",
        answer: "도구 실행 결과나 환경 상태를 에이전트에게 피드백하는 단계이다. 에이전트는 관찰 결과를 바탕으로 다음 행동을 결정하거나 최종 답변을 생성한다.",
      },
      {
        question: "함수 호출(Function Calling)이 에이전트 구현에 미친 영향은?",
        answer: "LLM이 구조화된 JSON 형식으로 함수명과 인자를 출력할 수 있게 되어, 도구 호출을 파싱 오류 없이 안정적으로 수행할 수 있게 되었다. 에이전트 프레임워크의 핵심 기반 기술이다.",
      },
      {
        question: "에이전트의 도구 설명(Tool Description)이 중요한 이유는?",
        answer: "LLM이 적절한 도구를 선택하려면 각 도구의 기능, 입력 파라미터, 사용 시나리오를 명확히 이해해야 한다. 잘 작성된 도구 설명은 도구 선택 정확도를 크게 높인다.",
      },
      {
        question: "에이전트의 멀티스텝 추론에서 발생할 수 있는 오류 누적 문제란?",
        answer: "여러 단계를 거치며 각 단계의 작은 오류가 누적되어 최종 결과의 정확도가 크게 떨어질 수 있다. 중간 검증 단계와 오류 복구 메커니즘으로 완화한다.",
      },
      {
        question: "에이전트의 상태 관리(State Management)란 무엇인가?",
        answer: "에이전트가 작업 진행 중 수집한 정보, 실행한 도구, 중간 결과 등을 추적하고 관리하는 것이다. 효과적인 상태 관리로 불필요한 반복을 방지하고 일관된 행동을 보장한다.",
      },
      {
        question: "에이전트에서 가드레일(Guardrail)의 역할은?",
        answer: "에이전트의 행동 범위를 제한하여 안전성을 확보하는 메커니즘이다. 허용된 도구만 사용, 위험한 행동 차단, 비용 제한, 민감 정보 필터링 등을 수행한다.",
      },
    ],
    flashcards: [
      {
        question: "AI 에이전트란?",
        answer: "목표를 위해 자율적으로 추론하고, 도구를 사용하며, 환경과 상호작용하는 AI 시스템.",
      },
      {
        question: "ReAct 패턴이란?",
        answer: "Reasoning(추론) + Acting(행동). Thought → Action → Observation을 반복하는 에이전트 패턴.",
      },
      {
        question: "도구 사용(Tool Use)이란?",
        answer: "에이전트가 외부 API, 검색, 코드 실행 등의 도구를 호출하여 LLM의 한계를 보완하는 능력.",
      },
      {
        question: "추론-행동 루프란?",
        answer: "에이전트가 상황을 추론하고, 행동을 실행하고, 결과를 관찰하는 반복적 프로세스.",
      },
      {
        question: "단기 메모리(Short-term Memory)란?",
        answer: "현재 대화/작업의 컨텍스트. 컨텍스트 윈도우에 유지되는 대화 히스토리와 중간 결과.",
      },
      {
        question: "장기 메모리(Long-term Memory)란?",
        answer: "벡터 DB 등 외부 저장소에 영구 저장되어 세션 간에 활용 가능한 과거 경험과 지식.",
      },
      {
        question: "에이전트 vs 챗봇?",
        answer: "챗봇은 입력-응답의 단방향 흐름. 에이전트는 자율적 계획, 도구 사용, 반복 실행의 다단계 흐름.",
      },
      {
        question: "Function Calling이란?",
        answer: "LLM이 구조화된 형식(JSON)으로 함수명과 인자를 출력하여 안정적인 도구 호출을 가능하게 하는 기능.",
      },
      {
        question: "에이전트의 계획(Planning)이란?",
        answer: "복잡한 목표를 하위 태스크로 분해하고 실행 순서와 필요한 도구를 결정하는 능력.",
      },
      {
        question: "자기 반성(Self-Reflection)이란?",
        answer: "에이전트가 자신의 행동 결과를 평가하고 오류를 수정하여 전략을 개선하는 메커니즘.",
      },
      {
        question: "가드레일(Guardrail)이란?",
        answer: "에이전트의 행동 범위를 제한하여 안전성을 확보하는 규칙과 필터.",
      },
      {
        question: "Observation이란?",
        answer: "에이전트가 도구 실행 결과나 환경 상태를 인식하는 단계. 다음 행동 결정의 근거.",
      },
      {
        question: "에이전트의 상태 관리란?",
        answer: "작업 진행 중 수집한 정보와 중간 결과를 추적하여 일관된 행동을 보장하는 것.",
      },
      {
        question: "도구 설명(Tool Description)이란?",
        answer: "에이전트가 올바른 도구를 선택할 수 있도록 도구의 기능, 파라미터, 용도를 기술한 것.",
      },
      {
        question: "에이전트의 멀티스텝 추론이란?",
        answer: "여러 단계의 추론과 도구 호출을 거쳐 복잡한 문제를 해결하는 에이전트의 핵심 능력.",
      },
    ],
  },

  "08-ai-agent/02-orchestration-frameworks": {
    quizzes: [
      {
        question: "LangChain의 핵심 구성 요소(Chain, Agent, Tool, Memory)를 설명하시오.",
        answer: "Chain은 LLM 호출과 도구를 연결한 처리 흐름이다. Agent는 동적으로 도구를 선택하여 실행한다. Tool은 외부 기능(검색, API 등)의 인터페이스이다. Memory는 대화 히스토리 등 상태를 관리한다.",
      },
      {
        question: "LlamaIndex의 주요 용도와 LangChain과의 차이는?",
        answer: "LlamaIndex는 데이터 인덱싱과 검색(RAG)에 특화된 프레임워크이다. LangChain은 범용 LLM 애플리케이션 프레임워크로 체이닝과 에이전트에 강하고, LlamaIndex는 데이터 연결과 쿼리 엔진에 강하다.",
      },
      {
        question: "CrewAI에서 에이전트, 태스크, 크루의 관계를 설명하시오.",
        answer: "에이전트는 특정 역할과 도구를 가진 개별 AI이다. 태스크는 에이전트에게 할당되는 구체적 작업이다. 크루(Crew)는 여러 에이전트와 태스크를 조합하여 협업하는 팀 단위이다.",
      },
      {
        question: "체이닝(Chaining)이란 무엇이며 왜 유용한가?",
        answer: "여러 LLM 호출이나 처리 단계를 순차적으로 연결하는 것이다. 복잡한 태스크를 작은 단계로 분해하여 각 단계의 출력을 다음 단계의 입력으로 사용하면 정확도와 제어력이 향상된다.",
      },
      {
        question: "에이전트 오케스트레이션에서 단일 에이전트 vs 멀티 에이전트의 장단점은?",
        answer: "단일 에이전트는 구현이 단순하고 디버깅이 쉽지만 복잡한 태스크에 한계가 있다. 멀티 에이전트는 역할 분담으로 복잡한 문제를 효과적으로 해결하지만 통신 오버헤드와 조율 복잡성이 증가한다.",
      },
      {
        question: "멀티에이전트 시스템에서 에이전트 간 통신 방식 두 가지를 설명하시오.",
        answer: "1) 직접 메시지 전달: 에이전트 간 직접 대화하며 정보를 교환. 2) 공유 상태/블랙보드: 공통 저장소에 정보를 쓰고 읽으며 간접적으로 협업. 오케스트레이터가 중앙에서 조율하기도 한다.",
      },
      {
        question: "LangChain의 LCEL(LangChain Expression Language)이란?",
        answer: "파이프(|) 연산자로 체인을 선언적으로 구성하는 LangChain의 표현 언어이다. 스트리밍, 배치, 비동기 실행을 자동으로 지원하며 체인 구성이 간결해진다.",
      },
      {
        question: "LlamaIndex의 인덱스(Index) 유형과 각각의 특징은?",
        answer: "VectorStoreIndex: 임베딩 기반 유사도 검색에 최적. ListIndex: 순차적으로 모든 노드를 처리. TreeIndex: 계층적 요약으로 구조적 질의에 적합. KeywordTableIndex: 키워드 기반 검색.",
      },
      {
        question: "에이전트 프레임워크 선택 시 고려해야 할 요소는?",
        answer: "사용 사례(RAG vs 범용 에이전트), 커스터마이징 필요도, 지원 LLM/도구, 커뮤니티 생태계, 학습 곡선, 프로덕션 준비도(모니터링, 에러 처리), 비용 등을 고려한다.",
      },
      {
        question: "LangChain의 Callback 시스템의 용도는?",
        answer: "체인/에이전트 실행 중 각 단계의 이벤트(LLM 호출, 도구 실행, 오류 등)를 모니터링하고 로깅하는 시스템이다. 디버깅, 비용 추적, 성능 모니터링에 활용된다.",
      },
      {
        question: "멀티에이전트에서 역할 기반 설계(Role-based Design)의 장점은?",
        answer: "각 에이전트에 전문 역할(연구원, 작성자, 검토자 등)을 부여하면 프롬프트가 명확해지고, 전문성이 향상되며, 사람의 팀 구조와 유사하여 설계와 이해가 직관적이다.",
      },
      {
        question: "에이전트 오케스트레이션에서 순차 실행과 병렬 실행의 사용 사례는?",
        answer: "순차 실행: 이전 단계 결과가 다음 단계에 필요한 경우(번역 → 검수). 병렬 실행: 독립적인 태스크를 동시에 처리(여러 소스 동시 검색)하여 전체 처리 시간을 단축.",
      },
      {
        question: "LangSmith/LangFuse 같은 관찰성(Observability) 도구의 역할은?",
        answer: "LLM 애플리케이션의 각 호출을 추적(trace)하여 프롬프트, 응답, 지연 시간, 비용, 오류를 시각화한다. 디버깅, 성능 최적화, 품질 평가에 필수적이다.",
      },
      {
        question: "에이전트 프레임워크에서 구조화된 출력(Structured Output)의 중요성은?",
        answer: "LLM의 응답을 JSON Schema나 Pydantic 모델로 강제하면 파싱 오류를 방지하고, 다음 단계나 도구에 안정적으로 데이터를 전달할 수 있어 체이닝의 신뢰성이 높아진다.",
      },
      {
        question: "에이전트 프레임워크에서 폴백(Fallback) 전략이란?",
        answer: "기본 LLM이나 도구가 실패했을 때 대체 모델이나 경로로 자동 전환하는 전략이다. 예: GPT-4 실패 시 Claude로 전환, API 실패 시 캐시된 결과 사용.",
      },
    ],
    flashcards: [
      {
        question: "LangChain이란?",
        answer: "LLM 기반 애플리케이션 개발을 위한 범용 프레임워크. 체이닝, 에이전트, 메모리, 도구 통합을 제공.",
      },
      {
        question: "LlamaIndex란?",
        answer: "데이터 인덱싱과 검색(RAG)에 특화된 프레임워크. 다양한 데이터 소스와 인덱스 유형을 지원.",
      },
      {
        question: "CrewAI란?",
        answer: "역할 기반 멀티에이전트 시스템 구축 프레임워크. 에이전트, 태스크, 크루로 팀 협업을 구현.",
      },
      {
        question: "체이닝(Chaining)이란?",
        answer: "여러 LLM 호출이나 처리 단계를 순차적으로 연결하여 복잡한 워크플로우를 구성하는 패턴.",
      },
      {
        question: "에이전트 오케스트레이션이란?",
        answer: "하나 이상의 에이전트의 실행 흐름, 도구 선택, 상태 관리를 조율하는 것.",
      },
      {
        question: "멀티에이전트 시스템이란?",
        answer: "여러 에이전트가 역할을 분담하고 협업하여 복잡한 문제를 해결하는 아키텍처.",
      },
      {
        question: "LCEL이란?",
        answer: "LangChain Expression Language. 파이프 연산자(|)로 체인을 선언적으로 구성하는 문법.",
      },
      {
        question: "VectorStoreIndex란?",
        answer: "LlamaIndex에서 임베딩 벡터 기반 유사도 검색을 수행하는 인덱스 유형.",
      },
      {
        question: "역할 기반 설계란?",
        answer: "멀티에이전트에서 각 에이전트에 전문 역할을 부여하여 전문성과 명확성을 높이는 설계 방식.",
      },
      {
        question: "구조화된 출력(Structured Output)이란?",
        answer: "LLM 응답을 JSON Schema 등으로 강제하여 파싱 오류를 방지하고 안정적 데이터 전달을 보장.",
      },
      {
        question: "Callback 시스템이란?",
        answer: "에이전트/체인 실행 중 이벤트를 모니터링하고 로깅하는 훅 메커니즘.",
      },
      {
        question: "관찰성(Observability)이란?",
        answer: "LLM 애플리케이션의 호출 추적, 비용, 지연 시간, 오류를 시각화하고 분석하는 능력.",
      },
      {
        question: "폴백(Fallback) 전략이란?",
        answer: "기본 LLM/도구 실패 시 대체 모델이나 경로로 자동 전환하는 에러 처리 전략.",
      },
      {
        question: "데이터 커넥터란?",
        answer: "LlamaIndex에서 다양한 소스(PDF, DB, API 등)의 데이터를 로드하는 모듈.",
      },
      {
        question: "순차 vs 병렬 실행?",
        answer: "순차: 이전 결과에 의존하는 단계적 실행. 병렬: 독립적 태스크를 동시 처리하여 시간 단축.",
      },
    ],
  },

  "08-ai-agent/03-mcp-deployment": {
    quizzes: [
      {
        question: "MCP(Model Context Protocol)란 무엇이며 어떤 문제를 해결하는가?",
        answer: "Anthropic이 제안한 개방형 프로토콜로 LLM 애플리케이션과 외부 데이터/도구 간의 표준화된 연결 방식을 제공한다. 각 도구마다 별도 통합 코드를 작성하는 N:M 연결 문제를 해결한다.",
      },
      {
        question: "MCP의 클라이언트-서버 아키텍처를 설명하시오.",
        answer: "MCP 호스트(LLM 앱)가 MCP 클라이언트를 통해 MCP 서버와 통신한다. 서버는 리소스(데이터), 도구(함수), 프롬프트를 노출하며 클라이언트는 이를 발견하고 호출한다.",
      },
      {
        question: "에이전트 배포 시 고려해야 할 스케일링 전략은?",
        answer: "수평 스케일링(에이전트 인스턴스 복제), 큐 기반 비동기 처리(긴 작업 분리), LLM API 호출 속도 제한 대응(재시도/백오프), 캐싱(동일 쿼리 결과 재사용)을 고려해야 한다.",
      },
      {
        question: "에이전트 모니터링에서 추적해야 할 핵심 메트릭 4가지는?",
        answer: "1) 응답 지연 시간(Latency). 2) LLM API 호출 횟수와 비용. 3) 도구 호출 성공/실패율. 4) 태스크 완료율과 정확도.",
      },
      {
        question: "에이전트 안전성(Safety) 확보를 위한 주요 전략을 설명하시오.",
        answer: "허용 도구 화이트리스트, 입출력 필터링(유해 콘텐츠/민감 정보), 행동 범위 제한(샌드박스), 인간 승인 게이트(Human-in-the-Loop), 비용/호출 횟수 제한, 감사 로깅.",
      },
      {
        question: "프로덕션 에이전트에서 에러 처리(Error Handling)의 중요성과 전략은?",
        answer: "LLM 응답 불안정성, API 장애, 도구 실패 등이 빈번하므로 재시도(exponential backoff), 폴백 경로, 우아한 실패(graceful degradation), 상세한 에러 로깅이 필수적이다.",
      },
      {
        question: "에이전트 배포에서 Human-in-the-Loop의 역할은?",
        answer: "위험도가 높은 작업(결제, 데이터 삭제 등) 전에 사람의 승인을 요구하는 메커니즘이다. 자동화의 효율성과 안전성의 균형을 맞출 수 있다.",
      },
      {
        question: "에이전트 평가(Evaluation)가 어려운 이유와 접근법은?",
        answer: "비결정적 출력, 멀티스텝 경로의 다양성, 도구 호출 의존성으로 평가가 어렵다. 태스크 완료율, 도구 선택 정확도, 단계별 정확성, 최종 답변 품질 등을 정량/정성적으로 평가한다.",
      },
      {
        question: "MCP에서 리소스(Resource)와 도구(Tool)의 차이는?",
        answer: "리소스는 읽기 전용 데이터(파일, DB 레코드 등)를 제공하고, 도구는 부작용이 있는 작업(API 호출, 데이터 수정 등)을 수행한다. 리소스는 URI로 식별된다.",
      },
      {
        question: "에이전트 배포에서 비용 최적화 전략을 설명하시오.",
        answer: "경량 모델로 단순 태스크 처리, 프롬프트 길이 최적화, 캐싱으로 중복 호출 방지, 불필요한 루프 방지를 위한 최대 반복 제한, 배치 처리로 API 호출 횟수 절감.",
      },
      {
        question: "에이전트의 테스트 전략에서 단위 테스트와 통합 테스트의 범위는?",
        answer: "단위 테스트: 개별 도구 함수, 프롬프트 템플릿, 파싱 로직을 격리 테스트. 통합 테스트: 에이전트의 전체 실행 흐름을 시나리오 기반으로 테스트하며 목(mock) LLM/도구를 활용한다.",
      },
      {
        question: "MCP 서버의 전송(Transport) 방식 두 가지를 설명하시오.",
        answer: "stdio: 표준 입출력을 통해 로컬 프로세스와 통신하며 동일 머신에서 사용. SSE(Server-Sent Events): HTTP 기반으로 원격 서버와 통신하며 네트워크를 통한 배포에 적합하다.",
      },
      {
        question: "에이전트 로깅에서 구조화된 로그(Structured Logging)가 중요한 이유는?",
        answer: "JSON 형식 등으로 에이전트의 각 단계(추론, 도구 호출, 결과)를 구조화하면 검색, 필터링, 집계가 용이하여 디버깅과 성능 분석이 효율적이다.",
      },
      {
        question: "에이전트의 버전 관리에서 프롬프트 버전 관리가 필요한 이유는?",
        answer: "프롬프트 변경이 에이전트 행동에 큰 영향을 미치므로 코드와 동일하게 버전 관리하여 변경 추적, 성능 비교, 문제 시 롤백을 할 수 있어야 한다.",
      },
      {
        question: "프로덕션 에이전트에서 속도 제한(Rate Limiting)이 필요한 이유는?",
        answer: "LLM API의 호출 제한 초과 방지, 비용 폭주 방지, 무한 루프 시 자원 소진 방지, 악의적 사용 차단 등을 위해 에이전트 레벨의 속도 제한이 필수적이다.",
      },
    ],
    flashcards: [
      {
        question: "MCP(Model Context Protocol)란?",
        answer: "LLM 앱과 외부 도구/데이터 간 표준화된 연결을 위한 개방형 프로토콜. Anthropic이 제안.",
      },
      {
        question: "MCP 서버란?",
        answer: "리소스, 도구, 프롬프트를 표준 프로토콜로 노출하는 서비스. 클라이언트가 이를 발견하고 호출.",
      },
      {
        question: "MCP 클라이언트란?",
        answer: "MCP 서버에 연결하여 사용 가능한 리소스/도구를 발견하고 호출하는 호스트 측 컴포넌트.",
      },
      {
        question: "Human-in-the-Loop란?",
        answer: "위험도 높은 에이전트 행동 전에 사람의 검토와 승인을 요구하는 안전 메커니즘.",
      },
      {
        question: "에이전트 모니터링이란?",
        answer: "지연 시간, 비용, 성공률, 도구 호출 등 에이전트 운영 메트릭을 실시간 추적하는 것.",
      },
      {
        question: "Graceful Degradation이란?",
        answer: "일부 기능이 실패해도 전체 서비스는 최소 기능으로 계속 동작하도록 하는 장애 대응 전략.",
      },
      {
        question: "에이전트 샌드박스란?",
        answer: "에이전트의 코드 실행이나 시스템 접근을 격리된 환경으로 제한하여 안전성을 확보하는 것.",
      },
      {
        question: "감사 로깅(Audit Logging)이란?",
        answer: "에이전트의 모든 행동(도구 호출, 데이터 접근 등)을 기록하여 추후 검토 가능하게 하는 것.",
      },
      {
        question: "Exponential Backoff란?",
        answer: "재시도 간격을 지수적으로 늘리는 전략. API 장애 시 서버 부하를 줄이며 복구를 기다린다.",
      },
      {
        question: "stdio 전송이란?",
        answer: "MCP에서 표준 입출력을 통해 로컬 프로세스와 통신하는 전송 방식.",
      },
      {
        question: "SSE(Server-Sent Events) 전송이란?",
        answer: "MCP에서 HTTP 기반으로 원격 서버와 통신하는 전송 방식. 네트워크 배포에 적합.",
      },
      {
        question: "에이전트 평가(Evaluation)란?",
        answer: "태스크 완료율, 도구 선택 정확도, 답변 품질 등으로 에이전트 성능을 측정하는 것.",
      },
      {
        question: "속도 제한(Rate Limiting)이란?",
        answer: "단위 시간당 API 호출 횟수를 제한하여 비용 폭주와 자원 소진을 방지하는 제어.",
      },
      {
        question: "프롬프트 버전 관리란?",
        answer: "에이전트 프롬프트를 코드와 동일하게 버전 관리하여 변경 추적과 롤백을 가능하게 하는 것.",
      },
      {
        question: "에이전트 비용 최적화란?",
        answer: "경량 모델 사용, 캐싱, 프롬프트 최적화, 루프 제한 등으로 LLM API 비용을 절감하는 전략.",
      },
    ],
  },

  "09-architecture/01-patterns-solid": {
    quizzes: [
      {
        question: "SOLID 원칙 중 단일 책임 원칙(SRP)을 설명하고 위반 사례를 들시오.",
        answer: "클래스는 하나의 책임만 가져야 하며 변경 이유가 하나여야 한다. 위반 사례: User 클래스가 사용자 데이터 관리, 이메일 발송, 로깅을 모두 담당하는 경우.",
      },
      {
        question: "개방-폐쇄 원칙(OCP)의 의미와 실현 방법은?",
        answer: "확장에는 열려 있고 수정에는 닫혀 있어야 한다는 원칙이다. 추상화와 다형성을 통해 기존 코드를 수정하지 않고 새 기능을 인터페이스 구현/상속으로 추가한다.",
      },
      {
        question: "리스코프 치환 원칙(LSP)을 위반하는 대표적인 예시는?",
        answer: "Rectangle을 상속한 Square에서 setWidth가 height도 변경하면, Rectangle을 기대하는 코드에서 예상과 다른 동작이 발생한다. 하위 타입은 상위 타입의 계약을 완전히 준수해야 한다.",
      },
      {
        question: "인터페이스 분리 원칙(ISP)이란 무엇인가?",
        answer: "클라이언트가 사용하지 않는 메서드에 의존하도록 강제해서는 안 된다. 하나의 범용 인터페이스보다 여러 개의 세분화된 인터페이스로 분리하는 것이 낫다.",
      },
      {
        question: "의존성 역전 원칙(DIP)의 핵심과 의존성 주입(DI)과의 관계는?",
        answer: "고수준 모듈이 저수준 모듈에 의존하지 않고 둘 다 추상화에 의존해야 한다. DI는 DIP를 실현하는 기법으로, 의존성을 외부에서 주입하여 결합도를 낮춘다.",
      },
      {
        question: "싱글톤(Singleton) 패턴의 목적과 단점은?",
        answer: "클래스의 인스턴스를 하나만 보장하고 전역 접근점을 제공한다. 단점: 전역 상태로 인한 테스트 어려움, 결합도 증가, 멀티스레드 환경에서 동기화 문제, DI 원칙 위배 가능성.",
      },
      {
        question: "팩토리(Factory) 패턴이 직접 생성자 호출보다 유리한 경우는?",
        answer: "생성할 객체의 구체 클래스를 런타임에 결정해야 할 때, 생성 로직이 복잡할 때, 객체 생성을 한 곳에서 관리하고 싶을 때 유리하다. 클라이언트가 구체 클래스를 알 필요가 없어진다.",
      },
      {
        question: "옵저버(Observer) 패턴의 동작 원리와 사용 사례는?",
        answer: "Subject(발행자)의 상태 변화를 여러 Observer(구독자)에게 자동 통지하는 패턴이다. 이벤트 시스템, UI 컴포넌트 업데이트, 알림 서비스 등에 사용된다.",
      },
      {
        question: "전략(Strategy) 패턴이란 무엇이며 어떤 상황에서 사용하는가?",
        answer: "알고리즘을 캡슐화하여 교체 가능하게 만드는 패턴이다. 정렬 알고리즘, 결제 수단, 인증 방식 등 동일한 인터페이스의 여러 구현 중 런타임에 선택해야 할 때 사용한다.",
      },
      {
        question: "데코레이터(Decorator) 패턴의 원리와 상속과의 차이는?",
        answer: "객체를 래핑하여 기능을 동적으로 추가하는 패턴이다. 상속은 컴파일 타임에 정적으로 확장하지만 데코레이터는 런타임에 조합 가능하며 기능을 유연하게 조합할 수 있다.",
      },
      {
        question: "MVC(Model-View-Controller) 패턴의 각 역할을 설명하시오.",
        answer: "Model: 데이터와 비즈니스 로직 담당. View: UI 표현 담당. Controller: 사용자 입력을 받아 Model을 업데이트하고 View를 선택한다. 관심사 분리로 유지보수성이 향상된다.",
      },
      {
        question: "MVVM 패턴이 MVC와 다른 점은 무엇인가?",
        answer: "MVVM은 ViewModel이 View와 Model 사이에서 데이터 바인딩을 통해 자동으로 UI를 업데이트한다. MVC의 Controller와 달리 ViewModel은 View를 직접 참조하지 않아 테스트가 용이하다.",
      },
      {
        question: "클린 아키텍처(Clean Architecture)의 핵심 원칙은?",
        answer: "의존성이 항상 외부 원에서 내부 원으로만 향한다. 중심의 엔티티/유스케이스는 프레임워크, DB, UI에 의존하지 않아 변경에 강하고 테스트가 용이하다.",
      },
      {
        question: "의존성 주입(DI)의 3가지 방법을 설명하시오.",
        answer: "1) 생성자 주입: 생성자 매개변수로 의존성 전달(가장 권장). 2) 세터 주입: setter 메서드로 전달. 3) 인터페이스 주입: 의존성을 받는 인터페이스를 구현. 모두 결합도를 낮추고 테스트 용이성을 높인다.",
      },
      {
        question: "계층형 아키텍처(Layered Architecture)의 일반적인 층 구성과 규칙은?",
        answer: "프레젠테이션 → 비즈니스 로직 → 데이터 접근 → 데이터베이스. 각 층은 바로 아래 층에만 의존하며 상위 층은 하위 층을 호출하지만 반대는 불가하다. 관심사 분리와 교체 용이성이 장점이다.",
      },
    ],
    flashcards: [
      {
        question: "SRP(단일 책임 원칙)란?",
        answer: "클래스는 하나의 책임만 가지며, 변경 이유가 하나여야 한다.",
      },
      {
        question: "OCP(개방-폐쇄 원칙)란?",
        answer: "확장에는 열려 있고 수정에는 닫혀 있어야 한다. 추상화와 다형성으로 실현.",
      },
      {
        question: "LSP(리스코프 치환 원칙)란?",
        answer: "하위 타입은 상위 타입을 완전히 대체할 수 있어야 한다.",
      },
      {
        question: "ISP(인터페이스 분리 원칙)란?",
        answer: "클라이언트가 사용하지 않는 메서드에 의존하지 않도록 인터페이스를 세분화한다.",
      },
      {
        question: "DIP(의존성 역전 원칙)란?",
        answer: "고수준/저수준 모듈 모두 추상화에 의존해야 한다. 구체 구현이 아닌 인터페이스에 의존.",
      },
      {
        question: "싱글톤(Singleton) 패턴이란?",
        answer: "클래스의 인스턴스를 하나만 생성하고 전역 접근점을 제공하는 생성 패턴.",
      },
      {
        question: "팩토리(Factory) 패턴이란?",
        answer: "객체 생성을 별도 팩토리에 위임하여 구체 클래스를 숨기는 생성 패턴.",
      },
      {
        question: "옵저버(Observer) 패턴이란?",
        answer: "Subject의 상태 변화를 여러 Observer에게 자동 통지하는 행위 패턴.",
      },
      {
        question: "전략(Strategy) 패턴이란?",
        answer: "알고리즘을 캡슐화하여 런타임에 교체 가능하게 만드는 행위 패턴.",
      },
      {
        question: "데코레이터(Decorator) 패턴이란?",
        answer: "객체를 래핑하여 기능을 동적으로 추가하는 구조 패턴. 상속 대신 조합 사용.",
      },
      {
        question: "MVC 패턴이란?",
        answer: "Model(데이터), View(UI), Controller(입력 처리)로 관심사를 분리하는 아키텍처 패턴.",
      },
      {
        question: "MVVM 패턴이란?",
        answer: "Model-View-ViewModel. 데이터 바인딩으로 View와 ViewModel을 자동 연동하는 패턴.",
      },
      {
        question: "클린 아키텍처란?",
        answer: "의존성이 외부→내부로만 향하며 핵심 로직이 프레임워크/DB/UI에 의존하지 않는 아키텍처.",
      },
      {
        question: "의존성 주입(DI)이란?",
        answer: "객체의 의존성을 외부에서 주입하여 결합도를 낮추고 테스트 용이성을 높이는 기법.",
      },
      {
        question: "계층형 아키텍처란?",
        answer: "프레젠테이션→비즈니스→데이터 접근 등 층으로 분리하고 상위→하위로만 의존하는 구조.",
      },
    ],
  },

  "09-architecture/02-creational-structural": {
    quizzes: [
      {
        question: "Factory Method와 Abstract Factory 패턴의 차이를 설명하시오.",
        answer: "Factory Method는 하나의 메서드를 오버라이드하여 하나의 제품 객체를 생성한다. Abstract Factory는 관련된 여러 제품군(family)을 함께 생성하는 인터페이스를 제공한다. Factory Method는 상속 기반, Abstract Factory는 객체 합성 기반이다.",
      },
      {
        question: "Builder 패턴의 장점과 적합한 사용 사례는?",
        answer: "복잡한 객체를 단계별로 조립하여 생성 과정을 분리한다. 생성자 매개변수가 많거나 선택적 매개변수가 많을 때 가독성과 유연성이 향상된다. 불변 객체 생성, 복잡한 설정 객체, SQL 쿼리 빌더 등에 적합하다.",
      },
      {
        question: "Singleton 패턴의 문제점과 대안은 무엇인가?",
        answer: "전역 상태로 인해 테스트가 어렵고, 결합도가 높아지며, 멀티스레드 동기화 문제가 발생할 수 있다. 대안으로 의존성 주입(DI) 컨테이너에서 스코프를 singleton으로 관리하면 전역 접근 없이 단일 인스턴스를 보장할 수 있다.",
      },
      {
        question: "Adapter 패턴의 사용 사례와 동작 방식을 설명하시오.",
        answer: "호환되지 않는 인터페이스를 가진 클래스를 함께 사용할 수 있게 변환하는 패턴이다. 기존 라이브러리를 새 인터페이스에 맞출 때, 레거시 시스템 통합 시 사용한다. 대상 인터페이스를 구현하고 내부에서 기존 클래스를 호출한다.",
      },
      {
        question: "Decorator 패턴과 상속의 차이를 비교하시오.",
        answer: "상속은 컴파일 타임에 정적으로 기능을 확장하며 클래스 폭발 문제가 발생할 수 있다. Decorator는 런타임에 객체를 래핑하여 동적으로 기능을 추가하며, 여러 데코레이터를 자유롭게 조합할 수 있어 유연하다.",
      },
      {
        question: "Proxy 패턴의 세 가지 유형(가상, 보호, 원격)을 설명하시오.",
        answer: "가상 프록시(Virtual Proxy): 생성 비용이 큰 객체를 지연 초기화한다. 보호 프록시(Protection Proxy): 접근 권한을 제어한다. 원격 프록시(Remote Proxy): 다른 주소 공간의 객체를 로컬처럼 접근하게 한다.",
      },
      {
        question: "Facade 패턴이 복잡한 서브시스템을 단순화하는 방식을 설명하시오.",
        answer: "복잡한 서브시스템의 여러 클래스를 하나의 통합된 고수준 인터페이스로 감싼다. 클라이언트는 Facade만 호출하면 되므로 서브시스템의 복잡성을 알 필요가 없다. 결합도를 낮추고 사용성을 높인다.",
      },
      {
        question: "Composite 패턴의 트리 구조 표현 방식을 설명하시오.",
        answer: "개별 객체(Leaf)와 복합 객체(Composite)를 동일한 인터페이스(Component)로 다룬다. Composite는 자식 Component들을 포함하여 트리 구조를 형성한다. 파일 시스템(파일/폴더), UI 위젯 계층이 대표적 예시이다.",
      },
      {
        question: "디자인 패턴을 조합하여 사용하는 사례를 하나 들시오.",
        answer: "Abstract Factory + Singleton: 팩토리 인스턴스를 하나만 유지하면서 제품군을 생성. Decorator + Strategy: 기본 행동에 동적 기능을 추가하면서 알고리즘 전환도 가능. Composite + Iterator: 트리 구조를 순회.",
      },
      {
        question: "생성 패턴 선택 기준을 설명하시오.",
        answer: "객체 종류가 런타임에 결정되면 Factory Method/Abstract Factory, 복잡한 객체를 단계별로 생성하면 Builder, 인스턴스를 하나로 제한하면 Singleton, 기존 객체를 복제하면 Prototype을 선택한다.",
      },
      {
        question: "Adapter와 Facade 패턴의 차이는 무엇인가?",
        answer: "Adapter는 기존 인터페이스를 다른 인터페이스로 변환하여 호환성을 제공한다. Facade는 복잡한 서브시스템을 단순한 인터페이스로 감싸서 사용을 편리하게 한다. Adapter는 호환, Facade는 단순화가 목적이다.",
      },
      {
        question: "Prototype 패턴이란 무엇이며 언제 사용하는가?",
        answer: "기존 객체를 복제(clone)하여 새 객체를 생성하는 패턴이다. 객체 생성 비용이 높거나, 런타임에 객체의 타입을 모를 때, 유사한 객체를 많이 생성해야 할 때 사용한다.",
      },
      {
        question: "Bridge 패턴의 개념과 Adapter 패턴과의 차이는?",
        answer: "Bridge는 추상화와 구현을 분리하여 독립적으로 변경할 수 있게 한다. 설계 단계에서 미리 분리하는 것이 Bridge이고, 이미 존재하는 비호환 인터페이스를 연결하는 것이 Adapter이다.",
      },
      {
        question: "Flyweight 패턴의 원리와 적용 사례는?",
        answer: "많은 수의 유사 객체에서 공유 가능한 상태(intrinsic)를 분리하여 메모리를 절약한다. 텍스트 에디터의 문자 객체, 게임의 타일/파티클 시스템 등 대량의 동일 객체가 필요한 경우에 적용한다.",
      },
      {
        question: "구조 패턴의 공통 목적은 무엇인가?",
        answer: "클래스나 객체를 조합하여 더 큰 구조를 만드는 것이다. 인터페이스 변환(Adapter), 기능 추가(Decorator), 접근 제어(Proxy), 단순화(Facade), 트리 구조(Composite) 등 객체 간 관계를 효과적으로 구성한다.",
      },
    ],
    flashcards: [
      {
        question: "Factory Method란?",
        answer: "객체 생성을 서브클래스에 위임하는 생성 패턴. 생성할 구체 클래스를 서브클래스가 결정한다.",
      },
      {
        question: "Abstract Factory란?",
        answer: "관련된 객체 제품군을 함께 생성하는 인터페이스를 제공하는 생성 패턴.",
      },
      {
        question: "Builder 패턴이란?",
        answer: "복잡한 객체를 단계별로 조립하여 생성하는 패턴. 생성 과정과 표현을 분리한다.",
      },
      {
        question: "Singleton이란?",
        answer: "클래스의 인스턴스를 하나만 생성하고 전역 접근점을 제공하는 생성 패턴.",
      },
      {
        question: "Adapter란?",
        answer: "호환되지 않는 인터페이스를 변환하여 함께 동작할 수 있게 하는 구조 패턴.",
      },
      {
        question: "Decorator란?",
        answer: "객체를 래핑하여 런타임에 동적으로 기능을 추가하는 구조 패턴.",
      },
      {
        question: "Proxy란?",
        answer: "대상 객체에 대한 접근을 제어하는 대리 객체를 제공하는 구조 패턴.",
      },
      {
        question: "Facade란?",
        answer: "복잡한 서브시스템에 대한 단순한 통합 인터페이스를 제공하는 구조 패턴.",
      },
      {
        question: "Composite란?",
        answer: "개별 객체와 복합 객체를 동일한 인터페이스로 다루어 트리 구조를 표현하는 구조 패턴.",
      },
      {
        question: "생성 패턴이란?",
        answer: "객체 생성 메커니즘을 다루는 디자인 패턴 분류. Factory, Builder, Singleton, Prototype 등.",
      },
      {
        question: "구조 패턴이란?",
        answer: "클래스/객체를 조합하여 더 큰 구조를 만드는 패턴 분류. Adapter, Decorator, Proxy, Facade 등.",
      },
      {
        question: "객체 합성이란?",
        answer: "상속 대신 객체를 조합하여 기능을 확장하는 설계 원칙. 유연성과 재사용성이 높아진다.",
      },
      {
        question: "인터페이스란?",
        answer: "구현 없이 메서드 시그니처만 정의한 계약. 다형성과 느슨한 결합의 기반이 된다.",
      },
      {
        question: "캡슐화란?",
        answer: "데이터와 메서드를 하나로 묶고 내부 구현을 숨기는 객체지향 원칙.",
      },
      {
        question: "의존성 주입이란?",
        answer: "객체가 필요한 의존성을 직접 생성하지 않고 외부에서 주입받는 기법. 결합도를 낮춘다.",
      },
    ],
  },

  "09-architecture/03-behavioral-patterns": {
    quizzes: [
      {
        question: "Observer 패턴과 Pub/Sub 패턴의 차이를 설명하시오.",
        answer: "Observer는 Subject가 Observer를 직접 참조하여 통지한다. Pub/Sub은 중간에 메시지 브로커(이벤트 버스)가 있어 발행자와 구독자가 서로를 모른다. Pub/Sub이 더 느슨한 결합을 제공하며 분산 시스템에 적합하다.",
      },
      {
        question: "Strategy 패턴의 활용 사례를 3가지 이상 들시오.",
        answer: "1) 정렬 알고리즘 교체(퀵소트, 머지소트). 2) 결제 수단 선택(신용카드, 페이팔, 계좌이체). 3) 압축 방식 선택(ZIP, GZIP, LZ4). 4) 인증 방식 교체(JWT, OAuth, API Key).",
      },
      {
        question: "State 패턴을 사용하면 if-else 조건문과 비교해 어떤 장점이 있는가?",
        answer: "각 상태를 별도 클래스로 캡슐화하여 상태별 동작이 분리된다. 새 상태 추가 시 기존 코드를 수정하지 않아 OCP를 준수한다. if-else 중첩이 사라져 가독성이 향상되고 상태 전이 로직이 명확해진다.",
      },
      {
        question: "Command 패턴으로 Undo/Redo를 구현하는 원리를 설명하시오.",
        answer: "각 작업을 Command 객체로 캡슐화하고 execute()와 undo() 메서드를 정의한다. 실행된 Command를 스택에 저장하여 undo 시 스택에서 꺼내 undo()를 호출하고, redo 스택에 보관하여 재실행을 지원한다.",
      },
      {
        question: "Template Method 패턴과 Strategy 패턴의 차이를 비교하시오.",
        answer: "Template Method는 상속 기반으로 알고리즘의 골격을 상위 클래스에 정의하고 일부 단계를 서브클래스에서 오버라이드한다. Strategy는 합성 기반으로 알고리즘 전체를 별도 객체로 캡슐화하여 런타임에 교체한다.",
      },
      {
        question: "Iterator 패턴이 제공하는 추상화의 이점은?",
        answer: "컬렉션의 내부 구조(배열, 연결 리스트, 트리 등)를 노출하지 않고 요소를 순차적으로 접근하는 통일된 인터페이스를 제공한다. 컬렉션 구현 변경 시 클라이언트 코드를 수정할 필요가 없다.",
      },
      {
        question: "Chain of Responsibility 패턴과 미들웨어의 관계를 설명하시오.",
        answer: "Chain of Responsibility는 요청을 핸들러 체인을 따라 전달하여 적합한 핸들러가 처리하게 하는 패턴이다. Express.js/Django의 미들웨어가 대표적 구현으로, 인증 → 로깅 → 검증 → 처리 순으로 요청을 전달한다.",
      },
      {
        question: "Observer 패턴에서 메모리 누수가 발생하는 원인과 방지 방법은?",
        answer: "Observer가 Subject에 등록된 후 해제하지 않으면 가비지 컬렉션이 안 되어 메모리 누수가 발생한다. WeakReference 사용, 컴포넌트 소멸 시 자동 구독 해제, 이벤트 리스너 정리(cleanup) 코드를 반드시 작성해야 한다.",
      },
      {
        question: "행위 패턴을 선택하는 기준을 설명하시오.",
        answer: "이벤트 통지가 필요하면 Observer, 알고리즘 교체가 필요하면 Strategy, 상태에 따른 동작 변경이면 State, 작업 취소/재실행이면 Command, 요청 처리 체인이면 Chain of Responsibility를 선택한다.",
      },
      {
        question: "디자인 패턴을 조합하여 사용하는 전략을 설명하시오.",
        answer: "Command + Observer: 명령 실행 시 관련 객체에 통지. Strategy + Template Method: 알고리즘 골격은 고정하고 세부 전략만 교체. State + Observer: 상태 전이 시 구독자에 알림. 문제의 여러 측면을 각 패턴이 담당한다.",
      },
      {
        question: "Mediator 패턴의 역할과 장단점은?",
        answer: "여러 객체 간의 복잡한 상호작용을 중재자(Mediator) 객체에 집중시켜 결합도를 낮춘다. 장점은 객체 간 직접 참조가 없어지는 것이고, 단점은 중재자가 복잡해질 수 있다. 채팅방, UI 폼 관리에 활용된다.",
      },
      {
        question: "Visitor 패턴은 어떤 상황에서 사용하는가?",
        answer: "객체 구조를 변경하지 않고 새로운 연산을 추가해야 할 때 사용한다. 객체 구조(Element)에 accept 메서드를 정의하고 Visitor가 방문하여 연산을 수행한다. 컴파일러의 AST 처리, 직렬화 등에 활용된다.",
      },
      {
        question: "Memento 패턴이란 무엇이며 Command 패턴과의 관계는?",
        answer: "객체의 내부 상태를 캡슐화하여 저장하고 이후 복원할 수 있게 하는 패턴이다. Command 패턴의 undo 구현에서 Memento를 함께 사용하면 실행 전 상태를 저장해두고 복원할 수 있다.",
      },
      {
        question: "Null Object 패턴이란 무엇인가?",
        answer: "null 대신 아무 동작도 하지 않는 기본 구현 객체를 제공하는 패턴이다. null 체크를 제거하여 코드가 간결해지고 NullPointerException을 방지한다.",
      },
      {
        question: "행위 패턴들이 공통적으로 해결하려는 문제는 무엇인가?",
        answer: "객체 간 책임 분배와 통신 방식을 정의하여 결합도를 낮추고 유연성을 높이는 것이다. 알고리즘 캡슐화, 상태 관리, 이벤트 처리, 요청 전달 등 객체의 행동과 상호작용을 효과적으로 구성한다.",
      },
    ],
    flashcards: [
      {
        question: "Observer란?",
        answer: "Subject의 상태 변화를 등록된 Observer들에게 자동 통지하는 행위 패턴.",
      },
      {
        question: "Strategy란?",
        answer: "알고리즘을 캡슐화하여 런타임에 교체 가능하게 만드는 행위 패턴.",
      },
      {
        question: "State 패턴이란?",
        answer: "객체의 내부 상태에 따라 동작을 변경하는 패턴. 상태를 별도 클래스로 캡슐화한다.",
      },
      {
        question: "Command란?",
        answer: "요청을 객체로 캡슐화하여 매개변수화, 큐잉, 로깅, Undo/Redo를 지원하는 행위 패턴.",
      },
      {
        question: "Template Method란?",
        answer: "알고리즘의 골격을 상위 클래스에 정의하고 일부 단계를 서브클래스에서 오버라이드하는 패턴.",
      },
      {
        question: "Iterator란?",
        answer: "컬렉션의 내부 구조를 노출하지 않고 요소를 순차 접근하는 통일된 인터페이스를 제공하는 패턴.",
      },
      {
        question: "Chain of Responsibility란?",
        answer: "요청을 핸들러 체인을 따라 전달하여 적합한 핸들러가 처리하는 행위 패턴.",
      },
      {
        question: "발행-구독(Pub/Sub)이란?",
        answer: "메시지 브로커를 통해 발행자와 구독자가 서로를 모르고 통신하는 메시징 패턴.",
      },
      {
        question: "상태 머신이란?",
        answer: "유한한 상태들과 상태 간 전이를 정의하여 시스템 동작을 모델링하는 개념.",
      },
      {
        question: "미들웨어란?",
        answer: "요청 처리 체인에서 각 단계별 처리를 담당하는 함수. Chain of Responsibility의 대표적 구현.",
      },
      {
        question: "콜백이란?",
        answer: "다른 함수에 인자로 전달되어 특정 이벤트/시점에 호출되는 함수.",
      },
      {
        question: "이벤트 핸들러란?",
        answer: "특정 이벤트가 발생했을 때 실행되는 함수. 이벤트 기반 프로그래밍의 핵심 요소.",
      },
      {
        question: "알고리즘 캡슐화란?",
        answer: "알고리즘을 별도 객체/함수로 분리하여 교체와 재사용이 가능하게 하는 설계 기법.",
      },
      {
        question: "책임 체인이란?",
        answer: "요청 처리 책임을 여러 객체에 분산하여 체인 형태로 전달하는 구조.",
      },
      {
        question: "느슨한 결합이란?",
        answer: "모듈 간 의존성을 최소화하여 변경의 영향을 줄이는 설계 원칙. 인터페이스와 추상화로 달성.",
      },
    ],
  },

  "09-architecture/04-architectural-patterns": {
    quizzes: [
      {
        question: "MVC와 MVVM 패턴의 핵심 차이를 설명하시오.",
        answer: "MVC에서 Controller는 사용자 입력을 처리하고 Model과 View를 중재한다. MVVM에서 ViewModel은 데이터 바인딩을 통해 View와 자동 동기화되며 View를 직접 참조하지 않는다. MVVM이 UI 로직 테스트에 더 용이하다.",
      },
      {
        question: "계층형 아키텍처의 장단점을 설명하시오.",
        answer: "장점: 관심사 분리로 이해와 유지보수가 쉽고, 각 층을 독립적으로 교체/테스트 가능. 단점: 모든 요청이 모든 층을 통과하여 성능 오버헤드 발생, 단순한 CRUD에도 모든 층을 구현해야 하는 과도한 구조화 가능성.",
      },
      {
        question: "이벤트 소싱(Event Sourcing)의 원리를 설명하시오.",
        answer: "상태를 직접 저장하는 대신 상태를 변경하는 모든 이벤트를 순서대로 저장한다. 현재 상태는 이벤트를 처음부터 재생(replay)하여 도출한다. 완전한 감사 추적, 시점 복원, 이벤트 기반 통합이 가능하다.",
      },
      {
        question: "CQRS가 적합한 상황은 어디인가?",
        answer: "읽기와 쓰기의 요구사항이 크게 다를 때 적합하다. 읽기가 훨씬 많거나, 읽기용 모델과 쓰기용 모델이 다른 구조일 때, 각각을 독립적으로 최적화하고 스케일링할 수 있다. 이벤트 소싱과 자주 함께 사용된다.",
      },
      {
        question: "헥사고날 아키텍처의 포트와 어댑터 개념을 설명하시오.",
        answer: "포트는 애플리케이션 코어가 외부와 통신하기 위해 정의하는 인터페이스이다. 어댑터는 포트의 구체적 구현으로 외부 기술(DB, API, UI 등)을 연결한다. 코어가 외부 기술에 의존하지 않아 교체와 테스트가 용이하다.",
      },
      {
        question: "DDD에서 바운디드 컨텍스트(Bounded Context)란 무엇인가?",
        answer: "특정 도메인 모델이 유효한 명확한 경계이다. 같은 용어(예: '주문')도 바운디드 컨텍스트마다 다른 의미와 모델을 가질 수 있다. 팀/서비스 경계와 일치시켜 마이크로서비스 분리 기준으로 활용한다.",
      },
      {
        question: "애그리게이트(Aggregate) 설계 규칙을 설명하시오.",
        answer: "애그리게이트 루트를 통해서만 내부 엔티티에 접근한다. 트랜잭션은 하나의 애그리게이트 내에서만 수행한다. 애그리게이트 간 참조는 ID로만 한다. 크기를 작게 유지하여 동시성 충돌을 줄인다.",
      },
      {
        question: "이벤트 기반 아키텍처와 요청-응답 방식의 차이를 비교하시오.",
        answer: "요청-응답은 동기적이며 호출자가 응답을 기다린다. 이벤트 기반은 비동기적으로 이벤트를 발행하고 관심 있는 서비스가 구독하여 처리한다. 이벤트 기반이 결합도가 낮고 확장성이 높지만 디버깅이 어렵다.",
      },
      {
        question: "MVP 패턴에서 Presenter의 역할과 테스트 용이성의 관계는?",
        answer: "Presenter는 View와 Model 사이의 모든 로직을 처리하며 View를 인터페이스로 참조한다. View를 목(mock)으로 대체하여 Presenter를 독립적으로 단위 테스트할 수 있어 UI 로직의 테스트 용이성이 높다.",
      },
      {
        question: "아키텍처 패턴 선택 시 고려해야 할 기준은?",
        answer: "시스템 규모와 복잡성, 팀 크기와 역량, 확장성/성능 요구사항, 도메인 복잡도, 변경 빈도, 배포 전략, 기술 스택 호환성을 고려한다. 단순한 시스템에 과도한 아키텍처는 오히려 비용을 증가시킨다.",
      },
      {
        question: "마이크로서비스 아키텍처의 장단점은?",
        answer: "장점: 서비스별 독립 배포/스케일링, 기술 스택 다양화, 장애 격리. 단점: 분산 시스템 복잡성(네트워크 지연, 데이터 일관성), 운영 오버헤드, 서비스 간 통신 비용, 디버깅 어려움.",
      },
      {
        question: "파이프-필터(Pipe-Filter) 아키텍처란?",
        answer: "데이터를 일련의 처리 단계(필터)를 거쳐 변환하는 패턴이다. 각 필터는 독립적으로 입력을 처리하고 출력을 다음 필터로 전달한다. Unix 파이프라인, 데이터 처리 파이프라인, 컴파일러 등에 사용된다.",
      },
      {
        question: "CQRS에서 읽기 모델과 쓰기 모델을 분리하는 이점은?",
        answer: "쓰기 모델은 비즈니스 규칙과 일관성에 최적화하고, 읽기 모델은 쿼리 성능에 최적화할 수 있다. 각각 독립적으로 스케일링하고, 읽기 모델은 비정규화된 뷰로 복잡한 조인 없이 빠르게 조회할 수 있다.",
      },
      {
        question: "이벤트 소싱의 단점과 대응 방안은?",
        answer: "이벤트 수가 많아지면 재생 시간이 길어지고 저장소가 커진다. 스냅샷으로 특정 시점의 상태를 저장하여 재생 범위를 줄인다. 이벤트 스키마 변경 관리(버저닝)도 복잡하다.",
      },
      {
        question: "서비스 메시(Service Mesh)란 무엇인가?",
        answer: "마이크로서비스 간 통신을 관리하는 인프라 계층이다. 사이드카 프록시를 통해 로드 밸런싱, 서비스 디스커버리, TLS 암호화, 트레이싱 등을 애플리케이션 코드 변경 없이 제공한다. Istio, Linkerd가 대표적이다.",
      },
    ],
    flashcards: [
      {
        question: "MVC란?",
        answer: "Model(데이터/로직), View(UI), Controller(입력 처리)로 관심사를 분리하는 아키텍처 패턴.",
      },
      {
        question: "MVP란?",
        answer: "Model-View-Presenter. Presenter가 View 인터페이스를 통해 UI 로직을 처리하여 테스트 용이.",
      },
      {
        question: "MVVM이란?",
        answer: "Model-View-ViewModel. 데이터 바인딩으로 View와 ViewModel을 자동 동기화하는 패턴.",
      },
      {
        question: "계층형 아키텍처란?",
        answer: "프레젠테이션→비즈니스→데이터 접근 등 층으로 분리하고 상위→하위로만 의존하는 구조.",
      },
      {
        question: "이벤트 소싱이란?",
        answer: "상태 변경 이벤트를 순서대로 저장하고 재생하여 현재 상태를 도출하는 패턴.",
      },
      {
        question: "CQRS란?",
        answer: "Command Query Responsibility Segregation. 읽기와 쓰기 모델을 분리하여 각각 최적화하는 패턴.",
      },
      {
        question: "헥사고날 아키텍처란?",
        answer: "포트와 어댑터로 애플리케이션 코어를 외부 기술에서 격리하는 아키텍처. Ports & Adapters.",
      },
      {
        question: "포트란?",
        answer: "헥사고날 아키텍처에서 애플리케이션 코어가 외부와 통신하기 위해 정의하는 인터페이스.",
      },
      {
        question: "어댑터란?",
        answer: "포트의 구체적 구현체. 외부 기술(DB, API, UI 등)을 포트에 연결한다.",
      },
      {
        question: "바운디드 컨텍스트란?",
        answer: "DDD에서 특정 도메인 모델이 유효한 명확한 경계. 마이크로서비스 분리 기준으로 활용.",
      },
      {
        question: "유비쿼터스 언어란?",
        answer: "DDD에서 개발팀과 도메인 전문가가 공유하는 공통 용어 체계. 코드에도 그대로 반영한다.",
      },
      {
        question: "엔티티(DDD)란?",
        answer: "고유한 식별자(ID)를 가지며 생명주기를 통해 추적되는 도메인 객체.",
      },
      {
        question: "값 객체란?",
        answer: "식별자 없이 속성값으로만 동등성을 판단하는 불변 객체. 예: Money, Address.",
      },
      {
        question: "애그리게이트란?",
        answer: "DDD에서 일관성 경계를 형성하는 관련 엔티티/값 객체의 클러스터. 루트를 통해서만 접근.",
      },
      {
        question: "도메인 이벤트란?",
        answer: "도메인에서 발생한 중요한 사건을 나타내는 객체. 바운디드 컨텍스트 간 통신에 활용.",
      },
    ],
  },

  "09-architecture/05-clean-architecture": {
    quizzes: [
      {
        question: "클린 아키텍처의 의존성 규칙(Dependency Rule)을 설명하시오.",
        answer: "의존성은 항상 바깥 원에서 안쪽 원으로만 향해야 한다. 안쪽 원(Entity, Use Case)은 바깥 원(Framework, DB, UI)의 존재를 알지 못한다. 이를 통해 핵심 비즈니스 로직이 외부 기술 변경에 영향받지 않는다.",
      },
      {
        question: "클린 아키텍처의 4계층 역할을 각각 설명하시오.",
        answer: "Entity: 핵심 비즈니스 규칙과 도메인 객체. Use Case: 애플리케이션별 비즈니스 규칙(사용자 시나리오). Interface Adapter: 외부 형식과 내부 형식 간 변환(Controller, Presenter, Gateway). Framework & Driver: DB, 웹 프레임워크 등 외부 도구.",
      },
      {
        question: "DIP(의존성 역전 원칙)가 클린 아키텍처에서 어떻게 적용되는가?",
        answer: "Use Case 계층이 DB 접근이 필요할 때 직접 구현에 의존하지 않고 인터페이스(Repository)를 정의한다. 구체 구현(SQLRepository)은 외부 계층에서 이 인터페이스를 구현한다. 의존성 방향이 역전되어 안쪽 원이 바깥 원에 의존하지 않는다.",
      },
      {
        question: "경계(Boundary) 인터페이스 설계의 핵심 원칙은?",
        answer: "경계 인터페이스는 안쪽 계층이 필요로 하는 것만 정의한다. 입력 포트(Use Case 인터페이스)와 출력 포트(Repository, Presenter 인터페이스)를 분리한다. 데이터는 단순한 DTO로 경계를 넘나든다.",
      },
      {
        question: "by layer vs by feature 패키징 방식의 차이와 장단점은?",
        answer: "by layer: controller/, service/, repository/로 기술 계층별 분리. 전체 구조 파악이 쉽지만 기능 변경 시 여러 폴더를 수정. by feature: user/, order/, payment/로 도메인 기능별 분리. 관련 코드가 모여 있어 응집도가 높고 기능 단위 변경이 용이하다.",
      },
      {
        question: "클린 아키텍처에서의 테스트 전략을 설명하시오.",
        answer: "Entity와 Use Case는 외부 의존성 없이 순수 단위 테스트가 가능하다. Interface Adapter는 목(mock) 객체로 테스트한다. Framework 계층은 통합 테스트로 검증한다. 핵심 로직을 격리했기 때문에 빠르고 안정적인 테스트가 가능하다.",
      },
      {
        question: "Use Case 계층의 역할과 Entity 계층과의 차이는?",
        answer: "Entity는 기업/도메인 전체의 핵심 비즈니스 규칙이다. Use Case는 특정 애플리케이션의 비즈니스 규칙으로 Entity를 조합하여 사용자 시나리오를 구현한다. Use Case는 Entity에 의존하지만 Entity는 Use Case를 모른다.",
      },
      {
        question: "Framework 계층의 교체 가능성이 왜 중요한가?",
        answer: "의존성 규칙에 따라 핵심 로직이 프레임워크에 의존하지 않으므로 프레임워크 교체가 가능하다. 예: Express→Fastify, MySQL→PostgreSQL 전환 시 Interface Adapter와 Framework 계층만 수정하면 되고 비즈니스 로직은 불변이다.",
      },
      {
        question: "오버 엔지니어링을 판단하는 기준은 무엇인가?",
        answer: "단순한 CRUD 앱에 4계층 분리는 과도할 수 있다. 팀 규모가 작고 변경 빈도가 낮으면 불필요한 추상화이다. 비즈니스 로직 복잡도, 예상 확장성, 팀 역량, 프로젝트 수명을 고려하여 적절한 수준의 아키텍처를 선택해야 한다.",
      },
      {
        question: "클린 아키텍처와 헥사고날 아키텍처의 비교점은?",
        answer: "둘 다 핵심 로직을 외부 기술에서 격리하는 공통 목표를 가진다. 헥사고날은 포트와 어댑터로 구성하고, 클린 아키텍처는 동심원 4계층으로 구성한다. 클린 아키텍처가 더 세분화된 계층을 정의하며 의존성 규칙을 강조한다.",
      },
      {
        question: "Presenter의 역할과 필요성을 설명하시오.",
        answer: "Use Case의 출력 데이터를 View에 적합한 형식(ViewModel)으로 변환하는 역할이다. Use Case가 UI 형식을 알 필요 없게 하여 의존성 규칙을 유지한다. 같은 Use Case 출력을 웹/모바일/CLI에 다르게 표현할 수 있다.",
      },
      {
        question: "클린 아키텍처에서 DTO(Data Transfer Object)의 역할은?",
        answer: "계층 간 데이터를 전달하는 단순한 데이터 구조이다. 경계를 넘을 때 내부 Entity를 직접 노출하지 않고 DTO를 사용하여 각 계층의 독립성을 유지한다. 요청 DTO, 응답 DTO로 입출력을 분리한다.",
      },
      {
        question: "의존성 주입(DI) 컨테이너는 어느 계층에 위치하는가?",
        answer: "가장 바깥 Framework 계층(혹은 Main/Composition Root)에 위치한다. 모든 의존성의 구체 구현을 알고 조립하는 역할을 하므로 가장 바깥에서 내부로 의존성을 주입한다.",
      },
      {
        question: "인터페이스 분리가 계층 경계에서 중요한 이유는?",
        answer: "각 계층이 필요한 메서드만 포함하는 좁은 인터페이스에 의존하면 불필요한 결합이 줄어든다. Repository 인터페이스를 CRUD 단위로 분리하면 읽기만 필요한 Use Case가 쓰기 메서드에 의존하지 않는다.",
      },
      {
        question: "클린 아키텍처 적용 시 흔한 실수 3가지는?",
        answer: "1) Entity에 프레임워크 어노테이션(@Entity, @Column 등) 사용하여 의존성 규칙 위반. 2) Use Case에서 DB 쿼리를 직접 작성. 3) 모든 프로젝트에 무조건 적용하여 오버 엔지니어링. 규모와 복잡도에 맞게 적용해야 한다.",
      },
    ],
    flashcards: [
      {
        question: "의존성 규칙이란?",
        answer: "클린 아키텍처에서 의존성이 항상 바깥 원에서 안쪽 원으로만 향해야 한다는 핵심 규칙.",
      },
      {
        question: "Entity 계층이란?",
        answer: "기업/도메인의 핵심 비즈니스 규칙을 담는 가장 안쪽 계층. 외부 변경에 영향받지 않는다.",
      },
      {
        question: "Use Case 계층이란?",
        answer: "애플리케이션별 비즈니스 규칙을 담는 계층. Entity를 조합하여 사용자 시나리오를 구현한다.",
      },
      {
        question: "Interface Adapter란?",
        answer: "외부 형식과 내부 형식 간 변환을 담당하는 계층. Controller, Presenter, Gateway 등.",
      },
      {
        question: "Framework 계층이란?",
        answer: "DB, 웹 프레임워크, 외부 라이브러리 등 가장 바깥 계층. 교체 가능하도록 격리한다.",
      },
      {
        question: "의존성 역전이란?",
        answer: "고수준 모듈이 저수준 모듈의 인터페이스를 정의하고 저수준이 이를 구현하여 의존 방향을 역전시키는 원칙.",
      },
      {
        question: "경계(Boundary)란?",
        answer: "아키텍처 계층 간의 분리선. 인터페이스와 DTO를 통해 데이터가 경계를 넘나든다.",
      },
      {
        question: "by layer 패키징이란?",
        answer: "controller/, service/, repository/처럼 기술 계층별로 코드를 분류하는 패키지 구조.",
      },
      {
        question: "by feature 패키징이란?",
        answer: "user/, order/, payment/처럼 도메인 기능별로 관련 코드를 모아 분류하는 패키지 구조.",
      },
      {
        question: "클린 아키텍처란?",
        answer: "Robert C. Martin이 제안한 동심원 구조의 아키텍처. 의존성 규칙으로 핵심 로직을 외부에서 격리.",
      },
      {
        question: "관심사 분리란?",
        answer: "각 모듈/계층이 하나의 관심사만 담당하도록 분리하는 설계 원칙.",
      },
      {
        question: "결합도란?",
        answer: "모듈 간 의존 정도. 낮을수록 변경의 영향이 줄어들고 유지보수가 용이하다.",
      },
      {
        question: "응집도란?",
        answer: "모듈 내부 요소들의 관련 정도. 높을수록 모듈이 하나의 목적에 집중되어 있다.",
      },
      {
        question: "포트란?",
        answer: "애플리케이션 코어가 외부와 통신하기 위해 정의하는 인터페이스. 입력/출력 포트로 구분.",
      },
      {
        question: "인터페이스란?",
        answer: "구현 없이 메서드 시그니처만 정의한 계약. 의존성 역전과 느슨한 결합의 핵심 도구.",
      },
    ],
  },

  "07-infra/05-monitoring-observability": {
    quizzes: [
      {
        question: "모니터링과 옵저버빌리티의 차이를 설명하시오.",
        answer: "모니터링은 미리 정의한 메트릭과 임계값으로 알려진 문제를 감지한다. 옵저버빌리티는 시스템의 내부 상태를 외부 출력(메트릭, 로그, 트레이스)으로 이해할 수 있는 능력으로, 예상하지 못한 문제도 탐색하고 진단할 수 있다.",
      },
      {
        question: "메트릭의 3가지 유형(카운터, 게이지, 히스토그램)을 설명하시오.",
        answer: "카운터(Counter): 누적 증가만 하는 값(요청 수, 에러 수). 게이지(Gauge): 증감하는 현재 값(CPU 사용률, 메모리). 히스토그램(Histogram): 값의 분포를 구간별로 측정(응답 시간 분포, 요청 크기).",
      },
      {
        question: "PromQL로 5분간 초당 HTTP 요청 수를 구하는 쿼리를 설명하시오.",
        answer: "rate(http_requests_total[5m]) — rate 함수는 카운터의 5분 범위에서 초당 평균 증가율을 계산한다. 카운터 리셋도 자동 처리한다. 특정 상태 코드만 필터링하려면 {status_code='500'}을 추가한다.",
      },
      {
        question: "ELK 스택의 구성요소와 각 역할을 설명하시오.",
        answer: "Elasticsearch: 로그를 저장하고 전문 검색을 제공하는 분산 검색 엔진. Logstash: 로그를 수집, 파싱, 변환하여 Elasticsearch로 전송하는 파이프라인. Kibana: 데이터를 시각화하고 대시보드를 제공하는 UI 도구.",
      },
      {
        question: "분산 트레이싱의 동작 원리를 설명하시오.",
        answer: "요청이 여러 서비스를 거칠 때 고유한 Trace ID를 부여하고 각 서비스의 처리 구간을 Span으로 기록한다. Span에는 시작/종료 시간, 메타데이터가 포함되며 부모-자식 관계로 연결되어 전체 요청 흐름과 병목을 시각화한다.",
      },
      {
        question: "SLO와 SLA의 차이를 설명하시오.",
        answer: "SLO(Service Level Objective)는 내부 목표로 '가용성 99.9%' 같은 서비스 수준 목표이다. SLA(Service Level Agreement)는 고객과의 계약으로 SLO를 충족하지 못할 때의 보상(크레딧 등)을 포함한다. SLO는 SLA보다 엄격하게 설정한다.",
      },
      {
        question: "에러 버짓(Error Budget) 개념을 설명하시오.",
        answer: "SLO에서 허용하는 실패 여유량이다. 99.9% 가용성 SLO라면 0.1%가 에러 버짓이며 한 달에 약 43분의 다운타임이 허용된다. 에러 버짓이 남아 있으면 새 기능 배포를 추진하고 소진되면 안정성에 집중한다.",
      },
      {
        question: "알림 피로(Alert Fatigue)를 방지하는 전략을 설명하시오.",
        answer: "심각도 기반 알림 분류(P1-즉시 대응, P2-근무 시간 내, P3-검토), 알림 그룹핑으로 중복 제거, 증상 기반 알림(원인이 아닌 사용자 영향 감지), 적절한 임계값 설정, 자동 복구 후 불필요한 알림 억제.",
      },
      {
        question: "구조화된 로깅(Structured Logging)의 장점을 설명하시오.",
        answer: "JSON 등 구조화된 형식으로 로그를 기록하면 자동 파싱, 필터링, 집계가 용이하다. 키-값으로 컨텍스트(user_id, request_id, service)를 포함하여 검색과 상관 분석이 쉬워진다. 비구조화된 텍스트 로그 대비 분석 효율이 높다.",
      },
      {
        question: "RED/USE 방법론을 각각 설명하시오.",
        answer: "RED(서비스 모니터링): Rate(초당 요청 수), Errors(에러율), Duration(응답 시간). USE(리소스 모니터링): Utilization(사용률), Saturation(포화도/대기 큐), Errors(에러 수). 서비스는 RED, 인프라는 USE로 모니터링한다.",
      },
      {
        question: "Prometheus의 풀(Pull) 방식 수집의 장단점은?",
        answer: "장점: 모니터링 대상 추가/제거가 유연하고, 대상이 죽어도 감지 가능하며, 수집 주기를 중앙에서 제어한다. 단점: 방화벽 뒤의 대상 수집이 어려우며, 짧은 수명의 배치 작업 모니터링에 불리하여 Pushgateway가 필요하다.",
      },
      {
        question: "OpenTelemetry의 역할과 장점을 설명하시오.",
        answer: "메트릭, 로그, 트레이스를 통합하여 수집하는 벤더 중립적 관찰성 프레임워크이다. 한 번 계측하면 다양한 백엔드(Prometheus, Jaeger, Datadog 등)로 데이터를 전송할 수 있어 벤더 종속을 방지한다.",
      },
      {
        question: "대시보드 설계 시 핵심 원칙을 설명하시오.",
        answer: "가장 중요한 지표를 상단에 배치한다. 사용자 영향(SLI/SLO)부터 인프라 상세까지 계층적으로 구성한다. 색상으로 상태를 직관적으로 표현하고 과도한 정보를 피한다. 팀 역할별(개발, 운영, 경영) 대시보드를 분리한다.",
      },
      {
        question: "로그 레벨(DEBUG, INFO, WARN, ERROR)의 적절한 사용 기준은?",
        answer: "DEBUG: 개발/디버깅용 상세 정보. INFO: 정상적인 이벤트(시작, 요청 처리). WARN: 잠재적 문제이지만 동작은 계속(재시도 성공). ERROR: 실패한 작업(예외, 서비스 불가). 프로덕션에서는 INFO 이상만 기록하는 것이 일반적이다.",
      },
      {
        question: "카디널리티(Cardinality)가 모니터링에서 중요한 이유는?",
        answer: "메트릭 레이블의 고유 값 조합 수(카디널리티)가 높으면 저장/쿼리 비용이 급증한다. user_id처럼 고유 값이 많은 레이블은 피하고, status_code, method 등 낮은 카디널리티 레이블을 사용해야 한다.",
      },
    ],
    flashcards: [
      {
        question: "옵저버빌리티란?",
        answer: "시스템의 내부 상태를 외부 출력(메트릭, 로그, 트레이스)으로 이해할 수 있는 능력.",
      },
      {
        question: "메트릭이란?",
        answer: "시간에 따른 수치 데이터. 카운터, 게이지, 히스토그램 등의 유형으로 시스템 상태를 측정.",
      },
      {
        question: "로그란?",
        answer: "시스템에서 발생하는 이벤트를 시간순으로 기록한 텍스트/구조화 데이터.",
      },
      {
        question: "트레이스란?",
        answer: "분산 시스템에서 요청이 여러 서비스를 거치는 전체 경로를 추적하는 것.",
      },
      {
        question: "Prometheus란?",
        answer: "오픈소스 시계열 모니터링 시스템. Pull 방식으로 메트릭을 수집하고 PromQL로 쿼리한다.",
      },
      {
        question: "Grafana란?",
        answer: "메트릭/로그 데이터를 시각화하는 오픈소스 대시보드 도구. 다양한 데이터소스를 지원.",
      },
      {
        question: "ELK 스택이란?",
        answer: "Elasticsearch(검색) + Logstash(수집/변환) + Kibana(시각화)로 구성된 로그 분석 플랫폼.",
      },
      {
        question: "OpenTelemetry란?",
        answer: "메트릭/로그/트레이스를 통합 수집하는 벤더 중립적 관찰성 프레임워크.",
      },
      {
        question: "SLI란?",
        answer: "Service Level Indicator. 서비스 수준을 측정하는 구체적 지표(가용성, 응답 시간 등).",
      },
      {
        question: "SLO란?",
        answer: "Service Level Objective. SLI에 대한 목표값. 예: 가용성 99.9%, p99 응답 200ms 이하.",
      },
      {
        question: "SLA란?",
        answer: "Service Level Agreement. 고객과의 계약으로 SLO 미달 시 보상을 포함한다.",
      },
      {
        question: "에러 버짓이란?",
        answer: "SLO에서 허용하는 실패 여유량. 남으면 혁신 추진, 소진되면 안정성에 집중하는 의사결정 도구.",
      },
      {
        question: "알림 피로란?",
        answer: "과도한 알림으로 인해 운영자가 중요한 알림을 무시하게 되는 현상.",
      },
      {
        question: "분산 트레이싱이란?",
        answer: "Trace ID와 Span으로 여러 서비스를 거치는 요청의 전체 경로와 지연을 추적하는 기법.",
      },
      {
        question: "PromQL이란?",
        answer: "Prometheus Query Language. 시계열 메트릭을 조회하고 집계하는 함수형 쿼리 언어.",
      },
    ],
  },

  "07-infra/06-iac-gitops": {
    quizzes: [
      {
        question: "IaC(Infrastructure as Code)의 장점을 설명하시오.",
        answer: "인프라를 코드로 정의하여 버전 관리, 재현성, 자동화가 가능하다. 수동 설정 오류를 방지하고, 코드 리뷰로 변경을 검증하며, 동일한 환경을 반복적으로 생성할 수 있다. 문서화 역할도 겸한다.",
      },
      {
        question: "Terraform Plan과 Apply의 차이를 설명하시오.",
        answer: "Plan은 현재 상태와 원하는 상태를 비교하여 어떤 변경이 일어날지 미리 보여주는 실행 계획이다. Apply는 Plan의 결과를 실제로 적용하여 인프라를 변경한다. Plan으로 사전 검증 후 Apply하는 것이 안전하다.",
      },
      {
        question: "Terraform State 관리 전략을 설명하시오.",
        answer: "State는 관리 중인 인프라의 현재 상태를 기록하는 파일이다. 팀 환경에서는 원격 백엔드(S3+DynamoDB 잠금)에 저장하여 공유와 동시 수정 방지를 해야 한다. 민감 정보가 포함되므로 암호화가 필요하다.",
      },
      {
        question: "Ansible의 Idempotency(멱등성) 개념을 설명하시오.",
        answer: "같은 작업을 여러 번 실행해도 결과가 동일한 성질이다. Ansible 모듈은 목표 상태를 확인하고 이미 달성되어 있으면 변경하지 않는다. 이를 통해 반복 실행해도 안전하며 원하는 상태를 보장한다.",
      },
      {
        question: "Terraform과 Ansible의 차이를 비교하시오.",
        answer: "Terraform: 선언적, 인프라 프로비저닝(생성/삭제)에 강함, State 기반 관리. Ansible: 절차적+선언적, 서버 설정(Configuration Management)에 강함, 에이전트리스(SSH 기반). Terraform으로 인프라를 만들고 Ansible로 설정하는 조합이 일반적이다.",
      },
      {
        question: "GitOps의 핵심 원칙을 설명하시오.",
        answer: "1) Git을 단일 소스 오브 트루스(Single Source of Truth)로 사용. 2) 선언적으로 원하는 상태를 기술. 3) Git 변경 시 자동으로 클러스터에 반영. 4) 실제 상태와 Git 상태의 차이를 지속적으로 감지하고 조정(reconciliation).",
      },
      {
        question: "ArgoCD의 동기화(Sync) 흐름을 설명하시오.",
        answer: "ArgoCD는 Git 저장소를 지속적으로 모니터링한다. Git에 변경이 감지되면 현재 클러스터 상태와 비교하고, 차이가 있으면 OutOfSync 상태로 표시한다. 자동 또는 수동 Sync를 통해 클러스터를 Git의 선언 상태로 수렴시킨다.",
      },
      {
        question: "선언적(Declarative)과 명령형(Imperative) 접근의 차이는?",
        answer: "선언적: '무엇(what)'을 원하는지 기술하고 시스템이 알아서 달성(Terraform, K8s YAML). 명령형: '어떻게(how)' 할지 단계별로 지시(셸 스크립트, kubectl run). 선언적이 재현성과 일관성에서 유리하다.",
      },
      {
        question: "환경 분리 전략(dev/staging/prod)을 IaC에서 구현하는 방법은?",
        answer: "1) 디렉토리 분리: env/dev/, env/staging/, env/prod/에 각각 tfvars 파일. 2) Terraform Workspace로 동일 코드에서 환경별 State 분리. 3) Kustomize overlays로 base 설정에 환경별 패치 적용.",
      },
      {
        question: "원격 State(Remote State)가 필요한 이유를 설명하시오.",
        answer: "로컬 State는 팀원 간 공유가 불가하고 동시 수정 시 충돌이 발생한다. 원격 State(S3, GCS 등)는 공유 접근, 상태 잠금(Locking)으로 동시 수정 방지, 암호화, 버전 관리를 지원하여 팀 협업에 필수적이다.",
      },
      {
        question: "Terraform 모듈(Module)의 역할과 장점은?",
        answer: "재사용 가능한 인프라 코드 단위이다. VPC, EKS 클러스터 등을 모듈로 만들면 여러 프로젝트/환경에서 재사용하고, 변수로 커스터마이징할 수 있다. DRY 원칙을 지키고 유지보수가 용이해진다.",
      },
      {
        question: "Terraform의 생명주기(Lifecycle) 규칙이란?",
        answer: "리소스의 생성/수정/삭제 동작을 제어하는 설정이다. create_before_destroy(교체 시 새 리소스 먼저 생성), prevent_destroy(삭제 방지), ignore_changes(특정 속성 변경 무시) 등으로 안전한 인프라 변경을 보장한다.",
      },
      {
        question: "GitOps에서 Pull 방식과 Push 방식의 차이는?",
        answer: "Pull 방식: 클러스터 내 에이전트(ArgoCD)가 Git을 주기적으로 폴링하여 변경 감지 후 적용. 보안에 유리(외부에서 클러스터 접근 불필요). Push 방식: CI 파이프라인이 직접 kubectl apply로 배포. 구현이 간단하지만 보안에 취약하다.",
      },
      {
        question: "Helm의 역할과 Kustomize와의 차이는?",
        answer: "Helm: Kubernetes 패키지 매니저. 템플릿 기반으로 변수를 치환하여 매니페스트를 생성한다. Chart로 패키징. Kustomize: 기본 매니페스트에 패치를 오버레이하여 변경한다. 템플릿 없이 순수 YAML을 유지하는 것이 특징이다.",
      },
      {
        question: "드리프트(Drift)란 무엇이며 어떻게 대응하는가?",
        answer: "IaC로 정의한 상태와 실제 인프라 상태가 달라지는 현상이다. 수동 변경, 외부 프로세스 등이 원인이다. terraform plan으로 드리프트를 감지하고, GitOps의 자동 조정(reconciliation)으로 원하는 상태로 복원한다.",
      },
    ],
    flashcards: [
      {
        question: "IaC란?",
        answer: "Infrastructure as Code. 인프라를 코드로 정의하여 버전 관리, 자동화, 재현성을 확보하는 방식.",
      },
      {
        question: "Terraform이란?",
        answer: "HashiCorp의 오픈소스 IaC 도구. HCL로 인프라를 선언적으로 정의하고 Plan/Apply로 관리.",
      },
      {
        question: "HCL이란?",
        answer: "HashiCorp Configuration Language. Terraform에서 인프라를 정의하는 선언적 설정 언어.",
      },
      {
        question: "Provider란?",
        answer: "Terraform에서 AWS, GCP 등 클라우드/서비스 API와 통신하는 플러그인.",
      },
      {
        question: "State란?",
        answer: "Terraform이 관리하는 인프라의 현재 상태를 기록하는 파일. 변경 감지와 의존성 추적에 사용.",
      },
      {
        question: "Ansible이란?",
        answer: "에이전트리스 구성 관리 도구. SSH로 서버에 접속하여 YAML Playbook으로 설정을 자동화.",
      },
      {
        question: "Playbook이란?",
        answer: "Ansible에서 자동화할 작업들을 YAML로 정의한 파일. 태스크, 역할, 핸들러 등을 포함.",
      },
      {
        question: "Idempotency란?",
        answer: "같은 작업을 여러 번 실행해도 결과가 동일한 성질. 안전한 반복 실행을 보장한다.",
      },
      {
        question: "GitOps란?",
        answer: "Git을 단일 소스 오브 트루스로 사용하여 인프라/배포를 선언적으로 관리하는 운영 방식.",
      },
      {
        question: "ArgoCD란?",
        answer: "Kubernetes용 GitOps 도구. Git 저장소를 모니터링하여 클러스터를 선언 상태로 자동 동기화.",
      },
      {
        question: "선언적이란?",
        answer: "원하는 최종 상태(what)를 기술하면 시스템이 달성 방법을 결정하는 접근 방식.",
      },
      {
        question: "명령형이란?",
        answer: "목표 달성을 위한 단계별 명령(how)을 순서대로 지시하는 접근 방식.",
      },
      {
        question: "Kustomize란?",
        answer: "Kubernetes 매니페스트를 템플릿 없이 base + overlay 패치 방식으로 커스터마이징하는 도구.",
      },
      {
        question: "환경 분리란?",
        answer: "dev/staging/prod 등 용도별로 인프라 환경을 분리하여 안전한 개발과 배포를 보장하는 전략.",
      },
      {
        question: "드리프트란?",
        answer: "IaC로 정의한 상태와 실제 인프라 상태가 달라지는 현상. 수동 변경 등이 원인.",
      },
    ],
  },
};
