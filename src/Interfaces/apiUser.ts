// JSONPlaceholder /users API yanıtına uyumlu tip
export interface ApiUser {
  id: number
  name: string
  email: string
  phone?: string
  company?: {
    name: string
  }
}
