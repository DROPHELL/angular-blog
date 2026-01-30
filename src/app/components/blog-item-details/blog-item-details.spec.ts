import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemDetailsComponent } from './blog-item-details';

describe('BlogItemDetails', () => {
  let component: BlogItemDetailsComponent;
  let fixture: ComponentFixture<BlogItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItemDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItemDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
