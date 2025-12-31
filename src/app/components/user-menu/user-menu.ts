import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  currentUser = computed(() => this.authService.currentUser());
  showUserMenu = signal<boolean>(false);

  constructor(private authService: AuthService) {}

  toggleUserMenu(): void {
    this.showUserMenu.set(!this.showUserMenu());
  }

  logout(): void {
    this.showUserMenu.set(false);
    this.authService.logout();
  }
}
