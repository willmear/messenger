package com.whysapp.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MessagesApplication {
    public static void main(String[] args) {

        SpringApplication.run(MessagesApplication.class, args);
    }


//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.setAllowCredentials(true);
//        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:8081"));
//        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
//        "Accept", "Jwt-Token", "Authorization", "Origin", "Accept", "X-Requested-With",
//        "Access-Control-Request-Method", "Access-Control-Request-Headers"));
//        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
//        "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename"));
//        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
//        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
//        return new CorsFilter(urlBasedCorsConfigurationSource);
//    }
}
