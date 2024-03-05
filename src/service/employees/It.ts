import { inject, injectable } from "inversify";

import {ItRepository} from "../../repository/employees";
import { BaseService } from "../../service/base";


@injectable()
export class ItService extends BaseService {
  constructor(
    @inject(ItRepository)
    private readonly _ItRepository: ItRepository
  ) {
    super(_ItRepository)
  }
}
