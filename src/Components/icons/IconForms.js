export const OUTLINE = 'outline';
export const FILLED = 'filled';
export const GRADIENT = 'gradient';

export default class IconForms {
  form: string;

  constructor(form: string) {
    this.form = form;
  }

  static filled() {
    return new this(FILLED);
  }

  static outline() {
    return new this(OUTLINE);
  }

  static gradient() {
    return new this(GRADIENT);
  }
}
