import db from '../database'
import {Token, Repository, User} from '../interfaces'
import {TokenModel} from '../models'

export default class TokenRepository implements Repository {
    private tokenModel: TokenModel

    constructor () {
        this.tokenModel = new TokenModel()
    }

    read = async () => {
        await db.read()
        return db.data?.tokens ?? []
    }

    write = async (data: {tokens: Token[]}) => {
        Object.assign(db.data as Object, {tokens: data.tokens})
        return await db.write()
    }

    add = async (token: Token) => {
        let tokens = await this.read()
        tokens.push(this.tokenModel.set(token))

        return await this.write({tokens: tokens})
    }

    find = async (userId: string) => {
        let tokens: Token[] = await this.read()
        tokens = tokens.filter(token => token.userId === userId)
        return tokens[0]
    }

    findBy = async (key: string, value: string) => Promise

    findAll = async () => Promise

    create = async (userId: string) => await this.add({userId: userId}).then(() => this.find(userId))

    update = async (id: string, newToken: Token) => Promise

    destroy = async (userId: string) => {
        let tokens: Token[] = await this.read()
        tokens = tokens.filter(token => token.userId !== userId)

        return await this.write({tokens: tokens}).then(async () => await this.read())
    }
}
