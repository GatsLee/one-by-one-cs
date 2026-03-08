# AI 채팅 & 검색 설정 가이드

AI 채팅 및 검색 기능은 [Ollama](https://ollama.com)가 필요합니다.

## 설치 및 모델 다운로드

```bash
# 1. Ollama 설치
curl -fsSL https://ollama.com/install.sh | sh

# 2. 채팅 모델 설치 (사양에 맞게 선택 — /chat 페이지에서 자동 추천)
ollama pull llama3.2          # 경량 (VRAM 3GB~)
ollama pull llama3.1:8b       # 균형 (VRAM 6GB~)
ollama pull qwen2.5:14b       # 고품질 (VRAM 10GB~)

# 3. 임베딩 모델 설치 (RAG 채팅 & AI 검색 모두 필요)
ollama pull mxbai-embed-large

# 4. /settings 접속 → "인덱싱 시작" 클릭 (태그 + 임베딩 생성)
# 5. /search 에서 AI 검색, /chat 에서 RAG 채팅 사용
```

## AI 검색 동작 방식

검색 요청이 들어오면 3개 레이어를 순서대로 실행합니다:

| 레이어 | 방식 | 속도 | 비고 |
|--------|------|------|------|
| Layer 1 | 제목 정규화 매칭 | <1ms | 한국어 어미/조사 제거 후 제목 비교 |
| Layer 2 | 태그 키워드 매칭 | <5ms | 인덱싱 시 생성한 20-30개 태그 in-memory 검색 |
| Layer 3 | 임베딩 RAG | ~2-5s | 코사인 유사도 기반 의미 검색 |

앞 레이어에서 찾은 문서는 뒤 레이어에서 자동 제외(중복 방지). 자세한 구현은 [rag-search.md](./rag-search.md) 참고.
