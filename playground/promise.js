var syncAdd = (a, b) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }
            else{
                reject("Arguments must be Numbers");
            }
        }, 3000);
    });
}

syncAdd(23, 7).then((res) => {
    console.log('result: ', res);
    return syncAdd(res, 2);
}).then((res) =>{
    console.log('Expected sum : ', res);
}).catch( (error) => {
    console.log(error);
});