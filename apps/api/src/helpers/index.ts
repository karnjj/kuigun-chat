const randomString = (length: number) => {
  const chars = '0123456789'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

const groupKey = (groupId: string) => `group-${groupId}`

const userKey = (usernames: string[]) => `user-${usernames.sort().join('-')}`

export { groupKey, userKey, randomString }
