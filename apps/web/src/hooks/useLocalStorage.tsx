import { useCallback, useState } from 'react'

type TAcceptableValues = string | number | boolean | null | undefined | object

const useLocalStorage = (key: string, initialValue: TAcceptableValues) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: TAcceptableValues) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
        setStoredValue(value)
      } catch (error) {
        console.log(error)
      }
    },
    [key, setStoredValue]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(undefined)
    } catch (error) {
      console.log(error)
    }
  }, [key, setStoredValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
