import Application from '~/app';
import Renderer from '~/renderer';
import { BaseStage } from '~/display/stage';

import * as EGAK from '~/index';

const circle = new EGAK.Graphics.Circle(0, 0, 1, 1, 1, 1, 1);
console.log(circle.anchor);

const mockWebGLContext = {
  clearColor: vi.fn(),
  clear: vi.fn(),
  canvas: document.createElement('canvas'),
  viewport: vi.fn(),
  enable: vi.fn(),
  blendFunc: vi.fn(),
  pixelStorei: vi.fn(),
  createShader: vi.fn(() => {
    return 1;
  }),
  shaderSource: vi.fn(),
  compileShader: vi.fn(),
  shaderParameter: vi.fn(),
  getShaderParameter: vi.fn(),
  getShaderInfoLog: vi.fn(),
  deleteShader: vi.fn(),
  createProgram: vi.fn(() => {
    return 1;
  }),
  attachShader: vi.fn(),
  linkProgram: vi.fn(),
  getProgramParameter: vi.fn(),
  getProgramInfoLog: vi.fn(),
  deleteProgram: vi.fn(),
  createBuffer: vi.fn(),
  bindBuffer: vi.fn(),
  getAttribLocation: vi.fn(),
  enableVertexAttribArray: vi.fn(),
  vertexAttribPointer: vi.fn(),
  bufferData: vi.fn(),
  getUniformLocation: vi.fn(),
};

HTMLCanvasElement.prototype.getContext = vi.fn((type) => {
  if (type === 'webgl2') {
    return mockWebGLContext as any;
  }
  return null;
});

describe('Application', () => {
  describe('with no option', () => {
    let app;
    beforeEach(() => {
      app = new Application();
    });

    it('should be created with no option', () => {
      expect(app).toBeInstanceOf(Application);
    });

    it('should have a renderer', () => {
      expect(app.renderer).toBeInstanceOf(Renderer);
    });

    it('should have a baseStage', () => {
      expect(app.baseStage).toBeInstanceOf(BaseStage);
    });

    it('baseStage should be added a circle', () => {
      const circle = new EGAK.Graphics.Circle(0, 0, 1, 1, 1, 1, 1);
      app.baseStage.addChild(circle);
    });
  });
  describe('with options', () => {
    let app;
    beforeEach(() => {
      app = new Application({
        screen: document.createElement('canvas'),
        width: 100,
        height: 100,
        backgroundColor: { r: 100, g: 100, b: 100, a: 1 },
      });
    });
    it('should be created with options', () => {
      expect(app).toBeInstanceOf(Application);
    });
  });
});

describe('Graphics', () => {
  let circle;
  beforeEach(() => {
    circle = new EGAK.Graphics.Circle(0, 0, 1, 1, 1, 1, 1);
  });
  it('should have anchor', () => {
    expect(circle.anchor).toEqual({ _x: 0, _y: 0 });
  });
});
