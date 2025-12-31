import { Component, Input, OnChanges, SimpleChanges, signal, ElementRef, ViewChild } from '@angular/core';
import { Carousel, CarouselImage } from '../../../../components/carousel/carousel';
import { CatApi } from '../../../../services/cat-api';

@Component({
  selector: 'app-breed-images',
  imports: [Carousel],
  templateUrl: './breed-images.html',
  styleUrl: './breed-images.css',
})
export class BreedImages implements OnChanges {
  @Input() breedId: string | null = null;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;
  
  images = signal<CarouselImage[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private catApi: CatApi) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breedId'] && this.breedId) {
      this.loadBreedImages(this.breedId);
    }
  }

  loadBreedImages(breedId: string): void {
    this.isLoading.set(true);
    this.images.set([]);
    
    this.catApi.getImagesByBreed(breedId, 10).subscribe({
      next: (catImages) => {
        this.images.set(catImages.map(img => ({
          url: img.url,
          alt: `Cat breed ${breedId}`
        })));
        this.isLoading.set(false);
        this.scrollToCarousel();
      },
      error: (error) => {
        console.error('Error al cargar imágenes:', error);
        this.isLoading.set(false);
      }
    });
  }

  scrollToCarousel(): void {
    setTimeout(() => {
      if (this.carouselContainer) {
        const element = this.carouselContainer.nativeElement;
        const offset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
}
