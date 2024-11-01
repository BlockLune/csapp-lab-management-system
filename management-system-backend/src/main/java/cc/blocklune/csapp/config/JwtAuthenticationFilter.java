package cc.blocklune.csapp.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtDecoder jwtDecoder;

    public JwtAuthenticationFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                Jwt jwt = jwtDecoder.decode(token);

                Collection<? extends GrantedAuthority> authorities = extractAuthorities(jwt);

                var authentication = new UsernamePasswordAuthenticationToken(
                        jwt.getSubject(),
                        null,
                        authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private Collection<? extends GrantedAuthority> extractAuthorities(Jwt jwt) {
        var authorities = jwt.getClaimAsStringList("authorities");
        return authorities != null ? authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()) : Collections.emptyList();
    }
}
