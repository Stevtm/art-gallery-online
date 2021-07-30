// import dependency methods
import React from "react";
import Fade from "react-reveal/Fade";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./firebase.config";

// import React components
import Nav from "./components/PageNav";
import Carousel from "./components/ArtCarousel";
import Gallery from "./pages/Gallery";
import Title from "./components/Title";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import ArtGallery from "./pages/ArtGallery";

// import styling
import Container from "react-bootstrap/Container";
import "./App.css";
import ImageUpload from "./components/Image-Test";

// GRAPHQL STUFF (TO BE UPDATED)
const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
					<Nav />
					<div className="container top-padding">
						<Route exact path="/login">
							<Login></Login>
						</Route>
						<Route exact path="/signup">
							<Signup></Signup>
						</Route>
						<Route exact path="/profile">
							<Profile></Profile>
						</Route>
						<Route exact path="/post">
							<Post></Post>
						</Route>
						<Route exact path="/artgallery">
							<ArtGallery></ArtGallery>
						</Route>
						<Route exact path="/">
							<div className="App" style={{ position: "relative" }}>
								<Carousel />
								<Title />

								<div>
									<Container className="container-box rounded">
										<Fade duration={500}>
											<hr />
											<Gallery />
										</Fade>
									</Container>
								</div>
							</div>
						</Route>
					</div>
					{/* <Footer /> */}
				</div>
			</Router>
		</ApolloProvider>
	);
};

export default App;
