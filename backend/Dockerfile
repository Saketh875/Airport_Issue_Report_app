FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /app

# Copy dependency descriptor first for better Docker layer caching
COPY pom.xml ./
RUN mvn -B -ntp dependency:go-offline

COPY src ./src
RUN mvn -B -ntp clean package -DskipTests

FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

# Run as non-root user in production
RUN addgroup --system spring && adduser --system --ingroup spring spring

COPY --from=build /app/target/*.jar /app/app.jar

USER spring
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]