import {Token} from '../interfaces'
import {randomUUID} from 'crypto'

export default class TokenModel {
    private userId?: string
    private value?: string

    public get = (): Token => {
        return {
            userId: this.userId ?? '',
            value: this.value ?? ''
        }
    }
    
    public set = (token: Token): Token => {
        this.userId = token.userId
        this.value = token.value ?? randomUUID()

        return this.get()
    }
}
