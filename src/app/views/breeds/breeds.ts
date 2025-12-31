import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreedSelector } from './components/breed-selector/breed-selector';
import { BreedImages } from './components/breed-images/breed-images';
import { BreedInfo } from './components/breed-info/breed-info';
import { Breed } from '../../services/cat-api';

@Component({
  selector: 'app-breeds',
  imports: [BreedSelector, BreedImages, BreedInfo],
  templateUrl: './breeds.html',
  styleUrl: './breeds.css',
})
export class Breeds implements OnInit {
  selectedBreed = signal<Breed | null>(null);
  breedIdFromQuery = signal<string | null>(null);
  
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['breed']) {
        this.breedIdFromQuery.set(params['breed']);
      }
    });
  }

  onBreedSelected(breed: Breed): void {
    this.selectedBreed.set(breed);
  }
}
