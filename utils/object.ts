import {assignWith, isEmpty, isPlainObject} from "lodash";

export function deepMerge(objValue: any, srcValue: any): any {
  if (objValue === undefined) {
    return srcValue
  } else if (isPlainObject(objValue)) {
    return assignWith({}, objValue, srcValue, deepMerge)
  } else if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    if (isEmpty(objValue) && !isEmpty(srcValue)) {
      return [...srcValue]
    } else if (!isEmpty(objValue) && isEmpty(srcValue)) {
      return objValue
    } else if (isEmpty(objValue) && isEmpty(srcValue)) {
      return objValue
    } else {
      return srcValue
    }
  } else {
    return srcValue
  }
}

