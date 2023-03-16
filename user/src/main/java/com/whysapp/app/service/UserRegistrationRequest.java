package com.whysapp.app.service;

import com.whysapp.app.enums.UserRoles;

public record UserRegistrationRequest(String username, String password, String email, UserRoles userRole) {
}
