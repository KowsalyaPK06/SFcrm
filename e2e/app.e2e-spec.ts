import { CrmNodePage } from './app.po';

describe('crm-node App', () => {
  let page: CrmNodePage;

  beforeEach(() => {
    page = new CrmNodePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
