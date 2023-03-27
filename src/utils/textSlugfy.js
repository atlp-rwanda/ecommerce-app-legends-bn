import slugify from 'slugify';
export const SlugfyFunction = (text) => { return slugify(text, {
    remove: undefined,
    lower: true, 
    strict: false, 
    locale: 'en', 
  })}
  ;