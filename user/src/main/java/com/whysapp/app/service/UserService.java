//package com.whysapp.app.service;
//
//import com.whysapp.app.domain.User;
//import com.whysapp.app.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//
//import java.util.Optional;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//@RequiredArgsConstructor
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//
//    public void registerUser(UserRegistrationRequest request) {
//        User user = User.builder()
//                .firstname(request.)
//                .password(request.password())
//                .email(request.email())
//                .userRole(request.userRole())
//                .build();
//        userRepository.save(user);
//    }
//
//    public Optional<User> getUser(Long id) {
//        return userRepository.findById(id);
//    }
//
//    public ResponseEntity<?> deleteUser(Long id) {
//        userRepository.deleteById(id);
//        return ResponseEntity.noContent().build();
//    }
//}
