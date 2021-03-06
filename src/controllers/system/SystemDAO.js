import SystemModel from '../../models/system.model'

/** System DAO
 * Interacts with mongo database controlling System collection, that contains
 * config informations.
 */

export default class {
  /**
     * Returns a new System D.O.
     */
  static createObject() {
    return new SystemModel();
  }

  /**
   * Saves on the database the System D.O.
   */
  static insertSystem(system_) {
    return new Promise((resolve, reject) => {
      system_.save((err, doc) => {
        if (err) reject();
        resolve(doc);
      });
    });
  }

  /**
   * Executes a query
   * @param query_ query that will be executed
   */
  static executeQuery(query_) {
    return new Promise((resolve, reject) => {
      query_.exec().then((doc) => {
        resolve(doc);
      }).catch(reject);
    });
  }

  /**
   * Prints on console logger the crude D.O.
   */
  static printObject(system_) {
    console.log(system_);
  }
}
