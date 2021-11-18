<div align="center">
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=000000" />
  <img src="https://img.shields.io/badge/-Java-007396?style=flat-square&logo=Java&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/ReactNative-61DAFB?style=flat-square&logo=React&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=Expo&logoColor=FFFFFF" />
  <br>
  <img src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat-square&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" />
  <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=Kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/-Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=%23ffffff" />
</div>

# 후유 : HOOYU

![hooyu_banner](README.assets/hooyu_banner.jpg)

**내 주변에 있는 사람들은 어떤 사람들일까? 어떤 생각을 가지고 살까?**

> 위치적으로 주변 사람들의 상태 메시지 및 게시물을 확인할 수 있는 서비스
>
> 나를 보여주고 싶은 10~20대들! 나의 상태를 공유하는 서비스
>
> 당신의 상태 메시지, 사진, 질문을 공유해보세요.

[HOOYU APP Download Link](https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/hooyu.apk)

<br>

## 📋 Stack

1. 이슈관리 : Jira

2. 형상관리 : Gitlab

3. 커뮤니케이션 : Mattetmost, Notion, Webex

4. 개발 환경

   + OS : Windows 10

   + IDE
     + IntelliJ IDEA Ultimate 212.5457.46
     + Visual Studio Code 1.62.2

   + Database

     + mariadb image **[10.7.1](https://hub.docker.com/layers/mariadb/library/mariadb/10.7.1/images/sha256-f8a4b6793fc07a26246d511968e9f6633be0d4a2b3c8226b0f3a4d629fb77ef4?context=explore)**

     + MySQL Workbench 8.0.22

   + Server : AWS EC2 (MobaXterm)
     + Ubuntu 20.04.3 LTS

5. 상세 사용

   + Backend 
     + Java (Open-JDK Corretto 11.0.13) 
     + Spring Boot 2.5.2
     + `swagger2`, `actuator`, `firebase`, `spring-cloud-starter-aws:2.2.5.RELEASE`
   + Frontend
     + React Native 0.64.2
     + Node.js 16.13.0
     + `expo 43.0.0`, `redux 4.1.2`, `reduxjs/toolkit 1.6.2`
   + AWS
     + EC2
     + S3

     + nginx/1.18.0 (Ubuntu)

     + jenkins2.303.2
   
     + Docker 20.10.10
   
     + kubernetes 1.22.3

<br>

## 🚀 Getting Started

### Prerequisites

+ Android OS

  Available only on Android OS

- NPM

  ```
  npm install npm@latest -g
  ```

+ Android Studio

  https://developer.android.com/studio

+ React Native

  ```
  npm i -g create-react-native-app
  ```

### Installation

1. Clone the repo

   ```
   https://lab.ssafy.com/s05-final/S05P31A101.git
   ```

2. Move to react native directory and install NPM packages

   ```
   npm install
   ```

3. Run emulator in Android Studio

   + Open 'ADK Manager' in Android Studio
   + Create your virtual device and run it

4. Run app in virtual device

   ```
   npm run android
   ```

<br>

## 🌈 Usage
|Splash|Main|User List|
|:-:|:-:|:-:|
|<img src="README.assets/Usage_1.png" alt="Second Image" width="300" />|<img src="README.assets/Usage_2.png" alt="First Image" width="300" />|<img src="README.assets/Usage_3.png" alt="First Image" width="300" />|

|Content Create|Profile_1|Profile_2|
|:-:|:-:|:-:|
|<img src="README.assets/Usage_4.png" alt="First Image" width="300" />|<img src="README.assets/Usage_5.png" alt="First Image" width="300" />|<img src="README.assets/Usage_6.png" alt="First Image" width="300" />|

<br>

## 🔨 Structure

### Architecture

![Architecture](README.assets/Architecture.PNG)

### ERD

![ERD](README.assets/ERD.PNG)

<br>

## 💬 Contact

[류현선](https://github.com/hs-ryu) - richman20486@gmail.com

[김승현](https://github.com/kevinkim-dev) - shkim2000@gmail.com

[나승호](https://github.com/qlfflwls5) - seungho.dev28@gmail.com

[박상욱](https://github.com/sangwook0613) - kvmoke@gmail.com

[최다윗](https://github.com/dawit95) - dawit0310@gmail.com
