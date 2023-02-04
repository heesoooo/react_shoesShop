/* eslint-disable */
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount } from "./../store.js";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  return (
    <div>
      <h2 className="page-title">장바구니</h2>
      <Table className="tbl-cart">
		<colgroup>
			<col width='20%'/>
			<col width='50%'/>
			<col />
		</colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
			{
				state.cartData.map((a,i)=>
					<tr key={i}>
						<td>{state.cartData[i].id}</td>
						<td>{state.cartData[i].name}</td>
						<td>
							<button className="btn-count" onClick={()=>{
								dispatch(minusCount(state.cartData[i].id))
							}}>-</button>
							
							<span className="cart-count">{state.cartData[i].count}</span>

							<button className="btn-count" onClick={()=>{
								dispatch(addCount(state.cartData[i].id))
							}}>+</button>
						</td>
					</tr>
				)
			}          
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
