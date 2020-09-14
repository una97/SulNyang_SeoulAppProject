# SulNyang_SeoulAppProject
길냥이들을 보호를 위한 서울시, 시민단체, 시민들을 이어주는 어플리케이션

### 개발 환경
```
framework: ionic3, cordova
language: typescript
database: firebase
```
### 1. 시스템 구성도
<p align="center"><img src="https://user-images.githubusercontent.com/43545606/93047604-d7d86880-f697-11ea-8e36-695d67b1e9e5.png" width="500"></p>

사용자는 모바일 어플리케이션, 즉 안드로이드를 통해 앱에 접속하여 글을 작성하고 확인할 수 있습니다. 
데이터 베이스로 사용한 Firebase는 사용자 인증 시스템을 지원합니다. 
JSON 트리 구조를 이용하는 실시간 데이터베이스(Realtime Database)를 사용하여 채팅이 가능하고, 
게시글과 제보같은 데이터는 Firestore에 저장했습니다. 사진 업로드에는 Storage가 쓰였습니다.

### 2. 서비스 구조

<p align="center"><img src="https://user-images.githubusercontent.com/43545606/93047619-dd35b300-f697-11ea-8821-1c009fc7848b.png" width="500"></p>

### 4. 앱 실행영상 유튜브 링크

- 일반 사용자 ver 앱 실행 영상

https://youtu.be/02Am7Fxu0YU

- 관리자 ver 앱 실행 영상

https://youtu.be/eeej3VV96C4
