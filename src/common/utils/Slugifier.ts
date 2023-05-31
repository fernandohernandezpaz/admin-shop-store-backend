import slugify from 'slugify';

export class Slugifier {
  private readonly configs = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'es',
    trim: true,
  };
  slug(valueString: string): string {
    return slugify(valueString, this.configs);
  }
}
