import { SiteBuilderPage } from './app.po';

describe('site-builder App', () => {
  let page: SiteBuilderPage;

  beforeEach(() => {
    page = new SiteBuilderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
