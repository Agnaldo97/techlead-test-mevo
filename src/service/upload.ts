

export const uploadProcess = async (lines: any) => {

    const successLine = []
    const errorsLine: any = []
    const processed = []
    const frauds = []


    const response: any= []
    return response;
};

const lessZero = async (line: any, errorsLine: any) => {
    if (line.amount < 0) {
        return "NEGATIVO"
    }
    //Incluir na base de processamento com status de negativo

};

const duplicated = async (line: any, processed: any, errorsLine: any) => {
    if (processed.includes(line)) {
        line.reason = "DUPLICADA"
        return "DUPLICADO"
    }
    //Incluir na base de processamento com status de duplicado

};

const fraud = async (line: any, frauds: any) => {
    if (line.amount >= 50000)
        return "SUSPEITO"
    //Incluir na base de fraude
};



// {
//     "from": 4713471018869,
//     "to": 8470715754697,
//     "amount": 131118230
//   },