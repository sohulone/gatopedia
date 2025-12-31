import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carousel, CarouselImage } from './carousel';
import { SimpleChange } from '@angular/core';

describe('Carousel', () => {
  let component: Carousel;
  let fixture: ComponentFixture<Carousel>;

  const mockImages: CarouselImage[] = [
    { url: 'https://example.com/cat1.jpg', alt: 'Cat 1' },
    { url: 'https://example.com/cat2.jpg', alt: 'Cat 2' },
    { url: 'https://example.com/cat3.jpg', alt: 'Cat 3' }
  ];

  beforeEach(async () => {
    // Mock window.matchMedia que Embla Carousel necesita
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }),
    });

    await TestBed.configureTestingModule({
      imports: [Carousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel);
    component = fixture.componentInstance;
    // No llamamos fixture.detectChanges() aquí para evitar ngAfterViewInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have default values', () => {
      expect(component.images).toEqual([]);
      expect(component.autoplayDelay).toBe(8000);
      expect(component.loading).toBe(false);
    });

    it('should accept images input', () => {
      component.images = mockImages;
      expect(component.images.length).toBe(3);
      expect(component.images[0].url).toBe('https://example.com/cat1.jpg');
    });

    it('should accept custom autoplayDelay', () => {
      component.autoplayDelay = 5000;
      expect(component.autoplayDelay).toBe(5000);
    });

    it('should accept loading state', () => {
      component.loading = true;
      expect(component.loading).toBe(true);
    });
  });

  describe('Rendering states', () => {
    it('should show loading state when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const loadingText = compiled.querySelector('p');
      expect(loadingText?.textContent).toContain('Cargando imágenes');
    });

    it('should show empty state when no images', () => {
      component.loading = false;
      component.images = [];
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const emptyText = compiled.querySelector('p');
      expect(emptyText?.textContent).toContain('Selecciona una raza para ver imágenes');
    });



    
  });

  describe('Navigation methods', () => {
    it('should have scrollPrev method', () => {
      expect(component.scrollPrev).toBeDefined();
      expect(() => component.scrollPrev()).not.toThrow();
    });

    it('should have scrollNext method', () => {
      expect(component.scrollNext).toBeDefined();
      expect(() => component.scrollNext()).not.toThrow();
    });
  });

  describe('Lifecycle hooks', () => {
    it('should handle ngOnChanges when images change', () => {
      const changes = {
        images: new SimpleChange([], mockImages, false)
      };
      
      expect(() => component.ngOnChanges(changes)).not.toThrow();
    });

    it('should not throw on first change', () => {
      const changes = {
        images: new SimpleChange(undefined, mockImages, true)
      };
      
      expect(() => component.ngOnChanges(changes)).not.toThrow();
    });

    it('should handle ngOnDestroy gracefully', () => {
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should not throw error on ngOnDestroy if emblaApi is undefined', () => {
      (component as any).emblaApi = undefined;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Loading spinner', () => {
    it('should render spinner with correct animation class', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const spinner = compiled.querySelector('.animate-spin');
      expect(spinner).toBeTruthy();
    });
  });
});
