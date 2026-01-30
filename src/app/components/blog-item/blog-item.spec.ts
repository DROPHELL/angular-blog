import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemComponent } from './blog-item';

describe('BlogItem', () => {
  let component: BlogItemComponent;
  let fixture: ComponentFixture<BlogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
