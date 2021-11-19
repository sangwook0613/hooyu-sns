-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: whoyou
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB-1:10.6.4+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `exon` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKajxu4nty8agxhm29y31wxmvot` (`user_id`),
  CONSTRAINT `FKajxu4nty8agxhm29y31wxmvot` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (18,'2021-11-16 22:03:32.108709','2021-11-16 22:03:32.108709','pink','굳이',0,13),(19,'2021-11-16 22:15:17.964772','2021-11-16 22:15:17.964772','pink','undefined',0,14),(26,'2021-11-17 01:07:21.316879','2021-11-17 01:07:21.316879','#CDD1FF','안녕',0,13),(27,'2021-11-17 01:07:40.966945','2021-11-17 01:07:40.966945','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/5a1497d2-9198-4280-ae93-2acd52c68eacrn_image_picker_lib_temp_e17bb7de-773d-42e0-946f-b42a05e93e86.jpg',1,13),(28,'2021-11-17 01:10:19.416156','2021-11-17 01:10:19.416156','#E8AFFE','하잉',0,13),(29,'2021-11-17 12:00:06.138104','2021-11-17 12:00:06.138104','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/5e57165b-7bae-4f2f-b7c4-9060df2f12bbrn_image_picker_lib_temp_c8ee08a2-4550-459b-ac60-b8f9b8a2dd3a.jpg',1,13),(30,'2021-11-17 12:52:32.416880','2021-11-17 12:52:32.416880','','점심을 어디서 먹을까요?',2,13),(31,'2021-11-17 12:54:42.198457','2021-11-17 12:54:42.198457','','오늘 점심 어디서 먹을까요?',2,13),(38,'2021-11-17 13:09:29.054024','2021-11-17 13:09:29.054024','#FFD0D0','하이',0,15),(46,'2021-11-17 13:26:35.418171','2021-11-17 13:26:35.418171','','아아아아가느아가',2,13),(47,'2021-11-17 14:51:59.005366','2021-11-17 14:51:59.005366','#CDD1FF','드디어 학교가서 수업 듣는구나!\n친구들도 볼 수 있고 너무 설레고 신난다!',0,15),(52,'2021-11-17 15:20:06.196591','2021-11-17 15:20:06.196591','#FFD0D0','좋은 하루입니다!',0,1),(56,'2021-11-18 11:35:20.648680','2021-11-18 11:35:20.648680','#FFD0D0','사랑스러운 자몽이♡',0,8),(57,'2021-11-18 11:35:46.153758','2021-11-18 11:35:46.153758','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/91871486-5e33-415e-8cae-f8c2ffbcb2cfrn_image_picker_lib_temp_13b7057d-2923-4195-9f38-b464d1f9a75f.jpg',1,8),(58,'2021-11-18 11:36:53.814251','2021-11-18 11:36:53.814251','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/da27ad45-f2d0-4c40-bef4-9c556482b075rn_image_picker_lib_temp_bd2ba753-0e92-43af-8217-7cd721747897.jpg',1,8),(59,'2021-11-18 11:37:28.525430','2021-11-18 11:37:28.525430','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/fa257f71-8e1b-4f1f-8a25-a870fa0f77bcrn_image_picker_lib_temp_c7c5570f-fcd9-48f3-8f54-01fc6e5f8ee8.jpg',1,8),(60,'2021-11-18 11:38:36.281650','2021-11-18 11:38:36.281650','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/9a22d6ec-bf85-46d7-adcf-b7cffa37c2b6rn_image_picker_lib_temp_bc688432-fa65-4f6b-be5d-a2df24bc0b81.jpg',1,8),(61,'2021-11-18 11:39:10.754447','2021-11-18 11:39:10.754447','','자몽이는?',2,8),(62,'2021-11-18 11:39:24.266191','2021-11-18 11:39:24.266191','pink','행복한 하루~',0,17),(63,'2021-11-18 11:41:57.142564','2021-11-18 11:41:57.142564','#CDD1FF','Undefined Developer',0,14),(64,'2021-11-18 11:42:16.193086','2021-11-18 11:42:16.193086','','어디로 놀러갈까??',2,17),(65,'2021-11-18 11:43:02.986523','2021-11-18 11:43:02.986523','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/be8472cd-d553-4895-9f58-c323f3d0f6a6rn_image_picker_lib_temp_d0e6ce2a-7aa2-4ece-9224-8def29276ec8.jpg',1,17),(66,'2021-11-18 11:44:05.875394','2021-11-18 11:44:05.875394','pink','올해 안에 취업하자!',0,18),(67,'2021-11-18 11:44:42.783889','2021-11-18 11:44:42.783889','','워라밸 vs 연봉',2,18),(68,'2021-11-18 11:45:02.967213','2021-11-18 11:45:02.967213','pink','아침부터 계속 잠이 온다~~ ...',0,19),(69,'2021-11-18 11:45:11.249934','2021-11-18 11:45:11.249934','','대학원 vs 바로 취업',2,18),(70,'2021-11-18 11:45:47.541874','2021-11-18 11:45:47.541874','pink','반말하지 마세요!',0,20),(71,'2021-11-18 11:46:35.741301','2021-11-18 11:46:35.741301','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/62bb0205-bd31-4eee-8c34-5ae661f676cdrn_image_picker_lib_temp_ba2ae6aa-34d5-4f05-9574-25bf7ea2c1c0.jpg',1,14),(72,'2021-11-18 11:46:38.976164','2021-11-18 11:46:38.976164','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/889c5643-7e7f-4d67-8c5f-64350249ef43rn_image_picker_lib_temp_f81a2a1f-78a3-44da-8ae2-20abf9ad5d4a.jpg',1,20),(73,'2021-11-18 11:48:24.012924','2021-11-18 11:48:24.012924','','더 좋은곡은?',2,20),(74,'2021-11-18 11:48:59.092261','2021-11-18 11:48:59.092261','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/6b801c7a-6911-46a4-884e-f48470342d72rn_image_picker_lib_temp_763ba9d9-0110-4f16-939f-c65ff019f7ed.jpg',1,14),(75,'2021-11-18 11:49:23.016506','2021-11-18 11:49:23.016506','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/fa015357-a7c8-4151-951f-57b379bcf623rn_image_picker_lib_temp_42521f2c-e802-4f7d-84b8-d5528424dda4.jpg',1,14),(76,'2021-11-18 11:49:29.886309','2021-11-18 11:49:29.886309','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/f6718abc-485c-4195-b947-f0178dfb9288rn_image_picker_lib_temp_247c6a6b-98a7-418d-9946-d6bb66f61cb0.jpg',1,14),(77,'2021-11-18 11:51:17.745535','2021-11-18 11:51:17.745535','#DEBACC','행복한 하루!',0,7),(78,'2021-11-18 11:53:04.622132','2021-11-18 11:53:04.622132','#FFD0D0','저 내일 최종면접 봅니다!\n응원해주세요!!!',0,18),(80,'2021-11-18 11:54:40.090334','2021-11-18 11:54:40.090334','','정말 진심으로 아름다운 분이 주변에 있어요!!! 고백 할까요?',2,19),(81,'2021-11-18 11:56:56.806194','2021-11-18 11:56:56.806194','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/5fdd27be-057c-4d2a-a7cb-13c6c44405ebrn_image_picker_lib_temp_59d55c70-becc-4cc3-ac72-5d8b772845c9.jpg',1,18),(82,'2021-11-18 11:57:20.506136','2021-11-18 11:57:20.506136','pink','가을이구나...',0,21),(83,'2021-11-18 11:57:20.904632','2021-11-18 11:57:20.904632','','어떤 걸 마실까요?',2,7),(84,'2021-11-18 11:57:56.670146','2021-11-18 11:57:56.670146','#F9A996','가을은 언제 쓸쓸하구나..🍂',0,21),(85,'2021-11-18 11:58:57.970591','2021-11-18 11:58:57.970591','pink','오늘도 열일! 하지만 잠이 온다..',0,22),(86,'2021-11-18 11:59:12.217173','2021-11-18 11:59:12.217173','pink','레플 샀다!!!',0,23),(87,'2021-11-18 11:59:58.060986','2021-11-18 11:59:58.060986','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/fda02323-9f84-4604-97d9-c420585bc9f2rn_image_picker_lib_temp_cc3b7dc0-4c19-4cf8-84fa-88b95f297653.jpg',1,23),(88,'2021-11-18 12:01:13.303446','2021-11-18 12:01:13.303446','','이번시즌 EPL 우승팀은??',2,23),(89,'2021-11-18 12:02:49.662015','2021-11-18 12:02:49.662015','pink','돈이 많아서 깔리고 싶다!',0,24),(90,'2021-11-18 12:04:37.098074','2021-11-18 12:04:37.098074','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/d1d3de3e-9af5-4100-8f9d-515013b8ecbern_image_picker_lib_temp_0ea8a7b9-7887-49db-88c4-bdf60a76363f.jpg',1,24),(91,'2021-11-18 12:05:41.148800','2021-11-18 12:05:41.148800','#FBF997','들어와라 돈! 💰 💱 💵 ',0,24),(92,'2021-11-18 12:06:50.923789','2021-11-18 12:06:50.923789','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/4fc02b3c-b78f-4848-9097-ac5f621ff893rn_image_picker_lib_temp_4d231e6d-f57b-41d4-bcff-b71396e98847.jpg',1,22),(93,'2021-11-18 12:07:24.942064','2021-11-18 12:07:24.942064','#CDD1FF','나에게는 푸른 피가 흐른다',0,22),(94,'2021-11-18 12:08:08.492526','2021-11-18 12:08:08.492526','','여자친구 생일 선물',2,22),(95,'2021-11-18 12:10:10.365065','2021-11-18 12:10:10.365065','#CECECE','나이는 33\n취미는 등산\n차는 제네시스입니다~',0,22),(96,'2021-11-18 12:12:31.349658','2021-11-18 12:12:31.349658','pink','음악을 사랑하는 음악가입니다',0,25),(97,'2021-11-18 12:26:25.120539','2021-11-18 12:26:25.120539','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/7ec57030-1c02-48b0-bfeb-e01f4a42b3b9rn_image_picker_lib_temp_efa2c9a0-c37a-4241-a63b-a10d9ac6459d.jpg',1,25),(98,'2021-11-18 12:27:11.048831','2021-11-18 12:27:11.048831','','기타 색 추천해주세요',2,25),(99,'2021-11-18 12:28:47.559664','2021-11-18 12:28:47.559664','#F9A996','2021년 12월 25일\n홍대 라이브가가\n19:00 공연\n\n보러 와주세요',0,25),(100,'2021-11-18 12:32:56.251057','2021-11-18 12:32:56.251057','pink','시는 마음을 풍요롭게 합니다',0,26),(101,'2021-11-18 12:35:29.038506','2021-11-18 12:35:29.038506','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/3f557654-9302-49d2-aed3-f87a174a5d6arn_image_picker_lib_temp_78407c5b-c199-470f-95d2-44aec6c29db3.jpg',1,26),(102,'2021-11-18 12:35:37.969254','2021-11-18 12:35:37.969254','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/e40ab11c-fbb8-47cb-a4fa-119eeb12da00rn_image_picker_lib_temp_927ae0ee-45cc-49e1-b657-87e8126b85fa.jpg',1,26),(103,'2021-11-18 12:35:45.367554','2021-11-18 12:35:45.367554','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/fb464fb9-b6f1-41dd-8bc2-31f84c345c14rn_image_picker_lib_temp_8f5b5fa2-c985-4ef3-94c8-eda6e4e14f58.jpg',1,26),(104,'2021-11-18 12:35:52.299880','2021-11-18 12:35:52.299880','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/fae41e77-d902-4a33-9aec-0ad7d6f26ca1rn_image_picker_lib_temp_fac628bd-d35c-41e9-9e7e-16ecbe47037c.jpg',1,26),(105,'2021-11-18 12:36:33.424406','2021-11-18 12:36:33.424406','#CDD1FF','이정하 - 낮은 곳으로',0,26),(106,'2021-11-18 12:37:30.866167','2021-11-18 12:37:30.866167','#FBF997','강북구 독서 모임 참여하고 싶으신분\nseungho.test2@gmail.com\n편하게 연락주세요',0,26),(107,'2021-11-18 12:43:47.531558','2021-11-18 12:43:47.531558','pink','정국이 최고얏',0,27),(108,'2021-11-18 12:44:31.108882','2021-11-18 12:44:31.108882','#E8AFFE','요즘은 지민이 최애인 것 같기두...',0,27),(109,'2021-11-18 12:45:00.205218','2021-11-18 12:45:00.205218','#DEBACC','뷔님은 사람이 맞을까요..?\n\n천사..?',0,27),(110,'2021-11-18 12:45:28.864230','2021-11-18 12:45:28.864230','#FBF997','오늘 bts 무대 정말 최고다\n아미들 쏴리질러~!~!',0,27),(111,'2021-11-18 12:46:03.672571','2021-11-18 12:46:03.672571','','점심 어디서 먹을까요?',2,15),(112,'2021-11-18 12:49:21.843899','2021-11-18 12:49:21.843899','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/d7f20bbf-65b5-4507-80d0-37552435740frn_image_picker_lib_temp_400caeed-06ed-4841-976b-712563cf0d00.jpg',1,27),(113,'2021-11-18 12:49:28.957713','2021-11-18 12:49:28.957713','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/bd8e7945-4d1c-4c52-9e10-73c20f93dd79rn_image_picker_lib_temp_cfbc3ffe-67c9-4995-992e-45664ae19ce5.jpg',1,27),(114,'2021-11-18 12:49:35.624449','2021-11-18 12:49:35.624449','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/882a5f02-c5ae-406c-be98-5ce77a0e5504rn_image_picker_lib_temp_1a6dfd70-7ce9-47de-a9c7-b1ebd197d06e.jpg',1,27),(115,'2021-11-18 12:49:42.689486','2021-11-18 12:49:42.689486','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/b74d2304-9cb1-4239-98ef-f60dba7e8648rn_image_picker_lib_temp_107cd7c7-c4b8-48d3-8de3-3b872cb7b1af.jpg',1,27),(116,'2021-11-18 12:49:54.606839','2021-11-18 12:49:54.606839','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/f37f3f83-c140-464b-9c1e-44272a817c69rn_image_picker_lib_temp_7d01acc8-8ab3-440c-9c95-efe9a0c8f59a.jpg',1,27),(118,'2021-11-18 12:58:33.635216','2021-11-18 12:58:33.635216','pink','월드컵가자~~',0,28),(119,'2021-11-18 13:01:10.657037','2021-11-18 13:01:10.657037','pink','오늘은 노랑통닭!',0,29),(120,'2021-11-18 13:01:42.933260','2021-11-18 13:01:42.933260','#CDD1FF','오늘은 깐부치킨!',0,29),(121,'2021-11-18 13:01:58.630541','2021-11-18 13:01:58.630541','#F9A996','오늘은 BBQ!',0,29),(122,'2021-11-18 13:02:26.768200','2021-11-18 13:02:26.768200','#FBF997','오늘은 바른치킨!',0,29),(123,'2021-11-18 13:02:34.479517','2021-11-18 13:02:34.479517','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/96c12b15-66e0-4d10-8356-ea28fe29d3aern_image_picker_lib_temp_f1750212-2c9c-4869-8e1b-9e580c4282a7.jpg',1,29),(124,'2021-11-18 13:02:40.931710','2021-11-18 13:02:40.931710','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/d6533f97-bf4e-48ec-8596-cdb95294ad02rn_image_picker_lib_temp_8a688851-d26a-4187-ba4d-5126dd3e418e.jpg',1,29),(125,'2021-11-18 13:02:48.466273','2021-11-18 13:02:48.466273','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/e1854be7-aadf-4fcc-a088-6ca043b28684rn_image_picker_lib_temp_ee91c081-7a1c-4bf3-b096-e511d04e67ab.jpg',1,29),(126,'2021-11-18 13:03:17.140898','2021-11-18 13:03:17.140898','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/d8b42cec-2c2c-487b-abfd-9b687416ef28rn_image_picker_lib_temp_503e2193-c0f1-40c0-9524-f3d83aad3dac.jpg',1,29),(127,'2021-11-18 13:03:54.726152','2021-11-18 13:03:54.726152','','내일은 어디 치킨을 먹을까?',2,29),(128,'2021-11-18 13:11:01.987332','2021-11-18 13:11:01.987332','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/c1fb5b8a-b9c1-4a51-af6f-50d4a0ad75ffrn_image_picker_lib_temp_044e0470-00b1-4e67-9ea9-be8224c63d88.png',1,28),(129,'2021-11-18 13:12:22.750222','2021-11-18 13:12:22.750222','','오늘 최고의 골',2,28),(130,'2021-11-18 13:24:36.443086','2021-11-18 13:24:36.443086','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/f07f522b-f922-4c9d-b445-b49e868f2ddbrn_image_picker_lib_temp_fdfbbf60-aad5-4fcc-8069-842d5834ecc1.jpg',1,1),(131,'2021-11-18 13:24:47.452719','2021-11-18 13:24:47.452719','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/21ebc2a9-eff1-4095-a40c-1539674d20fbrn_image_picker_lib_temp_735ac2af-e5c7-4c01-b35b-1f877777de52.jpg',1,1),(132,'2021-11-18 13:25:52.032999','2021-11-18 13:25:52.032999','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/74190770-c9d6-43ee-a9d2-89ef2478d80arn_image_picker_lib_temp_456a87b4-c40c-49ed-8885-d3830142f60d.jpg',1,1),(133,'2021-11-18 13:28:06.917006','2021-11-18 13:28:06.917006','#CDD1FF','오기로 극뽁!',0,1),(134,'2021-11-18 13:30:04.087267','2021-11-18 13:30:04.087267','#FFD0D0','후유 최고❣',0,1),(135,'2021-11-18 13:31:34.069939','2021-11-18 13:31:34.069939','','최고의 멤버',2,1),(137,'2021-11-18 14:39:21.730718','2021-11-18 14:39:21.730718','pink','건들이지 마시오!',0,30),(138,'2021-11-18 14:52:53.690549','2021-11-18 14:52:53.690549','pink','그거 아세요.. 세상에서 집이 가장 안전한거!!',0,31),(139,'2021-11-18 14:58:39.241590','2021-11-18 14:58:39.241590','pink','진정한 고수는 말이 없지😎',0,32),(140,'2021-11-18 15:08:23.113019','2021-11-18 15:08:23.113019','pink','N서울타워',0,33),(141,'2021-11-18 15:13:12.035723','2021-11-18 15:13:12.035723','','https://t1.daumcdn.net/cfile/tistory/224AF73556BD3B4310',1,33),(142,'2021-11-18 15:15:16.411624','2021-11-18 15:15:16.411624','','남산타워 갈래?',2,33),(143,'2021-11-18 15:19:40.749222','2021-11-18 15:19:40.749222','#F9A996','배고파',0,15),(145,'2021-11-18 15:30:44.112068','2021-11-18 15:30:44.112068','pink','경북궁',0,34),(147,'2021-11-18 15:35:22.572472','2021-11-18 15:35:22.572472','','경복궁 갈래?',2,34),(149,'2021-11-18 16:04:48.984923','2021-11-18 16:04:48.984923','pink','happy',0,35),(150,'2021-11-18 16:55:56.498287','2021-11-18 16:55:56.498287','#E8AFFE','여행가고 싶다ㅠㅠ',0,37),(151,'2021-11-18 16:56:18.407788','2021-11-18 16:56:18.407788','#CDD1FF','코로나 잠잠해지면 여행가야지!!',0,37),(152,'2021-11-18 16:57:30.379237','2021-11-18 16:57:30.379237','','https://post-phinf.pstatic.net/MjAxOTExMTlfODQg/MDAxNTc0MTI4ODI2Nzc5.g38iop1WKxnF0MnJ_Zh_efuhHbOILrk0O3KIyyGyu2Qg.REr6pEOX1KzVJkklTG-dBsfqyAXD1hnzKTzlN8obPgkg.PNG/1.png?type=w1200',1,38),(153,'2021-11-18 16:58:52.264039','2021-11-18 16:58:52.264039','#FFD0D0','저랑 운동하실 분 여기로 오세요~~',0,38),(154,'2021-11-18 17:09:45.660066','2021-11-18 17:09:45.660066','#CDD1FF','바다가 너무 좋아>_<',0,39),(155,'2021-11-18 17:10:06.741221','2021-11-18 17:10:06.741221','#CDD1FF','오늘 조개구이 먹는다 얄루!!!',0,39),(156,'2021-11-18 20:32:54.922701','2021-11-18 20:32:54.922701','#CDD1FF','하하하',0,5),(157,'2021-11-18 20:33:14.283334','2021-11-18 20:33:14.283334','','https://whoyou-bucket.s3.ap-northeast-2.amazonaws.com/image/5b21cf2e-0342-4e87-aad7-d528be986c99rn_image_picker_lib_temp_7a012c97-191a-4c2c-8aec-267d0ef09ad7.jpg',1,5),(158,'2021-11-18 20:48:19.668574','2021-11-18 20:48:19.668574','','https://post-phinf.pstatic.net/MjAxOTA1MjNfMTA3/MDAxNTU4NTkxOTU5NDY2.yDUFe0DCRn8aluDcwIPFL2sCbCAhliLW4Hcx_pWEtkkg.WpZ7jX3O0yLwtAVwGyKi8xgE0IBxCo_-eU9tpGBENs8g.JPEG/%EA%B2%BD%ED%9A%8C%EB%A3%A83.jpg?type=w1200',1,34);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emotion`
