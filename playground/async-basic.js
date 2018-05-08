console.log('Stating app');
setTimeout(() => {
	console.log("1st callback");
}, 200);
setTimeout(() => {
	console.log('2nd  of callback');
}, 0000);

console.log("Finishing up");
