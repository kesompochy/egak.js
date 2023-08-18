import Application from '~/app';
import Renderer from '~/renderer';
import { BaseStage } from '~/display/stage';
import Loader from '~/loader';

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
  });
});
