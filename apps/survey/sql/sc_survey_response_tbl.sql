CREATE DATABASE  IF NOT EXISTS `gooreports` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `gooreports`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `survey_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_response` (
  `id` int(11) NOT NULL,
  `ans_text` longtext,
  `other_text` varchar(255) DEFAULT NULL,
  `other_option` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `response_status` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `survey_id` int(11),
  PRIMARY KEY (`id`),
  KEY `survey_question_id_2d374a00939f271b_fk_questionnaire_question_id` (`question_id`),
  KEY `survey__respondent_id_6fecff6fcdd75a57_fk_response_respondent_id` (`respondent_id`),
  KEY `survey_response_00b3bd7e` (`survey_id`),
  CONSTRAINT `survey_response_survey_id_38dff091366b6b27_fk_survey_survey_id` FOREIGN KEY (`survey_id`) REFERENCES `survey_survey` (`id`),
  CONSTRAINT `survey_question_id_2d374a00939f271b_fk_questionnaire_question_id` FOREIGN KEY (`question_id`) REFERENCES `questionnaire_question` (`id`),
  CONSTRAINT `survey__respondent_id_6fecff6fcdd75a57_fk_response_respondent_id` FOREIGN KEY (`respondent_id`) REFERENCES `response_respondent` (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40000 ALTER TABLE `survey_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_response` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

