
export function formatString(template: string, data: any = {}) {
  Object.keys(data).forEach(key => {
    template = template.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
  });

  return template;
}

export function notNull(object: any): boolean {
  return object != null && object != 'undefined';
}