// TODO delete these helpers once AS has iterators.

// @ts-ignore: decorator
@global @inline
function Map_keys<K,V>(map: Map<K,V>): K[] {
  return map.keys(); // preliminary
}

// @ts-ignore: decorator
@global @inline
function Map_values<K,V>(map: Map<K,V>): V[] {
  return map.values(); // preliminary
}

// @ts-ignore: decorator
@global @inline
function Set_values<V>(set: Set<V>): V[] {
  return set.values(); // preliminary
}
