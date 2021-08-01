const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
// const fs = require("fs");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const admin = require("firebase-admin");
require("dotenv").config();
// initialize firebase
const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});
var cors = require("cors");

const startup = async () => {
	await server.start();
	server.applyMiddleware({ app });

	return app;
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use("/image", ImageRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "uploads");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + "-" + Date.now());
// 	},
// });

// var upload = multer({ storage: storage });

// ImageRouter.route("/uploadmulter").post(
// 	upload.single("imgData"),
// 	(req, res, next) => {
// 		// create new image document in Img collection
// 		const new_img = new Img({});
// 		new_img.img.data = fs.readFileSync(req.file.path);
// 		new_img.img.contentType = "image/jpeg";
// 		new_img.save();

// 		// add image document to Art

// 		res.json({ new_img });

// 		// const newImage = new Image.Image({
// 		// 	imgName: req.body.imgName,
// 		// 	imgData: req.file.path,
// 		// });

// 		// newImage
// 		// 	.save()
// 		// 	.then((result) => {
// 		// 		res.status(200).json({
// 		// 			success: true,
// 		// 			document: result,
// 		// 		});
// 		// 	})
// 		// 	.catch((err) => next(err));
// 	}
// );

// ImageRouter.route("/uploadmulter").get((req, res) => {
// 	console.log("req", req.query);
// 	Img.findById({ _id: req.query.id }, "img createdAt", function (err, img) {
// 		if (err) {
// 			res.send(err);
// 		}

// 		console.log(img);

// 		res.contentType("json");
// 		res.send(img);
// 	}).select("--v");
// });

startup();
