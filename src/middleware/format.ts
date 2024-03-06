import lodash from "lodash";

export function formatData(data: any) {
  if (data.length > 1) {
    return { docs: [lodash.fromPairs(data)], total: data.length };
  } else {
    return { docs: { ...data } };
  }
}
