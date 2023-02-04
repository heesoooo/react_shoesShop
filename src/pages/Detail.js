/* eslint-disable */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

	let {id} = useParams();
	let findProd = props.shoes.find((x)=> x.id==id)
	let [bnrTime, setBnrTime] = useState(true);
	let [Num, setNum] = useState('');
	

	//useEffect 안에 있는 코드는 html렌더링 후에 동작!
	useEffect(()=>{
		let banner = setTimeout(()=>{
			setBnrTime(false)
		}, 5000)

		if (isNaN(Num) == true) {
			alert("숫자만 입력하세요.")
		}

		return ()=> {
			clearTimeout(banner)
		}
	}, []) // ← 컴포넌트 mount시 1회만 실행하고 싶을때 []
	
	
	useEffect(()=>{
		if (isNaN(Num) == true) {
			alert("숫자만 입력하세요.")
		}
	}, [Num])
	
	return (
		<div className="container">
			{/* 특가 배너 */}
			{
				bnrTime == true
				? <div className="alert alert-warning">
					5분 이내 구매시 할인 
				</div>
				: null
			}	

			{/* 상품정보 및 수량 체크 */}
			<div className="row text-center">
				<div className="col-md-6">
					<img src={process.env.PUBLIC_URL + '/shoes' + (parseInt(id)+1) + '.jpg'} alt="shoes" width = "95%" />
				</div>
				<div className="col-md-6">
					<h4 className="pt-5">{findProd.title}</h4>
					<p>{findProd.content}</p>
					<p>{findProd.price}</p>
					<input type="text" class="inp-count" placeholder="1" onChange={(e)=>{setNum(e.target.value)}} />
					<button className="btn btn-danger">주문하기</button>
				</div>
			</div>
		</div>
	)
}

export default Detail;