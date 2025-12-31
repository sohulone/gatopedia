import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedImages } from './breed-images';

describe('BreedImages', () => {
  let component: BreedImages;
  let fixture: ComponentFixture<BreedImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedImages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
