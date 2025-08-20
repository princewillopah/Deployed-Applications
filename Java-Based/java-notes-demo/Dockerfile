# -------- Build stage --------
FROM maven:3.9.8-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

# -------- Runtime stage --------
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/notes-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
# JVM flags tuned for containers
ENTRYPOINT ["java","-XX:+UseContainerSupport","-XX:MaxRAMPercentage=75.0","-jar","/app/app.jar"]