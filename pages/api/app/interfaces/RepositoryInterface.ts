export interface Repository  {
    read(): Promise<any>
    write(data: any): Promise<void>
    add(data: any): Promise<void>
    findOne(id: any): Promise<any>
    findOneBy(key: any, value: any): Promise<any>
    findAll(): Promise<any>
    findAllPaginate(): Promise<any>
    findAllBy(key: any, value: any): Promise<any>
    create(data: any): Promise<any>
    update(id: any, data: any): Promise<any>
    destroy(id: any): Promise<any>
}
