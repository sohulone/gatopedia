import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, signal } from '@angular/core';
import { Selector, SelectOption } from '../../../../components/selector/selector';
import { CatApi, Breed } from '../../../../services/cat-api';

@Component({
  selector: 'app-breed-selector',
  imports: [Selector],
  templateUrl: './breed-selector.html',
  styleUrl: './breed-selector.css',
})
export class BreedSelector implements OnInit, OnChanges {
  @Input() initialBreedId: string | null = null;
  
  breedOptions = signal<SelectOption[]>([]);
  isLoading = signal<boolean>(false);
  selectedBreedId = signal<string>('');
  private breedsMap = new Map<string, Breed>();
  
  @Output() breedSelected = new EventEmitter<Breed>();

  constructor(private catApi: CatApi) {}

  ngOnInit() {
    this.loadBreeds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialBreedId'] && this.initialBreedId) {
      this.selectBreedById(this.initialBreedId);
    }
  }

  private selectBreedById(breedId: string): void {
    if (this.breedsMap.has(breedId)) {
      this.selectedBreedId.set(breedId);
      const breed = this.breedsMap.get(breedId);
      if (breed) {
        this.breedSelected.emit(breed);
      }
    }
  }

  loadBreeds(): void {
    this.isLoading.set(true);
    this.catApi.getBreeds().subscribe({
      next: (breeds) => {
        breeds.forEach(breed => this.breedsMap.set(breed.id, breed));
        this.breedOptions.set(breeds.map(breed => ({
          value: breed.id,
          text: breed.name
        })));
        this.isLoading.set(false);
        
        if (this.initialBreedId) {
          this.selectBreedById(this.initialBreedId);
        }
      },
      error: (error) => {
        console.error('Error al cargar razas:', error);
        this.isLoading.set(false);
      }
    });
  }

  onBreedSelected(value: string): void {
    if (!value) return;
    const breed = this.breedsMap.get(value);
    if (breed) {
      this.breedSelected.emit(breed);
    }
  }
}
