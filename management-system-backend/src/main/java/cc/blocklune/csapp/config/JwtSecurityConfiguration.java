package cc.blocklune.csapp.config;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

@Configuration
@EnableMethodSecurity
public class JwtSecurityConfiguration {

  private final UserDetailsService userDetailsService;

  public JwtSecurityConfiguration(UserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(AbstractHttpConfigurer::disable)
        .userDetailsService(userDetailsService)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
            .requestMatchers("/api/auth/login").authenticated()
            .anyRequest().authenticated())
        .httpBasic(basic -> basic.authenticationEntryPoint(basicAuthenticationEntryPoint()))
        .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(Customizer.withDefaults())
            .authenticationEntryPoint(jwtAuthenticationEntryPoint()))
        .build();
  }

  @Bean
  public AuthenticationEntryPoint basicAuthenticationEntryPoint() {
    return new BasicAuthenticationEntryPoint() {
      {
        setRealmName("Basic Authentication");
      }
    };
  }

  @Bean
  public AuthenticationEntryPoint jwtAuthenticationEntryPoint() {
    return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // 1. Create Key Pair
  @Bean
  public KeyPair keyPair() {
    try {
      var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
      keyPairGenerator.initialize(2048);
      return keyPairGenerator.generateKeyPair();
    } catch (Exception ex) {
      throw new RuntimeException(ex);
    }
  }

  // 2. Create RSA Key object using the key pair
  @Bean
  public RSAKey rsaKey(KeyPair keyPair) {
    return new RSAKey.Builder((RSAPublicKey) keyPair.getPublic())
        .privateKey(keyPair.getPrivate())
        .keyID(UUID.randomUUID().toString())
        .build();
  }

  // 3. Create JWK Source (JSON Web Key Source)
  // 3.1 Create JWK Set with the RSA Key
  // 3.2 Create JWK Source with the JWK Set
  @Bean
  public JWKSource<SecurityContext> jwkSource(RSAKey rsaKey) {
    var jwkSet = new JWKSet(rsaKey);
    return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
  }

  // 4. Use RSA Public Key to encode
  @Bean
  public JwtDecoder jwtDecoder(RSAKey rsaKey) throws JOSEException {
    return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
  }

  // 5. Use JWK Source to decode
  @Bean
  public JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
    return new NimbusJwtEncoder(jwkSource);
  }
}
