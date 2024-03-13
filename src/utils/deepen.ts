export function deepen(datas: any) {
  return datas.reduce((m:any, o:any) => {
    var keys = o.column.split(".");
    var cur = m;
    keys.forEach((key:any, i:any) => {
      if (i < keys.length - 1) {
        cur[key] = cur[key] || {};
        cur = cur[key];
      } else {
        cur[key] = o.value;
      }
    });
    return m;
  }, {});
}
