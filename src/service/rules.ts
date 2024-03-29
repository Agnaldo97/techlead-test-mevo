import Line from '../interface/iline'
class RulesService {
    constructor() { }

    async lessZero(line: Line): Promise<Boolean> {
        if (Number(line.amount) < 0)
            return true
        return false
    }

    async duplicated(line: Line, processed: Line[]): Promise<Boolean> {
        if (processed.includes(line))
            return true
        return false
    }

    async fraud(line: Line): Promise<Boolean> {
        if (Number(line.amount) > 50000)
            return true
        return false
    }

}

export default new RulesService();
