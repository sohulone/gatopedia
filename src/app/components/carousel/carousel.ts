import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

export interface CarouselImage {
  url: string;
  alt?: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements AfterViewInit, OnDestroy, OnChanges {
  @Input() images: CarouselImage[] = [];
  @Input() autoplayDelay: number = 8000;
  @Input() loading: boolean = false;
  @ViewChild('emblaViewport', { static: false }) emblaViewport!: ElementRef;

  private emblaApi?: EmblaCarouselType;

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && !changes['images'].firstChange) {
      this.reinitCarousel();
    }
  }

  private initCarousel(): void {
    if (this.emblaViewport && this.images.length > 0) {
      this.emblaApi = EmblaCarousel(
        this.emblaViewport.nativeElement,
        { 
          loop: true,
          align: 'center'
        },
        [Autoplay({ delay: this.autoplayDelay, stopOnInteraction: false })]
      );
    }
  }

  private reinitCarousel(): void {
    if (this.emblaApi) {
      this.emblaApi.destroy();
    }
    
    setTimeout(() => {
      this.initCarousel();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.emblaApi) {
      this.emblaApi.destroy();
    }
  }

  scrollPrev(): void {
    if (this.emblaApi) {
      this.emblaApi.scrollPrev();
    }
  }

  scrollNext(): void {
    if (this.emblaApi) {
      this.emblaApi.scrollNext();
    }
  }
}