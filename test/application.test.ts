import Application from '~/app/application';

describe('Application', () => {
  it('', () => {
    const canvas = document.createElement('canvas');
    const app = new Application({
      screen: canvas,
    });
    expect(app).toBeInstanceOf(Application);
  });
});
