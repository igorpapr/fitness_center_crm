package com.paprotskyi.fitnesslife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class FitnessLifeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FitnessLifeApplication.class, args);
    }

}
