package com1.backend.repository;
// This package contains repository interfaces that extend JpaRepository for data access operations.
import com1.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmailAndPassword(String email, String password);
    User findByUsernameAndPassword(String username, String password);
    User findByUserId(Long id);
}
