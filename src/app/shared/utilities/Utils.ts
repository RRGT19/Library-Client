/**
 * This class will contain common methods to reuse in the entire project.
 */
export default class Utils {

  /**
   * Performs a deep copy.
   * Deep copy: The value of the new object/value is disconnected from the original object/value.
   * @param obj The object/value that we want to copy.
   */
  static deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

}
