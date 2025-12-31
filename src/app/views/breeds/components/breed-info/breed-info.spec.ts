import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedInfo } from './breed-info';

describe('BreedInfo', () => {
  let component: BreedInfo;
  let fixture: ComponentFixture<BreedInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
