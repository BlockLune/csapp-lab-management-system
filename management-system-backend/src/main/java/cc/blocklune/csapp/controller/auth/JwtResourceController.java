package cc.blocklune.csapp.controller.auth;

import cc.blocklune.csapp.dto.auth.LoginRequest;
import cc.blocklune.csapp.dto.auth.LoginResponse;

import java.time.Instant;
import java.util.stream.Collectors;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class JwtResourceController {

  private static final Logger logger = LoggerFactory.getLogger(JwtResourceController.class);
  private final AuthenticationManager authenticationManager;
  private final JwtEncoder jwtEncoder;

  public JwtResourceController(JwtEncoder jwtEncoder, AuthenticationManager authenticationManager) {
    this.jwtEncoder = jwtEncoder;
    this.authenticationManager = authenticationManager;
  }

  @PostMapping("/login")
  public LoginResponse authenticateAndCreateJwtToken(@RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager
        .authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    String token = createToken(authentication);
    List<String> roles = authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());
    return new LoginResponse(loginRequest.getUsername(), roles, token);
  }

  private String createToken(Authentication authentication) {
    logger.info("Creating JWT token for user: {}", authentication);
    var claims = JwtClaimsSet.builder()
        .issuer("self")
        .issuedAt(Instant.now())
        .expiresAt(Instant.now().plusSeconds(60 * 60)) // 1 hour
        .subject(authentication.getName())
        .claim("scope", createScope(authentication))
        .build();
    return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }

  private String createScope(Authentication authentication) {
    return authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(" "));
  }
}
