import db from '../database'
import {Token, Repository} from '../interfaces'
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

    findOne = async (value: string) => await this.findOneBy('value', value)

    findOneBy = async (key: string, value: string) => {
        let tokens: Token[] = await this.read()
        tokens = tokens.filter(token => token[key as keyof Token] === value)
        return tokens[0]
    }

    findAll = async () => Promise

    findAllPaginate = async (page: number = 1, limit: number = 15) => Promise

    findAllBy = async (key: string, value: string) => Promise

    create = async (userId: string) => await this.add({userId: userId}).then(async () => await this.findOneBy("userId", userId))

    update = async (id: string, newToken: Token) => Promise

    destroy = async (userId: string) => {
        let tokens: Token[] = await this.read()
        tokens = tokens.filter(token => token.userId !== userId)

        return await this.write({tokens: tokens}).then(async () => await this.read())
    }
}
