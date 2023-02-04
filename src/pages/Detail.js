/* eslint-disable */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addItem } from "./../store.js";

	
function Detail(props) {
	let { id } = useParams();
	let findProd = props.shoes.find((x) => x.id == id)
	let [bnrTime, setBnrTime] = useState(true);
	let [Num, setNum] = useState('');
	let [tab, setTab] = useState(0);
	let [scale2, setScale2] = useState('');
	let navigate = useNavigate();
	let dispatch = useDispatch();

	//useEffect 안에 있는 코드는 html렌더링 후에 동작!
	useEffect(() => {
		let banner = setTimeout(() => {
			setBnrTime(false)
		}, 5000)

		if (isNaN(Num) == true) {
			alert("숫자만 입력하세요.")
		}

		return () => {
			clearTimeout(banner)
		}
	}, []) // ← 컴포넌트 mount시 1회만 실행하고 싶을때 []


	useEffect(() => {
		if (isNaN(Num) == true) {
			alert("숫자만 입력하세요.")
		}
	}, [Num])

	useEffect(() => {
		setScale2('scale-end');
		return () => {
			setScale2('');
		}
	}, [])

	return (
		<div className={'container scale-start ' + scale2}>
			{/* 특가 배너 */}
			{
				bnrTime == true
					? <div className="alert alert-warning">
						5분 이내 구매시 할인
					</div>
					: null
			}

			{/* 상품정보 및 수량 체크 */}
			<div className="row mb-5 text-center">
				<div className="col-md-6">
					<img src={process.env.PUBLIC_URL + '/shoes' + (parseInt(id) + 1) + '.jpg'} alt="shoes" width="95%" />
				</div>
				<div className="col-md-6">
					<h4 className="pt-5">{findProd.title}</h4>
					<p>{findProd.content}</p>
					<p>{findProd.price}</p>
					<input type="text" className="inp-count" placeholder="1" onChange={(e) => { setNum(e.target.value) }} />
					<button className="btn btn-danger" onClick={()=>{
						navigate('/Cart')
						dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
					}}>주문하기</button>
				</div>
			</div>

			<Nav variant="tabs" defaultActiveKey="link0">
				<Nav.Item>
					<Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>상세정보</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>리뷰</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>Q&A</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab} />
		</div>
	)
}

// tab Content
function TabContent({tab}) {
	let [fade, setFade] = useState('');

	useEffect(()=>{
		setTimeout(()=>{
			setFade('fade-end');
		}, 200)
		return ()=> {
			setFade('');			
		}
	}, [tab])

	return (
		<div className={'tab-detail fade-start ' + fade}>
			{
				[<div>신발에 대한 상세정보입니다.</div>, <div>신발에 대한 리뷰입니다.</div>, <div>문의사항을 남겨주세요.</div>][tab]
			}
		</div>
	)
}

export default Detail;