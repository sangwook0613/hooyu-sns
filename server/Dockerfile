FROM openjdk:11-jdk
#ARG JAR_FILE=*.jar
COPY ./build/libs/server-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]