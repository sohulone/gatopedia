import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedSelector } from './breed-selector';

describe('BreedSelector', () => {
  let component: BreedSelector;
  let fixture: ComponentFixture<BreedSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
