export interface UserModelInterface {
    id: number,
    firstName: string
    lastName: string
    fullName: string
    email: string,
    username: string
    contact?: string,
    description?: string,
    status: boolean,
    metadata?: Record<string, unknown>,
    createdAt: string
    updatedAt: string
}
