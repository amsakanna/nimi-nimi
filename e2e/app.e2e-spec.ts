import { ShoppingPage } from './app.po';

describe('shopping App', function() {
  let page: ShoppingPage;

  beforeEach(() => {
    page = new ShoppingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
