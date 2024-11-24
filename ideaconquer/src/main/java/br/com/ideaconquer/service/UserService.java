package br.com.ideaconquer.service;

import br.com.ideaconquer.model.User;
import br.com.ideaconquer.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
