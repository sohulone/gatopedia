import { Component, Input, Output, EventEmitter, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatApi, type Breed } from '../../services/cat-api';

const RECENT_SEARCH_CAPACITY = 3;

interface BreedWithImage extends Breed {
  imageUrl?: string;
}

@Component({
  selector: 'app-search-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-modal.html',
  styleUrl: './search-modal.css',
})

export class SearchModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  private catApi = inject(CatApi);
  private router = inject(Router);
  
  searchQuery: string = '';
  recentSearches: string[] = [];
  searchResults: BreedWithImage[] = [];
  allBreeds: Breed[] = [];
  breedImages: Map<string, string> = new Map();
  isLoadingBreeds: boolean = false;

  ngOnInit(): void {
    this.loadRecentSearches();
    this.loadBreeds();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
    this.searchQuery = '';
    this.searchResults = [];
  }

  onSearchInput(): void {
    const query = this.searchQuery.trim().toLowerCase();
    
    if (!query) {
      this.searchResults = [];
      return;
    }

    const filtered = this.allBreeds.filter(breed => 
      breed.name.toLowerCase().includes(query) ||
      breed.origin?.toLowerCase().includes(query) ||
      breed.temperament?.toLowerCase().includes(query)
    );

    this.searchResults = filtered.map(breed => ({
      ...breed,
      imageUrl: this.breedImages.get(breed.id)
    }));
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery);
      this.addToRecentSearches(this.searchQuery);
      this.closeModal();
    }
  }

  selectBreed(breed: Breed): void {
    this.addToRecentSearches(breed.name);
    this.closeModal();
    this.router.navigate(['/breeds'], { queryParams: { breed: breed.id } });
  }

  selectRecentSearch(search: string): void {
    const breed = this.allBreeds.find(b => b.name.toLowerCase() === search.toLowerCase());
    if (breed) {
      this.closeModal();
      this.router.navigate(['/breeds'], { queryParams: { breed: breed.id } });
    } else {
      this.searchQuery = search;
      this.onSearchInput();
    }
  }

  removeRecentSearch(search: string, event: Event): void {
    event.stopPropagation();
    this.recentSearches = this.recentSearches.filter(s => s !== search);
    this.saveRecentSearches();
  }

  private loadRecentSearches(): void {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      this.recentSearches = JSON.parse(saved);
    }
  }

  private addToRecentSearches(search: string): void {
    this.recentSearches = [search, ...this.recentSearches.filter(s => s !== search)].slice(0, RECENT_SEARCH_CAPACITY);
    this.saveRecentSearches();
  }

  private saveRecentSearches(): void {
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  private loadBreeds(): void {
    this.isLoadingBreeds = true;
    this.catApi.getBreeds().subscribe({
      next: (breeds) => {
        this.allBreeds = breeds;
        // Usar las imágenes que ya vienen en el listado
        breeds.forEach(breed => {
          if (breed.image?.url) {
            this.breedImages.set(breed.id, breed.image.url);
          }
        });
        this.isLoadingBreeds = false;
      },
      error: (error) => {
        console.error('Error loading breeds:', error);
        this.isLoadingBreeds = false;
      }
    });
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
