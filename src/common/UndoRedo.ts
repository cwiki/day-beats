import type {
  Identifiable,
  Change,
} from "@/common/interfaces";

/**
 * Applies array of changes to a identifiable list
 * @param ident
 * @param changeSet
 */
export function applyIdentifiableToSegments(
  ident: Array<Identifiable>,
  changeSet: Array<Change>
): Array<Identifiable> {
  for (const change of changeSet) {
    const index = ident.findIndex(
      (t: Identifiable) => change.entity.id === t.id
    );

    switch (change.action) {
      case "INSERT":
        ident.push(change.entity);
        break;
      case "UPDATE":
        if (index !== -1) ident[index] = change.entity;
        break;
      case "DELETE":
        if (index !== -1) ident.splice(index, 1);
    }
  }

  return ident;
}

/**
 * Can apply the MATRIX of identifiables to a Segments list
 * @param base
 * @param changes
 */
export function updateSegmentsWithIdentifiableHistory<T>(
  base: Array<Identifiable>,
  changes: Array<Array<Change>>
): Array<T> {
  let clone = JSON.parse(JSON.stringify(base)); // fresh copy so base state is not tampered with
  for (const changeSet of changes) {
    clone = applyIdentifiableToSegments(clone, changeSet);
  }
  return clone;
}
