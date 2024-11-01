export interface LoginResponse {
    username: string;
    roles: string[];
    token: string;
}

export interface Auth {
    username: string;
    roles: string[];
    token: string;
    expiresAt: number; // ms
}

export function getAuth(): Auth | null {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed.expiresAt > Date.now()) {
            return parsed;
        }
        removeAuth();
    }
    return null;
}

export function setAuth(data: LoginResponse) {
    const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
    const auth = {
        username: data.username,
        roles: data.roles,
        token: data.token,
        expiresAt: tokenPayload.exp * 1000, // unix timestamp in s to ms
    };
    localStorage.setItem("auth", JSON.stringify(auth));
}

export function removeAuth() {
    localStorage.removeItem("auth");
}


export function getRouteFromRole(roles: string[]) {
    if (roles.includes("ROLE_TEACHER")) {
        return "/teachers";
    }
    if (roles.includes("ROLE_STUDENT")) {
        return "/students";
    }
    return "/";
}