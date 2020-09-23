import createPubsub from 'nano-pubsub'
import {Reported} from './index'

export function createStore<Value>() {
  const reportedValues = new Map<string, Value>()
  const {publish, subscribe} = createPubsub<Reported<Value>[]>()

  const read = () => Array.from(reportedValues.entries())

  function add(id: string, value: Value) {
    if (reportedValues.has(id)) {
      throw new Error(
        `Invalid call to useReporter(${id}): A component reporting on "${id}" is already mounted in the subtree. Make sure that all reporters within the same <Tracker> subtree have unique ids.`,
      )
    }
    reportedValues.set(id, value)
    publish(read())
  }

  function update(id: string, value: Value) {
    if (!reportedValues.has(id)) {
      throw new Error(`A reporter with id "${id}" is not known.`)
    }
    reportedValues.set(id, value)
    publish(read())
  }

  function remove(id: string) {
    if (!reportedValues.has(id)) {
      throw new Error(`A reporter with id "${id}" is not known`)
    }
    reportedValues.delete(id)
    publish(read())
  }

  return {
    add,
    remove,
    update,
    read,
    subscribe,
  }
}
