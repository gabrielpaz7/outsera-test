import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('@AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    app = new AppComponent();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'outsera-test'`, () => {
    expect(app.title).toEqual('outsera-test');
  });
});
