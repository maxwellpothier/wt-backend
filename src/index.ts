import app from "./server";

const port = 4550;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})