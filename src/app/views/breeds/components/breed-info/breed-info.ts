import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breed } from '../../../../services/cat-api';

@Component({
  selector: 'app-breed-info',
  imports: [CommonModule],
  templateUrl: './breed-info.html',
  styleUrl: './breed-info.css',
})
export class BreedInfo implements OnChanges {
  @Input() breed: Breed | null = null;
  
  breedInfo = signal<Breed | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breed'] && this.breed) {
      this.breedInfo.set(this.breed);
    }
  }
}
