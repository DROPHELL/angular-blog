import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemTextComponent } from './blog-item-text';

describe('BlogItemText', () => {
  let component: BlogItemTextComponent;
  let fixture: ComponentFixture<BlogItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItemTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItemTextComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
