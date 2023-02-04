/* eslint-disable */
import './App.css';
import { useState, useEffect } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import data from './shoesData.js';
import Detail from './pages/Detail.js';
import Cart from './pages/Cart.js';
import Error404 from './pages/Error404.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
	let [shoes, setShoes] = useState(data);
	let [clickData, setClickData] = useState(0);
	let [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	// 상품 리스트 더보기 버튼 클릭시
	const handleClick = () => {
		setClickData(clickData+=1);
		setLoading(true);
		console.log(clickData);

		setTimeout(()=>{
			axios.get(`https://codingapple1.github.io/shop/data${clickData+1}.json`)
			.then((result)=>{
				//console.log(data.data);
				let copy = [...shoes, ...result.data];
				setShoes(copy);
				setLoading(false);
			})
			.catch(()=>{
				console.log('error');
				setLoading(false);
			})
		}, 200)
	};
	
	let result = useQuery('welcome', ()=>
		axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
			return a.data
		})
	)

	return (
		<div className="App">
			{/* nav */}
			<Navbar expand="lg" className="nav_bar">
				<Navbar.Brand href="/">ShoesShop</Navbar.Brand>
				<Navbar.Collapse>
					<Nav onClick={()=>{navigate('/')}} className="nav-item">홈</Nav>
					<Nav onClick={()=>{navigate('/detail/0')}} className="nav-item">상세페이지</Nav>
					<Nav onClick={()=>{navigate('/Cart')}} className="nav-item">장바구니</Nav>
				</Navbar.Collapse>
				<Nav className="ms-auto">
					{ result.isLoading && '로딩중' }
					{ result.data && result.data.name }
					{ result.error && '에러남' }
					<span className="d-inline-block px-3"></span>
				</Nav>
			</Navbar>			

			<Routes>
				<Route path="/" element={
					<>
						{/* main visual */}
						<div className="main-bg"></div>


						{/* item list */}
						<div className="container py-5">
							<div className="row">
								{
									shoes.map((a, i) => {
										return (
											<Item shoes={shoes[i]} i={i+1}></Item>
										)
									})
								}
							</div>
						</div>

						{
							clickData < 2 
							? 	
							<button onClick={ ()=>{ handleClick() }} className="more-prod-list">더 보기</button>
							: null
						}
						{
							loading == true 
							? <div className="loading">loading...</div>
							: null
						}

					</>
				} />
				{/* 상세페이지 */}
				<Route path="/detail/:id" element={<Detail shoes={shoes}/>} />			
				
				{/* 장바구니 */}
				<Route path="/cart" element={<Cart/>} />

				{/* 404 error */}
				<Route path="*" element={ <Error404 /> } />
			</Routes>
		</div>
	);
}

function Item(props) {
	let navigate = useNavigate();
	return (
		<div className="col-md-4 text-center" onClick={()=>{ navigate('/detail/' + (props.i - 1)) }}>
			<img src={process.env.PUBLIC_URL + '/shoes' + props.i + '.jpg'} alt="shoes" width = "95%" />
			<h4>{props.shoes.title}</h4>
			<p>{props.shoes.price}</p>
		</div>
	)
}
export default App;
