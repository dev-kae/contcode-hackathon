package br.com.ideaconquer.service;

import br.com.ideaconquer.api.request.LoginUserRequest;
import br.com.ideaconquer.api.request.RegisterUserRequest;
import br.com.ideaconquer.api.response.LoginResponse;
import br.com.ideaconquer.exception.EntityAlreadyExistsException;
import br.com.ideaconquer.model.User;
import br.com.ideaconquer.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void signup(RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EntityAlreadyExistsException();
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setDataCollected(false);
        userRepository.save(user);
    }

    public User authenticate(LoginUserRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        return userRepository.findByEmail(request.getEmail())
                .orElseThrow();
    }

    public LoginResponse login(LoginUserRequest request) {
        User user = authenticate(request);
        String jwtToken = jwtService.generateToken(user);
        Long expirationTime = jwtService.getExpirationTime();
        return new LoginResponse(jwtToken, expirationTime);
    }
}
