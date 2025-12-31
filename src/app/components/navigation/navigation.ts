import { Component, signal } from '@angular/core';
import { SearchModal } from '../search-modal/search-modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, SearchModal],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  isSearchModalOpen = signal<boolean>(false);

  openSearchModal(): void {
    this.isSearchModalOpen.set(true);
  }

  closeSearchModal(): void {
    this.isSearchModalOpen.set(false);
  }
}
