export interface IEmployees{
    getAll(department_id:string): Promise<any>
}