--

DROP TABLE IF EXISTS `emotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emotion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content_emoji` varchar(255) DEFAULT NULL,
  `content_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc8gv90hounhnjh6cl22cxvf7c` (`content_id`),
  KEY `FKsi20n9shb9iik3bw13yb4y2py` (`user_id`),
  CONSTRAINT `FKc8gv90hounhnjh6cl22cxvf7c` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`),
  CONSTRAINT `FKsi20n9shb9iik3bw13yb4y2py` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=492 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emotion`
--

LOCK TABLES `emotion` WRITE;
/*!40000 ALTER TABLE `emotion` DISABLE KEYS */;
INSERT INTO `emotion` VALUES (1,'love',18,13),(4,'sad',26,13),(8,'sad',47,13),(12,'love',57,8),(13,'smile',56,8),(14,'smile',58,8),(15,'love',59,8),(16,'like',60,8),(17,'love',61,8),(18,'angry',71,14),(19,'smile',74,14),(20,'like',63,14),(21,'like',76,14),(22,'like',78,18),(23,'love',66,18),(24,'sad',80,18),(25,'amazing',68,18),(26,'smile',81,18),(27,'amazing',81,19),(28,'love',77,7),(29,'angry',83,7),(30,'like',78,19),(31,'sad',69,19),(32,'love',80,19),(33,'like',68,19),(34,'sad',85,22),(35,'smile',87,23),(36,'sad',86,23),(37,'amazing',92,22),(38,'like',103,26),(39,'like',102,26),(40,'like',101,26),(41,'like',104,26),(43,'like',100,26),(44,'love',109,27),(45,'love',108,27),(46,'love',107,27),(48,'smile',110,27),(49,'smile',116,27),(50,'love',115,27),(51,'love',114,27),(52,'like',113,27),(53,'love',112,27),(54,'love',128,28),(55,'like',131,1),(56,'like',132,1),(57,'like',130,1),(58,'smile',133,1),(59,'like',52,1),(60,'like',132,19),(61,'love',135,19),(62,'love',134,19),(63,'like',97,1),(64,'like',99,1),(65,'love',96,1),(66,'love',110,1),(67,'love',109,1),(68,'love',108,1),(69,'like',107,1),(70,'like',116,1),(71,'like',115,1),(72,'like',114,1),(73,'like',113,1),(74,'like',112,1),(75,'like',78,1),(76,'like',66,1),(77,'amazing',81,1),(78,'sad',69,1),(79,'like',67,1),(80,'like',94,1),(81,'amazing',92,1),(82,'angry',95,1),(83,'sad',93,1),(84,'sad',85,1),(85,'like',91,1),(86,'like',89,1),(87,'smile',90,1),(88,'like',68,1),(89,'love',80,1),(90,'like',129,29),(91,'smile',128,29),(93,'sad',84,29),(94,'sad',82,29),(95,'amazing',63,29),(96,'like',19,29),(97,'sad',76,29),(98,'sad',75,29),(99,'sad',74,29),(101,'angry',71,29),(102,'love',56,29),(103,'love',60,29),(104,'love',59,29),(105,'love',58,29),(106,'love',57,29),(112,'love',61,29),(113,'smile',122,29),(115,'smile',121,29),(116,'smile',120,29),(117,'smile',119,29),(118,'smile',126,29),(119,'love',134,1),(120,'smile',125,29),(121,'smile',124,29),(122,'smile',123,29),(123,'amazing',135,1),(124,'like',127,29),(125,'smile',80,29),(126,'sad',68,29),(127,'amazing',70,1),(128,'smile',91,29),(129,'like',72,1),(130,'like',89,29),(131,'smile',73,1),(132,'smile',90,29),(133,'like',78,29),(134,'like',66,29),(135,'amazing',81,29),(136,'sad',69,29),(137,'like',62,1),(138,'like',65,1),(139,'smile',95,29),(140,'like',64,1),(141,'amazing',93,29),(142,'like',85,29),(143,'smile',92,29),(144,'love',94,29),(145,'smile',110,29),(146,'like',47,1),(147,'smile',109,29),(148,'love',38,1),(149,'love',108,29),(150,'love',107,29),(152,'love',116,29),(154,'smile',115,29),(155,'love',114,29),(156,'love',113,29),(157,'love',112,29),(158,'like',83,1),(159,'love',134,29),(160,'smile',133,29),(161,'angry',52,29),(162,'amazing',132,29),(163,'amazing',131,29),(164,'like',130,29),(165,'love',77,1),(167,'like',135,29),(168,'like',106,29),(169,'sad',104,29),(170,'sad',103,29),(171,'sad',102,29),(172,'like',101,29),(173,'like',97,29),(175,'like',98,29),(177,'love',99,29),(179,'love',96,29),(180,'smile',29,29),(181,'sad',27,29),(182,'love',118,29),(183,'angry',70,29),(184,'angry',72,29),(185,'angry',73,29),(186,'smile',77,29),(188,'like',83,29),(190,'angry',62,29),(191,'sad',65,29),(192,'smile',64,29),(193,'sad',84,1),(194,'sad',82,1),(195,'smile',56,1),(197,'love',60,1),(198,'love',59,1),(199,'love',58,1),(200,'love',57,1),(201,'love',61,1),(202,'like',63,1),(203,'like',19,1),(204,'sad',76,1),(205,'sad',75,1),(206,'sad',74,1),(207,'angry',71,1),(208,'love',77,8),(210,'like',83,8),(211,'love',118,1),(212,'smile',128,1),(213,'like',129,1),(214,'like',28,1),(215,'like',26,1),(216,'like',18,1),(217,'smile',29,1),(218,'sad',27,1),(219,'like',46,1),(220,'amazing',137,1),(221,'love',129,13),(222,'like',128,13),(223,'like',118,13),(224,'amazing',116,13),(225,'love',110,13),(226,'smile',82,13),(227,'like',84,13),(229,'amazing',72,13),(230,'smile',73,13),(231,'sad',78,13),(232,'like',81,13),(233,'love',69,13),(234,'smile',95,13),(235,'angry',92,13),(236,'amazing',94,13),(238,'sad',65,13),(239,'angry',64,13),(240,'love',138,13),(241,'sad',137,13),(244,'smile',139,8),(247,'amazing',137,8),(248,'like',28,8),(249,'like',26,8),(250,'like',18,8),(252,'sad',27,8),(253,'smile',29,8),(254,'like',46,8),(255,'smile',31,8),(256,'smile',139,13),(257,'like',141,1),(259,'love',142,19),(260,'like',141,19),(261,'sad',80,15),(264,'smile',111,20),(265,'smile',111,23),(266,'sad',84,8),(267,'sad',82,8),(268,'smile',111,1),(269,'sad',76,8),(270,'sad',75,8),(271,'smile',74,8),(272,'smile',71,8),(273,'like',63,8),(274,'smile',19,8),(275,'sad',111,19),(276,'sad',86,8),(277,'sad',87,8),(278,'smile',111,8),(279,'love',62,8),(280,'like',65,8),(281,'like',64,8),(282,'smile',145,8),(284,'smile',147,8),(285,'like',118,8),(286,'smile',128,8),(287,'like',129,8),(288,'smile',111,24),(289,'like',99,8),(290,'like',97,8),(291,'sad',104,8),(292,'sad',103,8),(293,'sad',102,8),(294,'like',106,8),(295,'like',78,8),(296,'smile',66,8),(297,'smile',147,15),(298,'smile',81,8),(299,'smile',111,18),(300,'love',69,8),(301,'love',109,8),(302,'love',108,8),(303,'love',107,8),(304,'love',116,8),(305,'love',115,8),(306,'like',114,8),(307,'like',113,8),(308,'like',112,8),(309,'like',91,8),(310,'like',89,8),(311,'like',90,8),(312,'sad',138,8),(316,'sad',150,5),(317,'love',155,5),(318,'smile',154,5),(319,'sad',84,5),(320,'sad',82,5),(321,'smile',77,5),(323,'like',83,5),(324,'love',118,5),(325,'love',128,5),(326,'like',129,5),(327,'amazing',70,5),(328,'amazing',72,5),(329,'smile',73,5),(330,'smile',122,5),(331,'smile',121,5),(332,'like',120,5),(333,'like',119,5),(334,'smile',126,5),(335,'smile',125,5),(336,'like',124,5),(337,'like',123,5),(338,'like',127,5),(339,'like',106,5),(340,'like',105,5),(341,'amazing',100,5),(342,'like',104,5),(343,'like',103,5),(344,'like',102,5),(345,'like',101,5),(346,'amazing',63,5),(347,'smile',19,5),(348,'like',76,5),(349,'like',75,5),(350,'amazing',74,5),(351,'smile',71,5),(352,'love',145,5),(354,'smile',147,5),(356,'love',56,5),(357,'love',60,5),(358,'love',59,5),(359,'love',58,5),(360,'love',57,5),(361,'love',61,5),(362,'like',95,5),(363,'amazing',93,5),(364,'sad',85,5),(365,'like',92,5),(366,'like',94,5),(367,'like',99,5),(368,'like',96,5),(369,'like',97,5),(370,'like',98,5),(371,'like',78,5),(372,'smile',66,5),(373,'like',81,5),(374,'sad',69,5),(375,'like',67,5),(376,'love',134,5),(377,'smile',133,5),(378,'like',52,5),(379,'amazing',132,5),(380,'smile',131,5),(381,'like',130,5),(382,'like',135,5),(383,'sad',86,5),(384,'sad',87,5),(385,'smile',88,5),(386,'smile',91,5),(387,'smile',89,5),(388,'like',90,5),(389,'like',62,5),(390,'like',65,5),(391,'like',64,5),(392,'smile',151,5),(393,'smile',152,5),(394,'like',153,5),(395,'smile',140,5),(396,'like',141,5),(397,'love',142,5),(398,'smile',98,19),(399,'like',97,19),(400,'love',127,19),(401,'sad',126,19),(402,'angry',122,19),(403,'like',76,19),(404,'sad',63,19),(405,'like',84,19),(406,'smile',129,19),(407,'like',128,19),(408,'like',118,19),(409,'love',56,19),(410,'love',64,19),(411,'like',88,19),(412,'like',86,19),(413,'like',106,19),(414,'like',98,1),(415,'love',116,19),(416,'like',127,1),(417,'smile',122,1),(418,'smile',126,1),(419,'like',86,1),(420,'sad',87,1),(421,'like',88,1),(422,'like',106,1),(423,'like',104,1),(424,'like',102,1),(425,'like',103,1),(426,'like',101,1),(427,'like',105,1),(428,'like',100,1),(429,'like',147,1),(430,'love',142,1),(431,'smile',140,1),(432,'like',143,1),(433,'love',138,1),(434,'smile',139,1),(436,'like',151,13),(437,'love',145,1),(438,'smile',155,13),(439,'love',153,13),(440,'love',152,13),(441,'like',99,13),(442,'like',97,13),(443,'like',98,13),(444,'like',91,13),(445,'love',90,13),(446,'like',122,13),(447,'like',126,13),(448,'like',127,13),(449,'smile',70,13),(450,'like',86,13),(451,'like',87,13),(452,'like',88,13),(453,'like',62,13),(454,'love',134,13),(455,'like',132,13),(456,'like',135,13),(457,'like',106,13),(458,'love',104,13),(459,'love',77,13),(461,'like',83,13),(462,'like',63,13),(463,'like',76,13),(464,'like',158,1),(465,'love',158,19),(466,'like',145,15),(467,'love',158,15),(468,'love',140,15),(469,'like',141,15),(470,'love',142,15),(471,'angry',63,15),(472,'like',76,15),(473,'like',91,15),(474,'amazing',90,15),(475,'smile',56,15),(476,'love',60,15),(477,'love',61,15),(478,'like',122,15),(479,'like',126,15),(480,'like',127,15),(481,'smile',110,15),(482,'love',116,15),(483,'like',99,15),(484,'like',97,15),(485,'sad',84,15),(486,'like',106,15),(487,'love',104,15),(488,'like',118,15),(489,'love',128,15),(490,'like',129,15),(491,'like',68,15);
/*!40000 ALTER TABLE `emotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fcm_token`
--

DROP TABLE IF EXISTS `fcm_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fcm_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `long_time` bit(1) DEFAULT NULL,
  `push_one` datetime(6) DEFAULT NULL,
  `push_three` datetime(6) DEFAULT NULL,
  `push_two` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8u9xsmd3agc2nn80tb16ouph4` (`user_id`),
  CONSTRAINT `FK8u9xsmd3agc2nn80tb16ouph4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fcm_token`
--

LOCK TABLES `fcm_token` WRITE;
/*!40000 ALTER TABLE `fcm_token` DISABLE KEYS */;
INSERT INTO `fcm_token` VALUES (1,'2021-11-16 21:25:34.919508','2021-11-18 20:48:26.618539','\0','2021-11-18 23:01:12.087394','2021-11-23 13:54:16.395409','2021-11-18 23:48:26.398814','cXVK40xSSXWKmgW7Tcqeme:APA91bFsik8nbUrw6mxdNktAj3md1WxTuMOUNqwYj-_Mo9GtmfPi8_5GCUbAu60tf95p2UGCOAQMzuqVZLPHk2tWMI790hppUKTD-Z34DWUO4FXNYqPyKVRV-QaqolW6shRFrowOM9cV',1),(5,'2021-11-16 21:30:35.012872','2021-11-18 20:33:14.286951','\0',NULL,'2021-11-23 20:33:14.286772',NULL,'eWaHxReDRcmF_xIaj_1iDW:APA91bHbWmATgcVnA98OaLUwCIBOAlJUJ4jB5dPRjfBctzkipDLFgD65GDw7ekRvEfDygwlsLtPWcEdlawTtTkidRjdW6HUsXrd8s5twPaeipVEZNdG_-hXqBnh-z3UKG8sQmNV-Tdec',5),(7,'2021-11-16 21:32:48.029223','2021-11-18 20:53:31.495859','\0','2021-11-18 23:51:16.248590','2021-11-23 20:53:31.495705',NULL,'fE1qHeL4T_uiltK2UVJJbL:APA91bEVzdsxF7EioEWUh1v2MR3vp9I9J-YuJwtJWatfcXa54QWhHpSIR5M41jLUQPOSl2hiN4bBnfJlkiMc-LmONXOs8Ja8yV2Sk3TZRSk-Kdw083wxaxCLHH_SnTZrDVn8GEsyC8E9',7),(8,'2021-11-16 21:38:14.639293','2021-11-18 14:35:00.347663','\0','2021-11-18 17:35:00.224718','2021-11-23 11:39:10.762974',NULL,'cwIZtjcURdW9UhMp9InX6L:APA91bE8C8v3zTKOEQIZMnspBgOU9TEv005vNCbqyWmpUvsZHO0dLP_Xx0FVX8eMcmLRZkY9XMrrLxAeM1oIHYg-v-2KRoTalWrt32xV3wg3rMsg7-FjhxvXx1UmewiBjiL0KZbV3fxx',8),(13,'2021-11-16 22:02:27.671916','2021-11-18 20:48:26.163758','\0','2021-11-18 23:00:24.162978','2021-11-22 13:26:35.423064','2021-11-18 23:48:25.943491','fE1qHeL4T_uiltK2UVJJbL:APA91bEVzdsxF7EioEWUh1v2MR3vp9I9J-YuJwtJWatfcXa54QWhHpSIR5M41jLUQPOSl2hiN4bBnfJlkiMc-LmONXOs8Ja8yV2Sk3TZRSk-Kdw083wxaxCLHH_SnTZrDVn8GEsyC8E9',13),(14,'2021-11-16 22:14:41.559841','2021-11-18 11:49:29.889687','\0',NULL,'2021-11-23 11:49:29.889445',NULL,'cwIZtjcURdW9UhMp9InX6L:APA91bE8C8v3zTKOEQIZMnspBgOU9TEv005vNCbqyWmpUvsZHO0dLP_Xx0FVX8eMcmLRZkY9XMrrLxAeM1oIHYg-v-2KRoTalWrt32xV3wg3rMsg7-FjhxvXx1UmewiBjiL0KZbV3fxx',14),(15,'2021-11-16 23:43:37.458920','2021-11-18 20:51:16.488997','\0','2021-11-18 23:51:16.283039','2021-11-23 15:36:01.878355','2021-11-18 18:34:47.128961','f9IOcVDhRsO1LJGYma1HtC:APA91bH9JtfuNkzHTxXKqa4niMmLLeePlqvVB8U6TvNUEbrUqdCsw7XvQoagrMLLC-wO0g-DXt8Xw12SZ89-0aCkSGAXlsjRmicGuBjk42npsfMTiHW2Kzl_oLk8UaUYLhxhxx1GL7am',15),(17,'2021-11-18 11:36:00.517752','2021-11-18 20:49:54.894521','\0','2021-11-18 23:49:54.675968','2021-11-23 11:43:02.990139',NULL,'fE1qHeL4T_uiltK2UVJJbL:APA91bEVzdsxF7EioEWUh1v2MR3vp9I9J-YuJwtJWatfcXa54QWhHpSIR5M41jLUQPOSl2hiN4bBnfJlkiMc-LmONXOs8Ja8yV2Sk3TZRSk-Kdw083wxaxCLHH_SnTZrDVn8GEsyC8E9',17),(18,'2021-11-18 11:42:35.603002','2021-11-18 15:44:51.337725','\0','2021-11-18 18:44:51.126644','2021-11-23 11:56:56.809407','2021-11-18 14:54:46.387813','f1vi8Hn4QL6TY4getdG9fM:APA91bGM6xUqGgq8gXaOUkfoYRAcgQ7duHR8RhzGsMCrg32t8mNVjqWllqTcXBSk68USZq1DgNDBDeNK0DPyDByovJtfOZNIcWo5ftgpd1BP6x4M3CrUF4R-cok5JXsGvt6d-TEtkbY5',18),(19,'2021-11-18 11:43:33.086464','2021-11-18 20:33:02.485726','\0','2021-11-18 23:32:09.832941','2021-11-23 11:54:40.096595','2021-11-18 23:33:02.275983','eXAbsHwPQceDfocG2kYugL:APA91bHWeZaqGwaaEd3W2VCOvRJhPaxINg4rEk5-KH00OZQn4Fmjq3O722B8j3ymyO_bnuX1ye2Wk3FvLg9UqCy3fvlOfck2qPSYvj5WXCT_3ao-PdTFaAN0vxRP7xh_SA0Fsod3axet',19),(20,'2021-11-18 11:43:57.371177','2021-11-18 20:50:33.344666','\0','2021-11-18 23:50:33.120088','2021-11-23 11:48:24.018067',NULL,'fE1qHeL4T_uiltK2UVJJbL:APA91bEVzdsxF7EioEWUh1v2MR3vp9I9J-YuJwtJWatfcXa54QWhHpSIR5M41jLUQPOSl2hiN4bBnfJlkiMc-LmONXOs8Ja8yV2Sk3TZRSk-Kdw083wxaxCLHH_SnTZrDVn8GEsyC8E9',20),(21,'2021-11-18 11:56:53.321093','2021-11-18 11:57:56.673354','\0',NULL,'2021-11-23 11:57:56.673211',NULL,'cwIZtjcURdW9UhMp9InX6L:APA91bE8C8v3zTKOEQIZMnspBgOU9TEv005vNCbqyWmpUvsZHO0dLP_Xx0FVX8eMcmLRZkY9XMrrLxAeM1oIHYg-v-2KRoTalWrt32xV3wg3rMsg7-FjhxvXx1UmewiBjiL0KZbV3fxx',21),(22,'2021-11-18 11:58:09.226572','2021-11-18 12:10:10.367998','\0','2021-11-18 14:59:00.170198','2021-11-23 12:10:10.367868',NULL,'f1vi8Hn4QL6TY4getdG9fM:APA91bGM6xUqGgq8gXaOUkfoYRAcgQ7duHR8RhzGsMCrg32t8mNVjqWllqTcXBSk68USZq1DgNDBDeNK0DPyDByovJtfOZNIcWo5ftgpd1BP6x4M3CrUF4R-cok5JXsGvt6d-TEtkbY5',22),(23,'2021-11-18 11:58:18.956849','2021-11-18 13:39:29.205338','\0','2021-11-18 16:39:28.983261','2021-11-23 12:01:13.309900',NULL,'cBA2-knwQC2YBjlL5W7sf9:APA91bHsCujS3ugeNzOaKpXFN1K90h73zypqfP6gqAR-ZVMiXNpIZMWlH0fsDfuVKVDTiNq68g6sOH3dEObRAsaXem5NR-nvgccsqWTZEB2HHDYiop8FbrqziBE4kfA-8CUPGMp0w9p0',23),(24,'2021-11-18 12:01:39.077627','2021-11-18 15:44:23.561715','\0','2021-11-18 18:44:23.459577','2021-11-23 12:05:41.151782',NULL,'cKy1myqaSnK1X8n0NOsmwF:APA91bEqR7e-Mx28QC9NWkE2bZJbd6fYF_eZ-oZhDdwvyFFBd0BjRd6kw0PUCZvslcyIpAiPxpdGY2ZcmiaIs8-B5qnJOTdvfb8HCt0LTJDIr6AwMfDgaDgoA0_FC2VCXjsWUUf-2Gsh',24),(25,'2021-11-18 12:11:15.045600','2021-11-18 12:28:47.562726','\0',NULL,'2021-11-23 12:28:47.562578',NULL,'f1vi8Hn4QL6TY4getdG9fM:APA91bGM6xUqGgq8gXaOUkfoYRAcgQ7duHR8RhzGsMCrg32t8mNVjqWllqTcXBSk68USZq1DgNDBDeNK0DPyDByovJtfOZNIcWo5ftgpd1BP6x4M3CrUF4R-cok5JXsGvt6d-TEtkbY5',25),(26,'2021-11-18 12:31:04.710448','2021-11-18 12:37:30.868933','\0',NULL,'2021-11-23 12:37:30.868811',NULL,'f1vi8Hn4QL6TY4getdG9fM:APA91bGM6xUqGgq8gXaOUkfoYRAcgQ7duHR8RhzGsMCrg32t8mNVjqWllqTcXBSk68USZq1DgNDBDeNK0DPyDByovJtfOZNIcWo5ftgpd1BP6x4M3CrUF4R-cok5JXsGvt6d-TEtkbY5',26),(27,'2021-11-18 12:39:29.282441','2021-11-18 12:49:54.609685','\0',NULL,'2021-11-23 12:49:54.609570',NULL,'f1vi8Hn4QL6TY4getdG9fM:APA91bGM6xUqGgq8gXaOUkfoYRAcgQ7duHR8RhzGsMCrg32t8mNVjqWllqTcXBSk68USZq1DgNDBDeNK0DPyDByovJtfOZNIcWo5ftgpd1BP6x4M3CrUF4R-cok5JXsGvt6d-TEtkbY5',27),(28,'2021-11-18 12:56:02.244775','2021-11-18 13:37:45.074900','\0',NULL,'2021-11-23 13:12:22.754869',NULL,'cBA2-knwQC2YBjlL5W7sf9:APA91bHsCujS3ugeNzOaKpXFN1K90h73zypqfP6gqAR-ZVMiXNpIZMWlH0fsDfuVKVDTiNq68g6sOH3dEObRAsaXem5NR-nvgccsqWTZEB2HHDYiop8FbrqziBE4kfA-8CUPGMp0w9p0',28),(29,'2021-11-18 13:00:47.008828','2021-11-18 14:20:07.859606','\0','2021-11-18 17:20:07.462708','2021-11-23 13:03:54.731039',NULL,'cwIZtjcURdW9UhMp9InX6L:APA91bE8C8v3zTKOEQIZMnspBgOU9TEv005vNCbqyWmpUvsZHO0dLP_Xx0FVX8eMcmLRZkY9XMrrLxAeM1oIHYg-v-2KRoTalWrt32xV3wg3rMsg7-FjhxvXx1UmewiBjiL0KZbV3fxx',29),(30,'2021-11-18 16:04:06.129412','2021-11-18 19:05:20.771347','\0','2021-11-18 22:05:20.370330','2021-11-23 16:04:48.995393',NULL,'dJSkEISQTzm803UkfojVxg:APA91bEuzc2O7Z-WkvqHd6lzXwTG0p-IFh_6RbAmWccuHvWawGO-A5fAnSSjv1rcIKwa1S3Q5Jkd0MhT79npFtXTlS8PMke1z9E4jJTkb9qKl_jkxjaIpKcanE8wXgOgqKd_iiJ8Gosz',35),(31,'2021-11-18 16:10:35.267028','2021-11-18 16:10:35.267028','\0',NULL,NULL,NULL,'cwNqh71lRp2TgDKBd74XDa:APA91bHQPLawDivqjF2Ri_wP5aYFznaSG-2fcAWsWa_LcfbJgUZO4beubojk3G1vvjlJFvKiijtcmFZXfWkAFaBcpiqvOmNCChAI81-6I0XI7epPtrQB2o97SVO7jqUpWA9KoaNgf3L2',36);
/*!40000 ALTER TABLE `fcm_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `FKeua4vn06qu0iq9d32qnmuhqkl` (`user_id`),
  CONSTRAINT `FKeua4vn06qu0iq9d32qnmuhqkl` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'2021-11-16 21:25:34.698164','2021-11-18 20:56:49.769021',37.627076,127.023749,1),(5,'2021-11-16 21:30:34.817579','2021-11-18 20:54:13.491801',37.499951,126.950574,5),(7,'2021-11-16 21:32:47.027741','2021-11-18 20:53:43.448012',37.390068,126.930378,7),(8,'2021-11-16 21:38:14.477763','2021-11-18 16:06:35.045912',37.558460,126.838133,8),(13,'2021-11-16 22:02:27.279198','2021-11-18 20:56:31.076641',37.390061,126.930390,13),(14,'2021-11-16 22:14:41.285950','2021-11-18 11:49:44.200843',37.498905,126.865597,14),(15,'2021-11-16 23:43:37.315109','2021-11-18 20:53:56.390490',37.607847,127.137316,15),(17,'2021-11-18 11:36:00.101945','2021-11-18 20:49:54.646184',37.389925,126.930387,17),(18,'2021-11-18 11:42:35.295696','2021-11-18 15:45:57.378900',37.584090,127.065330,18),(19,'2021-11-18 11:43:32.971195','2021-11-18 20:56:03.896450',37.665767,127.041540,19),(20,'2021-11-18 11:43:57.058771','2021-11-18 20:50:33.090380',37.389902,126.930384,20),(21,'2021-11-18 11:56:53.203989','2021-11-18 11:58:43.094308',37.479012,126.951813,21),(22,'2021-11-18 11:58:09.069152','2021-11-18 12:10:21.342890',37.619100,126.927200,22),(23,'2021-11-18 11:58:18.714146','2021-11-18 15:47:16.863107',37.500170,127.132330,23),(24,'2021-11-18 12:01:38.974657','2021-11-18 15:47:37.615011',37.376356,127.110357,24),(25,'2021-11-18 12:11:14.669816','2021-11-18 12:29:48.290766',37.418320,127.068460,25),(26,'2021-11-18 12:31:04.468156','2021-11-18 12:38:15.314077',37.553310,126.913120,26),(27,'2021-11-18 12:39:29.091542','2021-11-18 13:05:34.378585',37.657160,126.858980,27),(28,'2021-11-18 12:56:01.995545','2021-11-18 13:50:57.099913',37.477101,126.981519,28),(29,'2021-11-18 13:00:46.914269','2021-11-18 14:34:32.258340',37.479012,126.896350,29),(30,'2021-11-18 14:34:33.891802','2021-11-18 14:41:09.947377',37.549129,126.993842,30),(31,'2021-11-18 14:46:57.738980','2021-11-18 14:56:23.207963',37.539129,126.983842,31),(32,'2021-11-18 14:57:21.340764','2021-11-18 15:02:05.600836',37.559129,126.999842,32),(33,'2021-11-18 15:03:40.413277','2021-11-18 15:28:30.407593',37.551212,126.988216,33),(34,'2021-11-18 15:24:50.617764','2021-11-18 15:29:54.906109',37.579634,126.977009,34),(35,'2021-11-18 16:04:05.923681','2021-11-18 20:56:39.181336',37.608033,127.137300,35),(36,'2021-11-18 16:10:35.202604','2021-11-18 16:10:35.202604',0.000000,0.000000,36),(37,'2021-11-18 16:49:00.726198','2021-11-18 16:58:19.595171',37.314337,126.835793,37),(38,'2021-11-18 16:50:04.221333','2021-11-18 17:00:58.195146',37.263488,126.996563,38),(39,'2021-11-18 16:50:54.055447','2021-11-18 17:12:02.153621',37.381974,126.654467,39);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_zone`
--

DROP TABLE IF EXISTS `private_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `private_zone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKh3wybu1l6f9rgqdlxqo4c8gou` (`user_id`),
  CONSTRAINT `FKh3wybu1l6f9rgqdlxqo4c8gou` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_zone`
--

LOCK TABLES `private_zone` WRITE;
/*!40000 ALTER TABLE `private_zone` DISABLE KEYS */;
INSERT INTO `private_zone` VALUES (1,37.389913,126.930385,'집',13),(3,37.549129,126.993842,'집',30),(4,37.539129,126.983842,'집',31),(5,37.559129,126.999842,'집',32);
/*!40000 ALTER TABLE `private_zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_time`
--

DROP TABLE IF EXISTS `record_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record_time` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_at` datetime(6) DEFAULT NULL,
  `recent_at` datetime(6) DEFAULT NULL,
  `status_at` datetime(6) DEFAULT NULL,
  `survey_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_time`
--

LOCK TABLES `record_time` WRITE;
/*!40000 ALTER TABLE `record_time` DISABLE KEYS */;
INSERT INTO `record_time` VALUES (1,'2021-11-18 13:25:52.032999','2021-11-18 13:54:16.384402','2021-11-18 13:30:04.087267','2021-11-18 13:31:34.069939'),(2,NULL,'2021-11-16 21:37:06.628606',NULL,NULL),(3,NULL,'2021-11-16 21:48:21.532399',NULL,NULL),(4,NULL,'2021-11-16 21:31:32.411120',NULL,NULL),(5,'2021-11-18 20:33:14.283334','2021-11-18 20:33:14.283334','2021-11-18 20:32:54.922701',NULL),(6,NULL,'2021-11-16 21:32:08.038796',NULL,NULL),(7,NULL,'2021-11-18 20:53:31.487584','2021-11-18 11:51:17.745535','2021-11-18 11:57:20.904632'),(8,'2021-11-18 11:38:36.281650','2021-11-18 11:39:10.754447','2021-11-18 11:35:20.648680','2021-11-18 11:39:10.754447'),(9,NULL,'2021-11-16 21:50:24.025672',NULL,NULL),(10,NULL,'2021-11-16 21:51:05.080080',NULL,NULL),(11,NULL,'2021-11-16 21:52:07.955327',NULL,NULL),(12,NULL,'2021-11-16 21:52:56.182558',NULL,NULL),(13,'2021-11-17 12:00:06.138104','2021-11-17 13:26:35.418171','2021-11-17 01:10:19.416156','2021-11-17 13:26:35.418171'),(14,'2021-11-18 11:49:29.886309','2021-11-18 11:49:29.886309','2021-11-18 11:41:57.142564',NULL),(15,NULL,'2021-11-18 15:36:01.871815','2021-11-18 15:19:40.749222','2021-11-18 12:46:03.672571'),(16,NULL,'2021-11-17 00:12:17.382626',NULL,NULL),(17,'2021-11-18 11:43:02.986523','2021-11-18 11:43:02.986523','2021-11-18 11:39:24.266191','2021-11-18 11:42:16.193086'),(18,'2021-11-18 11:56:56.806194','2021-11-18 11:56:56.806194','2021-11-18 11:53:04.622132','2021-11-18 11:45:11.249934'),(19,NULL,'2021-11-18 11:54:40.090334','2021-11-18 11:45:02.967213','2021-11-18 11:54:40.090334'),(20,'2021-11-18 11:46:38.976164','2021-11-18 11:48:24.012924','2021-11-18 11:45:47.541874','2021-11-18 11:48:24.012924'),(21,NULL,'2021-11-18 11:57:56.670146','2021-11-18 11:57:56.670146',NULL),(22,'2021-11-18 12:06:50.923789','2021-11-18 12:10:10.365065','2021-11-18 12:10:10.365065','2021-11-18 12:08:08.492526'),(23,'2021-11-18 11:59:58.060986','2021-11-18 12:01:13.303446','2021-11-18 11:59:12.217173','2021-11-18 12:01:13.303446'),(24,'2021-11-18 12:04:37.098074','2021-11-18 12:05:41.148800','2021-11-18 12:05:41.148800',NULL),(25,'2021-11-18 12:26:25.120539','2021-11-18 12:28:47.559664','2021-11-18 12:28:47.559664','2021-11-18 12:27:11.048831'),(26,'2021-11-18 12:35:52.299880','2021-11-18 12:37:30.866167','2021-11-18 12:37:30.866167',NULL),(27,'2021-11-18 12:49:54.606839','2021-11-18 12:49:54.606839','2021-11-18 12:45:28.864230',NULL),(28,'2021-11-18 13:11:01.987332','2021-11-18 13:12:22.750222','2021-11-18 12:58:33.635216','2021-11-18 13:12:22.750222'),(29,'2021-11-18 13:03:17.140898','2021-11-18 13:03:54.726152','2021-11-18 13:02:26.768200','2021-11-18 13:03:54.726152'),(30,NULL,'2021-11-18 14:39:21.730718','2021-11-18 14:39:21.730718',NULL),(31,NULL,'2021-11-18 14:52:53.690549','2021-11-18 14:52:53.690549',NULL),(32,NULL,'2021-11-18 14:58:39.241590','2021-11-18 14:58:39.241590',NULL),(33,'2021-11-18 15:13:12.035723','2021-11-18 15:15:16.411624','2021-11-18 15:08:23.113019','2021-11-18 15:15:16.411624'),(34,'2021-11-18 20:48:19.668574','2021-11-18 20:48:19.668574','2021-11-18 15:30:44.112068','2021-11-18 15:35:22.572472'),(35,NULL,'2021-11-18 16:04:48.984923','2021-11-18 16:04:48.984923',NULL),(36,NULL,NULL,NULL,NULL),(37,NULL,'2021-11-18 16:56:18.407788','2021-11-18 16:56:18.407788',NULL),(38,'2021-11-18 16:57:30.379237','2021-11-18 16:58:52.264039','2021-11-18 16:58:52.264039',NULL),(39,NULL,'2021-11-18 17:10:06.741221','2021-11-18 17:10:06.741221',NULL);
/*!40000 ALTER TABLE `record_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reported_content`
--

DROP TABLE IF EXISTS `reported_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reported_content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `content_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhhagq7yi5k1q4yli69t24k1oc` (`content_id`),
  KEY `FK7lkjfr505rakff3y6u25abupc` (`user_id`),
  CONSTRAINT `FK7lkjfr505rakff3y6u25abupc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKhhagq7yi5k1q4yli69t24k1oc` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reported_content`
--

LOCK TABLES `reported_content` WRITE;
/*!40000 ALTER TABLE `reported_content` DISABLE KEYS */;
INSERT INTO `reported_content` VALUES (1,'2021-11-18 15:11:43.020456','2021-11-18 15:11:43.020456','유해 게시물',139,13);
/*!40000 ALTER TABLE `reported_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_content_answer`
--

DROP TABLE IF EXISTS `survey_content_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_content_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) DEFAULT NULL,
  `content_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7tum3vpuojqarfjfsyxvslxk8` (`content_id`),
  KEY `FK6bednu59x5t50harq9q2osju8` (`user_id`),
  CONSTRAINT `FK6bednu59x5t50harq9q2osju8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK7tum3vpuojqarfjfsyxvslxk8` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_content_answer`
--

LOCK TABLES `survey_content_answer` WRITE;
/*!40000 ALTER TABLE `survey_content_answer` DISABLE KEYS */;
INSERT INTO `survey_content_answer` VALUES (5,'학식',30,13),(6,'교직원식당',30,13),(7,'학식당',31,13),(8,'교직원식당',31,13),(9,'학식당',31,15),(10,'아아다냐다앙',46,13),(11,'카카카캌칻',46,13),(18,'너무 귀엽다!',61,8),(19,'너무 사랑스럽다!',61,8),(20,'바다',64,17),(21,'산',64,17),(22,'워라밸',67,18),(23,'연봉',67,18),(24,'대학원',69,18),(25,'취업',69,18),(26,'달이뜨면',73,20),(27,'명사수',73,20),(28,'Hooyou 앱을 통해 고백',80,19),(29,'선물과 함께 데이트 신청',80,19),(30,'같은 취미 시작으로 가까워지기',80,19),(31,'조용히 구석에서 솔로 있는다.',80,19),(32,'Hooyou 앱을 통해 고백',80,18),(33,'아메리카노',83,7),(34,'딸기스무디',83,7),(35,'얼그레이티',83,7),(36,'취업',69,19),(37,'첼시',88,23),(38,'맨시티',88,23),(39,'리버풀',88,23),(40,'아스날',88,23),(41,'목걸이',94,22),(42,'팔찌',94,22),(43,'블랙',98,25),(44,'레드',98,25),(45,'블루',98,25),(46,'화이트',98,25),(47,'우드',98,25),(48,'학식',111,15),(49,'교직원 식당',111,15),(52,'교촌',127,29),(53,'BHC',127,29),(54,'푸라닭',127,29),(55,'손흥민',129,28),(56,'정우영',129,28),(57,'이재성',129,28),(58,'류현선',135,1),(59,'김승현',135,1),(60,'나승호',135,1),(61,'박상욱',135,1),(62,'최다윗',135,1),(63,'나승호',135,19),(64,'블랙',98,1),(65,'취업',69,1),(66,'워라밸',67,1),(67,'목걸이',94,1),(68,'Hooyou 앱을 통해 고백',80,1),(69,'손흥민',129,29),(70,'너무 귀엽다!',61,29),(71,'Hooyou 앱을 통해 고백',80,29),(72,'명사수',73,1),(73,'취업',69,29),(74,'바다',64,1),(75,'팔찌',94,29),(77,'딸기스무디',83,1),(78,'최다윗',135,29),(79,'우드',98,29),(80,'카카카캌칻',46,29),(81,'명사수',73,29),(82,'딸기스무디',83,29),(83,'바다',64,29),(84,'너무 사랑스럽다!',61,1),(85,'얼그레이티',83,8),(86,'손흥민',129,1),(87,'카카카캌칻',46,1),(88,'손흥민',129,13),(89,'명사수',73,13),(90,'취업',69,13),(91,'목걸이',94,13),(92,'산',64,13),(93,'간다!',142,33),(94,'꼭 간다.',142,33),(95,'안간다!',142,33),(96,'꼭 안간다.',142,33),(97,'아아다냐다앙',46,8),(98,'학식당',31,8),(99,'간다!',142,1),(100,'간다!',147,34),(101,'꼭 간다.',147,34),(102,'안간다!',147,34),(103,'꼭 안간다.',147,34),(106,'딸기스무디',83,15),(107,'꼭 간다.',142,19),(108,'명사수',73,15),(109,'조용히 구석에서 솔로 있는다.',80,15),(111,'학식',111,20),(112,'꼭 간다.',142,8),(113,'학식',111,23),(114,'학식',111,1),(115,'교직원 식당',111,19),(116,'첼시',88,8),(117,'학식',111,8),(118,'산',64,8),(119,'간다!',147,8),(120,'학식',111,24),(121,'이재성',129,8),(122,'화이트',98,8),(123,'꼭 간다.',147,15),(124,'학식',111,18),(125,'대학원',69,8),(126,'꼭 간다.',147,1),(127,'아메리카노',83,5),(128,'이재성',129,5),(129,'명사수',73,5),(130,'푸라닭',127,5),(131,'꼭 간다.',147,5),(132,'너무 귀엽다!',61,5),(133,'팔찌',94,5),(134,'블랙',98,5),(135,'대학원',69,5),(136,'연봉',67,5),(137,'류현선',135,5),(138,'맨시티',88,5),(139,'바다',64,5),(140,'간다!',142,5),(141,'우드',98,19),(142,'Hooyou 앱을 통해 고백',80,5),(143,'푸라닭',127,19),(144,'정우영',129,19),(145,'너무 사랑스럽다!',61,19),(146,'바다',64,19),(147,'아스날',88,19),(148,'아메리카노',83,19),(149,'명사수',73,19),(150,'BHC',127,1),(151,'팔찌',94,19),(152,'꼭 간다.',147,19),(153,'맨시티',88,1),(154,'블랙',98,13),(155,'BHC',127,13),(156,'첼시',88,13),(157,'류현선',135,13),(158,'아메리카노',83,13),(159,'꼭 간다.',142,15),(160,'너무 귀엽다!',61,15),(161,'교촌',127,15),(162,'이재성',129,15);
/*!40000 ALTER TABLE `survey_content_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `accept_push` bit(1) DEFAULT NULL,
  `accept_radius` int(11) DEFAULT NULL,
  `accept_sync` bit(1) DEFAULT NULL,
  `alive` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `killed` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `role` int(11) NOT NULL,
  `user_emoji` varchar(255) DEFAULT NULL,
  `record_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_gj2fy3dcix7ph7k8684gka40c` (`name`),
  KEY `FK41bh6kig2dlxgdbaadgbv2w13` (`record_id`),
  CONSTRAINT `FK41bh6kig2dlxgdbaadgbv2w13` FOREIGN KEY (`record_id`) REFERENCES `record_time` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2021-11-16 21:25:34.695832','2021-11-18 20:50:21.702407','',30000,'','','qlfflwls2@gmail.com','2021-11-18 20:37:33.962421','나승호',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrgpjsirntmLgiLCJwayI6MSwiaWF0IjoxNjM3MjIzNjgxLCJleHAiOjE2NDIwNjIwODF9.WajfsyoZV0oJepLlw0GSDBmW4wMimOEaTCyUy2RID6U',1,'smile',1),(5,'2021-11-16 21:30:34.815623','2021-11-18 20:41:48.282727','\0',2000,'\0','\0','kvmoke@gmail.com','2021-11-18 20:41:48.280746','상욱',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsg4HsmrEiLCJwayI6NSwiaWF0IjoxNjM3MjE5NDQ1LCJleHAiOjE2NDIwNTc4NDV9.vZgfk5v7wxKvX8TSIcuaUB4-Z2EQ6aqbNXkGq5uFixM',1,'sense',5),(7,'2021-11-16 21:32:47.025710','2021-11-18 20:54:04.362052','',30000,'','\0','richman72003898@gmail.com','2021-11-18 20:54:04.359962','cutegirl♥️',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXRlZ2lybOKZpe-4jyIsInBrIjo3LCJpYXQiOjE2MzcyMzYyNzQsImV4cCI6MTY0MjA3NDY3NH0.N0DQBiVOY1B48CQsSOaDhWjrYf9FC31amOonK-MmzVI',1,'sleep',7),(8,'2021-11-16 21:38:14.475689','2021-11-18 15:46:37.570176','',30000,'','','2014105286@khu.ac.kr','2021-11-18 15:46:37.568399','자몽이네',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnpDrqr3snbTrhKQiLCJwayI6OCwiaWF0IjoxNjM3MjEzNjk5LCJleHAiOjE2NDIwNTIwOTl9.GcUFEepDUnZqj1iyr50M9EYHTTo1S8WSSd_ipTAYCMc',1,'amazing',8),(13,'2021-11-16 22:02:27.277203','2021-11-18 20:56:39.895020','',30000,'','\0','richman20486@gmail.com','2021-11-18 20:56:39.893071','현선',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITshKAiLCJwayI6MTMsImlhdCI6MTYzNzIzNjUyNCwiZXhwIjoxNjQyMDc0OTI0fQ.yWI_BRD_ixFO3-RX0gF7edhKk0w3Wnu4FjK6obYBg-k',1,'pokerface',13),(14,'2021-11-16 22:14:41.284012','2021-11-18 11:49:54.063468','',30000,'','','sangwook.dev@gmail.com','2021-11-18 11:49:54.061511','undefined',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmRlZmluZWQiLCJwayI6MTQsImlhdCI6MTYzNzIwMzI4NiwiZXhwIjoxNjQyMDQxNjg2fQ.VNgyx-r0M-uT7-ulRH7U-HfvKf1gN1u3hfL2B5DuPHA',1,'crying',14),(15,'2021-11-16 23:43:37.313058','2021-11-18 20:53:57.526947','',30000,'','\0','shkim2000@gmail.com','2021-11-18 20:53:57.525043','kevinkim',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZpbmtpbSIsInBrIjoxNSwiaWF0IjoxNjM3MjM2MjcyLCJleHAiOjE2NDIwNzQ2NzJ9.oe9zZLEaX88ChDgyDGePSEQ4bYmAHtjyFJBMlc-JLQg',1,'sad',15),(17,'2021-11-18 11:36:00.098947','2021-11-18 20:50:03.031074','',30000,'','\0','richman3898@gmail.com','2021-11-18 20:50:03.029130','안양물주먹',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLslYjslpHrrLzso7zrqLkiLCJwayI6MTcsImlhdCI6MTYzNzIzNjE5MywiZXhwIjoxNjQyMDc0NTkzfQ.-yX95yFwm9LjlN66MhSpzDJj7kfCpJXC_75wWWUx3sw',1,'angry',17),(18,'2021-11-18 11:42:35.292518','2021-11-18 15:45:58.770473','',30000,'','','seungho.dev28@gmail.com','2021-11-18 15:45:58.768726','취준생',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLst6jspIDsg50iLCJwayI6MTgsImlhdCI6MTYzNzIxNzg4OSwiZXhwIjoxNjQyMDU2Mjg5fQ.FeUMgrHLSFU0y7mB_xu6Ab89y-IkdOo3yvWIj1p4q6Y',1,'hard',18),(19,'2021-11-18 11:43:32.968407','2021-11-18 20:53:54.295413','',30000,'','\0','dawit0310@gmail.com','2021-11-18 20:53:54.293459','방학남',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrsKntlZnrgqgiLCJwayI6MTksImlhdCI6MTYzNzIzNjE0MSwiZXhwIjoxNjQyMDc0NTQxfQ.UNrbjL9FV4EqPUa8i7epCiDpsiFQLOWWgAoXFwBzw98',1,'sleep',19),(20,'2021-11-18 11:43:57.056117','2021-11-18 20:50:39.573469','',30000,'','\0','richman5604@gmail.com','2021-11-18 20:50:39.571590','나는정상수',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrgpjripTsoJXsg4HsiJgiLCJwayI6MjAsImlhdCI6MTYzNzIzNjIzMSwiZXhwIjoxNjQyMDc0NjMxfQ.lnDKmahig32fYb_w3ov-88483RiQrkakYh0ozkL0aS0',1,'sunglass',20),(21,'2021-11-18 11:56:53.201747','2021-11-18 11:58:50.130323','',500,'','','sangwook1test@gmail.com','2021-11-18 11:58:50.128499','나는야부랑자',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiMTkzZTQ2NWExNTA0YzIzYjMyNzFlZjFjZjk3YTlkNSIsInBrIjoyMSwiaWF0IjoxNjM3MjA0MjEzLCJleHAiOjE2NDIwNDI2MTN9._7pyE60sTNPF83PhPKHLJdAn8YZg1lknMiRCebvaMwk',1,'sunglass',21),(22,'2021-11-18 11:58:09.066853','2021-11-18 12:10:24.589571','',30000,'','','seungho.na.dev@gmail.com','2021-11-18 12:10:24.587791','평범한 회사원',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMzk2Y2Y2MzAxY2M0YWU2YTg3MDg2YWU2ODRkMmI3NCIsInBrIjoyMiwiaWF0IjoxNjM3MjA0Mjg5LCJleHAiOjE2NDIwNDI2ODl9.BONLhG3ALQnkmWm7o1fpLkCAK8S4er79dAJyJ-LzbAE',1,'sleep',22),(23,'2021-11-18 11:58:18.712141','2021-11-18 15:41:47.290834','',30000,'','','richman950907@gmail.com','2021-11-18 13:40:26.649625','아스날은우승한다',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLslYTsiqTrgqDsnYDsmrDsirntlZzri6QiLCJwayI6MjMsImlhdCI6MTYzNzIxNzcwNiwiZXhwIjoxNjQyMDU2MTA2fQ.2KIP_DtmlxiYiy6iGA52n0r3vnLgfJiKkvvpQ5PaYuM',1,'pouting',23),(24,'2021-11-18 12:01:38.972447','2021-11-18 15:46:30.755552','',30000,'','','chdo7848@gmail.com','2021-11-18 15:46:30.753557','회사...그리고..',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmozsgqwuLi7qt7jrpqzqs6AuLiIsInBrIjoyNCwiaWF0IjoxNjM3MjE3ODYyLCJleHAiOjE2NDIwNTYyNjJ9.-aST3YXCk15tP1rbb9Mdcc8M61amclmFaMZ80_n0QOc',1,'sense',24),(25,'2021-11-18 12:11:14.667719','2021-11-18 12:29:58.214771','',30000,'','','seungho.test1@gmail.com','2021-11-18 12:29:58.212905','고독한 음악가',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxMzNhZTI2ZWE0OTNkODZkZjNkZTU1YTQyNzQ1YiIsInBrIjoyNSwiaWF0IjoxNjM3MjA1MDc0LCJleHAiOjE2NDIwNDM0NzR9.rN__uZ9x1vZ-cGiZm2etYkrjjjBaW2LBWJFRNWU3HKE',1,'pokerface',25),(26,'2021-11-18 12:31:04.466074','2021-11-18 12:38:19.077294','',30000,'','','seungho.test2@gmail.com','2021-11-18 12:38:19.075360','문돌이',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkMTc1ZWMzNzNjYWY0ZjcwODEwMzQ3OTE3N2QyN2RhYiIsInBrIjoyNiwiaWF0IjoxNjM3MjA2MjY0LCJleHAiOjE2NDIwNDQ2NjR9.1sN2A1wOc7q0lAjEPxzeJiSvoSOp5G6ngvkGkP-sAVk',1,'sense',26),(27,'2021-11-18 12:39:29.089472','2021-11-18 13:05:41.390601','',30000,'','','seungho.test3@gmail.com','2021-11-18 13:05:41.388825','bts최고',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlOTEzOGZiYzQ1NDQ0OTg2OTE3NWQzNDhjOGEyMzRmNyIsInBrIjoyNywiaWF0IjoxNjM3MjA2NzY5LCJleHAiOjE2NDIwNDUxNjl9.jLZuiQ1s6GAT_oqlT9cfL6Bw5Fa7x2fpHRSqRNMWo2A',1,'love',27),(28,'2021-11-18 12:56:01.993473','2021-11-18 13:38:37.818434','',30000,'','','richman9582@gmail.com','2021-11-18 13:38:37.816672','내꿈은이니에스타',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrgrTqv4jsnYDsnbTri4jsl5DsiqTtg4AiLCJwayI6MjgsImlhdCI6MTYzNzIxMDI2NCwiZXhwIjoxNjQyMDQ4NjY0fQ.muCBOyvqGXaTDN7G8b-B3xwcubVZywhlqBem2v9qo3g',1,'love',28),(29,'2021-11-18 13:00:46.912187','2021-11-18 14:34:43.860222','',30000,'','','simon1127.dev@gmail.com','2021-11-18 14:34:43.858020','1인1닭',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Njg4ZTUzNTE1MTI0NDY1ODg3YjczNWVhNDFjZWFkMyIsInBrIjoyOSwiaWF0IjoxNjM3MjA4MDQ2LCJleHAiOjE2NDIwNDY0NDZ9.Kor5SimIswkCnsRG01qJ9pPwdZp8L-wVskw6OzqnL6o',1,'love',29),(30,'2021-11-18 14:34:33.720711','2021-11-18 14:43:12.143286','\0',30000,'\0','','\"asdffasddfas@hanmail.net\"',NULL,'흑우',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0OWVhZmQ5NWFiNzI0ZTEzYTFkZjAzOTQ3NTkzNmYxZSIsInBrIjozMCwiaWF0IjoxNjM3MjEzNjczLCJleHAiOjE2NDIwNTIwNzN9._Bx4fwITPmufpUA89JfohuDxe20C66okAU1QtzX6Et4',1,'smile',30),(31,'2021-11-18 14:46:57.505723','2021-11-18 14:59:48.641529','\0',30000,'\0','','\"hgasdfjkhasfd@hanmail.net\"',NULL,'집돌이',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxYTA3OTUxNGQ2N2M0MzJhOGE4NGEwZTcyYzJmMDI1MiIsInBrIjozMSwiaWF0IjoxNjM3MjE0NDE3LCJleHAiOjE2NDIwNTI4MTd9.OE9e5E36-KTKVPB23hT5bqLVj5iE1N-C2eyz30x2RhA',1,'smile',31),(32,'2021-11-18 14:57:21.298875','2021-11-18 15:10:36.227277','\0',30000,'\0','','\"hgasdfa2345jkhasfd@hanmail.net\"',NULL,'은둔고수',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNzZiY2ZhMjEzYmU0MTg5YWI1MGE5YzFhNzJkNmNmMyIsInBrIjozMiwiaWF0IjoxNjM3MjE1MDQxLCJleHAiOjE2NDIwNTM0NDF9.8SZtUWe8zT6D1Q461vOq2x9BpHF6DQur7mEZkRu_Sic',1,'sense',32),(33,'2021-11-18 15:03:40.372387','2021-11-18 15:09:17.581183','\0',30000,'\0','','\"namsan@edu.ssafy.com\"',NULL,'남산타워',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMTk2YWU0NDUwODY0OTllOTFmZjQzZTlhYjM1YzM3MyIsInBrIjozMywiaWF0IjoxNjM3MjE1NDIwLCJleHAiOjE2NDIwNTM4MjB9.v0bC9VckTeyMMUhMJHoxVYuoACJUa8j6-6iaNmklPgA',1,'namsan',33),(34,'2021-11-18 15:24:50.585848','2021-11-18 15:30:29.923844','',30000,'','','\"gyeongbokgung@edu.ssafy.com\"',NULL,'경복궁',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTQ2ZTU4Y2NiNGI0NzM5YTFhZmQ1OWZhN2NhMmFmZSIsInBrIjozNCwiaWF0IjoxNjM3MjE2NjkwLCJleHAiOjE2NDIwNTUwOTB9.lLUJ2pjzuAQ63nRm60wf-cv3tQWsW20V5dmf__xge8k',1,'gyeongbokgung',34),(35,'2021-11-18 16:04:05.920768','2021-11-18 16:29:03.777878','',20,'','\0','kevin.dev.1030@gmail.com','2021-11-18 16:29:03.776131','professor',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTNmNDBkNTllMjc0YzhjYTJlMzA0NmQ4MmQ5ZDdkYiIsInBrIjozNSwiaWF0IjoxNjM3MjE5MDQ1LCJleHAiOjE2NDIwNTc0NDV9.oPEzL60PdhrIPoYjzamkNmxBovOF6NPLnqKzokH986Q',1,'smile',35),(36,'2021-11-18 16:10:35.200364','2021-11-18 16:10:35.204718','',0,'','','munam4@naver.com',NULL,'2ef2e05c3e8740dbbd8e9c2462f4ae40',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyZWYyZTA1YzNlODc0MGRiYmQ4ZTljMjQ2MmY0YWU0MCIsInBrIjozNiwiaWF0IjoxNjM3MjE5NDM1LCJleHAiOjE2NDIwNTc4MzV9.KABCfdHKkk7ahjg4C2a2c0PMAwKfZtzT6hWO0kMpPbo',1,NULL,36),(37,'2021-11-18 16:49:00.687848','2021-11-18 16:59:13.372526','\0',30000,'\0','','\"announcement1!@edu.ssafy.com\"',NULL,'프로여행러',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4Nzc4OWQ0ZDFiZmU0NDdjYWZiZjMyNjk0NzRjNDUxZSIsInBrIjozNywiaWF0IjoxNjM3MjIxNzQwLCJleHAiOjE2NDIwNjAxNDB9.L8pVbe_BgNGY7-L4ckKDIt7eMigtiOHug3z4-JZ_420',1,'sad',37),(38,'2021-11-18 16:50:04.187537','2021-11-18 16:56:32.764988','\0',30000,'\0','','\"announcement2!@edu.ssafy.com\"',NULL,'sour',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjY0YTA4YWU5MjA0YjRlOWYxODhlYjkxOGMyMWI1ZCIsInBrIjozOCwiaWF0IjoxNjM3MjIxODA0LCJleHAiOjE2NDIwNjAyMDR9.wNtg7VVxg4GxFjwOIoj5CvtLWSEb2mrqQfuEqoU3qS8',1,'hard',38),(39,'2021-11-18 16:50:54.020188','2021-11-18 17:11:06.714888','\0',30000,'\0','','\"announcement3!@edu.ssafy.com\"',NULL,'갈매기',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MzhiNDFmN2NhNjQ0Yzg5YjA3NTVjZDk5MTk3OWIxZCIsInBrIjozOSwiaWF0IjoxNjM3MjIxODU0LCJleHAiOjE2NDIwNjAyNTR9.22odq1kOF8Ggp6k3makqwz3CSNNea8zigPitpYGreUU',1,'smile',39);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 11:56:58
