package com.messagingapp.app.repository;

import java.util.Optional;

import com.messagingapp.app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}