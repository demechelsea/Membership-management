
export function formatString(template: string, data: any = {}) {
  Object.keys(data).forEach(key => {
    template = template.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
  });

  return template;
}

export function notNull(object: any): boolean {
  return object != null && object != 'undefined';
}

export function nullObj(object: any): boolean {
  return object == null || object == 'undefined';
}

export function isEmpty(object: any): boolean {
  if (object === null || object === undefined) {
    return true;
  }
  
  if (typeof object === 'string' && object.trim() === '') {
    return true;
  }

  if (typeof object === 'object' && Object.keys(object).length === 0) {
    return true;
  }
  
  return false ;
}


export function isNotEmpty(object: any): boolean {
  return !isEmpty(object);
}