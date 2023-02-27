
  export function formatString(template: string, data: any = {}) {
    Object.keys(data).forEach(key => {
      template = template.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
    });
  
    return template;
  }