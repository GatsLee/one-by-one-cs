import type { QuizDataMap } from "./types";

export const databaseQuizzes: QuizDataMap = {
  "04-database/01-sql-basics": {
    quizzes: [
      {
        question:
          "employees 테이블에서 department가 'Engineering'이고 salary가 5000 이상인 직원의 이름과 급여를 조회하는 SQL을 작성하시오.",
        answer:
          "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary >= 5000;",
      },
      {
        question:
          "INNER JOIN과 LEFT JOIN의 차이점을 설명하시오.",
        answer:
          "INNER JOIN은 두 테이블에서 조인 조건을 만족하는 행만 반환한다. LEFT JOIN은 왼쪽 테이블의 모든 행을 반환하고, 오른쪽 테이블에 일치하는 행이 없으면 NULL로 채운다.",
      },
      {
        question:
          "GROUP BY와 HAVING의 차이점은 무엇인가?",
        answer:
          "GROUP BY는 특정 컬럼 기준으로 행을 그룹화하며, HAVING은 그룹화된 결과에 조건을 적용한다. WHERE는 그룹화 전 개별 행에 조건을 적용하지만, HAVING은 집계 함수 결과에 조건을 적용할 수 있다.",
      },
      {
        question:
          "orders 테이블에서 고객별 주문 수가 3건 이상인 고객의 customer_id와 주문 수를 조회하는 SQL을 작성하시오.",
        answer:
          "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) >= 3;",
      },
      {
        question:
          "DDL, DML, DCL 각각의 의미와 대표적인 명령어를 하나씩 제시하시오.",
        answer:
          "DDL(Data Definition Language)은 스키마 정의 언어로 CREATE, ALTER, DROP 등이 있다. DML(Data Manipulation Language)은 데이터 조작 언어로 SELECT, INSERT, UPDATE, DELETE가 있다. DCL(Data Control Language)은 권한 제어 언어로 GRANT, REVOKE가 있다.",
      },
      {
        question:
          "서브쿼리(Subquery)란 무엇이며, WHERE 절에서 서브쿼리를 사용하는 예시를 작성하시오.",
        answer:
          "서브쿼리는 다른 SQL 문 내부에 포함된 SELECT 문이다. 예시: SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE location = 'Seoul');",
      },
      {
        question:
          "기본키(Primary Key)와 외래키(Foreign Key)의 차이를 설명하시오.",
        answer:
          "기본키는 테이블에서 각 행을 고유하게 식별하는 컬럼(또는 컬럼 조합)으로 NULL을 허용하지 않는다. 외래키는 다른 테이블의 기본키를 참조하는 컬럼으로, 테이블 간 관계를 정의하며 참조 무결성을 보장한다.",
      },
      {
        question:
          "DISTINCT 키워드의 용도를 설명하고, products 테이블에서 중복 없이 category 목록을 조회하는 SQL을 작성하시오.",
        answer:
          "DISTINCT는 조회 결과에서 중복된 행을 제거한다. SQL: SELECT DISTINCT category FROM products;",
      },
      {
        question:
          "UNION과 UNION ALL의 차이점을 설명하시오.",
        answer:
          "UNION은 두 SELECT 결과를 합치면서 중복 행을 제거한다. UNION ALL은 중복을 제거하지 않고 모든 행을 그대로 합친다. UNION ALL이 중복 제거 과정이 없으므로 성능이 더 좋다.",
      },
      {
        question:
          "LIKE 연산자에서 '%'와 '_' 와일드카드의 차이를 설명하시오.",
        answer:
          "'%'는 0개 이상의 임의 문자와 매칭된다. '_'는 정확히 1개의 임의 문자와 매칭된다. 예를 들어 LIKE 'A%'는 A로 시작하는 모든 문자열, LIKE 'A_'는 A로 시작하는 두 글자 문자열과 매칭된다.",
      },
      {
        question:
          "집계 함수 COUNT(*)와 COUNT(column_name)의 차이는 무엇인가?",
        answer:
          "COUNT(*)는 NULL을 포함한 모든 행의 수를 세고, COUNT(column_name)은 해당 컬럼이 NULL이 아닌 행의 수만 센다.",
      },
      {
        question:
          "employees 테이블에서 부서별 평균 급여를 구하고 평균 급여가 높은 순으로 정렬하는 SQL을 작성하시오.",
        answer:
          "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC;",
      },
      {
        question:
          "RIGHT JOIN은 어떤 경우에 사용하며, LEFT JOIN으로 대체할 수 있는가?",
        answer:
          "RIGHT JOIN은 오른쪽 테이블의 모든 행을 반환하고 왼쪽 테이블에서 일치하는 행이 없으면 NULL을 채운다. 테이블 순서를 바꾸면 LEFT JOIN으로 동일한 결과를 얻을 수 있으므로 대체 가능하다.",
      },
      {
        question:
          "FULL OUTER JOIN의 동작 방식을 설명하시오.",
        answer:
          "FULL OUTER JOIN은 양쪽 테이블의 모든 행을 반환한다. 한쪽에만 존재하는 행은 반대쪽 컬럼이 NULL로 채워진다. LEFT JOIN과 RIGHT JOIN의 결과를 합친 것과 같다.",
      },
      {
        question:
          "products 테이블에서 가격이 가장 높은 상품의 이름과 가격을 조회하는 SQL을 서브쿼리를 사용하여 작성하시오.",
        answer:
          "SELECT name, price FROM products WHERE price = (SELECT MAX(price) FROM products);",
      },
    ],
    flashcards: [
      {
        question: "SELECT 문의 기본 실행 순서는?",
        answer:
          "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      },
      {
        question: "INNER JOIN이란?",
        answer:
          "두 테이블에서 조인 조건을 만족하는 행만 반환하는 조인 방식",
      },
      {
        question: "LEFT JOIN이란?",
        answer:
          "왼쪽 테이블의 모든 행을 반환하고, 오른쪽 테이블에 매칭되는 행이 없으면 NULL을 채우는 조인",
      },
      {
        question: "GROUP BY의 역할은?",
        answer:
          "지정한 컬럼의 값이 같은 행들을 하나의 그룹으로 묶어 집계 함수를 적용할 수 있게 한다",
      },
      {
        question: "HAVING과 WHERE의 차이는?",
        answer:
          "WHERE는 그룹화 전 개별 행을 필터링하고, HAVING은 GROUP BY 이후 그룹 단위로 필터링한다",
      },
      {
        question: "DDL(Data Definition Language)이란?",
        answer:
          "데이터베이스 구조를 정의하는 언어. CREATE, ALTER, DROP, TRUNCATE 등이 있다",
      },
      {
        question: "DML(Data Manipulation Language)이란?",
        answer:
          "데이터를 조작하는 언어. SELECT, INSERT, UPDATE, DELETE가 있다",
      },
      {
        question: "DCL(Data Control Language)이란?",
        answer:
          "데이터 접근 권한을 제어하는 언어. GRANT, REVOKE가 있다",
      },
      {
        question: "기본키(Primary Key)의 특성은?",
        answer:
          "테이블 내 각 행을 고유하게 식별하며, NULL을 허용하지 않고, 테이블당 하나만 존재한다",
      },
      {
        question: "외래키(Foreign Key)의 역할은?",
        answer:
          "다른 테이블의 기본키를 참조하여 테이블 간 관계를 정의하고 참조 무결성을 보장한다",
      },
      {
        question: "서브쿼리(Subquery)란?",
        answer:
          "SQL 문 내부에 포함된 또 다른 SELECT 문으로, WHERE, FROM, SELECT 절 등에서 사용 가능하다",
      },
      {
        question: "COUNT, SUM, AVG, MAX, MIN은 어떤 종류의 함수인가?",
        answer:
          "집계 함수(Aggregate Function)로, 여러 행의 값을 하나의 결과로 요약한다",
      },
      {
        question: "DISTINCT의 역할은?",
        answer: "SELECT 결과에서 중복된 행을 제거하여 고유한 값만 반환한다",
      },
      {
        question: "UNION과 UNION ALL의 차이는?",
        answer:
          "UNION은 중복을 제거하고 합치고, UNION ALL은 중복을 포함하여 모든 행을 합친다",
      },
      {
        question: "ORDER BY의 기본 정렬 순서는?",
        answer:
          "기본값은 ASC(오름차순)이며, DESC를 명시하면 내림차순으로 정렬된다",
      },
    ],
  },

  "04-database/02-normalization-indexing": {
    quizzes: [
      {
        question:
          "제1정규형(1NF)의 조건은 무엇인가?",
        answer:
          "모든 컬럼의 값이 원자값(Atomic Value)이어야 한다. 즉, 하나의 셀에 여러 값이나 반복 그룹이 들어 있으면 안 된다.",
      },
      {
        question:
          "제2정규형(2NF)을 만족하려면 어떤 조건이 추가로 필요한가?",
        answer:
          "1NF를 만족하면서 기본키의 일부 컬럼에만 종속되는 부분 함수 종속성(Partial Dependency)이 제거되어야 한다. 즉, 모든 비키 속성이 기본키 전체에 완전 함수 종속되어야 한다.",
      },
      {
        question:
          "제3정규형(3NF)은 2NF에 어떤 조건을 추가한 것인가?",
        answer:
          "2NF를 만족하면서 이행적 함수 종속성(Transitive Dependency)이 제거된 상태이다. 비키 속성이 다른 비키 속성을 통해 기본키에 간접적으로 종속되면 안 된다.",
      },
      {
        question:
          "BCNF(Boyce-Codd Normal Form)와 3NF의 차이를 설명하시오.",
        answer:
          "3NF는 비키 속성이 후보키에 이행적으로 종속되지 않으면 충족되지만, BCNF는 모든 결정자(Determinant)가 후보키여야 한다. BCNF가 3NF보다 더 엄격한 정규형이다.",
      },
      {
        question:
          "삽입 이상(Insertion Anomaly)이란 무엇인가? 예를 들어 설명하시오.",
        answer:
          "데이터를 삽입할 때 불필요한 정보까지 함께 입력해야 하는 문제이다. 예를 들어 학생-과목 테이블에서 새 과목을 등록하려면 아직 수강생이 없어도 학생 정보를 함께 넣어야 하는 경우가 해당된다.",
      },
      {
        question:
          "삭제 이상(Deletion Anomaly)과 갱신 이상(Update Anomaly)을 각각 설명하시오.",
        answer:
          "삭제 이상은 특정 데이터를 삭제할 때 의도치 않게 다른 유용한 데이터까지 삭제되는 문제이다. 갱신 이상은 중복 데이터 중 일부만 수정되어 데이터 불일치가 발생하는 문제이다.",
      },
      {
        question:
          "반정규화(Denormalization)를 수행하는 이유는 무엇인가?",
        answer:
          "정규화된 테이블은 조인이 많아져 읽기 성능이 저하될 수 있다. 반정규화는 의도적으로 중복을 허용하여 조인 횟수를 줄이고 조회 성능을 향상시키기 위해 수행한다. 대신 데이터 일관성 관리 비용이 증가한다.",
      },
      {
        question:
          "B-Tree 인덱스의 구조와 장점을 설명하시오.",
        answer:
          "B-Tree는 균형 트리 구조로 루트, 내부 노드, 리프 노드로 구성된다. 범위 검색과 정렬된 데이터 접근에 효율적이며, 삽입/삭제 시에도 균형을 유지하여 O(log N)의 탐색 성능을 보장한다.",
      },
      {
        question:
          "해시 인덱스는 어떤 경우에 적합하고, 어떤 경우에 부적합한가?",
        answer:
          "해시 인덱스는 등호(=) 비교에 O(1)로 매우 빠르므로 정확한 값 검색에 적합하다. 그러나 범위 검색(>, <, BETWEEN), 정렬(ORDER BY), 부분 일치(LIKE)에는 사용할 수 없어 부적합하다.",
      },
      {
        question:
          "클러스터드 인덱스(Clustered Index)와 논클러스터드 인덱스(Non-Clustered Index)의 차이를 설명하시오.",
        answer:
          "클러스터드 인덱스는 실제 데이터 행을 인덱스 키 순서대로 물리적으로 정렬하여 저장하며 테이블당 하나만 생성 가능하다. 논클러스터드 인덱스는 별도의 인덱스 구조에 데이터 위치 포인터를 저장하며 여러 개 생성 가능하다.",
      },
      {
        question:
          "복합 인덱스(Composite Index)에서 컬럼 순서가 중요한 이유를 설명하시오.",
        answer:
          "복합 인덱스는 왼쪽 컬럼부터 순서대로 정렬된다(Leftmost Prefix Rule). 인덱스 (A, B, C)에서 A만 사용하거나 A, B를 사용하는 쿼리는 인덱스를 활용할 수 있지만, B만 단독으로 조건에 사용하면 인덱스를 활용할 수 없다.",
      },
      {
        question:
          "인덱스를 생성하면 항상 성능이 좋아지는가? 그렇지 않다면 이유를 설명하시오.",
        answer:
          "아니다. 인덱스는 조회 성능을 향상시키지만, INSERT/UPDATE/DELETE 시 인덱스도 함께 갱신해야 하므로 쓰기 성능이 저하된다. 또한 인덱스는 추가 저장 공간을 차지하며, 선택도가 낮은 컬럼에 인덱스를 생성하면 오히려 풀 스캔보다 느릴 수 있다.",
      },
      {
        question:
          "EXPLAIN 명령어의 용도와 확인할 수 있는 정보를 설명하시오.",
        answer:
          "EXPLAIN은 SQL 쿼리의 실행 계획(Execution Plan)을 보여주는 명령어이다. 인덱스 사용 여부, 스캔 방식(Full Table Scan, Index Scan 등), 예상 행 수, 조인 순서 등을 확인하여 쿼리 최적화에 활용한다.",
      },
      {
        question:
          "함수 종속성(Functional Dependency)이란 무엇인가? 예시를 들어 설명하시오.",
        answer:
          "속성 X의 값이 결정되면 속성 Y의 값도 유일하게 결정되는 관계를 X → Y로 표기하며 함수 종속성이라 한다. 예를 들어 학번 → 학생이름에서 학번이 결정되면 학생이름이 유일하게 결정된다.",
      },
      {
        question:
          "인덱스 선택 시 고려해야 할 기준을 3가지 이상 제시하시오.",
        answer:
          "1) 카디널리티(선택도)가 높은 컬럼 선택 2) WHERE, JOIN, ORDER BY에 자주 사용되는 컬럼 3) 쓰기 빈도가 낮고 읽기 빈도가 높은 테이블 4) 데이터 크기가 큰 테이블에 우선 적용 5) 복합 인덱스 시 선택도가 높은 컬럼을 앞에 배치",
      },
    ],
    flashcards: [
      {
        question: "제1정규형(1NF)의 핵심 조건은?",
        answer: "모든 컬럼의 값이 원자값(더 이상 분해할 수 없는 값)이어야 한다",
      },
      {
        question: "제2정규형(2NF)의 핵심 조건은?",
        answer:
          "1NF를 만족하면서 부분 함수 종속성이 제거된 상태 (모든 비키 속성이 기본키 전체에 완전 종속)",
      },
      {
        question: "제3정규형(3NF)의 핵심 조건은?",
        answer:
          "2NF를 만족하면서 이행적 함수 종속성이 제거된 상태",
      },
      {
        question: "BCNF란?",
        answer:
          "모든 결정자가 후보키인 정규형. 3NF보다 엄격한 조건을 가진다",
      },
      {
        question: "이상 현상(Anomaly)의 3가지 유형은?",
        answer:
          "삽입 이상(불필요한 데이터 강제 삽입), 삭제 이상(유용한 데이터 함께 삭제), 갱신 이상(일부만 수정 시 불일치)",
      },
      {
        question: "함수 종속성(Functional Dependency)이란?",
        answer:
          "속성 X의 값이 결정되면 속성 Y의 값이 유일하게 결정되는 관계 (X → Y)",
      },
      {
        question: "반정규화(Denormalization)란?",
        answer:
          "성능 향상을 위해 의도적으로 중복을 허용하여 정규화 수준을 낮추는 것",
      },
      {
        question: "B-Tree 인덱스의 탐색 시간 복잡도는?",
        answer: "O(log N) — 균형 트리 구조이므로 항상 로그 시간에 탐색 가능",
      },
      {
        question: "해시 인덱스의 특징은?",
        answer:
          "등호(=) 검색에 O(1)로 매우 빠르지만, 범위 검색이나 정렬에는 사용 불가",
      },
      {
        question: "클러스터드 인덱스란?",
        answer:
          "데이터 행을 인덱스 키 순서대로 물리적으로 정렬하여 저장하는 인덱스. 테이블당 1개만 가능",
      },
      {
        question: "논클러스터드 인덱스란?",
        answer:
          "별도의 인덱스 구조에 데이터 위치를 가리키는 포인터를 저장하는 인덱스. 여러 개 생성 가능",
      },
      {
        question: "복합 인덱스의 Leftmost Prefix Rule이란?",
        answer:
          "복합 인덱스 (A, B, C)에서 A, (A,B), (A,B,C) 순서로만 인덱스를 활용 가능한 규칙",
      },
      {
        question: "EXPLAIN의 용도는?",
        answer:
          "쿼리 실행 계획을 확인하여 인덱스 사용 여부, 스캔 방식, 예상 비용 등을 분석하는 명령어",
      },
      {
        question: "카디널리티(Cardinality)란?",
        answer:
          "컬럼에 포함된 고유 값의 수. 카디널리티가 높을수록 인덱스 효율이 좋다",
      },
      {
        question: "인덱스가 쓰기 성능에 미치는 영향은?",
        answer:
          "INSERT/UPDATE/DELETE 시 인덱스도 함께 갱신해야 하므로 쓰기 성능이 저하된다",
      },
    ],
  },

  "04-database/03-transaction-acid": {
    quizzes: [
      {
        question:
          "ACID의 각 속성을 한 문장씩 설명하시오.",
        answer:
          "Atomicity(원자성): 트랜잭션은 전부 수행되거나 전부 취소된다. Consistency(일관성): 트랜잭션 전후로 데이터베이스가 일관된 상태를 유지한다. Isolation(격리성): 동시에 실행되는 트랜잭션이 서로 간섭하지 않는다. Durability(지속성): 커밋된 트랜잭션의 결과는 영구적으로 보존된다.",
      },
      {
        question:
          "Dirty Read란 무엇이며, 어떤 격리 수준에서 발생하는가?",
        answer:
          "Dirty Read는 다른 트랜잭션이 아직 커밋하지 않은 데이터를 읽는 현상이다. READ UNCOMMITTED 격리 수준에서 발생하며, READ COMMITTED 이상에서는 방지된다.",
      },
      {
        question:
          "Non-Repeatable Read와 Phantom Read의 차이를 설명하시오.",
        answer:
          "Non-Repeatable Read는 같은 행을 두 번 읽었을 때 다른 트랜잭션의 UPDATE/DELETE로 인해 값이 달라지는 현상이다. Phantom Read는 같은 조건으로 두 번 조회했을 때 다른 트랜잭션의 INSERT로 인해 이전에 없던 새로운 행이 나타나는 현상이다.",
      },
      {
        question:
          "4가지 트랜잭션 격리 수준을 낮은 것부터 나열하고, 각각 방지하는 문제를 설명하시오.",
        answer:
          "1) READ UNCOMMITTED: 아무것도 방지 안 함 2) READ COMMITTED: Dirty Read 방지 3) REPEATABLE READ: Dirty Read + Non-Repeatable Read 방지 4) SERIALIZABLE: Dirty Read + Non-Repeatable Read + Phantom Read 모두 방지",
      },
      {
        question:
          "공유 락(Shared Lock)과 배타 락(Exclusive Lock)의 차이를 설명하시오.",
        answer:
          "공유 락(S-Lock)은 데이터를 읽을 때 사용하며, 여러 트랜잭션이 동시에 공유 락을 획득할 수 있다. 배타 락(X-Lock)은 데이터를 수정할 때 사용하며, 하나의 트랜잭션만 획득 가능하고 다른 모든 락과 호환되지 않는다.",
      },
      {
        question:
          "데드락(Deadlock)이란 무엇이며, 해결 방법을 2가지 이상 제시하시오.",
        answer:
          "데드락은 두 개 이상의 트랜잭션이 서로가 가진 락을 기다리면서 무한 대기하는 상태이다. 해결 방법: 1) 타임아웃 설정으로 일정 시간 후 트랜잭션 롤백 2) 데드락 감지(Wait-for Graph)로 순환 발견 시 하나를 롤백 3) 락 순서를 일정하게 정하여 예방",
      },
      {
        question:
          "MVCC(Multi-Version Concurrency Control)의 동작 원리와 장점을 설명하시오.",
        answer:
          "MVCC는 데이터의 여러 버전을 유지하여 읽기 작업이 쓰기 작업을 블로킹하지 않게 한다. 각 트랜잭션은 시작 시점의 스냅샷을 읽으므로, 읽기-쓰기 간 락 경합 없이 동시성을 높일 수 있다.",
      },
      {
        question:
          "WAL(Write-Ahead Logging)이란 무엇이며 왜 필요한가?",
        answer:
          "WAL은 데이터를 실제 디스크에 쓰기 전에 로그를 먼저 기록하는 기법이다. 시스템 장애 발생 시 로그를 통해 커밋된 트랜잭션을 Redo하고, 미완료 트랜잭션을 Undo하여 데이터 일관성과 지속성(Durability)을 보장한다.",
      },
      {
        question:
          "2PC(Two-Phase Commit)의 두 단계를 설명하시오.",
        answer:
          "Prepare 단계: 코디네이터가 모든 참여자에게 커밋 준비를 요청하고, 각 참여자는 준비 완료(또는 실패) 응답을 보낸다. Commit 단계: 모든 참여자가 준비 완료하면 코디네이터가 커밋 명령을 보내고, 하나라도 실패하면 전체 롤백한다.",
      },
      {
        question:
          "은행 계좌 이체 시나리오에서 원자성(Atomicity)이 보장되지 않으면 어떤 문제가 발생하는가?",
        answer:
          "A 계좌에서 출금은 성공했지만 B 계좌에 입금이 실패하면, 돈이 사라지는 문제가 발생한다. 원자성이 보장되면 두 연산이 모두 성공하거나 모두 취소되므로 이런 문제를 방지한다.",
      },
      {
        question:
          "READ COMMITTED 격리 수준에서 발생할 수 있는 문제는 무엇인가?",
        answer:
          "Non-Repeatable Read와 Phantom Read가 발생할 수 있다. 같은 트랜잭션 내에서 동일한 데이터를 두 번 읽었을 때 그 사이에 다른 트랜잭션이 커밋하면 값이 달라질 수 있다.",
      },
      {
        question:
          "SERIALIZABLE 격리 수준의 장단점을 설명하시오.",
        answer:
          "장점: 모든 동시성 문제(Dirty Read, Non-Repeatable Read, Phantom Read)를 완전히 방지하여 가장 높은 데이터 정합성을 보장한다. 단점: 락 경합이 많아 동시성이 크게 떨어지고 데드락 발생 가능성이 높아 성능이 가장 낮다.",
      },
      {
        question:
          "MySQL InnoDB의 기본 격리 수준은 무엇이며, Phantom Read를 어떻게 처리하는가?",
        answer:
          "기본 격리 수준은 REPEATABLE READ이다. InnoDB는 MVCC와 Next-Key Lock(Gap Lock + Record Lock)을 사용하여 REPEATABLE READ에서도 대부분의 Phantom Read를 방지한다.",
      },
      {
        question:
          "낙관적 동시성 제어(Optimistic Concurrency Control)와 비관적 동시성 제어(Pessimistic Concurrency Control)의 차이를 설명하시오.",
        answer:
          "비관적 제어는 충돌이 발생할 것으로 가정하고 데이터 접근 시 락을 먼저 건다. 낙관적 제어는 충돌이 드물다고 가정하고 락 없이 작업 후 커밋 시점에 충돌을 감지하여 롤백한다. 읽기가 많은 환경에서는 낙관적 제어가 유리하다.",
      },
      {
        question:
          "Redo와 Undo 로그의 차이를 설명하시오.",
        answer:
          "Redo 로그는 커밋된 트랜잭션의 변경 사항을 재적용하여 지속성을 보장한다. Undo 로그는 미완료 트랜잭션의 변경 사항을 되돌려 원자성을 보장한다. 장애 복구 시 Redo로 커밋된 것을 복구하고 Undo로 미완료된 것을 롤백한다.",
      },
    ],
    flashcards: [
      {
        question: "Atomicity(원자성)란?",
        answer:
          "트랜잭션의 모든 연산이 전부 수행되거나 전부 취소되는 성질 (All or Nothing)",
      },
      {
        question: "Consistency(일관성)란?",
        answer:
          "트랜잭션 수행 전후로 데이터베이스가 일관된 상태(제약조건 등)를 유지하는 성질",
      },
      {
        question: "Isolation(격리성)란?",
        answer:
          "동시에 실행되는 트랜잭션들이 서로의 중간 결과에 영향을 받지 않는 성질",
      },
      {
        question: "Durability(지속성)란?",
        answer:
          "커밋이 완료된 트랜잭션의 결과는 시스템 장애가 발생해도 영구적으로 보존되는 성질",
      },
      {
        question: "Dirty Read란?",
        answer:
          "다른 트랜잭션이 아직 커밋하지 않은 변경 데이터를 읽는 현상",
      },
      {
        question: "Non-Repeatable Read란?",
        answer:
          "같은 행을 두 번 읽었을 때 다른 트랜잭션의 수정/삭제로 값이 달라지는 현상",
      },
      {
        question: "Phantom Read란?",
        answer:
          "같은 조건으로 두 번 조회했을 때 다른 트랜잭션의 삽입으로 새로운 행이 나타나는 현상",
      },
      {
        question: "공유 락(S-Lock)이란?",
        answer:
          "읽기 시 사용하는 락. 여러 트랜잭션이 동시에 공유 락을 획득 가능하나, 배타 락과는 호환 불가",
      },
      {
        question: "배타 락(X-Lock)이란?",
        answer:
          "쓰기 시 사용하는 락. 하나의 트랜잭션만 획득 가능하며, 다른 모든 락과 호환 불가",
      },
      {
        question: "데드락(Deadlock)이란?",
        answer:
          "두 개 이상의 트랜잭션이 서로가 보유한 락을 기다리며 무한 대기하는 상태",
      },
      {
        question: "MVCC란?",
        answer:
          "Multi-Version Concurrency Control. 데이터의 여러 버전을 유지하여 읽기와 쓰기가 서로를 블로킹하지 않게 하는 기법",
      },
      {
        question: "WAL(Write-Ahead Logging)이란?",
        answer:
          "데이터 변경 전에 로그를 먼저 디스크에 기록하여, 장애 시 복구를 보장하는 기법",
      },
      {
        question: "2PC(Two-Phase Commit)란?",
        answer:
          "분산 트랜잭션에서 모든 노드의 일관성을 보장하기 위한 프로토콜. Prepare 단계와 Commit 단계로 구성",
      },
      {
        question: "트랜잭션 격리 수준 4가지는? (낮은 순서)",
        answer:
          "READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE",
      },
      {
        question: "낙관적 동시성 제어 vs 비관적 동시성 제어?",
        answer:
          "낙관적: 충돌이 드물다 가정, 커밋 시 검증. 비관적: 충돌이 잦다 가정, 사전에 락 획득",
      },
    ],
  },

  "04-database/04-nosql-distributed": {
    quizzes: [
      {
        question:
          "NoSQL의 4가지 주요 유형을 나열하고 각각의 특징을 설명하시오.",
        answer:
          "1) Key-Value: 키와 값의 단순한 쌍으로 저장 (Redis) 2) Document: JSON/BSON 형태의 문서로 저장, 유연한 스키마 (MongoDB) 3) Column-Family: 행마다 다른 컬럼을 가질 수 있는 컬럼 기반 저장 (Cassandra) 4) Graph: 노드와 엣지로 관계를 표현, 관계 탐색에 특화 (Neo4j)",
      },
      {
        question:
          "CAP 정리(CAP Theorem)를 설명하고, 분산 시스템에서 왜 3가지를 동시에 만족할 수 없는지 서술하시오.",
        answer:
          "CAP 정리는 Consistency(일관성), Availability(가용성), Partition Tolerance(분할 내성) 중 최대 2가지만 동시에 만족할 수 있다는 정리이다. 네트워크 파티션은 분산 시스템에서 불가피하므로 P를 포기할 수 없고, 결국 C와 A 중 하나를 선택해야 한다.",
      },
      {
        question:
          "BASE 속성이란 무엇이며, ACID와 어떤 차이가 있는가?",
        answer:
          "BASE는 Basically Available(기본적 가용성), Soft state(유연한 상태), Eventually consistent(최종 일관성)의 약자이다. ACID가 강한 일관성과 트랜잭션 보장을 추구하는 반면, BASE는 가용성을 우선하고 일시적 불일치를 허용하되 최종적으로 일관성을 달성한다.",
      },
      {
        question:
          "샤딩(Sharding)이란 무엇이며, 수평 분할과 어떤 관계인가?",
        answer:
          "샤딩은 데이터를 여러 서버(샤드)에 분산하여 저장하는 수평 분할 기법이다. 각 샤드는 전체 데이터의 일부를 담당하여 읽기/쓰기 부하를 분산시킨다. 샤드 키를 기준으로 데이터가 어떤 샤드에 저장될지 결정한다.",
      },
      {
        question:
          "레플리케이션(Replication)의 목적과 주요 방식 2가지를 설명하시오.",
        answer:
          "레플리케이션은 데이터의 복사본을 여러 노드에 유지하여 가용성과 읽기 성능을 향상시킨다. 1) 마스터-슬레이브: 쓰기는 마스터에서, 읽기는 슬레이브에서 처리 2) 마스터-마스터: 모든 노드에서 읽기/쓰기 가능하지만 충돌 해결이 필요하다.",
      },
      {
        question:
          "일관성 해싱(Consistent Hashing)이란 무엇이며, 일반 해싱 대비 장점은 무엇인가?",
        answer:
          "일관성 해싱은 해시 링 위에 노드와 데이터를 배치하여, 노드 추가/제거 시 전체 키의 재분배 없이 인접한 일부 키만 이동시키는 방식이다. 일반 해싱(key % N)은 노드 수 변경 시 거의 모든 키가 재배치되지만, 일관성 해싱은 최소한의 재배치만 발생한다.",
      },
      {
        question:
          "MongoDB, Redis, Cassandra의 주요 용도와 데이터 모델을 각각 비교하시오.",
        answer:
          "MongoDB: 문서형 DB, JSON 형태 저장, 유연한 스키마로 웹/앱 백엔드에 적합. Redis: Key-Value DB, 인메모리 저장, 캐시/세션/실시간 처리에 적합. Cassandra: Column-Family DB, 분산/대용량 쓰기에 최적화, 시계열/로그 데이터에 적합.",
      },
      {
        question:
          "SQL 데이터베이스 대신 NoSQL을 선택해야 하는 상황을 3가지 제시하시오.",
        answer:
          "1) 스키마가 자주 변경되거나 비정형 데이터를 다루는 경우 2) 수평 확장이 필요한 대규모 분산 환경 3) 높은 쓰기 처리량이 요구되는 경우 (로그, IoT 데이터 등)",
      },
      {
        question:
          "NoSQL 대신 SQL을 선택해야 하는 상황을 3가지 제시하시오.",
        answer:
          "1) 복잡한 조인과 관계가 중요한 경우 2) ACID 트랜잭션이 필수인 금융/결제 시스템 3) 데이터 무결성과 일관성이 최우선인 경우",
      },
      {
        question:
          "CAP 정리에서 CP 시스템과 AP 시스템의 차이를 예시 시스템과 함께 설명하시오.",
        answer:
          "CP 시스템은 일관성과 분할 내성을 보장하되 가용성을 희생한다. 네트워크 파티션 시 일부 요청이 실패할 수 있다(예: HBase, MongoDB). AP 시스템은 가용성과 분할 내성을 보장하되 일관성을 느슨하게 한다. 항상 응답하지만 최신 데이터가 아닐 수 있다(예: Cassandra, DynamoDB).",
      },
      {
        question:
          "샤딩 전략 중 범위 기반(Range-based)과 해시 기반(Hash-based)의 차이를 설명하시오.",
        answer:
          "범위 기반 샤딩은 키의 범위로 데이터를 분할하여 범위 쿼리에 효율적이지만 핫스팟이 발생할 수 있다. 해시 기반 샤딩은 해시 함수로 균등 분배하여 핫스팟을 방지하지만 범위 쿼리가 비효율적이다.",
      },
      {
        question:
          "분산 트랜잭션에서 발생할 수 있는 문제점과 해결 방법을 설명하시오.",
        answer:
          "분산 환경에서는 네트워크 지연, 노드 장애로 원자성 보장이 어렵다. 해결 방법: 1) 2PC(Two-Phase Commit)로 분산 커밋 보장 2) Saga 패턴으로 보상 트랜잭션을 통한 최종 일관성 달성 3) 이벤트 소싱과 CQRS 패턴 활용",
      },
      {
        question:
          "최종 일관성(Eventual Consistency)이란 무엇이며, 어떤 상황에서 적합한가?",
        answer:
          "최종 일관성은 업데이트 후 일정 시간이 지나면 모든 복제본이 동일한 상태에 도달하는 일관성 모델이다. 실시간 일관성이 필수가 아닌 소셜 미디어 피드, 좋아요 수, DNS 등에 적합하다.",
      },
      {
        question:
          "Redis가 캐시로 널리 사용되는 이유를 3가지 이상 설명하시오.",
        answer:
          "1) 인메모리 저장으로 매우 빠른 읽기/쓰기 속도(마이크로초 단위) 2) 다양한 자료구조 지원(String, List, Set, Hash, Sorted Set) 3) TTL 설정으로 자동 만료 지원 4) Pub/Sub, Lua 스크립팅 등 부가 기능 5) 단순한 Key-Value 모델로 사용이 간편",
      },
      {
        question:
          "Graph DB가 RDBMS보다 유리한 시나리오를 구체적으로 설명하시오.",
        answer:
          "소셜 네트워크의 친구 추천, 최단 경로 탐색, 사기 탐지, 추천 시스템 등 관계 탐색이 핵심인 경우에 유리하다. RDBMS에서 다단계 조인이 필요한 쿼리를 Graph DB는 엣지 순회로 효율적으로 처리하여 깊은 관계 탐색 성능이 월등히 좋다.",
      },
    ],
    flashcards: [
      {
        question: "NoSQL의 4가지 유형은?",
        answer:
          "Key-Value, Document, Column-Family, Graph",
      },
      {
        question: "CAP 정리란?",
        answer:
          "분산 시스템에서 Consistency, Availability, Partition Tolerance 중 최대 2가지만 동시에 보장 가능하다는 정리",
      },
      {
        question: "BASE의 약자와 의미는?",
        answer:
          "Basically Available(기본적 가용성), Soft state(유연한 상태), Eventually consistent(최종 일관성)",
      },
      {
        question: "샤딩(Sharding)이란?",
        answer:
          "데이터를 여러 서버(샤드)에 수평 분할하여 분산 저장하는 기법",
      },
      {
        question: "레플리케이션(Replication)이란?",
        answer:
          "데이터의 복사본을 여러 노드에 유지하여 가용성과 읽기 성능을 높이는 기법",
      },
      {
        question: "일관성 해싱(Consistent Hashing)의 핵심 장점은?",
        answer:
          "노드 추가/제거 시 최소한의 키만 재배치되어 대규모 재분배를 방지한다",
      },
      {
        question: "MongoDB의 특징은?",
        answer:
          "문서형 NoSQL DB, BSON(JSON) 형태 저장, 유연한 스키마, 수평 확장 지원",
      },
      {
        question: "Redis의 특징은?",
        answer:
          "인메모리 Key-Value DB, 초고속 읽기/쓰기, 다양한 자료구조 지원, 캐시/세션 관리에 최적",
      },
      {
        question: "Cassandra의 특징은?",
        answer:
          "Column-Family DB, 높은 쓰기 처리량, 선형 확장, 마스터리스 아키텍처, 최종 일관성",
      },
      {
        question: "CP 시스템이란?",
        answer:
          "CAP에서 일관성(C)과 분할 내성(P)을 보장하고, 네트워크 파티션 시 가용성을 희생하는 시스템",
      },
      {
        question: "AP 시스템이란?",
        answer:
          "CAP에서 가용성(A)과 분할 내성(P)을 보장하고, 일관성을 느슨하게 허용하는 시스템",
      },
      {
        question: "최종 일관성(Eventual Consistency)이란?",
        answer:
          "업데이트 후 일정 시간이 지나면 모든 복제본이 동일한 상태에 도달하는 일관성 모델",
      },
      {
        question: "Saga 패턴이란?",
        answer:
          "분산 트랜잭션을 여러 로컬 트랜잭션으로 분리하고, 실패 시 보상 트랜잭션으로 롤백하는 패턴",
      },
      {
        question: "SQL vs NoSQL 선택 기준은?",
        answer:
          "SQL: 복잡한 관계, ACID 필수, 정형 데이터. NoSQL: 유연한 스키마, 수평 확장, 대규모 비정형 데이터",
      },
      {
        question: "핫스팟(Hotspot)이란?",
        answer:
          "샤딩에서 특정 샤드에 트래픽이 집중되는 현상. 불균등한 데이터 분배나 특정 키에 접근이 몰릴 때 발생",
      },
    ],
  },

  "04-database/05-er-modeling": {
    quizzes: [
      {
        question:
          "ER 다이어그램에서 엔티티, 속성, 관계를 각각 어떤 도형으로 표기하는가?",
        answer:
          "엔티티는 직사각형, 속성은 타원, 관계는 마름모로 표기한다. 키 속성은 밑줄을 긋고, 다중값 속성은 이중 타원, 유도 속성은 점선 타원으로 표기한다.",
      },
      {
        question:
          "약한 엔티티(Weak Entity)의 특성을 설명하고, ER 다이어그램에서 어떻게 표기하는가?",
        answer:
          "약한 엔티티는 자체적인 키 속성이 없어 소유자(강한) 엔티티의 키에 의존하여 식별되는 엔티티이다. 이중 직사각형으로 표기하며, 소유자 엔티티와의 관계는 이중 마름모로 표기한다. 부분 키(Partial Key)는 점선 밑줄로 표시한다.",
      },
      {
        question:
          "M:N 관계를 릴레이션으로 매핑할 때 어떻게 변환하는가?",
        answer:
          "M:N 관계는 별도의 연결 테이블(Junction Table)을 생성하여 매핑한다. 연결 테이블은 양쪽 엔티티의 기본키를 외래키로 포함하며, 이 두 외래키의 조합이 연결 테이블의 기본키가 된다. 관계 자체에 속성이 있으면 연결 테이블의 컬럼으로 추가한다.",
      },
      {
        question:
          "1:N 관계에서 외래키(FK)는 어느 쪽 테이블에 배치해야 하는가? 그 이유는?",
        answer:
          "외래키는 N쪽(다 쪽) 테이블에 배치한다. 1쪽 테이블에 FK를 두면 하나의 행에 여러 참조값을 넣어야 하므로 1NF를 위반하게 된다. N쪽에 FK를 두면 각 행이 하나의 참조값만 가지므로 정규화를 유지할 수 있다.",
      },
      {
        question:
          "카디널리티 제약(Cardinality Constraint)의 1:1, 1:N, M:N을 각각 설명하시오.",
        answer:
          "1:1은 한쪽 엔티티의 인스턴스가 상대 엔티티의 인스턴스 최대 하나와 연결된다. 1:N은 한쪽의 하나가 상대쪽의 여러 인스턴스와 연결된다. M:N은 양쪽 모두 여러 인스턴스와 연결될 수 있다. 예: 사원-부서(N:1), 학생-과목(M:N), 사원-주민번호(1:1).",
      },
      {
        question:
          "일반화(Generalization)와 특수화(Specialization)의 차이를 설명하시오.",
        answer:
          "일반화는 여러 하위 엔티티의 공통 속성을 추출하여 상위 엔티티를 만드는 상향식(Bottom-Up) 과정이다. 특수화는 상위 엔티티를 특정 기준에 따라 하위 엔티티로 분류하는 하향식(Top-Down) 과정이다. 예: 정규직/계약직을 일반화하면 직원, 직원을 특수화하면 정규직/계약직이 된다.",
      },
      {
        question:
          "복합 속성(Composite Attribute)을 릴레이션으로 변환할 때 어떻게 처리하는가?",
        answer:
          "복합 속성은 구성 요소인 단순 속성들로 분해하여 각각을 별도의 컬럼으로 변환한다. 예를 들어 '주소'라는 복합 속성은 '시', '구', '도로명', '상세주소' 등의 개별 컬럼으로 분해한다. 복합 속성 자체는 컬럼으로 만들지 않는다.",
      },
      {
        question:
          "ER 모델을 릴레이션(테이블)으로 변환하는 기본 규칙 3가지를 설명하시오.",
        answer:
          "1) 강한 엔티티는 독립된 테이블로 변환하고 키 속성이 기본키가 된다. 2) 약한 엔티티는 소유자의 기본키 + 자신의 부분키를 합쳐 복합 기본키로 사용하는 테이블로 변환한다. 3) 1:N 관계는 N쪽에 FK를 추가하고, M:N 관계는 별도의 연결 테이블을 생성한다.",
      },
      {
        question:
          "전체 참여(Total Participation)와 부분 참여(Partial Participation)의 차이를 설명하시오.",
        answer:
          "전체 참여는 엔티티의 모든 인스턴스가 반드시 관계에 참여해야 하는 것으로 이중선으로 표기한다. 부분 참여는 일부 인스턴스만 관계에 참여해도 되는 것으로 단일선으로 표기한다. 예: 모든 직원이 부서에 소속되면 전체 참여, 일부 직원만 프로젝트에 참여하면 부분 참여이다.",
      },
      {
        question:
          "실전 ER 모델링 시 흔히 발생하는 실수를 3가지 이상 제시하시오.",
        answer:
          "1) M:N 관계를 연결 테이블 없이 직접 매핑하려는 실수 2) 약한 엔티티를 강한 엔티티와 구분하지 않아 식별 관계를 놓치는 실수 3) 다중값 속성을 하나의 컬럼에 넣어 1NF를 위반하는 실수 4) 카디널리티를 잘못 분석하여 FK 위치를 잘못 배치하는 실수 5) 유도 속성을 불필요하게 저장하는 실수",
      },
      {
        question:
          "다중값 속성(Multivalued Attribute)을 릴레이션으로 변환할 때 어떻게 처리하는가?",
        answer:
          "다중값 속성은 별도의 테이블로 분리한다. 새 테이블은 원래 엔티티의 기본키를 외래키로 포함하고, 다중값 속성의 값을 컬럼으로 가진다. 예: 직원의 전화번호(다중값)는 직원_전화번호 테이블(직원ID, 전화번호)로 분리한다.",
      },
      {
        question:
          "1:1 관계를 릴레이션으로 변환하는 전략을 설명하시오.",
        answer:
          "1:1 관계는 세 가지 전략이 있다. 1) 전체 참여하는 쪽에 상대방의 PK를 FK로 추가 2) 양쪽 모두 전체 참여이면 하나의 테이블로 합침 3) 별도의 관계 테이블을 생성. 일반적으로 전체 참여 쪽에 FK를 두는 방법이 가장 효율적이다.",
      },
      {
        question:
          "재귀적 관계(Recursive Relationship)란 무엇이며, 예시를 들어 설명하시오.",
        answer:
          "재귀적 관계는 하나의 엔티티가 자기 자신과 관계를 맺는 것이다. 예: 직원 엔티티에서 '관리하다' 관계는 관리자(직원)와 부하(직원) 사이의 관계이다. 변환 시 같은 테이블 내에 자기 자신의 PK를 참조하는 FK(예: manager_id)를 추가한다.",
      },
      {
        question:
          "ISA 관계(일반화/특수화)를 릴레이션으로 변환하는 3가지 방법을 설명하시오.",
        answer:
          "1) 상위-하위 각각 테이블 생성: 상위 테이블에 공통 속성, 하위 테이블에 고유 속성과 상위 PK를 FK로 추가 2) 하위 엔티티만 테이블 생성: 각 하위 테이블에 공통+고유 속성 모두 포함 (전체 특수화일 때 적합) 3) 단일 테이블로 합침: 타입 구분 컬럼 추가, NULL이 많이 발생할 수 있다.",
      },
      {
        question:
          "ER 다이어그램에서 관계에 속성이 있는 경우 어떻게 표현하고 변환하는가?",
        answer:
          "관계의 마름모에 타원으로 속성을 연결하여 표현한다. 변환 시: 1:N 관계면 N쪽 테이블에 관계 속성을 컬럼으로 추가한다. M:N 관계면 연결 테이블에 관계 속성을 컬럼으로 추가한다. 예: 학생-과목(M:N)의 '성적' 속성은 수강 연결 테이블의 컬럼이 된다.",
      },
    ],
    flashcards: [
      {
        question: "엔티티(Entity)란?",
        answer:
          "데이터베이스에서 독립적으로 존재하며 고유하게 식별할 수 있는 객체. ER 다이어그램에서 직사각형으로 표기한다",
      },
      {
        question: "속성(Attribute)이란?",
        answer:
          "엔티티나 관계가 가지는 특성이나 성질. ER 다이어그램에서 타원으로 표기한다",
      },
      {
        question: "관계(Relationship)란?",
        answer:
          "두 개 이상의 엔티티 사이의 연관성. ER 다이어그램에서 마름모로 표기한다",
      },
      {
        question: "카디널리티(Cardinality)란?",
        answer:
          "관계에 참여하는 엔티티 인스턴스의 수적 비율. 1:1, 1:N, M:N 등으로 표현한다",
      },
      {
        question: "약한 엔티티(Weak Entity)란?",
        answer:
          "자체 키 속성이 없어 소유자 엔티티에 의존하여 식별되는 엔티티. 이중 직사각형으로 표기한다",
      },
      {
        question: "키 속성(Key Attribute)이란?",
        answer:
          "엔티티의 각 인스턴스를 고유하게 식별하는 속성. ER 다이어그램에서 밑줄로 표시한다",
      },
      {
        question: "참여 제약(Participation Constraint)이란?",
        answer:
          "엔티티가 관계에 반드시 참여해야 하는지(전체 참여, 이중선) 또는 선택적인지(부분 참여, 단일선)를 나타내는 제약",
      },
      {
        question: "다중값 속성(Multivalued Attribute)이란?",
        answer:
          "하나의 엔티티 인스턴스에 대해 여러 값을 가질 수 있는 속성. 이중 타원으로 표기하며, 변환 시 별도 테이블로 분리한다",
      },
      {
        question: "유도 속성(Derived Attribute)이란?",
        answer:
          "다른 속성이나 관계에서 계산하여 얻을 수 있는 속성. 점선 타원으로 표기하며, 저장하지 않는 것이 일반적이다",
      },
      {
        question: "일반화(Generalization)란?",
        answer:
          "여러 하위 엔티티의 공통 속성을 추출하여 상위 엔티티를 생성하는 상향식(Bottom-Up) 추상화 과정",
      },
      {
        question: "특수화(Specialization)란?",
        answer:
          "상위 엔티티를 특정 기준에 따라 하위 엔티티로 세분화하는 하향식(Top-Down) 과정",
      },
      {
        question: "ER 다이어그램(ER Diagram)이란?",
        answer:
          "엔티티, 속성, 관계를 시각적으로 표현하여 데이터베이스의 개념적 구조를 설계하는 모델링 도구",
      },
      {
        question: "연결 테이블(Junction Table)이란?",
        answer:
          "M:N 관계를 두 개의 1:N 관계로 분해하기 위해 생성하는 중간 테이블. 양쪽 엔티티의 PK를 FK로 포함한다",
      },
      {
        question: "복합 키(Composite Key)란?",
        answer:
          "두 개 이상의 속성을 조합하여 만든 키. 약한 엔티티나 연결 테이블에서 주로 사용된다",
      },
      {
        question: "외래 키(Foreign Key)란?",
        answer:
          "다른 테이블의 기본키를 참조하는 속성. 테이블 간 관계를 구현하고 참조 무결성을 보장한다",
      },
    ],
  },

  "04-database/06-query-optimization": {
    quizzes: [
      {
        question:
          "쿼리 처리의 4단계를 순서대로 설명하시오.",
        answer:
          "1) 파싱(Parsing): SQL 문법을 검사하고 파스 트리를 생성한다. 2) 최적화(Optimization): 여러 실행 계획 중 비용이 가장 낮은 계획을 선택한다. 3) 코드 생성(Code Generation): 선택된 실행 계획을 실행 가능한 코드로 변환한다. 4) 실행(Execution): 실제 데이터에 접근하여 결과를 반환한다.",
      },
      {
        question:
          "Nested Loop Join과 Hash Join의 차이를 비교 설명하시오.",
        answer:
          "Nested Loop Join은 외부 테이블의 각 행에 대해 내부 테이블을 반복 탐색하며, 소규모 데이터나 인덱스가 있을 때 효율적이다. Hash Join은 작은 테이블로 해시 테이블을 빌드하고 큰 테이블을 탐색(Probe)하며, 대용량 등호 조인에서 빠르다. Nested Loop은 O(N*M), Hash Join은 O(N+M)의 시간 복잡도를 가진다.",
      },
      {
        question:
          "Selection Push-Down(선택 연산 밀어내기)의 원리와 효과를 설명하시오.",
        answer:
          "Selection Push-Down은 WHERE 조건(선택 연산)을 쿼리 트리에서 가능한 아래쪽(데이터 소스에 가까운 곳)으로 이동시키는 최적화 기법이다. 조인 전에 필터링을 수행하면 중간 결과의 행 수가 줄어들어 조인 및 이후 연산의 비용이 크게 감소한다.",
      },
      {
        question:
          "EXPLAIN 실행 계획에서 확인해야 할 핵심 항목 5가지를 설명하시오.",
        answer:
          "1) 스캔 방식(Seq Scan, Index Scan, Index Only Scan 등) 2) 예상 행 수(rows): 각 단계에서 처리할 예상 행 수 3) 비용(cost): 시작 비용과 총 비용 4) 조인 방식(Nested Loop, Hash Join, Merge Join) 5) 필터 조건(Filter): 인덱스로 처리되지 않아 후처리되는 조건",
      },
      {
        question:
          "비용 기반 최적화(Cost-Based Optimization)의 과정을 설명하시오.",
        answer:
          "1) 파서가 생성한 쿼리 트리에서 가능한 여러 실행 계획을 열거한다. 2) 카탈로그의 통계 정보(테이블 크기, 카디널리티, 인덱스 정보 등)를 활용하여 각 계획의 디스크 I/O, CPU, 메모리 비용을 추정한다. 3) 추정 비용이 가장 낮은 계획을 선택하여 실행한다.",
      },
      {
        question:
          "옵티마이저가 인덱스 스캔 대신 테이블 풀스캔을 선택하는 조건을 설명하시오.",
        answer:
          "1) 테이블의 대부분의 행을 읽어야 하는 경우(선택도가 낮은 경우, 일반적으로 전체의 10~20% 이상) 2) 테이블 자체가 매우 작은 경우 3) 인덱스가 존재하지 않는 경우 4) 컬럼에 함수나 연산이 적용되어 인덱스를 사용할 수 없는 경우",
      },
      {
        question:
          "Sort-Merge Join이 적합한 상황을 설명하시오.",
        answer:
          "Sort-Merge Join은 두 테이블을 조인 키로 정렬한 후 병합하는 방식이다. 1) 양쪽 테이블이 이미 조인 키로 정렬되어 있을 때 2) 결과가 정렬된 순서로 필요할 때 3) 대용량 테이블의 등호 조인이나 범위 조인에 적합하다. 정렬 비용이 들지만, 이미 정렬되어 있으면 매우 효율적이다.",
      },
      {
        question:
          "조인 순서 최적화가 중요한 이유를 설명하시오.",
        answer:
          "조인 순서에 따라 중간 결과의 크기가 크게 달라지며, 이는 전체 쿼리 비용에 직접적인 영향을 미친다. N개 테이블의 조인 순서는 N!가지로 경우의 수가 폭발적으로 증가한다. 선택도가 높은(결과가 적은) 조인을 먼저 수행하면 이후 조인의 입력 크기가 줄어 전체 비용이 감소한다.",
      },
      {
        question:
          "쿼리 튜닝 시 적용할 수 있는 전략을 5가지 이상 제시하시오.",
        answer:
          "1) 적절한 인덱스 생성 및 활용 2) SELECT *를 피하고 필요한 컬럼만 조회 3) WHERE 절 컬럼에 함수 적용을 피해 인덱스 활용 4) 서브쿼리 대신 JOIN 활용 5) LIMIT로 불필요한 행 제한 6) EXPLAIN으로 실행 계획 분석 7) 불필요한 DISTINCT/ORDER BY 제거",
      },
      {
        question:
          "실행 계획에서 Seq Scan이 나타나는 의미와 개선 방법을 설명하시오.",
        answer:
          "Seq Scan(Sequential Scan)은 테이블의 모든 행을 순차적으로 읽는 것으로, 인덱스를 사용하지 않는다는 의미이다. 개선 방법: 1) WHERE 조건 컬럼에 인덱스 생성 2) 조건절에서 컬럼에 함수/연산을 제거 3) 통계 정보 갱신(ANALYZE) 4) 단, 소량 데이터나 대부분의 행을 읽는 경우에는 Seq Scan이 오히려 효율적이다.",
      },
      {
        question:
          "Projection Push-Down이란 무엇이며 어떤 효과가 있는가?",
        answer:
          "Projection Push-Down은 필요한 컬럼만 선택하는 연산(프로젝션)을 쿼리 트리에서 가능한 아래쪽으로 이동시키는 최적화이다. 불필요한 컬럼을 일찍 제거하여 중간 결과의 크기를 줄이고 메모리 사용량과 I/O 비용을 절감한다.",
      },
      {
        question:
          "인덱스 온리 스캔(Index Only Scan)이란 무엇이며, 발생 조건을 설명하시오.",
        answer:
          "인덱스 온리 스캔은 테이블에 접근하지 않고 인덱스만으로 쿼리 결과를 반환하는 스캔 방식이다. SELECT 절과 WHERE 절에 사용되는 모든 컬럼이 인덱스에 포함(커버링 인덱스)되어 있을 때 발생하며, 디스크 I/O를 크게 줄여 성능이 향상된다.",
      },
      {
        question:
          "파라메트릭 쿼리(Prepared Statement)가 성능에 미치는 영향을 설명하시오.",
        answer:
          "파라메트릭 쿼리는 쿼리 구조를 미리 파싱하고 최적화한 후 파라미터만 바꿔 재실행한다. 반복 실행 시 파싱/최적화 단계를 건너뛸 수 있어 성능이 향상된다. 또한 SQL 인젝션을 방지하는 보안 효과도 있다. 단, 파라미터에 따라 최적 실행 계획이 달라질 수 있는 경우 비효율적일 수 있다.",
      },
      {
        question:
          "통계 정보가 오래되면 쿼리 성능에 어떤 영향을 미치는가?",
        answer:
          "옵티마이저는 통계 정보를 기반으로 비용을 추정하므로, 통계가 오래되면 실제 데이터 분포와 차이가 발생하여 비효율적인 실행 계획을 선택할 수 있다. 예를 들어 인덱스 스캔이 최적인데 풀스캔을 선택하거나, 부적절한 조인 방식을 사용할 수 있다. ANALYZE 명령으로 통계를 갱신해야 한다.",
      },
      {
        question:
          "해시 조인의 Build 단계와 Probe 단계를 설명하시오.",
        answer:
          "Build 단계: 작은 테이블(Build Input)을 읽어 조인 키를 기준으로 해시 테이블을 메모리에 구축한다. Probe 단계: 큰 테이블(Probe Input)을 읽으면서 각 행의 조인 키를 해시하여 Build 단계에서 만든 해시 테이블에서 일치하는 행을 탐색한다.",
      },
    ],
    flashcards: [
      {
        question: "쿼리 파싱(Query Parsing)이란?",
        answer:
          "SQL 문의 문법을 검사하고 내부 표현(파스 트리)으로 변환하는 쿼리 처리 첫 번째 단계",
      },
      {
        question: "쿼리 최적화(Query Optimization)란?",
        answer:
          "여러 가능한 실행 계획 중 비용이 가장 낮은 계획을 선택하는 과정. 비용 기반 또는 규칙 기반으로 수행된다",
      },
      {
        question: "Nested Loop Join이란?",
        answer:
          "외부 테이블의 각 행에 대해 내부 테이블을 반복 탐색하는 조인 방식. 소규모 데이터나 인덱스 존재 시 효율적이다",
      },
      {
        question: "Sort-Merge Join이란?",
        answer:
          "두 테이블을 조인 키로 정렬한 후 순차적으로 병합하는 조인 방식. 데이터가 이미 정렬되어 있을 때 매우 효율적이다",
      },
      {
        question: "Hash Join이란?",
        answer:
          "작은 테이블로 해시 테이블을 빌드하고, 큰 테이블을 탐색(Probe)하여 일치하는 행을 찾는 조인 방식. 대용량 등호 조인에 적합하다",
      },
      {
        question: "비용 추정(Cost Estimation)이란?",
        answer:
          "카탈로그 통계 정보를 활용하여 각 실행 계획의 디스크 I/O, CPU, 메모리 비용을 예측하는 과정",
      },
      {
        question: "EXPLAIN이란?",
        answer:
          "쿼리의 실행 계획을 표시하는 명령어. 스캔 방식, 조인 방식, 예상 비용, 예상 행 수 등을 확인할 수 있다",
      },
      {
        question: "Selection Push-Down이란?",
        answer:
          "WHERE 조건(선택 연산)을 쿼리 트리의 하위로 이동시켜 조인 전에 필터링하여 중간 결과를 줄이는 최적화 기법",
      },
      {
        question: "실행 계획(Execution Plan)이란?",
        answer:
          "옵티마이저가 선택한 쿼리 수행 방법. 데이터 접근 경로, 조인 방식, 연산 순서 등을 포함한다",
      },
      {
        question: "인덱스 스캔(Index Scan)이란?",
        answer:
          "인덱스를 통해 조건에 맞는 행의 위치를 빠르게 찾은 후 테이블에서 해당 행을 읽는 스캔 방식",
      },
      {
        question: "테이블 풀스캔(Full Table Scan)이란?",
        answer:
          "인덱스를 사용하지 않고 테이블의 모든 행을 순차적으로 읽는 방식. Seq Scan이라고도 한다",
      },
      {
        question: "카탈로그 정보(Catalog)란?",
        answer:
          "데이터베이스의 메타데이터를 저장하는 시스템 테이블. 테이블 구조, 인덱스, 제약조건 등의 정보를 포함한다",
      },
      {
        question: "통계 정보(Statistics)란?",
        answer:
          "테이블의 행 수, 컬럼 카디널리티, 데이터 분포 등 옵티마이저가 비용 추정에 사용하는 정보. ANALYZE 명령으로 갱신한다",
      },
      {
        question: "논리적 계획(Logical Plan)이란?",
        answer:
          "관계 대수 연산(선택, 프로젝션, 조인 등)으로 표현된 쿼리 실행 계획. 구체적인 알고리즘은 포함하지 않는다",
      },
      {
        question: "물리적 계획(Physical Plan)이란?",
        answer:
          "논리적 계획에 구체적인 알고리즘(Hash Join, Index Scan 등)과 접근 경로를 지정한 실제 실행 계획",
      },
    ],
  },

  "04-database/07-recovery-replication": {
    quizzes: [
      {
        question:
          "WAL(Write-Ahead Logging) 원칙을 설명하고, 왜 데이터보다 로그를 먼저 기록해야 하는지 서술하시오.",
        answer:
          "WAL 원칙은 데이터 페이지를 디스크에 쓰기 전에 반드시 해당 변경에 대한 로그 레코드를 먼저 디스크에 기록해야 한다는 규칙이다. 로그를 먼저 기록하면 장애 발생 시 로그를 통해 커밋된 트랜잭션은 Redo하고, 미완료 트랜잭션은 Undo하여 데이터 일관성을 복구할 수 있다. 로그 없이 데이터만 쓰면 장애 시 어떤 변경이 적용되었는지 알 수 없다.",
      },
      {
        question:
          "ARIES 복구 알고리즘의 3단계(Analysis, Redo, Undo)를 각각 설명하시오.",
        answer:
          "1) Analysis 단계: 마지막 체크포인트부터 로그를 스캔하여 장애 시점에 활성 상태였던 트랜잭션과 더티 페이지 목록을 파악한다. 2) Redo 단계: 더티 페이지에 대해 로그를 순방향으로 재적용하여 장애 직전 상태를 복원한다(커밋/미커밋 구분 없이 모두). 3) Undo 단계: 미완료 트랜잭션의 변경을 로그를 역방향으로 읽으며 취소한다.",
      },
      {
        question:
          "체크포인트(Checkpoint)의 역할과 복구 성능에 미치는 영향을 설명하시오.",
        answer:
          "체크포인트는 메모리의 더티 페이지를 디스크에 기록하고 현재 활성 트랜잭션 정보를 로그에 남기는 작업이다. 복구 시 체크포인트 이전의 로그는 처리할 필요가 없으므로 Redo 범위가 줄어들어 복구 시간이 단축된다. 체크포인트가 자주 발생하면 복구가 빠르지만 정상 운영 시 I/O 부하가 증가한다.",
      },
      {
        question:
          "동기식 복제(Synchronous Replication)와 비동기식 복제(Asynchronous Replication)의 차이를 설명하시오.",
        answer:
          "동기식 복제는 Master의 쓰기가 모든(또는 지정된) Slave에 적용된 것을 확인한 후 커밋을 완료한다. 데이터 손실이 없지만 지연이 발생한다. 비동기식 복제는 Master가 커밋 후 나중에 변경을 Slave에 전파한다. 쓰기 성능이 좋지만 Master 장애 시 아직 전파되지 않은 데이터가 유실될 수 있다.",
      },
      {
        question:
          "Master-Slave 복제의 장단점을 설명하시오.",
        answer:
          "장점: 1) 읽기 부하를 Slave에 분산하여 읽기 성능 향상 2) 구조가 단순하고 충돌 해결이 불필요 3) Slave를 백업으로 활용 가능. 단점: 1) Master가 단일 장애점(SPOF) 2) 쓰기 확장이 불가능(Master에서만 쓰기) 3) 비동기 복제 시 Slave 데이터가 최신이 아닐 수 있음.",
      },
      {
        question:
          "복제 지연(Replication Lag) 문제를 해결하는 방법을 3가지 이상 제시하시오.",
        answer:
          "1) 반동기식(Semi-Synchronous) 복제로 최소 하나의 Slave 확인 후 커밋 2) 읽기 일관성이 필요한 쿼리는 Master에서 읽기 3) 쓰기 후 읽기(Read-after-Write) 패턴에서 최근 쓰기는 Master에서 읽기 4) 복제 지연 모니터링 및 임계치 설정 5) 네트워크 대역폭 및 Slave 성능 개선",
      },
      {
        question:
          "Undo 복구와 Redo 복구의 차이를 설명하고, 각각 언제 필요한지 서술하시오.",
        answer:
          "Redo 복구는 커밋되었지만 디스크에 아직 반영되지 않은 트랜잭션의 변경을 재적용하여 지속성(Durability)을 보장한다. Undo 복구는 아직 커밋되지 않은 트랜잭션의 변경을 되돌려 원자성(Atomicity)을 보장한다. 장애 복구 시 먼저 Redo로 장애 직전 상태를 복원한 후, Undo로 미완료 트랜잭션을 롤백한다.",
      },
      {
        question:
          "자동 페일오버(Automatic Failover)의 과정을 단계별로 설명하시오.",
        answer:
          "1) 헬스 체크: 모니터링 시스템이 주기적으로 Master의 상태를 확인한다. 2) 장애 감지: Master의 응답이 없으면 장애로 판단한다. 3) 리더 선출: Slave 중 가장 최신 데이터를 가진 노드를 새 Master로 승격한다. 4) 설정 변경: 나머지 Slave가 새 Master를 가리키도록 변경한다. 5) 트래픽 전환: 애플리케이션의 쓰기 요청을 새 Master로 라우팅한다.",
      },
      {
        question:
          "증분 백업(Incremental Backup)과 차등 백업(Differential Backup)의 차이를 설명하시오.",
        answer:
          "증분 백업은 마지막 백업(전체 또는 증분) 이후 변경된 데이터만 백업한다. 백업 용량과 시간이 적지만 복원 시 전체 백업 + 모든 증분 백업을 순서대로 적용해야 한다. 차등 백업은 마지막 전체 백업 이후 변경된 모든 데이터를 백업한다. 증분보다 용량이 크지만 복원 시 전체 백업 + 마지막 차등 백업만 적용하면 된다.",
      },
      {
        question:
          "3-2-1 백업 규칙을 설명하시오.",
        answer:
          "3-2-1 규칙은 데이터 보호를 위한 백업 전략이다. 3: 데이터의 사본을 최소 3개 보관한다(원본 1개 + 백업 2개). 2: 최소 2가지 서로 다른 저장 매체에 보관한다(예: 디스크 + 테이프). 1: 최소 1개의 사본을 물리적으로 다른 장소(오프사이트)에 보관하여 재해에 대비한다.",
      },
      {
        question:
          "로그 기반 복제(Log-Based Replication)의 원리를 설명하시오.",
        answer:
          "Master에서 발생하는 모든 데이터 변경이 WAL(또는 바이너리 로그)에 기록되고, 이 로그를 Slave에 전송하여 동일한 변경을 순서대로 재적용하는 방식이다. 물리적 복제는 디스크 블록 단위로, 논리적 복제는 SQL 문 또는 행 변경 단위로 로그를 전파한다.",
      },
      {
        question:
          "PITR(Point-In-Time Recovery)이란 무엇이며 어떻게 수행하는가?",
        answer:
          "PITR은 특정 시점으로 데이터베이스를 복구하는 기술이다. 전체 백업을 복원한 후, WAL 로그를 원하는 시점까지 순차적으로 재적용(Replay)하여 해당 시점의 상태로 복원한다. 실수로 데이터를 삭제한 경우 삭제 직전 시점으로 복구할 수 있다.",
      },
      {
        question:
          "Multi-Master 복제에서 충돌이 발생하는 원인과 해결 방법을 설명하시오.",
        answer:
          "충돌 원인: 여러 Master에서 동시에 같은 데이터를 수정하면 변경이 서로 충돌한다. 해결 방법: 1) 타임스탬프 기반으로 마지막 쓰기 우선(Last Write Wins) 2) 애플리케이션 레벨에서 충돌 감지 및 수동 해결 3) CRDT(Conflict-free Replicated Data Types) 사용 4) 충돌 로그 기록 후 관리자가 해결",
      },
      {
        question:
          "핫 백업(Hot Backup)과 콜드 백업(Cold Backup)의 차이를 설명하시오.",
        answer:
          "핫 백업은 데이터베이스가 정상 운영 중인 상태에서 수행하는 백업으로, 서비스 중단 없이 백업이 가능하지만 일관성 보장을 위해 WAL 등의 기법이 필요하다. 콜드 백업은 데이터베이스를 중지한 후 수행하는 백업으로, 데이터 일관성이 보장되지만 서비스 중단이 발생한다.",
      },
      {
        question:
          "복구 시간 목표(RTO)와 복구 시점 목표(RPO)를 설명하시오.",
        answer:
          "RTO(Recovery Time Objective)는 장애 발생 후 서비스가 복구되기까지의 최대 허용 시간이다. RPO(Recovery Point Objective)는 장애 시 허용 가능한 최대 데이터 손실 기간이다. 예: RTO 1시간이면 1시간 내 서비스 복구, RPO 5분이면 최대 5분치 데이터 손실만 허용한다.",
      },
    ],
    flashcards: [
      {
        question: "WAL(Write-Ahead Logging)이란?",
        answer:
          "데이터 변경 전에 로그를 먼저 디스크에 기록하여 장애 시 복구를 보장하는 기법. 모든 현대 DBMS의 핵심 원칙이다",
      },
      {
        question: "체크포인트(Checkpoint)란?",
        answer:
          "메모리의 더티 페이지를 디스크에 기록하고 활성 트랜잭션 정보를 로그에 남기는 작업. 복구 시 Redo 범위를 줄여 복구 시간을 단축한다",
      },
      {
        question: "ARIES란?",
        answer:
          "Analysis(분석), Redo(재적용), Undo(취소) 3단계로 구성된 대표적인 데이터베이스 복구 알고리즘",
      },
      {
        question: "Redo 복구란?",
        answer:
          "커밋되었지만 디스크에 미반영된 트랜잭션의 변경을 로그를 순방향으로 재적용하여 지속성을 보장하는 복구",
      },
      {
        question: "Undo 복구란?",
        answer:
          "미완료(미커밋) 트랜잭션의 변경을 로그를 역방향으로 읽어 되돌려 원자성을 보장하는 복구",
      },
      {
        question: "복제(Replication)란?",
        answer:
          "데이터의 복사본을 여러 노드에 유지하여 가용성, 내결함성, 읽기 성능을 향상시키는 기법",
      },
      {
        question: "Master-Slave 복제란?",
        answer:
          "하나의 Master가 쓰기를 처리하고, 변경을 Slave에 전파하여 Slave가 읽기를 담당하는 복제 방식",
      },
      {
        question: "Multi-Master 복제란?",
        answer:
          "여러 노드에서 동시에 읽기/쓰기가 가능한 복제 방식. 쓰기 확장이 가능하지만 충돌 해결이 필요하다",
      },
      {
        question: "복제 지연(Replication Lag)이란?",
        answer:
          "Master의 변경이 Slave에 전파되기까지 걸리는 시간 차이. 비동기 복제에서 발생하며 읽기 일관성 문제를 야기한다",
      },
      {
        question: "페일오버(Failover)란?",
        answer:
          "Master 장애 시 Slave를 새로운 Master로 승격하여 서비스를 지속하는 과정. 자동 또는 수동으로 수행된다",
      },
      {
        question: "전체 백업(Full Backup)이란?",
        answer:
          "데이터베이스의 모든 데이터를 백업하는 방식. 복원이 간단하지만 용량과 시간이 가장 많이 소요된다",
      },
      {
        question: "증분 백업(Incremental Backup)이란?",
        answer:
          "마지막 백업 이후 변경된 데이터만 백업하는 방식. 빠르고 용량이 적지만 복원 시 모든 증분을 순서대로 적용해야 한다",
      },
      {
        question: "차등 백업(Differential Backup)이란?",
        answer:
          "마지막 전체 백업 이후 변경된 모든 데이터를 백업하는 방식. 복원 시 전체 백업 + 마지막 차등 백업만 적용하면 된다",
      },
      {
        question: "최종 일관성(Eventual Consistency)이란?",
        answer:
          "일시적으로 복제본 간 데이터 불일치를 허용하되, 시간이 지나면 모든 노드가 동일한 상태에 도달하는 일관성 모델",
      },
      {
        question: "로그 레코드(Log Record)란?",
        answer:
          "트랜잭션의 각 연산(시작, 변경, 커밋, 롤백 등)을 기록하는 단위. 트랜잭션 ID, 변경 전 값, 변경 후 값 등을 포함한다",
      },
    ],
  },
};
