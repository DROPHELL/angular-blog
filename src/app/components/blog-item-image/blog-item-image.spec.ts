import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemImageComponent } from './blog-item-image';

describe('BlogItemImage', () => {
  let component: BlogItemImageComponent;
  let fixture: ComponentFixture<BlogItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItemImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItemImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
