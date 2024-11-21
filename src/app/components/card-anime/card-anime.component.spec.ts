import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnimeComponent } from './card-anime.component';

describe('CardAnimeComponent', () => {
  let component: CardAnimeComponent;
  let fixture: ComponentFixture<CardAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
