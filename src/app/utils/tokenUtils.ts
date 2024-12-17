import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
    exp: number; // expiration time in seconds
    iat?: number; // issued at time
    // ...other fields if needed
}

export function isTokenExpired(token: string): boolean {
    try {
        const { exp } = jwtDecode<JWTPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000); // Convert from JS Date.now() ms from sec
        return exp < currentTime;
    } catch {
        // If decoding fails, consider token invalid/expired
        return true;
    }
}