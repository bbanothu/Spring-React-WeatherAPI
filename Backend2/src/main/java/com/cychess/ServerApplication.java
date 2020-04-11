package com.cychess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;


@SpringBootApplication
public class ServerApplication {
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(ServerApplication.class, args);
	}
}
