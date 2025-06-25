import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideSongDetailsComponent } from './aside-song-details.component';

describe('AsideSongDetailsComponent', () => {
  let component: AsideSongDetailsComponent;
  let fixture: ComponentFixture<AsideSongDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideSongDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideSongDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
