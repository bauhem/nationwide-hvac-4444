export function hasProperty(obj, key) {
  return key.split(".").every(function(x) {
      if(typeof obj != "object" || obj === null || ! x in obj)
          return false;
      obj = obj[x];
      if (obj === undefined) {
        return false;
      }
      return true;
  });
}