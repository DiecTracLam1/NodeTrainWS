import { injectable } from "inversify";
import client from "../model/connect";

@injectable()
export class ItRepository {
  async getAll() {
    return await client.query("Select * From employees");
  }
}
