package br.com.ideaconquer.api.resource;

import br.com.ideaconquer.api.request.LoginUserRequest;
import br.com.ideaconquer.api.request.RegisterUserRequest;
import br.com.ideaconquer.api.response.LoginResponse;
import br.com.ideaconquer.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    @PostMapping("sign-up")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterUserRequest request) {
        this.authenticationService.signup(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginUserRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
