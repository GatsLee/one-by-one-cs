import type { QuizDataMap } from "./types";

export const networkQuizzes: QuizDataMap = {
  "03-network/01-http-and-dns": {
    quizzes: [
      {
        question: "HTTP GET 메서드와 POST 메서드의 근본적인 차이점은 무엇인가?",
        answer: "GET은 서버로부터 리소스를 조회하는 데 사용되며 요청 본문이 없고, POST는 서버에 데이터를 전송하여 리소스를 생성하거나 처리하는 데 사용되며 요청 본문에 데이터를 포함한다. GET은 멱등성을 가지지만 POST는 그렇지 않다.",
      },
      {
        question: "HTTP 상태 코드 301과 302의 차이를 설명하시오.",
        answer: "301 Moved Permanently는 요청한 리소스가 영구적으로 새 URL로 이동했음을 나타내며 검색 엔진이 새 URL로 색인을 갱신한다. 302 Found는 리소스가 임시로 다른 URL에 있음을 나타내며 원래 URL을 계속 사용해야 한다.",
      },
      {
        question: "HTTP/1.1의 Head-of-Line Blocking 문제를 HTTP/2는 어떻게 해결하는가?",
        answer: "HTTP/2는 하나의 TCP 연결에서 멀티플렉싱(Multiplexing)을 지원하여 여러 요청과 응답을 동시에 병렬로 처리한다. 스트림 단위로 데이터를 전송하므로 하나의 요청이 지연되어도 다른 요청에 영향을 주지 않는다.",
      },
      {
        question: "HTTP/3가 TCP 대신 QUIC(UDP 기반) 프로토콜을 사용하는 이유는 무엇인가?",
        answer: "TCP는 연결 수립에 3-way handshake가 필요하고 패킷 손실 시 전체 스트림이 차단되는 Head-of-Line Blocking 문제가 있다. QUIC는 UDP 위에 구축되어 0-RTT 연결 수립이 가능하고, 스트림 단위 독립적 손실 복구로 지연을 최소화한다.",
      },
      {
        question: "Keep-Alive가 없던 HTTP/1.0에서는 어떤 비효율이 발생했는가?",
        answer: "매 요청마다 TCP 연결을 새로 수립(3-way handshake)하고 응답 후 즉시 연결을 종료해야 했다. 이로 인해 연결 수립/해제 오버헤드가 크고 지연 시간이 증가했다. HTTP/1.1의 Keep-Alive는 하나의 연결을 재사용하여 이 문제를 해결한다.",
      },
      {
        question: "쿠키와 세션의 저장 위치와 보안 측면에서의 차이를 비교하시오.",
        answer: "쿠키는 클라이언트(브라우저)에 저장되어 변조 위험이 있고, 세션은 서버에 저장되어 상대적으로 안전하다. 세션은 세션 ID만 쿠키로 전달하고 실제 데이터는 서버 메모리나 DB에 보관한다. 쿠키는 용량 제한(약 4KB)이 있지만 세션은 서버 자원에 의존한다.",
      },
      {
        question: "사용자가 브라우저에 www.example.com을 입력했을 때 DNS 질의 과정을 순서대로 설명하시오.",
        answer: "1) 브라우저/OS DNS 캐시 확인 → 2) 로컬 DNS 서버(리졸버)에 질의 → 3) 루트 네임서버에 질의(.com 담당 TLD 서버 주소 반환) → 4) TLD 네임서버에 질의(example.com의 권한 네임서버 주소 반환) → 5) 권한(Authoritative) 네임서버에 질의(최종 IP 주소 반환) → 6) IP 주소를 캐싱하고 브라우저에 반환",
      },
      {
        question: "DNS 레코드 중 A 레코드, AAAA 레코드, CNAME 레코드의 역할을 각각 설명하시오.",
        answer: "A 레코드는 도메인을 IPv4 주소에 매핑한다. AAAA 레코드는 도메인을 IPv6 주소에 매핑한다. CNAME 레코드는 하나의 도메인을 다른 도메인의 별칭(alias)으로 지정하여 해당 도메인의 IP를 따라가도록 한다.",
      },
      {
        question: "HTTPS에서 TLS 핸드셰이크의 목적과 주요 단계를 설명하시오.",
        answer: "TLS 핸드셰이크는 클라이언트와 서버 간 암호화 통신을 위한 보안 채널을 수립하는 과정이다. 주요 단계: 1) ClientHello(지원 암호 스위트 전송) → 2) ServerHello(암호 스위트 선택 + 서버 인증서 전송) → 3) 클라이언트가 인증서 검증 후 대칭키 교환 → 4) 양측이 동일한 세션 키로 암호화 통신 시작",
      },
      {
        question: "RESTful API 설계에서 리소스 URL을 설계할 때 권장되는 규칙 3가지를 말하시오.",
        answer: "1) URL에 동사가 아닌 명사를 사용한다(예: /users, /posts). 2) 복수형 명사를 사용한다(예: /users/123). 3) 계층 관계는 경로로 표현한다(예: /users/123/orders). HTTP 메서드(GET/POST/PUT/DELETE)로 행위를 구분한다.",
      },
      {
        question: "HTTP PUT과 PATCH 메서드의 차이는 무엇인가?",
        answer: "PUT은 리소스 전체를 대체(교체)하는 메서드로 요청 본문에 리소스의 완전한 표현을 포함해야 한다. PATCH는 리소스의 일부분만 수정하는 메서드로 변경할 필드만 전송하면 된다. PUT은 멱등하지만 PATCH는 구현에 따라 멱등하지 않을 수 있다.",
      },
      {
        question: "웹 서비스에서 403 Forbidden과 401 Unauthorized 응답의 차이를 시나리오로 설명하시오.",
        answer: "401 Unauthorized: 로그인하지 않은 사용자가 마이페이지에 접근할 때 반환된다. 인증(Authentication)이 필요하다는 의미이다. 403 Forbidden: 일반 사용자가 관리자 페이지에 접근할 때 반환된다. 인증은 되었지만 해당 리소스에 대한 권한(Authorization)이 없다는 의미이다.",
      },
      {
        question: "DNS의 MX 레코드는 어떤 목적으로 사용되며, 우선순위는 어떻게 결정되는가?",
        answer: "MX(Mail Exchange) 레코드는 해당 도메인으로 수신되는 이메일을 처리할 메일 서버를 지정한다. 각 MX 레코드에는 우선순위 값(preference)이 있으며, 숫자가 낮을수록 높은 우선순위를 가진다. 우선순위가 높은 서버에 먼저 연결을 시도하고 실패 시 다음 순위로 전환한다.",
      },
      {
        question: "HTTP 캐시 관련 헤더인 Cache-Control, ETag, Last-Modified의 역할을 각각 설명하시오.",
        answer: "Cache-Control: 캐시 정책을 지정한다(max-age, no-cache, no-store 등). ETag: 리소스의 고유 식별자(해시)로, 조건부 요청(If-None-Match)에 사용하여 리소스 변경 여부를 확인한다. Last-Modified: 리소스의 최종 수정 시간으로, 조건부 요청(If-Modified-Since)으로 변경 여부를 판단한다.",
      },
      {
        question: "HTTP/2의 서버 푸시(Server Push) 기능은 무엇이며 어떤 장점이 있는가?",
        answer: "서버 푸시는 클라이언트가 요청하지 않은 리소스를 서버가 미리 보내는 기능이다. 예를 들어 HTML 요청 시 해당 페이지에 필요한 CSS, JS 파일을 서버가 선제적으로 전송하여 클라이언트의 추가 요청 왕복을 줄이고 페이지 로딩 속도를 개선할 수 있다.",
      },
    ],
    flashcards: [
      {
        question: "HTTP GET 메서드의 특징은?",
        answer: "서버에서 리소스를 조회하는 메서드. 요청 본문 없음, 멱등성 보장, 캐시 가능, URL에 쿼리 파라미터로 데이터 전달",
      },
      {
        question: "HTTP 상태 코드 2xx는 무엇을 의미하는가?",
        answer: "요청이 성공적으로 처리되었음을 의미. 200 OK, 201 Created, 204 No Content 등이 포함됨",
      },
      {
        question: "HTTP 상태 코드 4xx는 무엇을 의미하는가?",
        answer: "클라이언트 오류. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests 등",
      },
      {
        question: "HTTP 상태 코드 5xx는 무엇을 의미하는가?",
        answer: "서버 오류. 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout 등",
      },
      {
        question: "HTTP/1.1의 Keep-Alive란?",
        answer: "하나의 TCP 연결을 재사용하여 여러 HTTP 요청/응답을 처리하는 기능. 연결 수립/해제 오버헤드를 줄여 성능 향상",
      },
      {
        question: "HTTP/2의 멀티플렉싱이란?",
        answer: "하나의 TCP 연결에서 여러 스트림을 통해 요청과 응답을 동시에 병렬 전송하는 기술. HTTP/1.1의 Head-of-Line Blocking 해결",
      },
      {
        question: "HTTP/3의 핵심 특징은?",
        answer: "QUIC 프로토콜(UDP 기반) 사용. 0-RTT 연결 수립, 스트림 독립적 손실 복구, TCP의 HOL Blocking 완전 해결",
      },
      {
        question: "쿠키(Cookie)란?",
        answer: "서버가 클라이언트(브라우저)에 저장하는 작은 데이터 조각. HTTP 요청 시 자동 전송되어 상태 유지에 사용. 약 4KB 용량 제한",
      },
      {
        question: "세션(Session)이란?",
        answer: "서버 측에서 사용자 상태를 관리하는 방식. 세션 ID를 쿠키로 전달하고 실제 데이터는 서버에 저장. 쿠키보다 보안성 높음",
      },
      {
        question: "DNS(Domain Name System)란?",
        answer: "도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템. 루트 → TLD → 권한 네임서버 계층 구조로 동작",
      },
      {
        question: "DNS A 레코드 vs CNAME 레코드",
        answer: "A 레코드: 도메인 → IPv4 주소 직접 매핑. CNAME 레코드: 도메인 → 다른 도메인으로의 별칭(alias) 설정",
      },
      {
        question: "HTTPS란?",
        answer: "HTTP over TLS. TLS 암호화를 통해 데이터의 기밀성, 무결성, 서버 인증을 보장하는 보안 프로토콜. 기본 포트 443",
      },
      {
        question: "RESTful API란?",
        answer: "REST 아키텍처 원칙을 따르는 API. 리소스 중심 URL, HTTP 메서드로 행위 구분, 무상태성, 균일한 인터페이스 등의 특징",
      },
      {
        question: "HTTP DELETE 메서드의 특징은?",
        answer: "서버의 지정된 리소스를 삭제하는 메서드. 멱등성 보장(같은 요청 반복해도 결과 동일). 성공 시 200 또는 204 반환",
      },
      {
        question: "DNS TTL(Time To Live)이란?",
        answer: "DNS 레코드가 캐시에 유지되는 시간(초 단위). TTL이 만료되면 DNS 리졸버가 새로운 질의를 수행하여 레코드를 갱신",
      },
    ],
  },

  "03-network/02-osi-tcp-ip": {
    quizzes: [
      {
        question: "OSI 7계층 모델의 각 계층을 하위부터 상위까지 순서대로 나열하시오.",
        answer: "1) 물리 계층(Physical) → 2) 데이터링크 계층(Data Link) → 3) 네트워크 계층(Network) → 4) 전송 계층(Transport) → 5) 세션 계층(Session) → 6) 표현 계층(Presentation) → 7) 응용 계층(Application)",
      },
      {
        question: "TCP/IP 4계층 모델의 각 계층과 대응하는 OSI 계층을 매핑하시오.",
        answer: "1) 네트워크 인터페이스 계층(OSI 1~2: 물리+데이터링크) → 2) 인터넷 계층(OSI 3: 네트워크) → 3) 전송 계층(OSI 4: 전송) → 4) 응용 계층(OSI 5~7: 세션+표현+응용)",
      },
      {
        question: "캡슐화(Encapsulation)와 역캡슐화(Decapsulation)의 과정을 설명하시오.",
        answer: "캡슐화: 데이터가 상위 계층에서 하위 계층으로 전달될 때 각 계층의 헤더(및 트레일러)가 추가되는 과정. 역캡슐화: 수신 측에서 데이터가 하위 계층에서 상위 계층으로 전달될 때 각 계층의 헤더를 제거하고 원본 데이터를 추출하는 과정.",
      },
      {
        question: "PDU(Protocol Data Unit)의 각 계층별 명칭을 말하시오.",
        answer: "응용/표현/세션 계층: 데이터(Data), 전송 계층: 세그먼트(Segment, TCP) 또는 데이터그램(Datagram, UDP), 네트워크 계층: 패킷(Packet), 데이터링크 계층: 프레임(Frame), 물리 계층: 비트(Bit)",
      },
      {
        question: "MAC 주소와 IP 주소의 차이점을 역할, 계층, 범위 측면에서 비교하시오.",
        answer: "MAC 주소: 데이터링크 계층, 48비트, 네트워크 인터페이스에 고정 할당, 로컬 네트워크(LAN) 내 통신에 사용. IP 주소: 네트워크 계층, IPv4는 32비트/IPv6는 128비트, 논리적으로 할당(변경 가능), 네트워크 간 라우팅에 사용.",
      },
      {
        question: "라우터와 스위치의 동작 계층과 역할 차이를 설명하시오.",
        answer: "스위치: 데이터링크 계층(L2)에서 동작, MAC 주소 기반으로 같은 네트워크 내 프레임을 전달, MAC 주소 테이블 관리. 라우터: 네트워크 계층(L3)에서 동작, IP 주소 기반으로 서로 다른 네트워크 간 패킷을 라우팅, 라우팅 테이블 관리.",
      },
      {
        question: "ARP(Address Resolution Protocol)의 동작 과정을 단계별로 설명하시오.",
        answer: "1) 송신 호스트가 목적지 IP 주소에 대한 MAC 주소를 ARP 캐시에서 확인 → 2) 캐시에 없으면 ARP 요청(브로드캐스트)을 LAN 전체에 전송 → 3) 해당 IP를 가진 호스트가 자신의 MAC 주소를 담은 ARP 응답(유니캐스트)을 송신 → 4) 송신 호스트가 응답받은 MAC 주소를 ARP 캐시에 저장",
      },
      {
        question: "OSI 모델의 표현 계층(Presentation Layer)은 어떤 역할을 수행하는가?",
        answer: "데이터의 형식 변환, 인코딩/디코딩, 암호화/복호화, 압축/해제를 담당한다. 서로 다른 시스템 간 데이터 표현 방식의 차이를 해결하여 응용 계층이 데이터의 의미에만 집중할 수 있게 한다.",
      },
      {
        question: "웹 브라우저에서 웹 페이지를 요청할 때 OSI 각 계층에서 어떤 프로토콜/기술이 사용되는지 예시를 드시오.",
        answer: "응용 계층: HTTP/HTTPS, 표현 계층: SSL/TLS(암호화), HTML 인코딩, 세션 계층: TCP 세션 관리, 전송 계층: TCP(포트 80/443), 네트워크 계층: IP, 데이터링크 계층: 이더넷(MAC), 물리 계층: 전기/광 신호",
      },
      {
        question: "L2 스위치에서 플러딩(Flooding)이 발생하는 상황과 이유를 설명하시오.",
        answer: "스위치가 수신한 프레임의 목적지 MAC 주소가 MAC 주소 테이블에 등록되어 있지 않을 때 플러딩이 발생한다. 스위치가 해당 MAC 주소가 어느 포트에 연결되어 있는지 모르기 때문에 수신 포트를 제외한 모든 포트로 프레임을 전송하여 목적지를 찾는다.",
      },
      {
        question: "네트워크 계층에서 라우팅과 포워딩의 차이를 설명하시오.",
        answer: "라우팅: 패킷이 목적지까지 도달하기 위한 최적 경로를 결정하는 과정. 라우팅 알고리즘(OSPF, BGP 등)을 통해 라우팅 테이블을 구성한다. 포워딩: 라우터가 수신한 패킷을 라우팅 테이블에 따라 적절한 출력 포트로 전달하는 실제 데이터 이동 동작이다.",
      },
      {
        question: "전송 계층이 제공하는 주요 기능 3가지를 말하시오.",
        answer: "1) 프로세스 간 통신: 포트 번호를 통해 올바른 애플리케이션 프로세스에 데이터 전달. 2) 신뢰성 보장(TCP): 데이터의 순서 보장, 재전송, 오류 검출. 3) 흐름 제어 및 혼잡 제어: 수신 측 용량과 네트워크 상태에 따라 전송 속도 조절.",
      },
      {
        question: "IP 주소의 서브넷 마스크는 어떤 역할을 하며, 192.168.1.0/24에서 /24의 의미는 무엇인가?",
        answer: "서브넷 마스크는 IP 주소에서 네트워크 부분과 호스트 부분을 구분하는 역할을 한다. /24는 상위 24비트가 네트워크 주소이고 하위 8비트가 호스트 주소임을 의미한다. 즉, 255.255.255.0이 서브넷 마스크이며, 해당 네트워크에서 최대 254개의 호스트를 사용할 수 있다.",
      },
      {
        question: "데이터링크 계층의 두 가지 하위 계층(LLC, MAC)의 역할을 각각 설명하시오.",
        answer: "LLC(Logical Link Control): 네트워크 계층과의 인터페이스 제공, 흐름 제어, 오류 제어, 멀티플렉싱 담당. MAC(Media Access Control): 물리적 매체에 대한 접근 제어, MAC 주소 지정, 프레임의 구성과 전송, 충돌 감지(CSMA/CD 등) 담당.",
      },
      {
        question: "왜 실무에서는 OSI 7계층보다 TCP/IP 4계층 모델이 더 많이 사용되는가?",
        answer: "TCP/IP 모델은 실제 인터넷 프로토콜 스택을 기반으로 만들어져 실용적이다. OSI 모델의 세션/표현 계층은 현실에서 명확히 분리되지 않고 응용 계층에 통합되는 경우가 많다. TCP/IP는 구현 중심이고, OSI는 개념적 참조 모델로서 학습과 트러블슈팅에 활용된다.",
      },
    ],
    flashcards: [
      {
        question: "OSI 물리 계층(1계층)의 역할은?",
        answer: "비트 단위의 데이터를 전기 신호, 광 신호, 무선 신호로 변환하여 물리적 매체를 통해 전송. 케이블, 허브, 리피터 등이 해당",
      },
      {
        question: "OSI 데이터링크 계층(2계층)의 역할은?",
        answer: "인접 노드 간 신뢰성 있는 프레임 전송 담당. MAC 주소 기반 통신, 오류 감지(CRC), 흐름 제어. 스위치, 브리지가 해당",
      },
      {
        question: "OSI 네트워크 계층(3계층)의 역할은?",
        answer: "서로 다른 네트워크 간 패킷 라우팅 담당. IP 주소 지정, 최적 경로 선택. 라우터가 해당. 주요 프로토콜: IP, ICMP, ARP",
      },
      {
        question: "OSI 전송 계층(4계층)의 역할은?",
        answer: "종단 간(end-to-end) 신뢰성 있는 데이터 전송. 포트 번호로 프로세스 식별. 흐름 제어, 오류 복구. 주요 프로토콜: TCP, UDP",
      },
      {
        question: "OSI 세션 계층(5계층)의 역할은?",
        answer: "통신 세션의 수립, 관리, 종료 담당. 동기화 점(체크포인트) 설정으로 데이터 교환 관리. 전이중/반이중 통신 제어",
      },
      {
        question: "캡슐화(Encapsulation)란?",
        answer: "상위 계층의 데이터에 각 계층의 헤더(및 트레일러)를 추가하며 하위 계층으로 전달하는 과정. 데이터 → 세그먼트 → 패킷 → 프레임 → 비트",
      },
      {
        question: "PDU(Protocol Data Unit)란?",
        answer: "각 계층에서 처리하는 데이터 단위. 응용: 데이터, 전송: 세그먼트(TCP)/데이터그램(UDP), 네트워크: 패킷, 데이터링크: 프레임, 물리: 비트",
      },
      {
        question: "MAC 주소란?",
        answer: "네트워크 인터페이스 카드(NIC)에 할당된 48비트(6바이트) 물리적 주소. 16진수로 표기(예: AA:BB:CC:DD:EE:FF). LAN 내 통신에 사용",
      },
      {
        question: "IP 주소란?",
        answer: "네트워크 계층에서 사용하는 논리적 주소. IPv4는 32비트(예: 192.168.0.1), IPv6는 128비트. 네트워크 간 라우팅에 사용. 동적 할당 가능",
      },
      {
        question: "라우터(Router)란?",
        answer: "네트워크 계층(L3) 장비. IP 주소 기반으로 서로 다른 네트워크 간 패킷을 최적 경로로 전달. 라우팅 테이블과 라우팅 프로토콜 사용",
      },
      {
        question: "스위치(Switch)란?",
        answer: "데이터링크 계층(L2) 장비. MAC 주소 기반으로 같은 네트워크 내에서 프레임을 목적지 포트로 전달. MAC 주소 테이블 학습 기능",
      },
      {
        question: "ARP(Address Resolution Protocol)란?",
        answer: "IP 주소를 MAC 주소로 변환하는 프로토콜. ARP 요청(브로드캐스트)으로 대상 MAC 주소를 질의하고, ARP 응답(유니캐스트)으로 결과를 수신",
      },
      {
        question: "TCP/IP 네트워크 인터페이스 계층이란?",
        answer: "TCP/IP 모델의 최하위 계층. OSI의 물리+데이터링크 계층에 대응. 물리적 매체 접근과 프레임 전송 담당. 이더넷, Wi-Fi 등",
      },
      {
        question: "TCP/IP 인터넷 계층이란?",
        answer: "OSI 네트워크 계층에 대응. IP 주소 기반 패킷 라우팅 담당. 주요 프로토콜: IP, ICMP, IGMP, ARP",
      },
      {
        question: "브로드캐스트 vs 유니캐스트 vs 멀티캐스트",
        answer: "유니캐스트: 1:1 통신(특정 대상에게). 브로드캐스트: 1:전체 통신(네트워크 내 모든 호스트에게). 멀티캐스트: 1:그룹 통신(특정 그룹에 속한 호스트들에게)",
      },
    ],
  },

  "03-network/03-tcp-vs-udp": {
    quizzes: [
      {
        question: "TCP 3-way handshake의 각 단계(SYN, SYN-ACK, ACK)를 설명하시오.",
        answer: "1) 클라이언트 → 서버: SYN 패킷 전송(연결 요청, 초기 시퀀스 번호 포함) → 2) 서버 → 클라이언트: SYN-ACK 패킷 전송(연결 수락, 서버의 초기 시퀀스 번호 + 클라이언트 SYN에 대한 ACK) → 3) 클라이언트 → 서버: ACK 패킷 전송(서버의 SYN에 대한 확인). 이후 연결이 수립되어 데이터 전송 시작.",
      },
      {
        question: "TCP 4-way handshake로 연결을 종료하는 과정을 설명하시오.",
        answer: "1) 클라이언트 → 서버: FIN 전송(연결 종료 요청) → 2) 서버 → 클라이언트: ACK 전송(FIN 수신 확인, 서버는 남은 데이터 전송 가능) → 3) 서버 → 클라이언트: FIN 전송(서버도 연결 종료 준비 완료) → 4) 클라이언트 → 서버: ACK 전송(서버 FIN 확인). 클라이언트는 TIME_WAIT 상태로 일정 시간 대기 후 연결 종료.",
      },
      {
        question: "TCP의 흐름 제어(Flow Control)란 무엇이며 어떤 메커니즘을 사용하는가?",
        answer: "흐름 제어는 송신 측이 수신 측의 처리 능력을 초과하여 데이터를 보내지 않도록 전송 속도를 조절하는 메커니즘이다. 수신 측이 TCP 헤더의 윈도우 크기(Window Size) 필드를 통해 자신이 수신 가능한 버퍼 크기를 알려주고, 송신 측은 이 크기를 초과하지 않도록 전송량을 제한한다.",
      },
      {
        question: "TCP의 혼잡 제어(Congestion Control)와 흐름 제어의 차이를 설명하시오.",
        answer: "흐름 제어는 수신 측의 버퍼 오버플로를 방지하기 위해 송수신 간 전송 속도를 조절하는 것이고, 혼잡 제어는 네트워크 전체의 혼잡 상태를 고려하여 송신 측이 전송 속도를 조절하는 것이다. 흐름 제어는 종단 간 문제, 혼잡 제어는 네트워크 전체 문제에 대응한다.",
      },
      {
        question: "슬라이딩 윈도우(Sliding Window) 프로토콜의 동작 원리를 설명하시오.",
        answer: "송신 측이 ACK를 받지 않고도 연속으로 보낼 수 있는 데이터의 범위(윈도우)를 설정한다. ACK를 수신하면 윈도우가 오른쪽으로 슬라이드하여 새로운 데이터를 전송할 수 있게 된다. Stop-and-Wait 방식 대비 네트워크 이용률을 크게 향상시킨다.",
      },
      {
        question: "UDP가 TCP보다 적합한 사용 사례 3가지를 들고 이유를 설명하시오.",
        answer: "1) 실시간 스트리밍(영상/음성): 약간의 패킷 손실보다 지연이 더 치명적이므로 빠른 전송이 중요. 2) DNS 질의: 단일 요청-응답으로 간단하므로 연결 수립 오버헤드가 불필요. 3) 온라인 게임: 최신 상태 정보가 중요하므로 재전송보다 즉시 전달이 유리.",
      },
      {
        question: "TCP와 UDP의 헤더 크기 차이와 그 이유를 설명하시오.",
        answer: "TCP 헤더는 최소 20바이트이고 UDP 헤더는 8바이트이다. TCP는 시퀀스 번호, ACK 번호, 윈도우 크기, 제어 플래그 등 신뢰성 보장을 위한 필드가 필요하여 크기가 크다. UDP는 출발지/목적지 포트, 길이, 체크섬만 포함하므로 간결하다.",
      },
      {
        question: "TCP에서 재전송 타이머(Retransmission Timer)의 역할과 동작 방식을 설명하시오.",
        answer: "송신 측이 세그먼트를 전송한 후 ACK를 기다리는 시간을 설정하는 타이머이다. 타이머 만료 전까지 ACK를 받지 못하면 해당 세그먼트가 손실된 것으로 판단하고 재전송한다. RTT(Round Trip Time)를 기반으로 동적으로 타이머 값을 조절한다.",
      },
      {
        question: "체크섬(Checksum)이란 무엇이며, TCP와 UDP에서 어떻게 다르게 적용되는가?",
        answer: "체크섬은 데이터 무결성을 검증하기 위한 오류 검출 값이다. TCP에서 체크섬은 필수이며 헤더와 데이터 전체를 대상으로 계산한다. UDP에서도 체크섬 필드가 있지만, IPv4에서는 선택 사항이었고 IPv6에서는 필수이다. 둘 다 의사 헤더(pseudo header)를 포함하여 계산한다.",
      },
      {
        question: "Well-known 포트, Registered 포트, Dynamic 포트의 범위와 용도를 설명하시오.",
        answer: "Well-known 포트(0~1023): 표준 서비스에 할당(HTTP=80, HTTPS=443, SSH=22, DNS=53). Registered 포트(1024~49151): 특정 애플리케이션이 IANA에 등록하여 사용(MySQL=3306, PostgreSQL=5432). Dynamic/Private 포트(49152~65535): 클라이언트가 임시로 사용하는 포트.",
      },
      {
        question: "TCP의 혼잡 제어 알고리즘 중 Slow Start의 동작 원리를 설명하시오.",
        answer: "연결 초기에 혼잡 윈도우(cwnd)를 1 MSS(Maximum Segment Size)로 시작한다. ACK를 받을 때마다 cwnd를 두 배로 증가시켜(지수적 증가) 전송 속도를 빠르게 높인다. cwnd가 임계값(ssthresh)에 도달하면 혼잡 회피(Congestion Avoidance) 단계로 전환하여 선형적으로 증가시킨다.",
      },
      {
        question: "TCP에서 TIME_WAIT 상태가 필요한 이유를 설명하시오.",
        answer: "1) 마지막 ACK가 손실될 경우 상대방이 FIN을 재전송할 수 있으므로, 이를 수신하고 다시 ACK를 보내기 위해 일정 시간 대기한다. 2) 이전 연결의 지연된 패킷이 새로운 연결에서 잘못 처리되는 것을 방지한다. 보통 2 * MSL(Maximum Segment Lifetime) 동안 유지된다.",
      },
      {
        question: "UDP 기반 애플리케이션에서 신뢰성이 필요한 경우 어떻게 구현할 수 있는가?",
        answer: "애플리케이션 레벨에서 신뢰성 메커니즘을 직접 구현한다. 예: 시퀀스 번호 부여로 순서 보장, ACK/타임아웃으로 재전송 구현, 체크섬으로 무결성 검증. 대표적 예시로 QUIC 프로토콜이 있으며, UDP 위에 연결 관리, 손실 복구, 혼잡 제어를 구현했다.",
      },
      {
        question: "TCP의 Nagle 알고리즘은 무엇이며 언제 비활성화해야 하는가?",
        answer: "Nagle 알고리즘은 작은 패킷들을 모아서 한 번에 전송하여 네트워크 효율을 높이는 알고리즘이다. ACK를 받거나 일정 크기가 되면 전송한다. 실시간 게임이나 텔넷 같이 즉각적인 응답이 필요한 경우 지연이 발생하므로 TCP_NODELAY 옵션으로 비활성화해야 한다.",
      },
      {
        question: "포트 번호가 필요한 이유를 IP 주소만으로 통신하는 경우와 비교하여 설명하시오.",
        answer: "IP 주소는 네트워크에서 호스트(컴퓨터)를 식별하지만, 하나의 호스트에서 여러 애플리케이션이 동시에 네트워크 통신을 한다. 포트 번호는 호스트 내에서 특정 프로세스(애플리케이션)를 식별하여, 수신된 데이터를 올바른 프로세스에 전달하는 역할을 한다.",
      },
    ],
    flashcards: [
      {
        question: "TCP 3-way handshake란?",
        answer: "TCP 연결 수립 과정. SYN → SYN-ACK → ACK 세 단계로 양방향 통신 채널을 설정. 초기 시퀀스 번호를 교환하여 데이터 순서를 추적",
      },
      {
        question: "TCP 4-way handshake란?",
        answer: "TCP 연결 종료 과정. FIN → ACK → FIN → ACK 네 단계. 양쪽이 각각 종료 의사를 표시하고 확인. 클라이언트는 TIME_WAIT 후 종료",
      },
      {
        question: "흐름 제어(Flow Control)란?",
        answer: "수신 측의 처리 속도에 맞춰 송신 측의 전송 속도를 조절하는 메커니즘. 수신 윈도우 크기를 통해 수신 가능한 데이터량을 알림",
      },
      {
        question: "혼잡 제어(Congestion Control)란?",
        answer: "네트워크의 혼잡 상태를 감지하고 송신 측이 전송량을 조절하는 메커니즘. Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery 등의 알고리즘 사용",
      },
      {
        question: "슬라이딩 윈도우(Sliding Window)란?",
        answer: "ACK 없이 연속 전송 가능한 데이터 범위를 설정하는 프로토콜. ACK 수신 시 윈도우가 이동하여 새 데이터를 전송. 네트워크 이용률 향상",
      },
      {
        question: "UDP의 주요 특성은?",
        answer: "비연결형, 비신뢰성 전송 프로토콜. 핸드셰이크 없음, 순서 보장 없음, 재전송 없음. 헤더 8바이트로 가볍고 빠름. 실시간 스트리밍, DNS, 게임 등에 적합",
      },
      {
        question: "TCP vs UDP 핵심 비교",
        answer: "TCP: 연결형, 신뢰성, 순서 보장, 흐름/혼잡 제어, 느림. UDP: 비연결형, 비신뢰성, 순서 비보장, 제어 없음, 빠름",
      },
      {
        question: "TCP의 신뢰성 보장 메커니즘은?",
        answer: "시퀀스 번호(순서 보장), ACK(수신 확인), 재전송 타이머(손실 복구), 체크섬(무결성 검증), 흐름/혼잡 제어(과부하 방지)",
      },
      {
        question: "체크섬(Checksum)이란?",
        answer: "데이터 무결성을 검증하는 오류 검출 방법. 데이터의 합계를 계산하여 전송하고, 수신 측이 동일하게 계산하여 비교. 불일치 시 오류 감지",
      },
      {
        question: "포트 번호(Port Number)란?",
        answer: "호스트 내에서 프로세스를 식별하는 16비트 번호(0~65535). Well-known(0~1023), Registered(1024~49151), Dynamic(49152~65535)으로 구분",
      },
      {
        question: "TCP Slow Start란?",
        answer: "혼잡 제어 알고리즘. cwnd를 1 MSS에서 시작하여 ACK마다 지수적으로 증가. 임계값(ssthresh) 도달 시 선형 증가로 전환",
      },
      {
        question: "MSS(Maximum Segment Size)란?",
        answer: "TCP 세그먼트 하나에 담을 수 있는 최대 데이터 크기(헤더 제외). 보통 1460바이트(MTU 1500 - IP 헤더 20 - TCP 헤더 20)",
      },
      {
        question: "TCP Fast Retransmit란?",
        answer: "3개의 중복 ACK를 수신하면 타이머 만료를 기다리지 않고 즉시 해당 세그먼트를 재전송하는 방식. 손실 복구 속도 향상",
      },
      {
        question: "TIME_WAIT 상태란?",
        answer: "TCP 연결 종료 후 클라이언트가 유지하는 대기 상태. 2*MSL(보통 60초) 동안 지속. 지연 패킷 처리와 마지막 ACK 손실 대비 목적",
      },
      {
        question: "TCP의 주요 제어 플래그(6가지)는?",
        answer: "SYN(연결 요청), ACK(확인), FIN(연결 종료), RST(연결 강제 초기화), PSH(즉시 전달), URG(긴급 데이터)",
      },
    ],
  },

  "03-network/04-websocket-grpc": {
    quizzes: [
      {
        question: "WebSocket의 연결 수립 과정을 HTTP 업그레이드와 관련하여 설명하시오.",
        answer: "클라이언트가 HTTP 요청에 'Upgrade: websocket'과 'Connection: Upgrade' 헤더를 포함하여 서버에 전송한다. 서버가 WebSocket을 지원하면 HTTP 101 Switching Protocols 응답을 보내고, 이후 HTTP 연결이 WebSocket 연결로 업그레이드되어 전이중 통신이 시작된다.",
      },
      {
        question: "전이중 통신(Full-Duplex)과 반이중 통신(Half-Duplex)의 차이를 WebSocket과 HTTP 관점에서 설명하시오.",
        answer: "전이중 통신은 클라이언트와 서버가 동시에 양방향으로 데이터를 주고받을 수 있는 방식으로 WebSocket이 이에 해당한다. 반이중 통신은 한 번에 한 방향으로만 데이터를 전송할 수 있는 방식으로 HTTP의 요청-응답 모델이 이에 해당한다. WebSocket은 연결 유지 후 양측이 자유롭게 메시지를 보낼 수 있다.",
      },
      {
        question: "SSE(Server-Sent Events)와 WebSocket의 차이를 비교하시오.",
        answer: "SSE: HTTP 기반, 서버→클라이언트 단방향 스트리밍, 텍스트 데이터만 지원, 자동 재연결 내장, 구현 간단. WebSocket: 전용 프로토콜, 양방향 전이중 통신, 텍스트/바이너리 모두 지원, 재연결 직접 구현 필요, 구현 복잡하지만 유연. 서버 푸시만 필요하면 SSE, 양방향 통신이면 WebSocket이 적합.",
      },
      {
        question: "폴링(Polling)과 롱폴링(Long Polling)의 차이와 각각의 단점을 설명하시오.",
        answer: "폴링: 클라이언트가 주기적으로(예: 1초마다) 서버에 요청하여 새 데이터를 확인. 단점은 불필요한 요청이 많아 서버 부하 증가, 실시간성 부족. 롱폴링: 서버가 새 데이터가 있을 때까지 응답을 지연시켰다가 데이터 발생 시 응답. 단점은 서버가 다수의 대기 연결을 유지해야 하고 타임아웃 관리가 필요.",
      },
      {
        question: "gRPC란 무엇이며, REST API와 비교했을 때의 장점 3가지를 말하시오.",
        answer: "gRPC는 Google이 개발한 고성능 RPC 프레임워크로, HTTP/2와 Protocol Buffers를 사용한다. 장점: 1) Protocol Buffers 바이너리 직렬화로 JSON 대비 데이터 크기와 파싱 속도가 우수. 2) HTTP/2 기반 멀티플렉싱과 양방향 스트리밍 지원. 3) .proto 파일로 서비스 정의 시 다양한 언어의 클라이언트/서버 코드 자동 생성.",
      },
      {
        question: "Protocol Buffers(Protobuf)란 무엇이며 JSON과 비교하여 어떤 특징이 있는가?",
        answer: "Protocol Buffers는 Google이 개발한 바이너리 직렬화 형식이다. .proto 파일로 스키마를 정의하고 코드를 자동 생성한다. JSON 대비 장점: 데이터 크기가 작고(바이너리), 직렬화/역직렬화 속도가 빠르며, 타입 안전성이 보장된다. 단점: 사람이 읽을 수 없고, 스키마 정의가 필수이며, 브라우저에서 직접 사용이 어렵다.",
      },
      {
        question: "gRPC의 4가지 통신 패턴(스트리밍 유형)을 설명하시오.",
        answer: "1) Unary: 클라이언트 1개 요청 → 서버 1개 응답 (REST와 유사). 2) Server Streaming: 클라이언트 1개 요청 → 서버가 스트림으로 여러 응답 전송. 3) Client Streaming: 클라이언트가 스트림으로 여러 요청 → 서버 1개 응답. 4) Bidirectional Streaming: 양방향으로 동시에 스트림 전송.",
      },
      {
        question: "채팅 애플리케이션을 구현할 때 WebSocket을 사용하는 것이 HTTP 폴링보다 효율적인 이유를 설명하시오.",
        answer: "WebSocket은 한 번 연결을 수립하면 지속적으로 유지되어 매 메시지마다 새로운 연결을 만들 필요가 없다. HTTP 헤더 오버헤드가 없고 양방향 실시간 통신이 가능하여 메시지 지연이 최소화된다. 폴링은 불필요한 빈 응답이 많고, 실시간성을 높이려면 폴링 간격을 줄여야 하므로 서버 부하가 급증한다.",
      },
      {
        question: "REST vs gRPC 중 어떤 상황에서 REST를 선택해야 하는가?",
        answer: "1) 브라우저 클라이언트와 직접 통신할 때(gRPC-Web 없이). 2) 공개 API로 외부 개발자에게 제공할 때(JSON이 범용적이고 읽기 쉬움). 3) 간단한 CRUD 작업이 대부분일 때. 4) 캐싱이 중요한 경우(HTTP 캐시 활용 용이). 5) 팀이 gRPC에 익숙하지 않을 때.",
      },
      {
        question: "실시간 주식 시세 표시 서비스를 구현할 때 SSE, WebSocket, gRPC 중 어떤 것을 선택할지 근거와 함께 설명하시오.",
        answer: "서버→클라이언트 단방향 데이터 전송이 주 목적이므로 SSE가 적합하다. 이유: 1) 서버가 시세 데이터를 지속적으로 푸시하는 단방향 스트림 패턴. 2) HTTP 기반으로 구현이 간단하고 방화벽 호환성이 좋다. 3) 자동 재연결이 내장되어 있다. 단, 양방향 주문 기능도 필요하다면 WebSocket이 더 적합할 수 있다.",
      },
      {
        question: "WebSocket 연결에서 하트비트(Heartbeat)를 구현하는 이유와 방법을 설명하시오.",
        answer: "이유: 네트워크 문제로 연결이 끊겼는지 감지하기 위함. 중간 프록시/방화벽이 유휴 연결을 종료하는 것을 방지하기 위함. 방법: 주기적으로 Ping 프레임을 전송하고 Pong 응답을 확인한다. WebSocket 프로토콜이 Ping/Pong 프레임을 표준으로 지원하며, 일정 시간 내 응답이 없으면 연결이 끊긴 것으로 판단한다.",
      },
      {
        question: "gRPC가 HTTP/2를 기반으로 사용하는 이유는 무엇인가?",
        answer: "1) 멀티플렉싱: 하나의 연결에서 여러 RPC 호출을 동시에 처리 가능. 2) 헤더 압축(HPACK): 반복되는 헤더의 오버헤드 감소. 3) 양방향 스트리밍: 서버/클라이언트가 동시에 데이터를 전송할 수 있어 gRPC의 4가지 스트리밍 패턴 지원 가능. 4) 바이너리 프레이밍으로 효율적인 데이터 전송.",
      },
      {
        question: "WebSocket의 보안 고려 사항 3가지를 설명하시오.",
        answer: "1) WSS(WebSocket Secure) 사용: TLS 암호화를 통해 데이터를 보호(ws:// 대신 wss:// 사용). 2) Origin 검증: 연결 요청의 Origin 헤더를 확인하여 허가되지 않은 도메인의 연결 차단. 3) 인증/인가: 핸드셰이크 시 토큰(JWT 등)을 전달하여 사용자를 인증하고, 메시지 레벨에서 권한을 검증.",
      },
      {
        question: "마이크로서비스 간 통신에서 gRPC를 사용할 때의 장점을 설명하시오.",
        answer: "1) 높은 성능: Protocol Buffers의 바이너리 직렬화와 HTTP/2로 서비스 간 통신 지연을 최소화. 2) 강력한 타입 시스템: .proto 파일로 서비스 인터페이스를 엄격하게 정의하여 서비스 간 계약을 명확히. 3) 다중 언어 지원: 다양한 언어로 작성된 서비스들이 동일한 .proto 정의에서 생성된 코드로 통신. 4) 양방향 스트리밍으로 복잡한 통신 패턴 지원.",
      },
      {
        question: "실시간 통신 기술 선택 시 고려해야 할 주요 기준 4가지를 설명하시오.",
        answer: "1) 통신 방향: 단방향(SSE)인지 양방향(WebSocket, gRPC)인지. 2) 지연 요구사항: 극도로 낮은 지연이 필요하면 WebSocket, 적당하면 SSE나 롱폴링. 3) 데이터 형식: 텍스트 중심이면 SSE, 바이너리 효율이 중요하면 gRPC. 4) 인프라 호환성: 방화벽/프록시 제약이 있으면 SSE(HTTP 기반)가 유리.",
      },
    ],
    flashcards: [
      {
        question: "WebSocket이란?",
        answer: "HTTP 업그레이드를 통해 수립되는 전이중(Full-Duplex) 양방향 통신 프로토콜. 한 번 연결되면 지속적으로 유지되며 낮은 오버헤드로 실시간 데이터 교환 가능",
      },
      {
        question: "HTTP 업그레이드(Upgrade)란?",
        answer: "기존 HTTP 연결을 다른 프로토콜로 전환하는 메커니즘. WebSocket 연결 시 Upgrade: websocket 헤더를 보내고, 서버가 101 Switching Protocols로 응답하여 프로토콜 전환",
      },
      {
        question: "전이중 통신(Full-Duplex)이란?",
        answer: "두 통신 주체가 동시에 양방향으로 데이터를 송수신할 수 있는 방식. WebSocket, 전화가 대표적. HTTP의 요청-응답은 반이중(Half-Duplex)에 해당",
      },
      {
        question: "SSE(Server-Sent Events)란?",
        answer: "HTTP 기반의 서버→클라이언트 단방향 스트리밍 기술. text/event-stream 형식 사용. 자동 재연결 내장. 알림, 실시간 피드 등에 적합",
      },
      {
        question: "폴링(Polling)이란?",
        answer: "클라이언트가 일정 간격으로 서버에 반복 요청하여 새 데이터를 확인하는 방식. 구현 간단하지만 불필요한 요청이 많아 비효율적",
      },
      {
        question: "롱폴링(Long Polling)이란?",
        answer: "클라이언트 요청 시 서버가 새 데이터가 있을 때까지 응답을 보류하는 방식. 일반 폴링보다 실시간성이 좋지만 서버가 대기 연결을 유지해야 하는 부담",
      },
      {
        question: "gRPC란?",
        answer: "Google이 개발한 고성능 RPC 프레임워크. HTTP/2 + Protocol Buffers 사용. 4가지 스트리밍 패턴 지원. 마이크로서비스 간 통신에 적합",
      },
      {
        question: "Protocol Buffers(Protobuf)란?",
        answer: "Google이 개발한 바이너리 직렬화 형식. .proto 파일로 스키마 정의 → 다중 언어 코드 자동 생성. JSON 대비 작은 크기, 빠른 속도, 타입 안전성",
      },
      {
        question: "REST vs gRPC 핵심 비교",
        answer: "REST: HTTP/1.1, JSON, 텍스트 기반, 브라우저 친화적, 범용 API. gRPC: HTTP/2, Protobuf, 바이너리, 고성능, 마이크로서비스/내부 통신에 적합",
      },
      {
        question: "gRPC의 4가지 스트리밍 패턴은?",
        answer: "1) Unary(1:1), 2) Server Streaming(1:N), 3) Client Streaming(N:1), 4) Bidirectional Streaming(N:N). HTTP/2 스트림 기반으로 구현",
      },
      {
        question: "WebSocket의 Ping/Pong 프레임이란?",
        answer: "연결 상태를 확인하는 제어 프레임. 한쪽이 Ping을 보내면 상대방이 Pong으로 응답. 연결 유지(Keep-alive)와 끊김 감지에 사용",
      },
      {
        question: "ws:// vs wss://의 차이는?",
        answer: "ws://는 암호화되지 않은 WebSocket 연결(포트 80), wss://는 TLS로 암호화된 WebSocket 연결(포트 443). 프로덕션에서는 반드시 wss:// 사용 권장",
      },
      {
        question: "gRPC-Web이란?",
        answer: "브라우저에서 gRPC를 사용할 수 있게 하는 프로토콜. 브라우저가 HTTP/2 직접 제어를 지원하지 않으므로 프록시를 통해 gRPC 서버와 통신",
      },
      {
        question: "WebSocket vs SSE 선택 기준은?",
        answer: "양방향 통신 필요(채팅, 게임) → WebSocket. 서버→클라이언트 단방향 푸시(알림, 피드) → SSE. SSE가 구현이 간단하고 HTTP 호환성이 좋음",
      },
      {
        question: "RPC(Remote Procedure Call)란?",
        answer: "원격 서버의 함수/메서드를 로컬 함수 호출처럼 사용하는 통신 패턴. 네트워크 통신의 복잡성을 추상화. gRPC, Thrift 등이 대표적 구현체",
      },
    ],
  },

  "03-network/05-network-security": {
    quizzes: [
      {
        question: "TLS/SSL의 역할과 TLS와 SSL의 관계를 설명하시오.",
        answer: "TLS(Transport Layer Security)는 네트워크 통신의 기밀성, 무결성, 인증을 보장하는 암호화 프로토콜이다. SSL(Secure Sockets Layer)은 TLS의 전신으로 Netscape가 개발했으며, SSL 3.0 이후 IETF에 의해 TLS 1.0으로 표준화되었다. 현재 SSL은 보안 취약점으로 사용 중단되었고 TLS 1.2/1.3이 표준이다.",
      },
      {
        question: "대칭키 암호화와 비대칭키 암호화의 차이를 설명하고, HTTPS에서 둘을 함께 사용하는 이유를 말하시오.",
        answer: "대칭키: 암호화와 복호화에 동일한 키 사용. 속도 빠름, 키 교환이 문제. 비대칭키: 공개키로 암호화, 개인키로 복호화(또는 반대). 속도 느림, 키 교환 안전. HTTPS에서는 비대칭키로 안전하게 대칭키를 교환한 후, 실제 데이터 통신은 빠른 대칭키로 암호화한다. 두 방식의 장점을 결합한 하이브리드 방식이다.",
      },
      {
        question: "SSL/TLS 인증서의 역할과 인증서에 포함되는 주요 정보를 설명하시오.",
        answer: "인증서는 서버의 신원을 증명하고 공개키를 안전하게 전달하는 역할을 한다. 주요 포함 정보: 1) 도메인 이름(Subject), 2) 서버의 공개키, 3) 인증 기관(CA) 정보, 4) 유효 기간, 5) CA의 디지털 서명, 6) 인증서 일련번호. 클라이언트는 CA의 서명을 검증하여 인증서의 진위를 확인한다.",
      },
      {
        question: "CA(Certificate Authority)의 역할과 인증서 체인(Certificate Chain)을 설명하시오.",
        answer: "CA는 서버의 신원을 검증하고 디지털 인증서를 발급하는 신뢰할 수 있는 제3자 기관이다. 인증서 체인: 서버 인증서 → 중간 CA 인증서 → 루트 CA 인증서의 계층 구조. 루트 CA의 인증서는 운영체제/브라우저에 미리 내장되어 있어 신뢰의 기점(Trust Anchor)이 된다. 중간 CA를 두어 루트 CA의 개인키 노출 위험을 줄인다.",
      },
      {
        question: "CORS(Cross-Origin Resource Sharing)란 무엇이며 왜 필요한가?",
        answer: "CORS는 웹 브라우저가 다른 출처(origin)의 리소스에 접근할 수 있도록 허용하는 HTTP 헤더 기반 메커니즘이다. 브라우저의 Same-Origin Policy(동일 출처 정책)가 기본적으로 다른 출처의 요청을 차단하기 때문에, 서버가 Access-Control-Allow-Origin 등의 헤더로 허용할 출처를 명시해야 한다. API 서버와 프론트엔드가 다른 도메인에 있을 때 필수적이다.",
      },
      {
        question: "XSS(Cross-Site Scripting) 공격의 유형과 방어 방법을 설명하시오.",
        answer: "유형: 1) Stored XSS: 악성 스크립트가 서버 DB에 저장되어 다른 사용자에게 전달. 2) Reflected XSS: URL 파라미터에 삽입된 스크립트가 응답에 반사. 3) DOM-based XSS: 클라이언트 측 JS에서 DOM 조작 시 발생. 방어: 사용자 입력 이스케이프/새니타이즈, Content-Security-Policy(CSP) 헤더 설정, HttpOnly 쿠키 사용, 출력 인코딩.",
      },
      {
        question: "CSRF(Cross-Site Request Forgery) 공격의 원리와 방어 방법을 설명하시오.",
        answer: "원리: 인증된 사용자의 브라우저를 이용하여, 사용자 모르게 악의적인 요청을 대상 서버에 보내는 공격. 브라우저가 쿠키를 자동으로 포함하므로 서버는 정상 요청으로 오인한다. 방어: 1) CSRF 토큰: 폼에 랜덤 토큰을 포함하여 서버에서 검증. 2) SameSite 쿠키 속성 설정. 3) Referer/Origin 헤더 검증. 4) 중요 작업에 재인증 요구.",
      },
      {
        question: "SQL 인젝션 공격의 원리와 예시, 방어 방법을 설명하시오.",
        answer: "원리: 사용자 입력이 SQL 쿼리에 직접 삽입될 때 악의적인 SQL 코드를 주입하여 DB를 조작하는 공격. 예시: 로그인 폼에 ' OR '1'='1 입력 시 항상 참인 조건이 되어 인증 우회. 방어: 1) Prepared Statement(매개변수화 쿼리) 사용이 가장 효과적. 2) ORM 사용. 3) 입력값 검증/이스케이프. 4) 최소 권한 DB 계정 사용.",
      },
      {
        question: "방화벽(Firewall)의 종류와 각각의 특징을 설명하시오.",
        answer: "1) 패킷 필터링 방화벽: IP 주소, 포트, 프로토콜 기반으로 패킷을 허용/차단. 빠르지만 내용 검사 불가. 2) 상태 기반 방화벽(Stateful): 연결 상태를 추적하여 더 정교한 필터링. 3) 애플리케이션 레벨 방화벽(WAF): HTTP 내용을 검사하여 XSS, SQL 인젝션 등 공격 차단. 4) 차세대 방화벽(NGFW): 딥 패킷 인스펙션, IPS, 애플리케이션 인지 등 통합.",
      },
      {
        question: "VPN(Virtual Private Network)의 동작 원리와 주요 프로토콜을 설명하시오.",
        answer: "VPN은 공용 네트워크를 통해 암호화된 터널을 생성하여 사설 네트워크처럼 안전한 통신을 제공한다. 데이터를 캡슐화하고 암호화하여 터널을 통해 전송한다. 주요 프로토콜: 1) IPSec: 네트워크 계층 암호화, 높은 보안성. 2) OpenVPN: SSL/TLS 기반, 유연하고 오픈소스. 3) WireGuard: 최신 경량 프로토콜, 높은 성능.",
      },
      {
        question: "OAuth 2.0의 Authorization Code Grant 흐름을 단계별로 설명하시오.",
        answer: "1) 클라이언트가 사용자를 인가 서버의 로그인 페이지로 리다이렉트. 2) 사용자가 로그인하고 권한을 승인. 3) 인가 서버가 Authorization Code를 클라이언트의 리다이렉트 URI로 전달. 4) 클라이언트가 Authorization Code + client_secret을 인가 서버에 전송하여 Access Token 교환. 5) 클라이언트가 Access Token으로 리소스 서버에 API 호출.",
      },
      {
        question: "JWT(JSON Web Token)의 구조와 각 부분의 역할을 설명하시오.",
        answer: "JWT는 점(.)으로 구분된 3개의 Base64 인코딩 부분으로 구성된다. 1) Header: 토큰 타입(JWT)과 서명 알고리즘(예: HS256) 명시. 2) Payload: 클레임(사용자 정보, 만료 시간 등) 포함. 3) Signature: Header + Payload를 비밀키로 서명한 값으로 토큰 위변조를 검증한다.",
      },
      {
        question: "JWT의 장점과 보안상 주의할 점을 각각 설명하시오.",
        answer: "장점: 1) 무상태(Stateless)로 서버에 세션 저장 불필요. 2) 자체 포함(Self-contained)으로 사용자 정보 포함. 3) 마이크로서비스 간 인증에 유리. 주의점: 1) 토큰이 탈취되면 만료까지 무효화 어려움. 2) Payload가 암호화되지 않으므로 민감 정보 포함 금지. 3) 짧은 만료 시간 설정. 4) Refresh Token 사용으로 보안 강화.",
      },
      {
        question: "HTTPS를 사용해도 방어할 수 없는 공격에는 어떤 것이 있으며 왜 그런가?",
        answer: "HTTPS는 전송 중 데이터 암호화만 담당하므로 다음 공격은 방어 불가: 1) XSS: 이미 브라우저에 로드된 악성 스크립트의 실행. 2) CSRF: 인증된 세션을 악용한 위조 요청. 3) SQL 인젝션: 서버 측 입력 처리 문제. 4) 피싱: 사용자를 속이는 사회공학적 공격. HTTPS는 네트워크 레벨 보호이고 이들은 애플리케이션 레벨 취약점이기 때문이다.",
      },
      {
        question: "SameSite 쿠키 속성의 Strict, Lax, None 값의 차이를 설명하시오.",
        answer: "Strict: 크로스 사이트 요청 시 쿠키를 절대 전송하지 않음. 가장 안전하지만 외부 링크 클릭 시 로그아웃 상태로 보임. Lax: GET 같은 안전한 요청(탑레벨 네비게이션)에서만 쿠키 전송. 기본값(Chrome). None: 모든 크로스 사이트 요청에 쿠키 전송. 반드시 Secure 속성과 함께 사용해야 함.",
      },
    ],
    flashcards: [
      {
        question: "TLS(Transport Layer Security)란?",
        answer: "네트워크 통신의 기밀성, 무결성, 인증을 보장하는 암호화 프로토콜. SSL의 후속. 현재 TLS 1.2/1.3이 표준. HTTPS = HTTP + TLS",
      },
      {
        question: "대칭키 암호화란?",
        answer: "암호화와 복호화에 동일한 키를 사용하는 방식. AES, ChaCha20 등. 속도 빠름. 키 교환 문제가 단점. 실제 데이터 암호화에 사용",
      },
      {
        question: "비대칭키(공개키) 암호화란?",
        answer: "공개키와 개인키 쌍을 사용. 공개키로 암호화 → 개인키로 복호화. RSA, ECDSA 등. 속도 느림. 키 교환, 디지털 서명에 사용",
      },
      {
        question: "SSL/TLS 인증서란?",
        answer: "서버의 신원을 증명하고 공개키를 포함하는 디지털 문서. CA가 발급하며, 도메인 소유권 검증 후 서명. X.509 형식 사용",
      },
      {
        question: "CA(Certificate Authority)란?",
        answer: "디지털 인증서를 발급하고 서버 신원을 보증하는 신뢰할 수 있는 제3자 기관. Let's Encrypt, DigiCert, GlobalSign 등. 루트 CA는 브라우저/OS에 내장",
      },
      {
        question: "CORS(Cross-Origin Resource Sharing)란?",
        answer: "다른 출처(프로토콜+도메인+포트)의 리소스 접근을 제어하는 HTTP 메커니즘. Access-Control-Allow-Origin 헤더로 허용 출처 지정. SOP의 제한적 완화",
      },
      {
        question: "XSS(Cross-Site Scripting)란?",
        answer: "웹 페이지에 악성 스크립트를 삽입하여 다른 사용자의 브라우저에서 실행시키는 공격. Stored/Reflected/DOM-based 유형. 방어: 입력 새니타이즈, CSP, HttpOnly 쿠키",
      },
      {
        question: "CSRF(Cross-Site Request Forgery)란?",
        answer: "인증된 사용자의 세션을 이용해 사용자 모르게 서버에 악의적 요청을 보내는 공격. 방어: CSRF 토큰, SameSite 쿠키, Referer 검증",
      },
      {
        question: "SQL 인젝션이란?",
        answer: "사용자 입력에 SQL 코드를 삽입하여 DB를 비정상적으로 조작하는 공격. 방어: Prepared Statement(매개변수화 쿼리), ORM 사용, 입력 검증",
      },
      {
        question: "방화벽(Firewall)이란?",
        answer: "네트워크 트래픽을 규칙에 따라 허용/차단하는 보안 장치. 패킷 필터링, 상태 기반, 애플리케이션 레벨(WAF), 차세대(NGFW) 등 유형 존재",
      },
      {
        question: "VPN(Virtual Private Network)이란?",
        answer: "공용 네트워크 위에 암호화된 터널을 생성하여 안전한 사설 통신을 제공하는 기술. IPSec, OpenVPN, WireGuard 등의 프로토콜 사용",
      },
      {
        question: "OAuth 2.0이란?",
        answer: "제3자 애플리케이션에게 사용자 자원에 대한 제한된 접근 권한을 위임하는 인가(Authorization) 프레임워크. Access Token 기반. Google/GitHub 로그인 등에 활용",
      },
      {
        question: "JWT(JSON Web Token)란?",
        answer: "Header.Payload.Signature 구조의 자체 포함형 토큰. Base64 인코딩. 무상태 인증에 사용. 서명으로 위변조 검증. 암호화는 아님(JWE는 별도)",
      },
      {
        question: "CSP(Content-Security-Policy)란?",
        answer: "브라우저에서 실행 가능한 리소스의 출처를 제한하는 HTTP 응답 헤더. XSS 방어에 효과적. script-src, style-src, img-src 등으로 세밀한 제어 가능",
      },
      {
        question: "HSTS(HTTP Strict Transport Security)란?",
        answer: "브라우저에게 해당 도메인에 HTTPS로만 접속하도록 강제하는 HTTP 응답 헤더. SSL Stripping 공격 방어. max-age, includeSubDomains 지시자 사용",
      },
    ],
  },
  "03-network/06-network-layer-routing": {
    quizzes: [
      {
        question: "서브넷 마스크 255.255.255.192일 때 사용 가능한 호스트 수를 계산하고 과정을 설명하시오.",
        answer: "255.255.255.192는 /26이므로 호스트 비트가 6비트이다. 2^6 = 64개 주소 중 네트워크 주소와 브로드캐스트 주소를 제외하면 사용 가능한 호스트 수는 62개이다.",
      },
      {
        question: "NAT(Network Address Translation)의 동작 원리와 사용 이유를 설명하시오.",
        answer: "NAT는 내부 사설 IP와 포트를 외부 공인 IP와 포트로 변환하여 내부 네트워크의 여러 호스트가 하나의 공인 IP를 공유하게 한다. NAT 테이블에 매핑 정보를 저장하여 응답 패킷을 올바른 내부 호스트로 전달한다. IPv4 주소 부족 해결과 내부 네트워크 보안에 기여한다.",
      },
      {
        question: "IPv4와 IPv6의 주요 차이점을 주소 체계, 헤더 구조, 부가 기능 측면에서 비교하시오.",
        answer: "IPv4는 32비트 주소(약 43억 개), 가변 길이 헤더, 체크섬 포함이다. IPv6는 128비트 주소(사실상 무한), 40바이트 고정 헤더, 체크섬 제거로 라우터 처리 효율이 높다. IPv6는 IPsec 내장, 자동 주소 설정(SLAAC), 플로우 레이블 지원 등의 부가 기능이 있다.",
      },
      {
        question: "OSPF와 BGP의 차이를 프로토콜 유형, 사용 범위, 알고리즘 측면에서 비교하시오.",
        answer: "OSPF는 AS 내부에서 사용하는 IGP(Interior Gateway Protocol)로 링크 상태 알고리즘(다익스트라)을 사용하여 최단 경로를 계산한다. BGP는 AS 간 라우팅을 담당하는 EGP(Exterior Gateway Protocol)로 경로 벡터 알고리즘을 사용하며 정책 기반 라우팅을 지원한다.",
      },
      {
        question: "거리 벡터(Distance Vector)와 링크 상태(Link State) 라우팅 알고리즘의 차이를 설명하시오.",
        answer: "거리 벡터는 각 라우터가 이웃에게만 자신의 거리 테이블을 주기적으로 전달하며 벨만-포드 알고리즘을 사용한다. 수렴이 느리고 count-to-infinity 문제가 있다. 링크 상태는 모든 라우터가 네트워크 전체 토폴로지 정보를 공유하고 다익스트라 알고리즘으로 최단 경로를 독립 계산한다. 수렴이 빠르지만 메모리와 계산 부하가 크다.",
      },
      {
        question: "CIDR(Classless Inter-Domain Routing) 표기법의 의미와 도입 이유를 설명하시오.",
        answer: "CIDR는 IP 주소 뒤에 /n 형태로 네트워크 프리픽스 길이를 표기한다(예: 192.168.1.0/24). 클래스 기반 할당의 비효율(클래스 B는 65,534개, C는 254개로 낭비 또는 부족)을 해결하고, 서브넷을 유연하게 분할하며 라우팅 테이블을 축소(슈퍼넷팅)할 수 있다.",
      },
      {
        question: "라우팅 테이블에 저장되는 주요 정보와 패킷 포워딩 과정을 설명하시오.",
        answer: "라우팅 테이블에는 목적지 네트워크 주소, 서브넷 마스크, 넥스트 홉(다음 라우터) IP, 출력 인터페이스, 메트릭(비용) 등이 저장된다. 패킷 도착 시 목적지 IP와 테이블의 각 엔트리를 최장 접두사 매칭(Longest Prefix Match)하여 가장 구체적인 경로의 넥스트 홉으로 전달한다.",
      },
      {
        question: "AS(Autonomous System)의 개념과 AS 번호의 역할을 설명하시오.",
        answer: "AS는 동일한 라우팅 정책 하에 하나의 관리 주체가 운영하는 네트워크 집합이다. 각 AS에는 고유한 AS 번호(ASN)가 할당되며, BGP에서 AS 간 경로를 식별하고 라우팅 루프를 방지하는 데 사용된다.",
      },
      {
        question: "RIP의 count-to-infinity 문제가 발생하는 원인과 해결 방법을 설명하시오.",
        answer: "네트워크 장애 시 라우터들이 서로의 잘못된 거리 정보를 반복 교환하여 거리 값이 무한히 증가하는 문제이다. 해결 방법으로 최대 홉 수 제한(16=무한대), 스플릿 호라이즌(정보를 받은 인터페이스로 재전송 금지), 포이즌 리버스(해당 경로 거리를 무한대로 전송), 홀드다운 타이머 등이 있다.",
      },
      {
        question: "ICMP(Internet Control Message Protocol)의 역할과 대표적인 사용 예를 설명하시오.",
        answer: "ICMP는 IP 네트워크에서 오류 보고와 진단 기능을 담당하는 프로토콜이다. 목적지 도달 불가, TTL 초과, 리다이렉트 등의 오류 메시지를 전달한다. 대표적 사용 예로 ping(Echo Request/Reply)과 traceroute(TTL을 점진적으로 증가시켜 경로 추적)가 있다.",
      },
      {
        question: "IPv6 전환 기술 중 듀얼 스택, 터널링, 헤더 변환의 차이를 설명하시오.",
        answer: "듀얼 스택은 장비가 IPv4와 IPv6를 동시에 지원하는 방식이다. 터널링은 IPv6 패킷을 IPv4 패킷 안에 캡슐화하여 IPv4 네트워크를 통과시킨다. 헤더 변환(NAT64 등)은 IPv6와 IPv4 헤더를 상호 변환하여 양쪽 네트워크가 직접 통신하게 한다.",
      },
      {
        question: "기본 게이트웨이(Default Gateway)의 역할과 라우팅 테이블에서의 위치를 설명하시오.",
        answer: "기본 게이트웨이는 호스트가 목적지 네트워크를 라우팅 테이블에서 찾지 못했을 때 패킷을 전달하는 기본 라우터이다. 라우팅 테이블에서 목적지가 0.0.0.0/0인 엔트리의 넥스트 홉으로 설정된다.",
      },
      {
        question: "라우팅과 포워딩의 차이를 명확히 구분하시오.",
        answer: "라우팅은 네트워크 전체의 경로를 결정하여 라우팅 테이블을 구성하는 제어 평면(Control Plane) 기능이다. 포워딩은 도착한 패킷의 목적지 주소를 라우팅 테이블에서 조회하여 적절한 출력 포트로 전달하는 데이터 평면(Data Plane) 기능이다.",
      },
      {
        question: "ARP(Address Resolution Protocol)의 동작 과정을 단계별로 설명하시오.",
        answer: "1) 송신자가 목적지 IP에 대한 MAC 주소를 ARP 캐시에서 조회한다. 2) 없으면 목적지 IP를 포함한 ARP 요청을 브로드캐스트한다. 3) 해당 IP를 가진 호스트가 자신의 MAC 주소를 포함한 ARP 응답을 유니캐스트로 반환한다. 4) 송신자가 ARP 캐시에 IP-MAC 매핑을 저장하고 프레임을 전송한다.",
      },
      {
        question: "DHCP(Dynamic Host Configuration Protocol)의 DORA 과정을 설명하시오.",
        answer: "1) Discover: 클라이언트가 브로드캐스트로 DHCP 서버를 탐색. 2) Offer: 서버가 사용 가능한 IP 주소를 제안. 3) Request: 클라이언트가 제안된 IP를 요청. 4) Acknowledge: 서버가 IP 할당을 확인하고 서브넷 마스크, 게이트웨이, DNS 등의 설정 정보를 함께 전달.",
      },
    ],
    flashcards: [
      {
        question: "IPv4란?",
        answer: "32비트 주소 체계(약 43억 개)를 사용하는 인터넷 프로토콜 버전 4이다. 점 구분 10진법(예: 192.168.0.1)으로 표기하며 현재 가장 널리 사용된다.",
      },
      {
        question: "IPv6란?",
        answer: "128비트 주소 체계를 사용하는 인터넷 프로토콜 버전 6이다. 콜론 구분 16진법으로 표기하며 IPv4 주소 고갈 문제를 해결하기 위해 설계되었다.",
      },
      {
        question: "NAT(Network Address Translation)란?",
        answer: "사설 IP와 공인 IP를 상호 변환하여 여러 내부 호스트가 하나의 공인 IP로 인터넷에 접속할 수 있게 하는 기술이다.",
      },
      {
        question: "CIDR(Classless Inter-Domain Routing)란?",
        answer: "클래스 없이 IP 주소를 가변 길이 프리픽스(/n)로 할당하는 방식이다. 유연한 서브넷 분할과 라우팅 테이블 축소(슈퍼넷팅)가 가능하다.",
      },
      {
        question: "서브넷 마스크란?",
        answer: "IP 주소에서 네트워크 부분과 호스트 부분을 구분하는 32비트 값이다. 1인 비트가 네트워크, 0인 비트가 호스트 부분을 나타낸다.",
      },
      {
        question: "OSPF(Open Shortest Path First)란?",
        answer: "AS 내부에서 사용하는 링크 상태 라우팅 프로토콜이다. 다익스트라 알고리즘으로 최단 경로를 계산하며 영역(Area) 단위로 계층적 라우팅을 지원한다.",
      },
      {
        question: "BGP(Border Gateway Protocol)란?",
        answer: "AS 간 라우팅을 담당하는 경로 벡터 프로토콜이다. 인터넷의 핵심 라우팅 프로토콜로, 정책 기반으로 최적 경로를 선택한다.",
      },
      {
        question: "RIP(Routing Information Protocol)란?",
        answer: "홉 수(최대 15)를 메트릭으로 사용하는 거리 벡터 라우팅 프로토콜이다. 구현이 단순하지만 수렴이 느리고 대규모 네트워크에 부적합하다.",
      },
      {
        question: "AS(Autonomous System)란?",
        answer: "동일한 라우팅 정책 하에 하나의 관리 주체가 운영하는 네트워크 집합이다. 고유한 ASN(AS Number)으로 식별된다.",
      },
      {
        question: "ICMP(Internet Control Message Protocol)란?",
        answer: "IP 네트워크에서 오류 보고(목적지 도달 불가, TTL 초과 등)와 진단(ping, traceroute) 기능을 제공하는 프로토콜이다.",
      },
      {
        question: "라우팅(Routing)이란?",
        answer: "출발지에서 목적지까지 패킷이 전달될 최적 경로를 결정하는 과정이다. 라우팅 알고리즘에 의해 라우팅 테이블이 구성된다.",
      },
      {
        question: "포워딩(Forwarding)이란?",
        answer: "라우터에 도착한 패킷의 목적지 주소를 라우팅 테이블에서 조회하여 적절한 출력 인터페이스로 전달하는 동작이다.",
      },
      {
        question: "TTL(Time To Live)이란?",
        answer: "IP 패킷이 네트워크에서 무한 순환하는 것을 방지하기 위한 필드이다. 라우터를 거칠 때마다 1씩 감소하며 0이 되면 패킷을 폐기한다.",
      },
      {
        question: "기본 게이트웨이(Default Gateway)란?",
        answer: "호스트가 목적지 네트워크 경로를 모를 때 패킷을 전달하는 기본 라우터이다. 라우팅 테이블의 0.0.0.0/0 엔트리에 해당한다.",
      },
      {
        question: "ARP(Address Resolution Protocol)란?",
        answer: "IP 주소를 MAC 주소로 변환하는 프로토콜이다. 브로드캐스트로 요청하고 유니캐스트로 응답받아 ARP 캐시에 매핑을 저장한다.",
      },
    ],
  },
  "03-network/07-link-layer": {
    quizzes: [
      {
        question: "CSMA/CD(Carrier Sense Multiple Access with Collision Detection)의 동작 과정을 단계별로 설명하시오.",
        answer: "1) 전송 전 채널이 유휴 상태인지 감지(Carrier Sense). 2) 유휴하면 프레임 전송 시작. 3) 전송 중 충돌 감지(Collision Detection) 시 잼 신호를 보내 모든 노드에 충돌을 알림. 4) 지수적 백오프(Exponential Backoff) 알고리즘으로 랜덤 시간 대기 후 재전송 시도.",
      },
      {
        question: "ARP 테이블의 역할과 엔트리가 관리되는 방식을 설명하시오.",
        answer: "ARP 테이블은 IP 주소와 MAC 주소의 매핑을 캐싱하여 반복적인 ARP 브로드캐스트를 줄인다. 각 엔트리는 TTL(보통 20분)이 설정되어 일정 시간이 지나면 삭제된다. ARP 요청/응답 시 자동으로 갱신되며, 정적으로 수동 등록도 가능하다.",
      },
      {
        question: "스위치의 자기 학습(Self-Learning) 알고리즘의 동작 과정을 설명하시오.",
        answer: "1) 프레임이 특정 포트로 들어오면 출발지 MAC 주소와 해당 포트 번호를 MAC 주소 테이블에 기록한다. 2) 목적지 MAC 주소가 테이블에 있으면 해당 포트로만 전달(포워딩). 3) 없으면 수신 포트를 제외한 모든 포트로 플러딩(Flooding). 4) 일정 시간 동안 트래픽이 없는 엔트리는 에이징 타임아웃으로 삭제된다.",
      },
      {
        question: "VLAN(Virtual LAN)의 장점을 3가지 이상 설명하시오.",
        answer: "1) 브로드캐스트 도메인을 논리적으로 분리하여 불필요한 브로드캐스트 트래픽을 줄인다. 2) 물리적 위치와 무관하게 논리적 네트워크 그룹을 구성할 수 있어 관리가 유연하다. 3) VLAN 간 트래픽이 격리되어 보안이 향상된다. 4) 물리적 재배선 없이 네트워크 구조를 변경할 수 있다.",
      },
      {
        question: "STP(Spanning Tree Protocol)가 필요한 이유와 동작 원리를 설명하시오.",
        answer: "스위치 네트워크에 루프가 존재하면 브로드캐스트 스톰, MAC 테이블 불안정, 프레임 중복 수신이 발생한다. STP는 루트 브리지를 선출하고, 각 스위치에서 루트까지의 최단 경로를 계산하여 중복 경로의 포트를 블로킹 상태로 전환함으로써 논리적 트리 구조를 만들어 루프를 제거한다.",
      },
      {
        question: "MAC 주소와 IP 주소의 역할을 비교하고, 두 주소가 모두 필요한 이유를 설명하시오.",
        answer: "MAC 주소는 48비트의 물리적 주소로 같은 네트워크(LAN) 내에서 프레임의 출발지/목적지를 식별한다. IP 주소는 32비트(v4)의 논리적 주소로 네트워크 간 라우팅에 사용된다. MAC은 홉 단위로 변경되지만 IP는 종단 간 유지되어, MAC은 로컬 전달, IP는 전역 경로 지정 역할을 분담한다.",
      },
      {
        question: "허브(Hub)와 스위치(Switch)의 차이를 설명하시오.",
        answer: "허브는 물리 계층 장비로 수신한 신호를 모든 포트로 단순 복제하여 전달하며 충돌 도메인을 공유한다. 스위치는 데이터 링크 계층 장비로 MAC 주소 테이블을 기반으로 목적지 포트로만 프레임을 전달하여 포트별 충돌 도메인을 분리하고 전이중 통신을 지원한다.",
      },
      {
        question: "이더넷 프레임의 주요 구조(필드)를 설명하시오.",
        answer: "이더넷 프레임은 프리앰블(8바이트, 동기화), 목적지 MAC(6바이트), 출발지 MAC(6바이트), 타입/길이(2바이트, 상위 프로토콜 식별), 페이로드(46~1500바이트), FCS/CRC(4바이트, 오류 검출)로 구성된다.",
      },
      {
        question: "충돌 도메인(Collision Domain)과 브로드캐스트 도메인(Broadcast Domain)의 차이를 설명하시오.",
        answer: "충돌 도메인은 동시 전송 시 충돌이 발생할 수 있는 네트워크 영역이다. 허브는 충돌 도메인을 공유하고, 스위치는 포트별로 분리한다. 브로드캐스트 도메인은 브로드캐스트 프레임이 도달하는 범위이다. 스위치는 하나의 브로드캐스트 도메인을 형성하고, 라우터나 VLAN이 이를 분리한다.",
      },
      {
        question: "스위치의 포워딩 과정에서 프레임 처리 방식(Store-and-Forward, Cut-Through)을 비교하시오.",
        answer: "Store-and-Forward는 프레임 전체를 수신한 뒤 CRC 오류 검사를 하고 전달하여 신뢰성이 높지만 지연이 있다. Cut-Through는 목적지 MAC 주소만 읽은 즉시 전달을 시작하여 지연이 최소화되지만 오류 프레임도 전달될 수 있다. Fragment-Free는 처음 64바이트만 확인하는 절충 방식이다.",
      },
      {
        question: "이더넷에서 최소 프레임 크기가 64바이트로 정해진 이유를 설명하시오.",
        answer: "CSMA/CD에서 충돌을 감지하려면 프레임 전송이 왕복 전파 지연(Round Trip Time) 동안 지속되어야 한다. 10Mbps 이더넷의 최대 네트워크 길이에서 RTT를 고려하면 최소 512비트(64바이트)가 필요하다. 이보다 짧으면 충돌 감지 전에 전송이 완료될 수 있다.",
      },
      {
        question: "VLAN 트렁킹과 IEEE 802.1Q 태깅의 역할을 설명하시오.",
        answer: "트렁크 포트는 여러 VLAN의 트래픽을 하나의 링크로 전달하는 포트이다. 802.1Q는 이더넷 프레임에 4바이트 VLAN 태그(VLAN ID 포함)를 삽입하여 어느 VLAN에 속한 프레임인지 식별한다. 스위치 간 연결에서 VLAN 정보를 유지하며 전달할 수 있게 한다.",
      },
      {
        question: "반이중(Half-Duplex)과 전이중(Full-Duplex) 통신의 차이를 이더넷 관점에서 설명하시오.",
        answer: "반이중은 송수신이 동시에 불가하여 CSMA/CD가 필요하고 충돌이 발생할 수 있다(허브 환경). 전이중은 송수신을 동시에 수행할 수 있어 충돌이 없고 CSMA/CD가 불필요하다(스위치 환경). 전이중은 대역폭을 양방향으로 완전히 활용할 수 있어 실효 처리량이 2배이다.",
      },
      {
        question: "PPP(Point-to-Point Protocol)의 주요 기능과 이더넷과의 차이를 설명하시오.",
        answer: "PPP는 점대점 링크(WAN, 직렬 연결)에서 사용되는 프로토콜로 인증(PAP/CHAP), 오류 감지, IP 주소 할당(NCP), 링크 제어(LCP) 기능을 제공한다. 이더넷은 다중 접속 LAN용으로 MAC 주소 기반 다중 노드 통신을 지원하지만 PPP는 두 노드 간 1:1 통신에 특화되어 있다.",
      },
      {
        question: "지수적 백오프(Exponential Backoff)가 CSMA/CD에서 어떻게 동작하는지 설명하시오.",
        answer: "n번째 충돌 시 {0, 1, ..., 2^n - 1} 범위에서 랜덤 값 K를 선택하고, K × 슬롯 시간만큼 대기 후 재전송한다. 충돌이 반복될수록 대기 범위가 지수적으로 증가하여 충돌 확률을 줄인다. 최대 충돌 횟수(보통 16회)에 도달하면 전송을 포기하고 상위 계층에 오류를 보고한다.",
      },
    ],
    flashcards: [
      {
        question: "MAC 주소란?",
        answer: "네트워크 인터페이스 카드(NIC)에 할당된 48비트 물리적 주소이다. 콜론이나 하이픈으로 구분된 16진수로 표기하며 LAN 내 프레임 전달에 사용된다.",
      },
      {
        question: "ARP(Address Resolution Protocol)란?",
        answer: "같은 네트워크에서 IP 주소를 MAC 주소로 변환하는 프로토콜이다. 브로드캐스트 요청과 유니캐스트 응답으로 동작하며 결과를 ARP 캐시에 저장한다.",
      },
      {
        question: "이더넷(Ethernet)이란?",
        answer: "IEEE 802.3 표준의 유선 LAN 기술이다. CSMA/CD 기반 다중 접속 방식으로, 현재는 전이중 스위칭 환경에서 가장 널리 사용되는 LAN 프로토콜이다.",
      },
      {
        question: "CSMA/CD란?",
        answer: "반송파 감지 다중 접속/충돌 감지 방식이다. 전송 전 채널 감지, 전송 중 충돌 감지, 충돌 시 잼 신호 후 지수적 백오프 대기 후 재전송한다.",
      },
      {
        question: "스위치(Switch)란?",
        answer: "MAC 주소 테이블을 기반으로 프레임을 목적지 포트로만 전달하는 데이터 링크 계층(L2) 장비이다. 포트별 충돌 도메인을 분리하고 전이중 통신을 지원한다.",
      },
      {
        question: "허브(Hub)란?",
        answer: "수신한 전기 신호를 모든 포트로 단순 복제하여 전달하는 물리 계층(L1) 장비이다. 모든 포트가 하나의 충돌 도메인을 공유한다.",
      },
      {
        question: "VLAN(Virtual LAN)이란?",
        answer: "물리적 위치에 관계없이 스위치 포트를 논리적으로 그룹화하여 별도의 브로드캐스트 도메인을 형성하는 기술이다. 보안과 관리 유연성을 제공한다.",
      },
      {
        question: "STP(Spanning Tree Protocol)란?",
        answer: "스위치 네트워크에서 루프를 방지하기 위해 중복 경로의 포트를 블로킹하여 논리적 트리 구조를 만드는 프로토콜이다. IEEE 802.1D 표준이다.",
      },
      {
        question: "충돌 도메인(Collision Domain)이란?",
        answer: "동시 전송 시 신호 충돌이 발생할 수 있는 네트워크 영역이다. 허브는 하나의 충돌 도메인, 스위치는 포트별로 충돌 도메인을 분리한다.",
      },
      {
        question: "브로드캐스트 도메인(Broadcast Domain)이란?",
        answer: "브로드캐스트 프레임이 전달되는 범위이다. 스위치만으로는 분리되지 않으며, 라우터 또는 VLAN으로 분리할 수 있다.",
      },
      {
        question: "프레임(Frame)이란?",
        answer: "데이터 링크 계층의 전송 단위(PDU)이다. 헤더(MAC 주소, 타입), 페이로드(상위 계층 패킷), 트레일러(FCS/CRC 오류 검출)로 구성된다.",
      },
      {
        question: "지수적 백오프(Exponential Backoff)란?",
        answer: "충돌 횟수에 따라 대기 시간 범위를 지수적으로 증가시키는 알고리즘이다. n번째 충돌 시 0~2^n-1 슬롯 중 랜덤 선택하여 대기한다.",
      },
      {
        question: "전이중(Full-Duplex) 통신이란?",
        answer: "송신과 수신을 동시에 수행할 수 있는 통신 방식이다. 스위치 환경에서 지원되며 충돌이 발생하지 않아 CSMA/CD가 불필요하다.",
      },
      {
        question: "반이중(Half-Duplex) 통신이란?",
        answer: "송신과 수신을 동시에 할 수 없어 번갈아 수행하는 통신 방식이다. 허브 환경에서 사용되며 CSMA/CD로 충돌을 관리한다.",
      },
      {
        question: "트렁크 포트(Trunk Port)란?",
        answer: "여러 VLAN의 트래픽을 하나의 링크로 전달하는 스위치 포트이다. 802.1Q 태깅으로 프레임에 VLAN ID를 추가하여 VLAN을 구분한다.",
      },
    ],
  },
};
