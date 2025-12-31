import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User, RegisterData, LoginData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();
  
  private readonly USERS_KEY = 'gatopedia_users';
  private readonly CURRENT_USER_KEY = 'gatopedia_current_user';

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSignal.set(user);
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  register(data: RegisterData): Observable<{ success: boolean; message: string }> {
    const users = this.getUsers();
    
    if (users.some(u => u.email === data.email)) {
      return of({ success: false, message: 'El email ya está registrado' });
    }

    const newUser: User = {
      id: this.generateId(),
      email: data.email,
      name: data.name,
      favoriteBreed: data.favoriteBreed,
      avatar: data.avatar,
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    
    localStorage.setItem(`pwd_${newUser.id}`, data.password);

    return of({ success: true, message: 'Usuario registrado exitosamente' });
  }

  login(data: LoginData): Observable<{ success: boolean; message: string; user?: User }> {
    const users = this.getUsers();
    const user = users.find(u => u.email === data.email);

    if (!user) {
      return of({ success: false, message: 'Usuario no encontrado' });
    }

    const savedPassword = localStorage.getItem(`pwd_${user.id}`);
    if (savedPassword !== data.password) {
      return of({ success: false, message: 'Contraseña incorrecta' });
    }

    this.currentUserSignal.set(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    
    return of({ success: true, message: 'Login exitoso', user });
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    if (!usersJson) return [];
    
    try {
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Error parsing users:', error);
      return [];
    }
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}
