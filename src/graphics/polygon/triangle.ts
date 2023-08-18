import Line from './line';
import { GraphicsTypes } from '../abstract_graphics';

export default class Triangle extends Line {
  readonly graphicsType: GraphicsTypes = 'triangle';
  constructor() {
    super();
  }
}
