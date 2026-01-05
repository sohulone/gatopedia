import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, catchError, map } from 'rxjs';
import { User, RegisterData, LoginData } from '../models/user';
import { environment } from '../../environments/environment.development';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();
  
  private readonly TOKEN_KEY = 'gatopedia_token';
  private readonly CURRENT_USER_KEY = 'gatopedia_current_user';

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);
    
    if (userJson && token) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSignal.set(user);
      } catch (error) {
        console.error('Error loading user:', error);
        this.clearStorage();
      }
    }
  }

  register(data: RegisterData): Observable<{ success: boolean; message: string; user?: User }> {
    return new Observable(observer => {
      fetch(`${environment.apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async response => {
          const responseData = await response.json();
          
          if (!response.ok) {
            observer.next({ 
              success: false, 
              message: responseData.error || 'Error en el registro' 
            });
            observer.complete();
            return;
          }

          const { token, user } = responseData as AuthResponse;
          
          // Guardar token y usuario
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
          this.currentUserSignal.set(user);

          observer.next({ 
            success: true, 
            message: 'Usuario registrado exitosamente',
            user 
          });
          observer.complete();
        })
        .catch(error => {
          console.error('Error en registro:', error);
          observer.next({ 
            success: false, 
            message: 'Error de conexión con el servidor' 
          });
          observer.complete();
        });
    });
  }

  login(data: LoginData): Observable<{ success: boolean; message: string; user?: User }> {
    return new Observable(observer => {
      fetch(`${environment.apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async response => {
          const responseData = await response.json();
          
          if (!response.ok) {
            observer.next({ 
              success: false, 
              message: responseData.error || 'Error en el login' 
            });
            observer.complete();
            return;
          }

          const { token, user } = responseData as AuthResponse;
          
          // Guardar token y usuario
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
          this.currentUserSignal.set(user);

          observer.next({ 
            success: true, 
            message: 'Login exitoso',
            user 
          });
          observer.complete();
        })
        .catch(error => {
          console.error('Error en login:', error);
          observer.next({ 
            success: false, 
            message: 'Error de conexión con el servidor' 
          });
          observer.complete();
        });
    });
  }

  logout(): void {
    this.clearStorage();
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null && !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}

