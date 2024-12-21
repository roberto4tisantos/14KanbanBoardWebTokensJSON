// import { JwtPayload, jwtDecode } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
//JWT expiration and redirect to login page
// import { useEffect } from 'react';
// import AuthService from './utils/auth';
class AuthService {
    getProfile() {
        // TODO: return the decoded token
        const token = this.getToken();
        if (token) {
            return jwtDecode(token);
        }
        return null;
    }
    loggedIn() {
        // TODO: return a value that indicates if the user is logged in
        const token = this.getToken();
        return !!token;
    }
    isTokenExpired(token) {
        // TODO: return a value that indicates if the token is expired
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    }
    // getToken(): string {
    //   // TODO: return the token
    // }
    getToken() {
        return localStorage.getItem('jwt');
    }
    login(idToken) {
        // TODO: set the token to localStorage
        // TODO: redirect to the home page
        localStorage.setItem('jwt', idToken);
        window.location.href = '/'; // Redirect to the main page    
    }
    logout() {
        // TODO: remove the token from localStorage
        // TODO: redirect to the login page
        localStorage.removeItem('jwt');
        window.location.href = '/login'; // Redirect to the login page    
    }
}
// const useAuth = () => {
//   useEffect(() => {
//     const token = AuthService.getToken();
//     if (token && AuthService.isTokenExpired(token)) {
//       AuthService.logout();
//     }
//   }, []);
// };
// export default useAuth;
export default new AuthService();
