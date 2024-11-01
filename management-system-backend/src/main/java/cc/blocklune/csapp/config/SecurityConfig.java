package cc.blocklune.csapp.config;

import cc.blocklune.csapp.service.SystemUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
        private final SystemUserDetailsService userDetailsService;
        private final JwtDecoder jwtDecoder;
        private final PasswordEncoder passwordEncoder;

        public SecurityConfig(SystemUserDetailsService userDetailsService,
                        JwtDecoder jwtDecoder,
                        PasswordEncoder passwordEncoder) {
                this.userDetailsService = userDetailsService;
                this.jwtDecoder = jwtDecoder;
                this.passwordEncoder = passwordEncoder;
        }

        @Bean
        public AuthenticationManager authenticationManager() {
                DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
                authProvider.setUserDetailsService(userDetailsService);
                authProvider.setPasswordEncoder(passwordEncoder);
                return new ProviderManager(authProvider);
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                return http.csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // CORS
                                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**",
                                                                "/swagger-ui.html")
                                                .permitAll() // Swagger
                                                .requestMatchers("/api/auth/**").permitAll() // Auth
                                                .requestMatchers("/api/public/**").permitAll()
                                                .requestMatchers("/api/teachers/**").hasRole("TEACHER")
                                                .requestMatchers("/api/students/**").hasRole("STUDENT")
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .httpBasic(Customizer.withDefaults())
                                .addFilterBefore(new JwtAuthenticationFilter(jwtDecoder),
                                                UsernamePasswordAuthenticationFilter.class)
                                .userDetailsService(userDetailsService)
                                .build();
        }

}
