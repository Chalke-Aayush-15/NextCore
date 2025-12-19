package com.example.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.todo.entity.User;
import com.example.todo.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 REGISTER USER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        // check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        // default role = USER
        if (user.getRole() == null) {
            user.setRole(User.Role.USER);
        }

        return userRepository.save(user);
    }

    // 🔹 LOGIN USER
    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {

        User dbUser = userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );

        if (dbUser == null) {
            throw new RuntimeException("Invalid email or password");
        }

        // store user info in session
        session.setAttribute("loggedInUser", dbUser);
        session.setAttribute("role", dbUser.getRole());

        return dbUser; // send role to frontend
    }

    // 🔹 LOGOUT
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out successfully";
    }

    // 🔹 GET CURRENT LOGGED IN USER
    @GetMapping("/me")
    public User getLoggedInUser(HttpSession session) {

        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            throw new RuntimeException("User not logged in");
        }

        return user;
    }
}
