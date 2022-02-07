export function searchToObject(search: string): Record<string, string> {
  const pairs = search.substring(1).split('&');
  return pairs.reduce((obj: any, item) => {
    if (item !== '') {
      const [key, value] = item.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return obj;
  }, {});
}
