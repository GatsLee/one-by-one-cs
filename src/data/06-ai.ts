import type { QuizDataMap } from "./types";

export const aiQuizzes: QuizDataMap = {
  "06-ai/01-ml-fundamentals": {
    quizzes: [
      {
        question: "지도 학습(Supervised Learning)과 비지도 학습(Unsupervised Learning)의 핵심 차이는 무엇인가?",
        answer: "지도 학습은 입력 데이터와 정답 레이블(label)이 함께 제공되어 모델이 입력-출력 매핑을 학습하고, 비지도 학습은 레이블 없이 데이터의 구조나 패턴을 스스로 발견한다.",
      },
      {
        question: "강화 학습(Reinforcement Learning)에서 에이전트가 학습하는 핵심 메커니즘은 무엇인가?",
        answer: "에이전트는 환경과 상호작용하며 행동(action)을 취하고, 그 결과로 받는 보상(reward) 신호를 최대화하는 정책(policy)을 학습한다.",
      },
      {
        question: "과적합(Overfitting)이 발생하는 원인과 이를 감지하는 방법은?",
        answer: "모델이 훈련 데이터의 노이즈까지 학습할 때 발생하며, 훈련 손실은 낮지만 검증 손실이 높아지는 격차로 감지할 수 있다.",
      },
      {
        question: "편향-분산 트레이드오프(Bias-Variance Tradeoff)를 설명하시오.",
        answer: "편향이 높으면 모델이 너무 단순해 과소적합되고, 분산이 높으면 데이터 변화에 민감해 과적합된다. 둘 사이의 균형을 찾는 것이 좋은 일반화 성능의 핵심이다.",
      },
      {
        question: "K-Fold 교차 검증(Cross Validation)의 절차를 설명하시오.",
        answer: "데이터를 K개 폴드로 나누고, 매 반복마다 1개 폴드를 검증용, 나머지 K-1개를 훈련용으로 사용하여 K번 학습한 뒤 성능을 평균 내어 모델을 평가한다.",
      },
      {
        question: "L1 정규화(Lasso)와 L2 정규화(Ridge)의 차이는 무엇인가?",
        answer: "L1은 가중치의 절댓값 합을 페널티로 추가해 일부 가중치를 0으로 만들어 특성 선택 효과가 있고, L2는 가중치 제곱합을 페널티로 추가해 가중치를 전체적으로 작게 만들어 과적합을 방지한다.",
      },
      {
        question: "정밀도(Precision)와 재현율(Recall)의 정의와 트레이드오프 관계를 설명하시오.",
        answer: "정밀도는 양성 예측 중 실제 양성 비율(TP/(TP+FP))이고, 재현율은 실제 양성 중 올바르게 예측된 비율(TP/(TP+FN))이다. 임계값을 낮추면 재현율이 오르지만 정밀도가 떨어지는 트레이드오프가 존재한다.",
      },
      {
        question: "F1 스코어는 왜 사용하며 어떻게 계산하는가?",
        answer: "정밀도와 재현율의 조화 평균으로 F1 = 2 * (Precision * Recall) / (Precision + Recall)이다. 클래스 불균형 상황에서 두 지표를 균형 있게 평가하기 위해 사용한다.",
      },
      {
        question: "의사결정트리(Decision Tree)의 분할 기준으로 사용되는 지니 불순도(Gini Impurity)란 무엇인가?",
        answer: "노드에서 무작위로 샘플을 뽑아 분류했을 때 잘못 분류될 확률로, 0이면 완벽하게 분리된 것이고 값이 클수록 불순도가 높다. 분할 시 지니 불순도 감소량이 최대인 특성을 선택한다.",
      },
      {
        question: "랜덤포레스트(Random Forest)가 단일 의사결정트리보다 성능이 좋은 이유는?",
        answer: "여러 의사결정트리를 배깅(Bagging)으로 학습시키고 특성도 무작위로 선택하여 다양성을 확보하므로, 개별 트리의 과적합을 줄이고 앙상블 효과로 일반화 성능이 향상된다.",
      },
      {
        question: "SVM(Support Vector Machine)에서 서포트 벡터와 마진(Margin)의 의미는?",
        answer: "서포트 벡터는 결정 경계에 가장 가까운 데이터 포인트이고, 마진은 결정 경계와 서포트 벡터 사이의 거리이다. SVM은 이 마진을 최대화하는 초평면을 찾는다.",
      },
      {
        question: "KNN(K-Nearest Neighbors) 알고리즘에서 K 값 선택이 모델에 미치는 영향은?",
        answer: "K가 너무 작으면 노이즈에 민감해 과적합되고, K가 너무 크면 경계가 지나치게 평활화되어 과소적합된다. 적절한 K는 교차 검증으로 결정한다.",
      },
      {
        question: "경사하강법(Gradient Descent)의 기본 원리를 설명하시오.",
        answer: "손실 함수의 기울기(그래디언트)를 계산하고, 기울기의 반대 방향으로 파라미터를 업데이트하여 손실을 최소화하는 최적화 알고리즘이다. 학습률이 업데이트 크기를 조절한다.",
      },
      {
        question: "특성 엔지니어링(Feature Engineering)이란 무엇이며 왜 중요한가?",
        answer: "원본 데이터에서 모델 성능을 높이기 위해 새로운 특성을 생성, 변환, 선택하는 과정이다. 모델의 표현력과 예측 성능에 직접적으로 영향을 미치므로 중요하다.",
      },
      {
        question: "AUC-ROC 곡선이 나타내는 것과 AUC 값의 의미를 설명하시오.",
        answer: "ROC 곡선은 다양한 임계값에서의 참양성률(TPR)과 거짓양성률(FPR)의 관계를 나타내고, AUC는 이 곡선 아래 면적이다. AUC가 1에 가까울수록 분류 성능이 우수하며, 0.5는 무작위 수준이다.",
      },
    ],
    flashcards: [
      {
        question: "지도 학습(Supervised Learning)이란?",
        answer: "레이블이 있는 데이터로 입력-출력 매핑을 학습하는 방식. 분류(Classification)와 회귀(Regression)로 나뉜다.",
      },
      {
        question: "비지도 학습(Unsupervised Learning)이란?",
        answer: "레이블 없이 데이터의 숨겨진 구조나 패턴을 발견하는 학습 방식. 군집화(Clustering), 차원 축소 등이 포함된다.",
      },
      {
        question: "과적합(Overfitting)이란?",
        answer: "모델이 훈련 데이터에 지나치게 맞춰져 새로운 데이터에 대한 일반화 성능이 떨어지는 현상.",
      },
      {
        question: "과소적합(Underfitting)이란?",
        answer: "모델이 너무 단순하여 훈련 데이터의 패턴도 제대로 학습하지 못하는 현상.",
      },
      {
        question: "교차 검증(Cross Validation)이란?",
        answer: "데이터를 여러 폴드로 나눠 훈련/검증을 반복하여 모델의 일반화 성능을 더 안정적으로 추정하는 기법.",
      },
      {
        question: "L1 정규화(Lasso)의 특징은?",
        answer: "가중치 절댓값의 합을 페널티로 부여. 일부 가중치를 정확히 0으로 만들어 특성 선택 효과가 있다.",
      },
      {
        question: "L2 정규화(Ridge)의 특징은?",
        answer: "가중치 제곱합을 페널티로 부여. 모든 가중치를 작게 만들어 과적합을 방지하지만 0으로 만들지는 않는다.",
      },
      {
        question: "정밀도(Precision)란?",
        answer: "양성으로 예측한 것 중 실제 양성의 비율. TP / (TP + FP).",
      },
      {
        question: "재현율(Recall)이란?",
        answer: "실제 양성 중 올바르게 양성으로 예측된 비율. TP / (TP + FN).",
      },
      {
        question: "의사결정트리(Decision Tree)란?",
        answer: "특성에 대한 조건 분기를 트리 구조로 구성하여 분류나 회귀를 수행하는 알고리즘.",
      },
      {
        question: "랜덤포레스트(Random Forest)란?",
        answer: "다수의 의사결정트리를 배깅과 무작위 특성 선택으로 학습시키고 결과를 앙상블하는 알고리즘.",
      },
      {
        question: "SVM(Support Vector Machine)이란?",
        answer: "클래스 간 마진을 최대화하는 초평면을 찾는 분류 알고리즘. 커널 트릭으로 비선형 분류도 가능하다.",
      },
      {
        question: "KNN(K-Nearest Neighbors)이란?",
        answer: "새 데이터의 K개 최근접 이웃의 다수 클래스로 분류하는 게으른 학습(Lazy Learning) 알고리즘.",
      },
      {
        question: "경사하강법(Gradient Descent)이란?",
        answer: "손실 함수의 기울기 반대 방향으로 파라미터를 반복 업데이트하여 최솟값을 찾는 최적화 기법.",
      },
      {
        question: "편향-분산 트레이드오프란?",
        answer: "편향(모델 단순함에 의한 오차)과 분산(데이터 변화에 의한 오차)은 반비례 관계이며, 총 오차를 최소화하는 균형점을 찾는 것이 핵심이다.",
      },
    ],
  },

  "06-ai/02-neural-networks": {
    quizzes: [
      {
        question: "퍼셉트론(Perceptron)의 한계는 무엇이며 이를 어떻게 극복했는가?",
        answer: "단일 퍼셉트론은 XOR 같은 비선형 문제를 해결할 수 없다. 다층 퍼셉트론(MLP)을 구성하고 역전파 알고리즘으로 학습하여 이 한계를 극복했다.",
      },
      {
        question: "ReLU 활성화 함수의 수식과 Sigmoid 대비 장점은?",
        answer: "ReLU(x) = max(0, x)이다. Sigmoid와 달리 양의 영역에서 기울기가 1로 일정하여 경사소실 문제를 완화하고, 계산이 간단해 학습 속도가 빠르다.",
      },
      {
        question: "역전파(Backpropagation) 알고리즘의 핵심 원리는 무엇인가?",
        answer: "출력층의 오차를 연쇄 법칙(Chain Rule)을 이용해 각 층의 가중치에 대한 손실 함수의 기울기를 역방향으로 계산하고, 이를 기반으로 가중치를 업데이트한다.",
      },
      {
        question: "경사소실(Vanishing Gradient) 문제란 무엇이며 왜 발생하는가?",
        answer: "역전파 시 기울기가 층을 거치면서 점점 작아져 앞쪽 층의 가중치가 거의 업데이트되지 않는 문제이다. Sigmoid/Tanh의 포화 영역에서 기울기가 0에 가까워지기 때문에 발생한다.",
      },
      {
        question: "배치 정규화(Batch Normalization)의 동작 원리와 효과는?",
        answer: "미니배치 내에서 각 층의 입력을 정규화(평균 0, 분산 1)한 후 학습 가능한 스케일과 시프트 파라미터를 적용한다. 내부 공변량 변화를 줄여 학습을 안정화하고 빠르게 한다.",
      },
      {
        question: "드롭아웃(Dropout)이 과적합을 방지하는 메커니즘은?",
        answer: "학습 중 각 층의 뉴런을 일정 확률로 무작위 비활성화하여 특정 뉴런에 대한 의존을 방지하고, 앙상블과 유사한 효과를 내어 일반화 성능을 향상시킨다.",
      },
      {
        question: "CNN(Convolutional Neural Network)에서 합성곱 연산의 역할은?",
        answer: "필터(커널)를 입력에 슬라이딩하며 지역적 특징을 추출한다. 가중치 공유로 파라미터 수를 줄이고, 이동 불변성을 학습할 수 있다.",
      },
      {
        question: "CNN의 풀링(Pooling) 층이 하는 역할은 무엇인가?",
        answer: "특성 맵의 공간 크기를 줄여 계산량과 파라미터를 감소시키고, 작은 위치 변화에 대한 불변성을 제공한다. 대표적으로 Max Pooling과 Average Pooling이 있다.",
      },
      {
        question: "RNN(Recurrent Neural Network)이 시퀀스 데이터를 처리할 수 있는 이유는?",
        answer: "은닉 상태(hidden state)를 통해 이전 시점의 정보를 다음 시점으로 전달하는 순환 구조를 가지고 있어 시간적/순서적 의존성을 모델링할 수 있다.",
      },
      {
        question: "LSTM(Long Short-Term Memory)이 기본 RNN보다 우수한 이유는?",
        answer: "셀 상태(cell state)와 3개의 게이트(망각/입력/출력)를 통해 장기 의존성을 효과적으로 학습하며, 기본 RNN의 경사소실 문제를 해결한다.",
      },
      {
        question: "SGD(Stochastic Gradient Descent)와 Adam 옵티마이저의 차이는?",
        answer: "SGD는 고정 학습률로 기울기 방향에 파라미터를 업데이트한다. Adam은 1차 모멘트(평균)와 2차 모멘트(분산)를 추적하여 파라미터별 적응적 학습률을 적용한다.",
      },
      {
        question: "학습률(Learning Rate)이 너무 크거나 작을 때 각각 어떤 문제가 발생하는가?",
        answer: "학습률이 너무 크면 손실이 발산하거나 최솟값 주변에서 진동하고, 너무 작으면 수렴 속도가 극단적으로 느려지고 지역 최솟값에 갇힐 수 있다.",
      },
      {
        question: "Sigmoid 활성화 함수의 수식과 출력 범위는?",
        answer: "Sigmoid(x) = 1 / (1 + e^(-x))이며 출력 범위는 (0, 1)이다. 이진 분류의 출력층에 주로 사용되지만, 은닉층에서는 경사소실 문제로 잘 사용하지 않는다.",
      },
      {
        question: "Tanh 활성화 함수가 Sigmoid보다 은닉층에서 선호되었던 이유는?",
        answer: "Tanh의 출력 범위는 (-1, 1)로 평균이 0에 가까워 다음 층의 학습이 더 효율적이다. 다만 여전히 포화 영역에서 경사소실 문제가 존재하여 현재는 ReLU가 더 많이 사용된다.",
      },
      {
        question: "미니배치 경사하강법(Mini-batch GD)이 배치 GD와 SGD의 절충안인 이유는?",
        answer: "전체 데이터를 사용하는 배치 GD는 안정적이지만 느리고 메모리 소비가 크며, 샘플 하나씩 사용하는 SGD는 빠르지만 불안정하다. 미니배치는 적절한 크기의 묶음으로 속도와 안정성의 균형을 맞춘다.",
      },
    ],
    flashcards: [
      {
        question: "퍼셉트론(Perceptron)이란?",
        answer: "입력에 가중치를 곱하고 합산한 뒤 활성화 함수를 적용하는 가장 단순한 인공 뉴런 모델.",
      },
      {
        question: "ReLU(Rectified Linear Unit)란?",
        answer: "f(x) = max(0, x). 양수는 그대로, 음수는 0을 출력. 경사소실 완화와 빠른 계산이 장점.",
      },
      {
        question: "Sigmoid 함수란?",
        answer: "f(x) = 1/(1+e^(-x)). 출력 (0,1). 이진 분류 출력층에 사용. 포화 영역에서 경사소실 발생.",
      },
      {
        question: "역전파(Backpropagation)란?",
        answer: "연쇄 법칙으로 출력에서 입력 방향으로 기울기를 전파하여 각 가중치의 업데이트량을 계산하는 알고리즘.",
      },
      {
        question: "경사소실(Vanishing Gradient) 문제란?",
        answer: "깊은 신경망에서 역전파 시 기울기가 점점 작아져 앞쪽 층의 학습이 거의 이루어지지 않는 현상.",
      },
      {
        question: "배치 정규화(Batch Normalization)란?",
        answer: "각 층의 입력을 미니배치 단위로 정규화하여 학습 안정성과 속도를 향상시키는 기법.",
      },
      {
        question: "드롭아웃(Dropout)이란?",
        answer: "학습 시 뉴런을 확률적으로 비활성화하여 과적합을 방지하는 정규화 기법. 추론 시에는 비활성화하지 않는다.",
      },
      {
        question: "CNN(Convolutional Neural Network)이란?",
        answer: "합성곱 층으로 지역 특징을 추출하는 신경망. 이미지 처리에 특히 효과적이다.",
      },
      {
        question: "RNN(Recurrent Neural Network)이란?",
        answer: "은닉 상태를 순환적으로 전달하여 시퀀스 데이터의 시간적 의존성을 모델링하는 신경망.",
      },
      {
        question: "LSTM(Long Short-Term Memory)이란?",
        answer: "셀 상태와 게이트 메커니즘으로 장기 의존성을 학습하는 RNN의 변형. 경사소실 문제를 해결한다.",
      },
      {
        question: "Adam 옵티마이저란?",
        answer: "1차/2차 모멘트의 이동 평균을 활용해 파라미터별 적응적 학습률을 적용하는 옵티마이저.",
      },
      {
        question: "학습률(Learning Rate)이란?",
        answer: "경사하강법에서 파라미터를 업데이트하는 보폭의 크기를 결정하는 하이퍼파라미터.",
      },
      {
        question: "Tanh 활성화 함수란?",
        answer: "출력 범위 (-1, 1). 평균이 0에 가까워 Sigmoid보다 학습에 유리하나 포화 문제는 동일.",
      },
      {
        question: "풀링(Pooling)이란?",
        answer: "특성 맵의 공간 크기를 축소하는 연산. Max Pooling은 영역 내 최댓값을 선택한다.",
      },
      {
        question: "SGD(Stochastic Gradient Descent)란?",
        answer: "무작위로 선택한 하나(또는 미니배치)의 샘플로 기울기를 계산하여 파라미터를 업데이트하는 최적화 기법.",
      },
    ],
  },

  "06-ai/03-nlp-transformers": {
    quizzes: [
      {
        question: "토큰화(Tokenization)란 무엇이며 서브워드 토큰화가 필요한 이유는?",
        answer: "텍스트를 모델 입력 단위인 토큰으로 분할하는 과정이다. 서브워드 토큰화(BPE 등)는 어휘 사전 크기를 적절히 유지하면서 미등록어(OOV) 문제를 해결할 수 있어 필요하다.",
      },
      {
        question: "Word2Vec의 두 가지 학습 방식(CBOW, Skip-gram)의 차이는?",
        answer: "CBOW는 주변 단어(Context)로 중심 단어를 예측하고, Skip-gram은 중심 단어로 주변 단어를 예측한다. Skip-gram은 빈도가 낮은 단어에서 더 좋은 성능을 보인다.",
      },
      {
        question: "GloVe 임베딩이 Word2Vec과 다른 점은 무엇인가?",
        answer: "Word2Vec은 로컬 문맥 윈도우로 학습하지만, GloVe는 전체 코퍼스의 단어 동시 출현(co-occurrence) 행렬을 활용하여 글로벌 통계를 반영한 임베딩을 생성한다.",
      },
      {
        question: "Attention 메커니즘이 등장한 배경과 핵심 아이디어는?",
        answer: "기존 Seq2Seq 모델에서 긴 시퀀스의 정보가 고정 길이 벡터에 압축되면서 정보 손실이 발생했다. Attention은 디코더가 인코더의 모든 은닉 상태에 가중치를 부여하여 관련 정보에 집중할 수 있게 한다.",
      },
      {
        question: "Self-Attention의 Query, Key, Value의 역할을 설명하시오.",
        answer: "Query는 현재 토큰이 찾고자 하는 정보, Key는 각 토큰이 제공하는 식별 정보, Value는 실제 전달할 정보이다. Query와 Key의 내적으로 관련도를 계산하고, 이를 가중치로 Value를 합산한다.",
      },
      {
        question: "Multi-Head Attention이 단일 Attention보다 유리한 이유는?",
        answer: "여러 개의 Attention 헤드가 서로 다른 부분 공간(subspace)에서 다양한 관계 패턴을 동시에 학습할 수 있어 표현력이 풍부해진다.",
      },
      {
        question: "Transformer 구조에서 인코더와 디코더의 차이점은?",
        answer: "인코더는 Self-Attention과 FFN으로 구성되어 양방향 문맥을 처리하고, 디코더는 마스크드 Self-Attention(미래 토큰 차단), Cross-Attention(인코더 출력 참조), FFN으로 구성되어 자기회귀적으로 생성한다.",
      },
      {
        question: "위치 인코딩(Positional Encoding)이 Transformer에 필요한 이유는?",
        answer: "Transformer는 RNN과 달리 순환 구조가 없어 토큰의 순서 정보를 자체적으로 알 수 없다. 위치 인코딩을 입력 임베딩에 더하여 시퀀스 내 위치 정보를 제공한다.",
      },
      {
        question: "BERT와 GPT의 구조적 차이와 학습 방식의 차이를 설명하시오.",
        answer: "BERT는 Transformer 인코더 기반으로 양방향 문맥을 보며 마스크드 언어 모델(MLM)로 학습한다. GPT는 Transformer 디코더 기반으로 왼쪽에서 오른쪽으로만 보며 자기회귀적 언어 모델로 학습한다.",
      },
      {
        question: "Fine-tuning이란 무엇이며 왜 효과적인가?",
        answer: "사전 학습된 모델의 가중치를 특정 하위 태스크의 데이터로 추가 학습하는 것이다. 대규모 데이터로 학습한 범용 언어 지식을 활용하므로 적은 데이터로도 높은 성능을 달성할 수 있다.",
      },
      {
        question: "Scaled Dot-Product Attention에서 스케일링(√dk로 나누기)을 하는 이유는?",
        answer: "차원(dk)이 클수록 내적 값이 커져 Softmax가 극단적인 값을 출력하게 되어 기울기가 매우 작아진다. √dk로 나누어 스케일을 조정하면 안정적인 학습이 가능하다.",
      },
      {
        question: "Transformer의 Feed-Forward Network(FFN)의 구조와 역할은?",
        answer: "2개의 선형 변환과 활성화 함수(보통 ReLU/GELU)로 구성된다. Self-Attention이 토큰 간 관계를 포착한 후 FFN이 각 위치에서 독립적으로 비선형 변환을 수행하여 표현력을 높인다.",
      },
      {
        question: "BERT의 [CLS] 토큰과 [SEP] 토큰의 용도는?",
        answer: "[CLS]는 시퀀스 시작에 붙어 문장 단위 분류 태스크에서 전체 문장의 표현으로 사용되고, [SEP]는 두 문장을 구분하는 경계 토큰이다.",
      },
      {
        question: "Masked Language Model(MLM)이란 무엇인가?",
        answer: "입력 토큰의 일부(약 15%)를 [MASK]로 가리고 양방향 문맥을 활용해 가려진 토큰을 예측하도록 학습하는 BERT의 사전 학습 방식이다.",
      },
      {
        question: "Transformer가 RNN 대비 가지는 핵심 장점은?",
        answer: "Self-Attention으로 시퀀스 내 모든 위치 쌍의 관계를 직접 모델링하여 장거리 의존성 포착에 유리하고, 순차 처리 없이 병렬 연산이 가능하여 학습 속도가 빠르다.",
      },
    ],
    flashcards: [
      {
        question: "토큰화(Tokenization)란?",
        answer: "텍스트를 모델이 처리할 수 있는 최소 단위(토큰)로 분할하는 전처리 과정.",
      },
      {
        question: "Word2Vec이란?",
        answer: "단어를 밀집 벡터로 표현하는 임베딩 기법. CBOW와 Skip-gram 두 가지 방식이 있다.",
      },
      {
        question: "GloVe란?",
        answer: "전체 코퍼스의 단어 동시 출현 통계를 기반으로 단어 임베딩을 학습하는 기법.",
      },
      {
        question: "Attention 메커니즘이란?",
        answer: "입력 시퀀스의 각 위치에 가중치를 부여하여 관련성 높은 정보에 집중하는 메커니즘.",
      },
      {
        question: "Self-Attention이란?",
        answer: "동일한 시퀀스 내 모든 토큰 쌍 간의 관련도를 Q, K, V로 계산하는 Attention.",
      },
      {
        question: "Multi-Head Attention이란?",
        answer: "여러 Attention 헤드를 병렬로 수행하여 다양한 부분 공간에서의 관계를 동시에 학습하는 기법.",
      },
      {
        question: "Transformer란?",
        answer: "Self-Attention 기반의 인코더-디코더 구조. 병렬 처리가 가능하고 장거리 의존성 포착에 강하다.",
      },
      {
        question: "위치 인코딩(Positional Encoding)이란?",
        answer: "Transformer에 토큰의 순서 정보를 제공하기 위해 임베딩에 더하는 위치별 벡터.",
      },
      {
        question: "BERT란?",
        answer: "Transformer 인코더 기반, 양방향 문맥을 활용하는 사전 학습 언어 모델. MLM과 NSP로 학습.",
      },
      {
        question: "GPT란?",
        answer: "Transformer 디코더 기반, 자기회귀적으로 다음 토큰을 예측하는 생성형 사전 학습 언어 모델.",
      },
      {
        question: "Fine-tuning이란?",
        answer: "사전 학습된 모델을 특정 태스크 데이터로 추가 학습하여 성능을 최적화하는 전이 학습 기법.",
      },
      {
        question: "인코더(Encoder)의 역할은?",
        answer: "입력 시퀀스를 처리하여 문맥이 반영된 표현(representation)을 생성하는 Transformer 구성 요소.",
      },
      {
        question: "디코더(Decoder)의 역할은?",
        answer: "인코더 출력과 이전 생성 토큰을 바탕으로 다음 토큰을 자기회귀적으로 생성하는 구성 요소.",
      },
      {
        question: "Query, Key, Value란?",
        answer: "Q: 찾고자 하는 정보, K: 각 토큰의 식별 정보, V: 전달할 실제 정보. QK 내적으로 가중치를 계산하여 V를 합산.",
      },
      {
        question: "Masked Language Model(MLM)이란?",
        answer: "입력 토큰 일부를 마스킹하고 양방향 문맥으로 복원하도록 학습하는 BERT의 사전 학습 목적 함수.",
      },
    ],
  },

  "06-ai/04-llm-essentials": {
    quizzes: [
      {
        question: "LLM의 학습 파이프라인에서 사전 학습(Pre-training)과 미세 조정(Fine-tuning)의 차이는?",
        answer: "사전 학습은 대규모 비지도 텍스트로 일반적인 언어 지식을 학습하는 단계이고, 미세 조정은 사전 학습된 모델을 특정 태스크나 도메인의 지도 데이터로 추가 학습하는 단계이다.",
      },
      {
        question: "BPE(Byte Pair Encoding) 토크나이저의 동작 원리를 설명하시오.",
        answer: "가장 빈번하게 연속 출현하는 바이트(또는 문자) 쌍을 반복적으로 병합하여 어휘 사전을 구축한다. 빈도가 높은 단어는 하나의 토큰으로, 희귀 단어는 서브워드 조합으로 표현된다.",
      },
      {
        question: "SentencePiece가 BPE와 다른 점은 무엇인가?",
        answer: "SentencePiece는 언어에 독립적으로 원시 텍스트를 직접 처리하며, 공백도 특수 문자로 취급하여 사전 토큰화 없이 유니코드 텍스트에서 바로 서브워드를 학습한다.",
      },
      {
        question: "프롬프트 엔지니어링(Prompt Engineering)의 주요 기법 3가지를 설명하시오.",
        answer: "1) Zero-shot: 예시 없이 지시만으로 수행. 2) Few-shot: 몇 개의 예시를 제공하여 패턴 유도. 3) Chain-of-Thought: 중간 추론 과정을 단계적으로 유도하여 복잡한 문제 해결력 향상.",
      },
      {
        question: "In-Context Learning(ICL)이란 무엇이며 Fine-tuning과 어떻게 다른가?",
        answer: "ICL은 프롬프트에 예시를 포함하여 모델이 가중치 업데이트 없이 추론 시점에 태스크를 수행하는 것이다. Fine-tuning은 가중치를 실제로 업데이트하므로 비용이 크지만 성능은 더 안정적이다.",
      },
      {
        question: "RLHF(Reinforcement Learning from Human Feedback)의 3단계 과정을 설명하시오.",
        answer: "1) 지도 미세 조정(SFT)으로 기본 모델 학습. 2) 인간 선호 데이터로 보상 모델(Reward Model) 학습. 3) 보상 모델을 기반으로 PPO 등 강화 학습으로 정책(LLM)을 최적화한다.",
      },
      {
        question: "LoRA(Low-Rank Adaptation)의 핵심 아이디어와 장점은?",
        answer: "원래 가중치는 고정하고 저랭크 행렬 쌍(A, B)을 추가하여 소수의 파라미터만 학습한다. 전체 미세 조정 대비 학습 파라미터가 매우 적어 메모리와 비용이 크게 절감된다.",
      },
      {
        question: "양자화(Quantization)란 무엇이며 LLM에서 중요한 이유는?",
        answer: "모델 가중치를 낮은 정밀도(예: FP32 → INT8/INT4)로 변환하는 기법이다. LLM의 거대한 모델 크기를 줄여 메모리 사용량과 추론 비용을 절감하면서도 성능 저하를 최소화한다.",
      },
      {
        question: "RAG(Retrieval-Augmented Generation)의 동작 방식과 장점은?",
        answer: "질문과 관련된 외부 문서를 검색하여 프롬프트에 추가한 후 LLM이 생성하는 방식이다. 학습 데이터에 없는 최신/도메인 정보를 활용할 수 있고 환각을 줄이는 효과가 있다.",
      },
      {
        question: "환각(Hallucination)이란 무엇이며 이를 줄이는 방법은?",
        answer: "LLM이 사실과 다르거나 존재하지 않는 정보를 그럴듯하게 생성하는 현상이다. RAG로 외부 지식 참조, 프롬프트에 출처 요청, RLHF로 정직한 응답 유도, 팩트 체킹 후처리 등으로 줄일 수 있다.",
      },
      {
        question: "토큰 제한(Context Window)이 LLM 활용에 미치는 영향은?",
        answer: "프롬프트와 생성 토큰의 합이 최대 컨텍스트 윈도우를 초과할 수 없으므로, 긴 문서 처리에 제한이 있다. 이를 해결하기 위해 청킹, 요약, 검색 기반 접근 등의 전략이 필요하다.",
      },
      {
        question: "Temperature 파라미터가 LLM 출력에 미치는 영향을 설명하시오.",
        answer: "Temperature는 Softmax의 확률 분포를 조절한다. 0에 가까우면 가장 확률 높은 토큰을 결정적으로 선택(정확성 중시)하고, 높으면 분포가 평탄해져 다양하고 창의적인 출력이 생성된다.",
      },
      {
        question: "Top-p(Nucleus Sampling)란 무엇이며 Temperature와 어떻게 다른가?",
        answer: "누적 확률이 p 이하인 토큰들만 후보로 두고 샘플링하는 방식이다. Temperature는 전체 분포의 형태를 바꾸지만, Top-p는 확률이 낮은 꼬리 토큰을 직접 잘라내어 더 안정적인 제어가 가능하다.",
      },
      {
        question: "LLM의 사전 학습에서 자기회귀(Autoregressive) 방식이란?",
        answer: "이전 토큰들의 조건부 확률로 다음 토큰을 하나씩 순차적으로 예측하며 학습하는 방식이다. P(x_t | x_1, ..., x_{t-1})를 최대화한다.",
      },
      {
        question: "LLM에서 시스템 프롬프트(System Prompt)의 역할은 무엇인가?",
        answer: "모델의 역할, 행동 규칙, 응답 스타일 등을 지정하는 메타 지시문이다. 대화 전체에 걸쳐 모델의 행동 양식을 일관되게 제어하는 데 사용된다.",
      },
    ],
    flashcards: [
      {
        question: "LLM(Large Language Model)이란?",
        answer: "대규모 텍스트 데이터로 사전 학습된 수십억~수천억 파라미터 규모의 언어 모델.",
      },
      {
        question: "BPE(Byte Pair Encoding)란?",
        answer: "가장 빈번한 문자/바이트 쌍을 반복 병합하여 서브워드 어휘를 구축하는 토크나이저 알고리즘.",
      },
      {
        question: "SentencePiece란?",
        answer: "언어 독립적 서브워드 토크나이저. 원시 텍스트를 직접 처리하며 공백도 특수 문자로 취급한다.",
      },
      {
        question: "프롬프트 엔지니어링이란?",
        answer: "LLM에서 원하는 출력을 얻기 위해 입력 프롬프트를 설계하고 최적화하는 기법.",
      },
      {
        question: "In-Context Learning(ICL)이란?",
        answer: "프롬프트에 예시를 포함하여 가중치 업데이트 없이 추론 시점에 태스크를 수행하게 하는 기법.",
      },
      {
        question: "RLHF란?",
        answer: "인간의 선호도 피드백으로 보상 모델을 학습하고, 이를 기반으로 LLM을 강화 학습으로 정렬(alignment)하는 기법.",
      },
      {
        question: "LoRA(Low-Rank Adaptation)란?",
        answer: "원래 가중치를 고정하고 저랭크 행렬만 학습하여 효율적으로 미세 조정하는 기법.",
      },
      {
        question: "양자화(Quantization)란?",
        answer: "모델 가중치의 정밀도를 낮춰(FP32→INT8/INT4) 모델 크기와 추론 비용을 절감하는 기법.",
      },
      {
        question: "RAG(Retrieval-Augmented Generation)란?",
        answer: "외부 문서를 검색하여 프롬프트에 추가한 후 LLM이 생성하는 방식. 최신 정보 활용과 환각 감소에 효과적.",
      },
      {
        question: "환각(Hallucination)이란?",
        answer: "LLM이 사실과 다르거나 존재하지 않는 정보를 그럴듯하게 생성하는 현상.",
      },
      {
        question: "토큰 제한(Context Window)이란?",
        answer: "LLM이 한 번에 처리할 수 있는 입력+출력 토큰의 최대 길이.",
      },
      {
        question: "Temperature란?",
        answer: "Softmax 확률 분포의 날카로움을 조절하는 파라미터. 낮으면 결정적, 높으면 다양한 출력.",
      },
      {
        question: "Top-p(Nucleus Sampling)란?",
        answer: "누적 확률이 p 이하인 토큰들만 후보로 두고 샘플링하는 디코딩 전략.",
      },
      {
        question: "Chain-of-Thought(CoT) 프롬프팅이란?",
        answer: "중간 추론 단계를 명시적으로 생성하도록 유도하여 복잡한 문제의 해결 성능을 높이는 프롬프트 기법.",
      },
      {
        question: "자기회귀(Autoregressive) 생성이란?",
        answer: "이전까지 생성된 토큰을 조건으로 다음 토큰을 하나씩 순차적으로 예측하는 생성 방식.",
      },
    ],
  },
};
