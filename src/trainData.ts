export const PreTrained3Bit = {
    and:[
        {inputs:[0,0,0],output:0}, 
        {inputs:[0,0,1],output:0}, 
        {inputs:[0,1,0],output:0}, 
        {inputs:[0,1,1],output:0}, 
        {inputs:[1,0,0],output:0}, 
        {inputs:[1,0,1],output:0}, 
        {inputs:[1,1,0],output:0}, 
        {inputs:[1,1,1],output:1}, 
    ],
    not_and:[
        {inputs:[0,0,0],output:1}, 
        {inputs:[0,0,1],output:1}, 
        {inputs:[0,1,0],output:1}, 
        {inputs:[0,1,1],output:1}, 
        {inputs:[1,0,0],output:1}, 
        {inputs:[1,0,1],output:1}, 
        {inputs:[1,1,0],output:1}, 
        {inputs:[1,1,1],output:0}, 
    ],
    or:[
        {inputs:[0,0,0],output:0}, 
        {inputs:[0,0,1],output:1}, 
        {inputs:[0,1,0],output:1}, 
        {inputs:[0,1,1],output:1}, 
        {inputs:[1,0,0],output:1}, 
        {inputs:[1,0,1],output:1}, 
        {inputs:[1,1,0],output:1}, 
        {inputs:[1,1,1],output:1}, 
    ],
    not_or:[
        {inputs:[0,0,0],output:1}, 
        {inputs:[0,0,1],output:0}, 
        {inputs:[0,1,0],output:0}, 
        {inputs:[0,1,1],output:0}, 
        {inputs:[1,0,0],output:0}, 
        {inputs:[1,0,1],output:0}, 
        {inputs:[1,1,0],output:0}, 
        {inputs:[1,1,1],output:0}, 
    ]
}

export function generateTrainData(type:string,inputAmount:number) 
{
    function generateAnd()
    {
        let trainData = [];
        let input = [];
        let output = 0;

        for(let i = 0; i < Math.pow(2,inputAmount); i++)
        {
            for(let j = 0; j < inputAmount; j++)
            {
                input.push((i >> j) & 1);
            }

            output = input.reduce((a,b) => a & b);

            trainData.push({inputs:input,output:output});
            input = [];
        }

        return trainData;
    }

    function generateNotAnd()
    {
        let trainData = [];
        let input = [];
        let output = 0;

        for(let i = 0; i < Math.pow(2,inputAmount); i++)
        {
            for(let j = 0; j < inputAmount; j++)
            {
                input.push((i >> j) & 1);
            }

            output = input.reduce((a,b) => a & b) ? 0 : 1;

            trainData.push({inputs:input,output:output});
            input = [];
        }

        return trainData;
    }

    function generateOr()
    {
        let trainData = [];
        let input = [];
        let output = 0;

        for(let i = 0; i < Math.pow(2,inputAmount); i++)
        {
            for(let j = 0; j < inputAmount; j++)
            {
                input.push((i >> j) & 1);
            }

            output = input.reduce((a,b) => a | b);

            trainData.push({inputs:input,output:output});
            input = [];
        }

        return trainData;
    }

    function generateNotOr()
    {
        let trainData = [];
        let input = [];
        let output = 0;

        for(let i = 0; i < Math.pow(2,inputAmount); i++)
        {
            for(let j = 0; j < inputAmount; j++)
            {
                input.push((i >> j) & 1);
            }

            output = input.reduce((a,b) => a | b) ? 0 : 1;

            trainData.push({inputs:input,output:output});
            input = [];
        }

        return trainData;
    }

    switch(type.toLowerCase())
    {
        case "and":
            return generateAnd();
        case "nand":
            return generateNotAnd();
        case "or":
            return generateOr();
        case "nor":
            return generateNotOr();
    }
}