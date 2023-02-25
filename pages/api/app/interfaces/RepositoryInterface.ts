export interface Repository  {
    read(): Promise<any>
    write(data: any): Promise<void>
    add(data: any): Promise<void>
    find(id: any): Promise<any>
    findBy(key: any, value: any): Promise<any>
    findAll(): Promise<any>
    create(data: any): Promise<any>
    update(id: any, data: any): Promise<any>
    destroy(id: any): Promise<any>
}
