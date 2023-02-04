/* eslint-disable */
import { useNavigate } from 'react-router-dom';

function Error404() {
    let navigate = useNavigate();

	return (
		<div className="error404">
            <img src={process.env.PUBLIC_URL + '/404error.png'} alt="404 error" width = "95%" />
            <p>없는 페이지 입니다</p>
            <button onClick={()=>{navigate(-1)}} className="bf-page">이전페이지로 가기</button>
        </div>
	)
}

export default Error404;