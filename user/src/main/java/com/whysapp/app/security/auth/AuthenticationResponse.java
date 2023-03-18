package com.whysapp.app.security.auth;

import com.whysapp.app.domain.User;
import com.whysapp.app.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    Role role;
}