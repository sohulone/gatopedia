import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CatBreedsSelector } from './cat-breeds-selector';

describe('CatBreedsSelector', () => {
  let component: CatBreedsSelector;
  let fixture: ComponentFixture<CatBreedsSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatBreedsSelector],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatBreedsSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
